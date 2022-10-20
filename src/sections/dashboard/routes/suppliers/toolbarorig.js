import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button, ButtonGroup, Divider, FormControl, IconButton, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Toolbar,
  Tooltip, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import {  } from '@mui/material';
// components
import { getClients } from '../../../../redux/slices/jasmine';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { createSuppliers } from '../../../../redux/slices/routes';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

SuppliersToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '70%',
  position: 'absolute',
  top: '50%',
  // bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflow: 'scroll',
};

const accounts = ['Verst', 'Mobipesa', 'Fast'];

export default function SuppliersToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.routes);
  const { clients } = useSelector((state) => state.jasmine);
  // console.log(clients, "clients")
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
    <Box>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: isLight ? 'primary.main' : 'text.primary',
            bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <InputStyle
            stretchStart={240}
            value={filterName}
            onChange={(event) => onFilterName(event.target.value)}
            placeholder="Search suppliers..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteProducts}>
              <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>{/* <Iconify icon={'ic:round-filter-list'} /> */}</IconButton>
          </Tooltip>
        )}

        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button>Copy</Button>
            <Button>CSV</Button>
            <Button>Excel</Button>
            <Button>PDF</Button>
            <Button>Print</Button>
          </ButtonGroup>
        </Box> */}

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
              <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  New Supplier
                </Typography>
              
              <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
              </Stack>
                <Typography variant="subtitle2" sx={{ my: 1 }}>
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
      </RootStyle>
      <Divider />
      {/* <Stack direction="row" sx={{p:2}}> */}
      {/* <RootStyle> */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}> */}
      {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
      {/* <Typography variant="body2" sx={{}}>
            {' '}
            Show{' '}
          </Typography> */}
      {/* <FormControl sx={{ m: 1, minWidth: 120, height:'100%' }} size="small">
            <Select value={groups} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">
                <em>20</em>
              </MenuItem>
              <MenuItem value={10}>50</MenuItem>
              <MenuItem value={20}>100</MenuItem>
              <MenuItem value={30}>200</MenuItem>
            </Select>
          </FormControl> */}
      {/* <Typography variant="body2"> entries </Typography> */}
      {/* </Box> */}

      {/* </Box> */}
      {/* </RootStyle> */}
    </Box>
    // <Stack>
    // <RootStyle
    //   sx={{
    //     ...(numSelected > 0 && {
    //       color: isLight ? 'primary.main' : 'text.primary',
    //       bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
    //     }),
    //   }}
    // >
    //   {numSelected > 0 ? (
    //     <Typography component="div" variant="subtitle1">
    //       {numSelected} selected
    //     </Typography>
    //   ) : (
    //     <InputStyle
    //       stretchStart={240}
    //       value={filterName}
    //       onChange={(event) => onFilterName(event.target.value)}
    //       placeholder="Search groups..."
    //       size="small"
    //       InputProps={{
    //         startAdornment: (
    //           <InputAdornment position="start">
    //             {/* <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   )}

    //   {numSelected > 0 ? (
    //     <Tooltip title="Delete">
    //       <IconButton onClick={onDeleteProducts}>
    //         <Iconify icon={'eva:trash-2-outline'} />
    //       </IconButton>
    //     </Tooltip>
    //   ) : (
    //     <Tooltip title="Filter list">
    //       <IconButton>
    //         {/* <Iconify icon={'ic:round-filter-list'} /> */}
    //       </IconButton>
    //     </Tooltip>
    //   )}

    //   <Stack sx={{ display: 'flex', justifyContent:'flex-end'}} direction="row" spacing={2}>
    //     <Box>
    //       <FormControl variant="outlined" style={{ minWidth:'25ch' }} size="small">
    //         <Select>
    //           {accounts.map((account) => (
    //             <MenuItem key={account} value={account}>
    //               {account}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </Box>
    //     <Box>
    //       <TextField placeholder="enter group name" sx={{ minWidth: '20ch' }} size="small" />
    //     </Box>
    //     <Box>
    //       <Button variant="contained" color="primary" onClick={handleOpen}>
    //         Add Group
    //       </Button>
    //     </Box>
    //   </Stack>
    // </RootStyle>
    // <Divider sx={{mb:2}}/>
    //   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end', mb:2, mr:4 }}>
    //       <ButtonGroup variant="outlined" aria-label="outlined primary button group">
    //         <Button>Copy</Button>
    //         <Button>CSV</Button>
    //         <Button>Excel</Button>
    //         <Button>PDF</Button>
    //         <Button>Print</Button>
    //       </ButtonGroup>
    //     </Box>
    //     </Stack>
  );
}
