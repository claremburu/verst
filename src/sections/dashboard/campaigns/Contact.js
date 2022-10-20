import React, { useState, useEffect } from 'react';
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
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getClients } from '../../../redux/slices/jasmine';
import { createContact, createContactGroups, getContactGroups } from '../../../redux/slices/campaigns';

const tableHead = ['Clients', 'First Name', 'Last Name', 'Cell#', 'Groups', 'Created', 'Action'];

const style = {
  height: 'auto',
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
  borderRadius: '5px',
};

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action };
}

export default function Contact() {
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
            <Typography variant="h6">Contacts</Typography>
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
                  <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ justifyContent: 'center' }}>
                    Add Contact
                  </Typography>
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

                  <Typography sx={{ my: 1 }} variant="subtitle2">Choose Group</Typography>

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
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* <Typography variant="p">
            Set up automatic responses for your inbound campaigns here.
            You can create multiple auto responses for different keywords.
          </Typography> */}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          Showing 1 of 1 entries
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {tableHead.map((table)=> {return<TableCell>{table}</TableCell>})}
            {/* <TableCell>group</TableCell>
            <TableCell>accounts</TableCell>
            <TableCell>action</TableCell> */}
        {/* </Table>
        </TableContainer> */}
      </Card>
    </>
  );
}
