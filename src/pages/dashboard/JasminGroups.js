import { useTheme, styled } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import {Table, TableRow, TableHead, TableBody, TablePagination, Checkbox, Box, TableContainer, Container, Card} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Image from '../../components/Image';
import Label from '../../components/Label';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import useSettings from '../../hooks/useSettings';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { fCurrency } from '../../utils/formatNumber';
// utils
import { fDate } from '../../utils/formatTime';
// import { withStyles } from '@material-ui/core';
import './jasmin.css';

// import {getProducts} from '../../redux/slices/jasmine'
import {
  ProductListToolbar,
  ProductMoreMenu,
  ProductListHead
} from '../../sections/@dashboard/e-commerce/product-list';

import { GroupsListHead, GroupsMoreMenu, GroupsToolbar } from '../../sections/dashboard/jasmin/groups';

import { getGroups, createGroup, deleteGroup} from '../../redux/slices/jasmine';

const TABLE_HEAD = [
  { id: 'owner', label: 'Owner', alignRight: false },
  { id: 'group', label: 'Group', alignRight: false },
  { id: 'accounts', label: 'Accounts', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.Verst.lighter,
    color: theme.palette.Verst.main,
    height:10
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ":root": {height:10},
  // height: '20px',
  color: theme.palette.Verst.main,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    height: 10,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    
  },
}));

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     height: 10
//   }
// }))(TableRow);

export default function JasmineGroups() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { jasminGroups, clients:stateClients } = useSelector((state) => state.jasmine);
  // console.log('jasmin Groups', jasminGroups);	

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [clients, setClients] = useState()
  const [groups, setGroups] = useState()

  // useEffect(() => {
  //   dispatch(getProducts())
  // }, [dispatch])

  useEffect(() => {
    dispatch(getGroups());
    // console.log(filteredProducts, 'filteredProducts');
    // console.log(productList, 'productList');
  }, [dispatch]);

//  const handleAddGroup = () => {
//   dispatch(createGroup());
//  }

  useEffect(() => {
    if (jasminGroups?.length) {
      setProductList(jasminGroups);
    }
  }, [jasminGroups]);

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

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    // console.log(deleteProduct);
    setSelected([]);
    setProductList(deleteProduct);
  };

  const handleDeleteProducts = (selected) => {
    const deleteProducts = productList.filter((product) => !selected.includes(product.name));
    setSelected([]);
    setProductList(deleteProducts);
    // console.log("list",deleteProducts)
  };

  const handleDeleteGroup = (groupId) => {
    dispatch(deleteGroup(groupId));
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);


  const isNotFound = !filteredProducts.length && Boolean(filterName);

  return (
    <Page title="Jasmin Groups">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Jasmin Groups"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Jasmin',
              href: PATH_DASHBOARD.jasmin.root,
            },
            { name: 'Jasmin Groups' },
          ]}
        />

        <Card>
          <GroupsToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{minwidth:650}} size='small'>
                <GroupsListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody sx={{height:'10px'}}>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {  groupId, userId, client,accountsCount, groupName} = row;

                    const isItemSelected = selected.indexOf(userId) !== -1;

                    return (
                      <StyledTableRow
                        hover
                        key={groupId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        className='table-row'
                        sx={{height:'10px'}}
                      >
                        <StyledTableCell>
                          {/* <Checkbox checked={isItemSelected} onClick={() => handleClick(userId)} /> */}
                        </StyledTableCell>
                        <StyledTableCell >{client?.clientName} - {client?.contactFname}</StyledTableCell>
                        <StyledTableCell >{groupName}</StyledTableCell>
                        <StyledTableCell>{accountsCount}</StyledTableCell>
                        <StyledTableCell align="right">
                          <GroupsMoreMenu productName={groupName} 
                          onDelete={() => handleDeleteGroup(groupId)} 

                          />
                        </StyledTableCell>
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

function applySortFilter(jasminGroups, comparator, query) {
  const stabilizedThis = jasminGroups.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return jasminGroups.filter((group) => group.client?.clientName.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
  }

  return stabilizedThis.map((el) => el[0]);
}