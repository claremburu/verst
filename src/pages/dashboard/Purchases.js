import {
  Box,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import { styled, useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { getGroups } from '../../redux/slices/jasmine';
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

import {
  PurchasesMoreMenu, 
  PurchasesListHead,
   PurchasesToolbar,
} from '../../sections/dashboard/purchases';
import { getPurchases, createPurchase } from '../../redux/slices/campaigns';

const TABLE_HEAD = [
  { id: 'owner', label: 'Owner', alignRight: false },
  // { id: 'smpp username', label: 'SMPP Username', alignRight: false },
  { id: 'account type', label: 'Account Type', alignRight: false },
  { id: 'purchase value', label: 'Purchase Value', alignRight: false },
  { id: 'rate', label: 'Message Rate', alignRight: false },
  { id: 'payment type', label: 'Payment Type', alignRight: false },
  { id: 'amount', label: 'Payment Amount', alignRight: false },
  { id: 'currency', label: 'Currency', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
  // { id: 'balance', label: 'Balance', alignRight: true },
  // { id: 'last-activity', label: 'Last Activity', alignRight: true },

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

export default function RouteFilters() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { purchases } = useSelector((state) => state.campaigns);
  console.log('purchases', purchases);
  // const { purchases } = useSelector((state) => state.campaigns);
  // console.log('products', products);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [orderBy, setOrderBy] = useState('createdAt');


  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  useEffect(() => {
    if (purchases?.length) {
      setProductList(purchases);
    }
  }, [purchases]);

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
    setSelected([]);
    setProductList(deleteProduct);
  };

  const handleDeleteProducts = (selected) => {
    const deleteProducts = productList.filter((product) => !selected.includes(product.name));
    setSelected([]);
    setProductList(deleteProducts);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredProducts.length && Boolean(filterName);

  return (
    <Page title="Purchases">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Purchases"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Purchases',
              href: PATH_DASHBOARD.purchases.root,
            },
            // { name: 'Purchases' },
          ]}
        />

        <Card>
          <PurchasesToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <PurchasesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { purchaseId, clientNames, smppUsername, purchaseAccountType, purchaseValue, messageRate, paymentType, paymentAmount, paymentCurrency } = row;

                    const isItemSelected = selected.indexOf(purchaseId) !== -1;

                    return (
                      <StyledTableRow
                        hover
                        key={purchaseId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(purchaseId)} />
                        </StyledTableCell>
                        <StyledTableCell style={{ minWidth: 160 }}>{clientNames}</StyledTableCell>
                        {/* <StyledTableCell>{smppUsername}</StyledTableCell> */}
                        <StyledTableCell>{purchaseAccountType}</StyledTableCell>
                        <StyledTableCell>{purchaseValue}</StyledTableCell>
                        <StyledTableCell>{messageRate}</StyledTableCell>
                        <StyledTableCell>{paymentType}</StyledTableCell>
                        <StyledTableCell>{paymentAmount}</StyledTableCell>
                        <StyledTableCell>{paymentCurrency}</StyledTableCell>
                        <StyledTableCell align="right">
                          <PurchasesMoreMenu userData={purchaseId} onDelete={() => handleDeleteProduct(purchaseId)} />
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

function applySortFilter(purchases, comparator, query) {
  const stabilizedThis = purchases.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return purchases.filter((purchase) => purchase.clientNames.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}

// // import { useSpring, animated } from 'react-spring/web.cjs';
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Card,
//   Divider,
//   FormControl,
//   MenuItem,
//   Modal,
//   OutlinedInput,
//   Paper,
//   Select,
//   Table,
//   TableCell,
//   TableContainer,
//   Typography,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loadJasmineGroupsThunk } from '../../../redux/slices/jasmineSlice';

// function GroupsTable(owner, group, accounts, action) {
//   return { owner, group, accounts, action };
// }

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function JasminGroups() {
//   const [groups, setGroups] = useState();
//   const [open, setOpen] = useState(false);

//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     setGroups(event.target.value);
//   };

//   const handleOpen = () => setOpen(true);

//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     // dispatch(loadJasmineGroupsThunk());
//   }, [dispatch]);

//   return (
//     <>
//       <Card sx={{ p: 2 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             mb: 1,
//           }}
//         >
//           <Box>
//             <Typography variant="h6">SMPP Groups</Typography>
//           </Box>
//           <Box>
//             <FormControl
//               sx={{
//                 minWidth: 120,
//                 // innerHeight : '25%'
//               }}
//               size="small"
//             >
//               <Select
//                 value={groups}
//                 onChange={handleChange}
//                 displayEmpty
//                 inputProps={{ 'aria-label': 'Without label' }}
//               >
//                 <MenuItem value="">
//                   <em>Verst Media LTD</em>
//                 </MenuItem>
//                 <MenuItem value={10}>Mobipesa</MenuItem>
//                 {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
//                 <MenuItem value={30}>Fast SMS-fast</MenuItem>
//                 <MenuItem value={40}>Test Company</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl sx={{ width: '25ch', mx: 1 }} size="small">
//               <OutlinedInput placeholder="Group Name" />
//             </FormControl>
//             <Button variant="contained" onClick={handleOpen}>
//               Add Group
//             </Button>
//             <Modal
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                   Text in a modal
//                 </Typography>
//                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                   Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                 </Typography>
//               </Box>
//             </Modal>
//           </Box>
//         </Box>

//         <Divider />

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="p" sx={{}}>
//               {' '}
//               Show{' '}
//             </Typography>
//             <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//               <Select
//                 value={groups}
//                 onChange={handleChange}
//                 displayEmpty
//                 inputProps={{ 'aria-label': 'Without label' }}
//               >
//                 <MenuItem value="">
//                   <em>20</em>
//                 </MenuItem>
//                 <MenuItem value={10}>50</MenuItem>
//                 <MenuItem value={20}>100</MenuItem>
//                 <MenuItem value={30}>200</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="p"> entries </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography sx={{}}>Search:</Typography>
//             <FormControl sx={{ width: '15ch', mx: 1 }}>
//               <OutlinedInput placeholder="Please enter search term" size="small" />
//               {/* <MyFormHelperText /> */}
//             </FormControl>
//             <ButtonGroup variant="outlined" aria-label="outlined primary button group">
//               <Button>Copy</Button>
//               <Button>CSV</Button>
//               <Button>Excel</Button>
//               <Button>PDF</Button>
//               <Button>Print</Button>
//             </ButtonGroup>
//           </Box>
//         </Box>

//         <Typography>Showing 1 of 1 entries</Typography>

//         <TableContainer component={Paper}>
//           <Table aria-label="collapsible table">
//             <TableCell>owner</TableCell>
//             <TableCell>group</TableCell>
//             <TableCell>accounts</TableCell>
//             <TableCell>action</TableCell>
//           </Table>
//         </TableContainer>
//       </Card>
//     </>
//   );
// }
