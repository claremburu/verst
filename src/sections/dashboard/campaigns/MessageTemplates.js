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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Stack,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { createMessageTemplate } from '../../../redux/slices/campaigns';
import { getClients } from '../../../redux/slices/jasmine';

const tableHead = ['Client', 'Template', 'Text', 'Created', 'Times/Last Used', 'Action'];

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

export default function MessageTemplates() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageTemplates } = useSelector((state) => state.campaigns);
  const { clients } = useSelector((state) => state.jasmine);
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);

  const [stateClients, setStateClients] = useState();
  const [templateName, setTemplateName] = useState();
  const [templateBody, setTemplateBody] = useState();
  const [clientName, setClientName] = useState();

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleChangeClients = (event) => {
    setStateClients(event.target.value);
  };

 const handleChangeClientName = (event) => {
    setClientName(event.target.value);
 }

 const handleChangeTemplateName = (event) => {
    setTemplateName(event.target.value);
 }

  const handleChangeTemplateBody = (event) => {
    setTemplateBody(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMessageTemplates = () => {
    dispatch(
      createMessageTemplate({
        client_id: stateClients,
        template_name: templateName,
        template_body: templateBody,
        
      })
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

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
            <Typography variant="h6">Message Templates</Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleOpen}>
              New Message Template
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              // sx={{ overflow: 'scroll', height: '80%' }}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  Message Templates
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  All fields are <b>mandatory</b> .
                </Typography>

                {/* <Typography variant="subtitle2" sx={{ my: 1 }}>
                  Template Name
                </Typography> */}
                <Typography variant="subtitle2" sx={{ my: 1 }}>Client Name</Typography>
                <FormControl sx={{ minWidth: '100%', my:1 }} size="small">
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
                <Typography sx={{ my: 1 }} variant="subtitle2">
                  {' '}
                  Template Name
                </Typography>
                <TextField placeholder="e.g weekly 20% weekend promo" size="small" fullWidth value={templateName} onChange={handleChangeTemplateName}/>

                <Typography sx={{ my: 1 }} variant="subtitle2">
                  {' '}
                  Message Template Text: (640 chars max, 160 per sms)
                </Typography>
                <TextField placeholder="Write your message here" size="small" fullWidth minRows={4} multiline value={templateBody} onChange={handleChangeTemplateBody}/>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    sx={{ backgroundColor: theme.palette.Verst.orange }}
                    onClick={handleMessageTemplates}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
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
        </Typography> */}

        {/* <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {tableHead.map((table)=> {return<TableCell>{table}</TableCell>})} */}
        {/* <TableCell>group</TableCell>
            <TableCell>accounts</TableCell>
            <TableCell>action</TableCell> */}
        {/* </Table>
        </TableContainer> */}
      </Card>
    </>
  );
}
