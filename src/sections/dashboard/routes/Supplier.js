import React, { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';

import {
  Typography,
  Container,
  Card,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  OutlinedInput,
  Divider,
  ButtonGroup,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TbleHead,
  TableRow,
  Paper,
  TableHead,
  Modal,
  Stack,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { useDispatch, useSelector } from 'react-redux';
import { createSuppliers, getClients } from '../../../redux/slices/routes';

const tHead = [
  'Supplier ID',
  'Supplier Name',
  'Preferred',
  'Balance URL',
  'Credit Limit',
  'Balance',
  'Bucket',
  'Action',
];

const accounts = ['Verst', 'Mobipesa', 'Fast'];

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
  borderRadius: '5px',
  p: 4,
  overflow: 'scroll',
};

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action };
}

export default function Supplier() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { clients, suppliers } = useSelector((state) => state.routes);
  const [stateClients, setStateClients] = useState('');
  const [groups, setGroups] = useState('');
  const [open, setOpen] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [preferred, setPreferred] = useState('');
  const [balanceUrl, setBalanceUrl] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [balance, setBalance] = useState(1);
  const [bucket, setBucket] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleSupplierName = (event) => {
    setSupplierName(event.target.value);
  };

  const handleBucket = (event) => {
    setBucket(event.target.value);
  };

  const handleBalanceUrl = (event) => {
    setBalanceUrl(event.target.value);
  };

  const handleCreditLimit = (event) => {
    setCreditLimit(event.target.value);
  };

  const handleBalance = (event) => {
    setBalance(event.target.value);
  };

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleSubmitSupplier = () => {
    dispatch(
      createSuppliers({
        clientId: stateClients,
        supplierName,
        bucket,
        balanceUrl,
        creditLimit,
        balance,
        // filterName: filtername,
        // filterType,
        // filterValue
      })
    );
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Box>
            <Typography variant="h6">Suppliers</Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleOpen}>
              New Supplier
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  New Supplier
                </Typography>
                <Typography variant="h6" sx={{ my: 1 }}>
                  Account Owner
                </Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={stateClients}
                    onChange={handleClients}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {clients?.map(({ clientId, clientName, contactFname }) => (
                      <MenuItem value={clientId}>
                        {clientName} - {contactFname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Supplier Name
                </Typography>
                <TextField
                  placeholder="Supplier Name"
                  size="small"
                  fullWidth
                  value={supplierName}
                  onChange={handleSupplierName}
                />

                {/* <Typography variant='h6' sx={{ my: 1 }}>Preferred</Typography>
                <TextField placeholder="Preferred" size="small" fullWidth /> */}

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Balance URL
                </Typography>
                <TextField
                  placeholder="Balance URL"
                  size="small"
                  fullWidth
                  value={balanceUrl}
                  onChange={handleBalanceUrl}
                />

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Credit Limit
                </Typography>
                <TextField
                  placeholder="Credit Limit"
                  size="small"
                  fullWidth
                  value={creditLimit}
                  onChange={handleCreditLimit}
                />

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Balance
                </Typography>
                <TextField placeholder="Balance" size="small" fullWidth value={balance} onChange={handleBalance} />

                <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Bucket
                </Typography>
                <TextField placeholder="Bucket" size="small" fullWidth value={bucket} onChange={handleBucket} />

                {/* <Typography sx={{ my: 1 }} variant="subtitle2">Select Filter Type</Typography> */}

                <Divider sx={{ mt: 2 }} />
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    sx={{ backgroundColor: theme.palette.Verst.orange }}
                    onClick={handleSubmitSupplier}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="p" sx={{}}>
              {' '}
              Show{' '}
            </Typography>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
              }}
              size="small"
            >
              <Select
                value={groups}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
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

        {/* <Typography>
          Showing 1 of 4 entries
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {tHead.map(table => <TableCell>{table}</TableCell>)}
          </Table>
        </TableContainer> */}
      </Card>
    </>
  );
}
