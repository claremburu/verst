import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';

// material
import {
  Card,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Opacity } from '@mui/icons-material';

Client.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

const style = {
  height: '90%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  borderRadius: '6px',
  // backgroundColor: 'theme.palette.action.hover',
  // backgroundColor: 'theme.palette.Verst.gray',
  // color: 'theme.palette.Verst.white',
  // Opacity: '0.9',
};

const users = ['Administrator', 'Reseller', 'Client'];

const accounts = ['Messages', 'Monetary Balance'];

const currency = ['CAD', 'USD', 'EUR'];

export default function Client({ title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [range, setRange] = useState('');

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <>
      <Card
        sx={{
          mt: 2,
          p: 2,
        }}
      >
        {/* <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Box
            sx={{
              // mt: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4">Clients</Typography>
          </Box>

          <Box>
            <Button variant="contained" onClick={handleOpen}>
              New Clients
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  New clients
                </Typography>

                <Typography variant="p" sx={{ my: 1 }}>
                  Enter all the <b>mandatory</b> fields below. You may go in and update their profile after.
                </Typography>

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Type
                </Typography>
                <FormControl size="small" fullWidth>
                  <Select
                    value={range}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {users.map((user) => (
                      <MenuItem value={user}>{user}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField placeholder="eg. thank you for weekly discount promo" size="small" fullWidth /> */}
                {/* <Stack>
                  <Typography variant='subtitle2' sx={{ my: 1 }}>When inbound message:</Typography>

                  <FormControlLabel control={<Checkbox defaultChecked />} label="Does Not" />

                </Stack> */}

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Company
                </Typography>
                <TextField placeholder="Company Name" size="small" fullWidth />

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Email Address
                </Typography>
                <TextField placeholder="Email Address" size="small" fullWidth />

                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      First Name
                    </Typography>
                    <TextField placeholder="Contact First Name" size="small" fullWidth />
                  </Box>

                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      Last Name
                    </Typography>
                    <TextField placeholder="Contact Last Name" size="small" fullWidth />
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ minWidth: '100%' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      Password
                    </Typography>
                    <TextField placeholder="*****" size="small" fullWidth />
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      Confirm Password
                    </Typography>
                    <TextField placeholder="*****" size="small" fullWidth />
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      Account Type
                    </Typography>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={range}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {accounts.map((account) => (
                          <MenuItem value={account}>{account}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2" sx={{ my: 1 }}>
                      Default Currency
                    </Typography>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={range}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {currency.map((current) => (
                          <MenuItem value={current}>{current}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>

                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    sx={{ backgroundColor: theme.palette.Verst.orange }}
                  >
                    Save
                  </Button>
                </Stack>

                {/* <Typography sx={{ my: 1 }} variant="subtitle2">Select Filter Type</Typography> */}
              </Box>
            </Modal>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="p" sx={{}}>
              {' '}
              Show{' '}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select value={range} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                  <em>20</em>
                </MenuItem>
                <MenuItem value={10}>50</MenuItem>
                <MenuItem value={20}>100</MenuItem>
                <MenuItem value={30}>200</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="p"> entries </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{}}>Search:</Typography>
            <FormControl sx={{ width: '15ch', mx: 1 }}>
              <OutlinedInput placeholder="Please enter search term" size="small" />
              {/* <MyFormHelperText /> */}
            </FormControl>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button>Copy</Button>
              <Button>CSV</Button>
              <Button>Excel</Button>
              <Button>PDF</Button>
              <Button>Print</Button>
            </ButtonGroup>
          </Box>
        </Box>
        {/* <Box spacing={2} sx={{
                        display: 'flex',
                        // py:2,
                        mt: 2,
                    }}>
                    </Box> */}
        {/* </Box> */}
        <Divider sx={{ my: 2 }} />
        {/* <Typography>
          Show 1 of 12 entries
        </Typography> */}
        {/* <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="p">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Account
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Purchased By
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Messages
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Rate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Amount
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Currency
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">
                    Payment Method
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              // count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /><TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              // count={rows.length}
              // rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* <TablePagination>
                        </TablePagination> */}
        {/* </Table>
        </TableContainer> */}
      </Card>
    </>
  );
}
