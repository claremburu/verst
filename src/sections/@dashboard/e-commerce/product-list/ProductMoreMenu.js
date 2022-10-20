import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// routes
// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import { getClients, getGroups, updateUser } from '../../../../redux/slices/jasmine';

// ----------------------------------------------------------------------

ProductMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  userData: PropTypes.string,
};

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
  p: 4,
  overflow: 'scroll',
  borderRadius: '10px',
};

export default function ProductMoreMenu({ onDelete, productName, userData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { clients: stateClients, jasminGroups } = useSelector((state) => state.jasmine);

  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [groups, setGroups] = useState(userData?.groupId);
  const [clients, setClients] = useState(userData?.clientId);
  const [serverName, setServerName] = useState(userData?.serverName);
  const [userName, setUserName] = useState(userData?.userName);
  const [password, setPassword] = useState(userData?.password);
  const [value, setValue] = useState(userData?.value)
  const [field, setField] = useState(userData?.field)
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmitUser = () => {
    dispatch(updateUser({userId: userData?.userId,
      // value,
      // field
      // groupId: groups,
      // clientId: clients,
      // userId,
      // serverName,
      // userName,
      // password
    }))
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpenModal = (user) => {
    setOpenModal(user);
  };
  const handleCloseModal = () => setOpenModal(null);

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

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => handleOpenModal(userData)}
          // component={RouterLink}
          // to={`${PATH_DASHBOARD.jasmin.root}/product/${paramCase(productName)}/edit`}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Edit
        </MenuItem>
      </MenuPopover>

      <Modal
        open={Boolean(openModal)}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            New SMPP Server Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account names
            and usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
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
              {stateClients?.map(({ clientId, clientName }) => (
                <MenuItem value={clientId}>{clientName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ my: 1 }}>
            Group
          </Typography>
          <FormControl sx={{ minWidth: '100%' }} size="small">
            <Select value={groups} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              {jasminGroups.map(({ groupId, groupName }) => (
                <MenuItem value={groupId}>{groupName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ my: 1 }} variant="subtitle2">
            SMPP Server Account Name
          </Typography>
          <TextField value={serverName} onChange={handleServerName} placeholder="Account Name" size="small" fullWidth />

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

          {/* <Typography sx={{ my: 1 }} variant="subtitle2">
            Group
          </Typography>

          <FormControl sx={{ minWidth: '100%' }} size="small">
            <Select value={groups} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">
                <em>Verst</em>
              </MenuItem>
            </Select>
          </FormControl> */}
          <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
            <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal}>
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
    </>
  );
}
