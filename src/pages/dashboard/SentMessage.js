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
import { useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { getSentMessages, listSmsToDeliver } from '../../redux/slices/messaging';
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

import { SentMessages } from '../../sections/dashboard/messaging';

import {
  ProductMoreMenu,
  ProductListHead,
  ProductListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';

const TABLE_HEAD = [
  { id: 'account', label: 'Account', alignRight: false },
  // { id: 'sent', label: 'Sent', alignRight: false },
  { id: 'source', label: 'Source', alignRight: false },
  { id: 'destination', label: 'Destination', alignRight: true },
  { id: 'status', label: 'Status', alignRight: true },
  { id: 'message', label: 'Message', alignRight: true },
  { id: 'smscid', label: 'SMSCID', alignRight: true },
  { id: 'action', label: 'Action', alignRight: true },

  // { id: 'balance', label: 'Balance', alignRight: true },
  // { id: 'last-activity', label: 'Last Activity', alignRight: true },
  // { id: 'action', label: 'Action', alignRight: true },
];

export default function SentMessage() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sentMessages } = useSelector((state) => state.messaging);
  // console.log('products', sentMessages);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getSentMessages());
  }, [dispatch]);

  useEffect(() => {
    if (sentMessages?.length) {
      setProductList(sentMessages);
    }
  }, [sentMessages]);

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
    <Page title="Sent Messages">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Sent Messages"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Messaging',
              href: PATH_DASHBOARD.routes.root,
            },
            { name: 'Sent Message' },
          ]}
        />

        <Card>
          {/* <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          /> */}

          {/* <SentMessages /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <ProductListHead
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
                    const { messageId, account, source, dest, status, messsage, smscid } = row;

                    const isItemSelected = selected.indexOf(messageId) !== -1;

                    return (
                      <TableRow
                        hover
                        key={messageId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(messageId)} />
                        </TableCell>
                        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Image
                            disabledEffect
                            alt={name}
                            src={cover}
                            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell> */}
                        {/* <TableCell style={{ minWidth: 160 }}>{client?.clientName}</TableCell> */}
                        {/* <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (inventoryType === 'out_of_stock' && 'error') ||
                              (inventoryType === 'low_stock' && 'warning') ||
                              'success'
                            }
                          >
                            {inventoryType ? sentenceCase(inventoryType) : ''}
                          </Label>
                        </TableCell> */}
                        <TableCell>{account}</TableCell>
                        <TableCell>{source}</TableCell>
                        <TableCell>{dest}</TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>{messsage}</TableCell>
                        <TableCell>{smscid}</TableCell>
                        <TableCell align="right">
                          <ProductMoreMenu userData={messageId} onDelete={() => handleDeleteProduct(messageId)} />
                        </TableCell>
                      </TableRow>
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
            rowsPerPageOptions={[5, 10, 25]}
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
