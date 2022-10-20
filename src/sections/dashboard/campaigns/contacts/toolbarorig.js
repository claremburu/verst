import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button, Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import {  } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { createContact, getContactGroups } from '../../../../redux/slices/campaigns';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { getClients } from '../../../../redux/slices/jasmine';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ContactsToolbar.propTypes = {
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

export default function ContactsToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const dispatch = useDispatch();
  const { contacts, contactGroups } = useSelector((state) => state.campaigns);
  const { clients, jasminGroups } = useSelector((state) => state.jasmine);
  const theme = useTheme();
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState();
  const [stateClients, setStateClients] = useState();
  // const [groups, setGroups] = useState()

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleChangeGroups = (event) => {
    setGroups(event.target.value);
  };

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard/campaigns/import');
  };

  const handleCreateContact = () => {
    dispatch(
      createContact({
        phone,
        clientId: stateClients,
        groupId: groups,
      })
    );
  };

  useEffect(() => {
    dispatch(getClients());
    dispatch(getContactGroups());
  }, []);

  return (
    <Box>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            // color: isLight ? 'primary.main' : 'text.primary',
            // bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
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
            placeholder="Search contacts..."
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

        <Stack direction="row" spacing={2}>
            {/* <Button variant="contained">New Contact</Button> */}
            <Box>
              <Button variant="contained" onClick={handleOpen}>
                New Contact
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // sx={{ overflow: 'scroll', height: '80%' }}
              >
                <Box sx={style}>
                <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  Add Contact
                </Typography>
              
              <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
              </Stack>
                  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  All fields are <b>mandatory</b> .
                </Typography> */}

                  {/* <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Template Name
                </Typography> */}
                <Typography sx={{ my: 1 }} variant="subtitle2">Account Owner</Typography>

                  <FormControl sx={{ minWidth: '100%' }} size="small">
                    <Select
                      value={stateClients}
                      onChange={handleChangeClients}
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

                  <Typography sx={{ my: 1 }} variant="subtitle2">Choose Contact Group</Typography>

                  <FormControl sx={{ minWidth: '100%' }} size="small">
                    <Select
                      value={groups}
                      onChange={handleChangeGroups}
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {contactGroups?.map(({ groupId, groupName }) => (
                        <MenuItem value={groupId}>
                          {groupName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography sx={{ my: 1 }} variant="subtitle2">
                    {' '}
                    Enter Contact Mobile
                  </Typography>
                  <TextField
                    placeholder="e.g 254700000000"
                    size="small"
                    fullWidth
                    value={phone}
                    onChange={handleChangePhone}
                  />

                  {/* <Typography sx={{ my: 1 }} variant="subtitle2">
                  {' '}
                  Message Template Text: (640 chars max, 160 per sms)
                </Typography>
                <TextField placeholder="Host" size="small" fullWidth minRows={4} multiline /> */}
                  <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<SaveIcon />}
                      sx={{ backgroundColor: theme.palette.Verst.orange }}
                      onClick={handleCreateContact}
                    >
                      Add
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            <Button variant="contained" onClick={handleClick}>
              Import Contacts
            </Button>
          </Stack>
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
