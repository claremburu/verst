import PropTypes, { number } from 'prop-types';
import React, { useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import {  } from '@mui/material';
// components
import { useDispatch } from 'react-redux';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import { createClient } from '../../../redux/slices/clients';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ClientToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: 'auto',
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

const users = ['Administrator', 'Reseller', 'Client'];

// const accounts = ['Messages', 'Monetary Balance'];

const currency = ['CAD', 'USD', 'EUR'];

export default function ClientToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const isLight = theme.palette.mode === 'light';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [range, setRange] = useState('');

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleBrandName = (event) => {
    setBrandName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleCreateClient = () => {
    dispatch(
      createClient({
        clientAccessLevel: type,
        clientBrandName: brandName,
        clientEmail: email,
        contactFname: firstName,
        contactLname: lastName,
        clientPassword: password,
        contactNumber: number,
        clientName: `${firstName} ${lastName}`,
      })
    );
    handleClose();
  };

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
            placeholder="Search clients..."
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

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button>Copy</Button>
            <Button>CSV</Button>
            <Button>Excel</Button>
            <Button>PDF</Button>
            <Button>Print</Button>
          </ButtonGroup> */}
        </Box>

        <Box>
          <Button variant="contained" onClick={handleOpen}>
            New Client
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
                  New Client
                </Typography>
              
              <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
              </Stack>

              <Typography variant="p" sx={{ my: 1 }}>
                Enter all the <b>mandatory</b> fields below. You may go in and update their profile after.
              </Typography>

              <Typography variant="subtitle2" sx={{ my: 1 }}>
                Account Type
              </Typography>
              <TextField
                size="small"
                sx={{ width: '100%' }}
                value={type}
                onChange={handleType}
                placeholder="eg. ADMINISTRATOR, RESELLER"
              />
              {/* <FormControl sx={{ minWidth: '25ch' }} size="small">
                <Select
                  value={type}
                  onChange={handleType}
                  // displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {clientAccessLevel?.map(({ clientId, clientName, contactFname }) => (
                    <MenuItem value={clientId}>
                      {clientName} - {contactFname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              {/* <TextField placeholder="eg. thank you for weekly discount promo" size="small" fullWidth /> */}
              {/* <Stack>
                  <Typography variant='subtitle2' sx={{ my: 1 }}>When inbound message:</Typography>

                  <FormControlLabel control={<Checkbox defaultChecked />} label="Does Not" />

                </Stack> */}

              <Typography variant="subtitle2" sx={{ my: 1 }}>
                Company
              </Typography>
              <TextField
                placeholder="Company Name"
                size="small"
                fullWidth
                value={brandName}
                onChange={handleBrandName}
              />

              <Typography variant="subtitle2" sx={{ my: 1 }}>
                Email Address
              </Typography>
              <TextField placeholder="Email Address" size="small" fullWidth value={email} onChange={handleEmail} />

              <Typography variant="subtitle2" sx={{ my: 1 }}>
                Phone Number
              </Typography>
              <TextField placeholder="254700000000" size="small" fullWidth value={number} onChange={handleNumber}/>

              <Stack direction="row" spacing={2}>
                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle2" sx={{ my: 1 }}>
                    First Name
                  </Typography>
                  <TextField
                    placeholder="Contact First Name"
                    size="small"
                    fullWidth
                    value={firstName}
                    onChange={handleFirstName}
                  />
                </Box>

                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle2" sx={{ my: 1 }}>
                    Last Name
                  </Typography>
                  <TextField
                    placeholder="Contact Last Name"
                    size="small"
                    fullWidth
                    value={lastName}
                    onChange={handleLastName}
                  />
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ minWidth: '100%' }}>
                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle2" sx={{ my: 1 }}>
                    Password
                  </Typography>
                  <TextField
                    placeholder="*****"
                    size="small"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePassword}
                  />
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle2" sx={{ my: 1 }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    placeholder="*****"
                    size="small"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePassword}
                  />
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                {/* <Box sx={{ width: '50%' }}>
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
                </Box> */}

                {/* <Box sx={{ width: '50%' }}>
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
                </Box> */}
              </Stack>

              <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  sx={{ backgroundColor: theme.palette.Verst.orange }}
                  onClick={handleCreateClient}
                >
                  Save
                </Button>
              </Stack>

              {/* <Typography sx={{ my: 1 }} variant="subtitle2">Select Filter Type</Typography> */}
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
