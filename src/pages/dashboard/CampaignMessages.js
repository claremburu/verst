import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  // TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { createSvgIcon } from '@mui/material/utils';
import {
  DataGrid,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import { addDays, format, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import useSettings from '../../hooks/useSettings';
import { getCampaignsWithMessages } from '../../redux/slices/campaigns';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

import { MessagesListHead, MessagesMoreMenu, MessagesToolbar } from '../../sections/dashboard/campaigns/messages';

const TABLE_HEAD = [
  { id: 'msisdn', label: 'Msisdn', alignRight: false },
  { id: 'message', label: 'Message', alignRight: false },
  { id: 'rate', label: 'Rate', alignRight: false },
  { id: 'currency', label: 'Currency', alignRight: false },
  { id: 'operator', label: 'Operator', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ':root': { height: 10 },
  // height: '20px',
  // color: theme.palette.Verst.main,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    height: 10,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.Verst.lighter,
    color: theme.palette.Verst.main,
    height: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const getRowsFromCurrentPage = ({ apiRef }) => gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt'
);

const CustomToolbar = () => {
  const apiRef = useGridApiContext();

  const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

  const buttonBaseProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  return (
    <GridToolbarContainer>
      <Button {...buttonBaseProps} onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}>
        Current page rows
      </Button>
      <Button {...buttonBaseProps} onClick={() => handleExport({ getRowsToExport: getFilteredRows })}>
        Filtered rows
      </Button>
      <Button {...buttonBaseProps} onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}>
        Unfiltered rows
      </Button>
    </GridToolbarContainer>
  );
};

export default function CampaignMessages() {
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [selectDate, setSelectDate] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { campaignMessages } = useSelector((state) => state.campaigns);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getCampaignsWithMessages());
  }, [dispatch]);

  useEffect(() => {
    if (campaignMessages?.length) {
      setProductList(campaignMessages);
    }
  }, [campaignMessages]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = productList.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const handleDeleteProduct = (productId) => {
    const deleteProduct = productList.filter((product) => product.id !== productId);
    // console.log(productList);
    setSelected([]);
    setProductList(deleteProduct);
  };

  const handleEditUser = () => {};

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const filteredDateProducts = filteredProducts.filter(({ createdAt }) => {
    const date = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log({
      diffDays,
      selectDate,
      createdAt,
      res: diffDays <= selectDate,
    });

    if (selectDate === '') {
      return true;
    }

    return diffDays <= selectDate;
  });

  console.log({ filteredDateProducts });

  const isNotFound = !filteredProducts.length && Boolean(filterName);

  const columns = [
    { field: 'msisdn', headerName: 'Msisdn', width: 170 },
    { field: 'message', headerName: 'Message', width: 170 },
    { field: 'rate', headerName: 'Rate', width: 170 },
    { field: 'currency', headerName: 'Currency', width: 170 },
    { field: 'operator', headerName: 'Operator', width: 170 },
  ];
  // date
  const date = new Date();

  const tomorrow = addDays(date, 1);

  const start = startOfDay(date);

  const dateFormatted = format(date, 'yyyy-MM-dd');

  return (
    <Page title="Campaign Messages">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <JasminUsers/> */}
        <HeaderBreadcrumbs
          heading="Campaign Messages"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Campaigns',
              href: PATH_DASHBOARD.jasmin.root,
            },
            { name: 'Campaign Messages' },
          ]}
        />

        <Card id="messages">
          <MessagesToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onSelectDate={(date) => {
              setSelectDate(date);
              console.log({ date });
            }}
            // onDeleteUsers={() => handleDeleteUser(selected)}
          />

          <Scrollbar>
            <DataGrid
              {...campaignMessages}
              rows={campaignMessages.map((message) => message)}
              columns={columns}
              components={{ Toolbar: CustomToolbar }}
              // pageSize={10}
              // rowsPerPageOptions={[10]}
              initialState={{
                filter: {
                  filterModel: {
                    items: [{ columnField: 'quantity', operatorValue: '>', value: '20000' }],
                  },
                },
              }}
            />
            {/* <Button onClick={DownloadPDF}>Download</Button> */}
            <TableContainer sx={{ minWidth: 800 }} id="messages">
              {/* <Button variant='contained' onClick={DownloadPDF}>Download</Button> */}
              <Table sx={{ minWidth: 650 }} size="small">
                <MessagesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {/* {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                  {filteredDateProducts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { campaignId, msisdn, message, rate, currency, operatorName } = row;

                    const isItemSelected = selected.indexOf(campaignId) !== -1;

                    return (
                      <StyledTableRow
                        hover
                        key={campaignId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(campaignId)} />
                        </StyledTableCell>
                        <StyledTableCell>{msisdn}</StyledTableCell>
                        <StyledTableCell>{message}</StyledTableCell>
                        <StyledTableCell>{rate}</StyledTableCell>
                        <StyledTableCell>{currency}</StyledTableCell>
                        <StyledTableCell>{operatorName}</StyledTableCell>
                        <TableCell align="right">
                          <MessagesMoreMenu userData={row} />
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={productList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(campaignMessages, comparator, query) {
  const stabilizedThis = campaignMessages.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return campaignMessages.filter((campaign) => campaign.message.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}
