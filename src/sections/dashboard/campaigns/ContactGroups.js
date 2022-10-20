import React, { useState, useEffect } from 'react';
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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createContactGroups } from '../../../redux/slices/campaigns';
import { getClients, getGroups } from '../../../redux/slices/jasmine';

const accounts = ['mobipesa', 'fast sms', 'Verst'];

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action };
}

export default function ContactGroups() {
  const dispatch = useDispatch();
  const { contactGroups } = useSelector((state) => state.campaigns);
  const { clients } = useSelector((state) => state.jasmine);

  const [groups, setGroups] = useState([]);
  const [stateClients, setStateClients] = useState('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [contacts, setContacts] = useState('');
  const [parent, setParent] = useState('');
  // const [groups, setGroups] = useState()

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleChangeClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeContacts = (event) => {
    setContacts(event.target.value);
  };

  const handleSubmitContactGroups = () => {
    // console.log({
    //   groupId: groups,
    //   clientId: clients,
    //   serverName,
    //   userName,
    //   password,
    // });

    dispatch(createContactGroups({ groupName, clientId: stateClients, description }));
  };

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
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
          {/* <Box>
            <Typography variant="h6">Contact Groups</Typography>
          </Box> */}
          <FormControl sx={{ minWidth: '25ch' }} size="small">
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
          <TextField placeholder="Group Name..." size="small" value={groupName} onChange={handleChangeGroupName} />
          {/* <TextField
            placeholder="short description..."
            size="small"
            value={description}
            onChange={handleChangeDescription}
          /> */}
          <Box>
            <Button variant="contained" onClick={handleSubmitContactGroups}>
              Add Group
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* <Typography variant="p">
            Set up automatic responses for your inbound campaigns here.
            You can create multiple auto responses for different keywords.
          </Typography> */}

        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
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
            {/* </FormControl>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button>Copy</Button>
              <Button>CSV</Button>
              <Button>Excel</Button>
              <Button>PDF</Button>
              <Button>Print</Button>
            </ButtonGroup>
          </Box>
        </Box>  */}

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
