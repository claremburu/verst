import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  FormControl,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { createUser, getClients, getGroups } from '../../../redux/slices/jasmine';
import { useDispatch, useSelector } from '../../../redux/store';

// const tableHead = ['Owner', 'Name', 'Group', 'Active Binds', 'Status', 'Balance', 'Last Activity', 'action'];

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

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action };
}

export default function JasminUsers({ numSelected, filterName, onFilterName, onDeleteProducts}) {
  const theme = useTheme();
  const dispatch = useDispatch();
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
    <>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">SMPP Groups</Typography>
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
                    <MenuItem value={clientId}>{clientName} - {contactFname}</MenuItem>
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

        <Divider my={2} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="p" sx={{}}>
              {' '}
              Show{' '}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
          </Box> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end' }}>
            {/* <Typography sx={{}}>Search:</Typography> */}
            {/* <FormControl sx={{ width: '15ch', mx: 1 }}>
              <OutlinedInput placeholder="Please enter search term" size="small" />
              {/* <MyFormHelperText /> */}
            {/* </FormControl>  */}
            {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group"> */}
              {/* <Button>Copy</Button>
              <Button>CSV</Button>
              <Button>Excel</Button>
              <Button>PDF</Button> */}
              {/* <PDFDownloadLink
                document={<InvoicePDF invoice={invoice} />}
                fileName={`JasminUsers-${new Date().toLocaleDateString()}.pdf`}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <LoadingButton
                    size="small"
                    loading={loading}
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<Iconify icon={'eva:download-fill'} />}
                  >
                    Download
                  </LoadingButton>
                )}
              </PDFDownloadLink> */}
              {/* <Button>Printx</Button>
            </ButtonGroup> */}
          </Box>
        </Box>

        {/* <Typography>Showing 1 of 1 entries</Typography> */}

        <TableContainer component={Paper}>
          {/* <Table aria-label="collapsible table">
            {tableHead.map((table) => (
              <TableCell>{table}</TableCell>
            ))}
          </Table> */}
        </TableContainer>
      </Card>
    </>
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

function applySortFilter(smppProviders, comparator, query) {
  const stabilizedThis = smppProviders.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return smppProviders.filter((provider) => provider.accountName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}

