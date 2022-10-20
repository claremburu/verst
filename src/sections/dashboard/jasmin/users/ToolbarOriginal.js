import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
  Typography,
} from '@mui/material';

// import {  } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { getClients, createProvider, createUser, getGroups } from '../../../../redux/slices/jasmine';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

UsersToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '90%',
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

export default function UsersToolbar({ numSelected, filterName, onFilterName, onDeleteUsers }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients: stateClients, jasminGroups } = useSelector((state) => state.jasmine);

  // console.log(stateClients, 'user clients')

  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState('1');
  const [clients, setClients] = useState('1');
  const [serverName, setServerName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitUser = () => {
    // console.log({
    //   groupId: groups,
    //   clientId: clients,
    //   serverName,
    //   userName,
    //   password,
    // });

    dispatch(
      createUser({
        groupId: groups,
        clientId: clients,
        serverName,
        userName,
        password,
      })
    );
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };
  const handleClients = (event) => {
    setClients(event.target.value);
  };
  const handleServerName = (event) => {
    setServerName(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
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
            placeholder="Search smpp users..."
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
            <IconButton onClick={onDeleteUsers}>
              <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>{/* <Iconify icon={'ic:round-filter-list'} /> */}</IconButton>
          </Tooltip>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {/* <Typography variant="h6">SMPP Groups</Typography> */}
          {/*  */}
          <Button variant="contained" onClick={handleOpen}>
            New Account
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                New SMPP Server Account
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account
                names and usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
              </Typography>

              <Typography variant="h6" sx={{ my: 1 }}>
                Client
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
                <Select
                  value={clients}
                  onChange={handleClients}
                  // displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {stateClients?.map(({ clientId, clientName, contactFname }) => (
                    <MenuItem value={clientId}>
                      {clientName} - {contactFname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="h6" sx={{ my: 1 }}>
                Group
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
                <Select
                  value={groups}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {jasminGroups.map(({ groupId, groupName }) => (
                    <MenuItem value={groupId}>{groupName}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography sx={{ my: 1 }} variant="subtitle2">
                SMPP Server Account Name
              </Typography>
              <TextField
                value={serverName}
                onChange={handleServerName}
                placeholder="Account Name"
                size="small"
                fullWidth
              />

              <Typography sx={{ my: 1 }} variant="subtitle2">
                Username
              </Typography>
              <TextField value={userName} onChange={handleUserName} placeholder="Username" size="small" fullWidth />

              <Typography sx={{ my: 1 }} variant="subtitle2">
                Password
              </Typography>
              <TextField
                value={password}
                onChange={handlePassword}
                type={'password'}
                placeholder="******"
                size="small"
                fullWidth
              />

              <Typography sx={{ my: 1 }} variant="subtitle2">
                Confirm Password
              </Typography>
              <TextField
                placeholder="******"
                size="small"
                type={'password'}
                fullWidth
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                <Button variant="contained" startIcon={<CancelIcon />} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitUser}
                  variant="contained"
                  endIcon={<SaveIcon />}
                  sx={{ backgroundColor: theme.palette.Verst.orange }}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Box>
      </RootStyle>
      <Divider />
    </Box>
  );
}
