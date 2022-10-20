import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../components/hook-form';
import { getMessageTemplates, getSenderIds, importContacts } from '../../../redux/slices/campaigns';
import { getClients } from '../../../redux/slices/jasmine';
import { composeMessage, sendMessage } from '../../../redux/slices/messaging';
import MessageListHead from './MessageListHead';
import Iconify from '../../../components/Iconify';
import UploadContacts from './UploadContacts';
// import LengthCalculator from './LengthCalculator';

const tableHead = [
  'Owner',
  'Group Name',
  '#Contacts',
  'Parent',
  'Description',
  'Action',
  'Start Date/Time',
  'Total Cost',
  'Action',
];

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action };
}

const style = {
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  borderRadius: '5px',
};

const TABLE_HEAD = [
  { id: 'country name', label: 'Country Name', alignRight: false },
  { id: 'mccmnc', label: 'MCCMNC', alignRight: false },
  { id: 'cost price', label: 'Cost Price', alignRight: false },
  { id: 'total numbers', label: 'Total Numbers', alignRight: false },
  { id: 'total cost', label: 'Total Cost', alignRight: false },
  // { id: 'gateway id', label: 'Gateway ID', alignRight: false },
  // { id: 'last-activity', label: 'Last Activity', alignRight: true },
  { id: 'error', label: 'Error', alignRight: true },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ':root': { height: 10 },
  // height: '20px',
  // color: theme.palette.Verst.main,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    height: 10,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.Verst.lighter,
    color: theme.palette.Verst.main,
    height: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CampaignComposeMessage({filename}) {
  const theme = useTheme();
  const [groups, setGroups] = useState();
  const [time, setTime] = useState(new Date());
  const bodyRef = useRef();
  const enqueueSnackbar = useSnackbar();

  const { campaigns, senderIds } = useSelector((state) => state.campaigns);
  // console.log('campaigns', campaigns);
  console.log('senderIds', senderIds);
  const { messages } = useSelector((state) => state.messaging);
  // console.log('composeMessage', messages);
  const { messageTemplates } = useSelector((state) => state.campaigns);
  // console.log('messageTemplates', messageTemplates);
  const { clients } = useSelector((state) => state.jasmine);
  console.log('clients', clients);
  const [campaignName, setCampaignName] = useState(`Camp_${Math.floor(new Date().getTime() / 1000)}`);
  const [senderName, setSenderName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [totalSms, setTotalSms] = useState('0');
  const [stateClients, setStateClients] = useState();
  const [smsCount, setSmsCount] = useState(0);
  const [sender, setSender] = useState();
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState();
  const [messageTemplateId, setMessageTemplateId] = useState();
  const [campaignDescription, setCampaignDescription] = useState();
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('asc');
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [words, setWords] = useState(1224);
  const [used, setUsed] = useState(0);
  const [fileExists, setFileExists] = useState();
  const CHARACTER_LIMIT = 1224;
  // const [values, setValues] = useState({
  //   name: '',
  // });
  const [groupIds, setGroupIds] = useState();

  const [textLength, setTextLength] = useState(0);
  const [checked, setChecked] = useState();

  // sender id
  const [senderValue, setSenderValue] = useState();
  const [clientId, setClientId] = useState();
  const [purpose, setPurpose] = useState();
  const [groupOpen, setGroupOpen] = useState();

  // const [senderIds, setSenderIds] = useState();

  // const handleSenderIds = (e) => {
  //   setSenderIds(e.target.value);
  // };

  // const handleChangeWords = (name) => (event) => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  // const handleLeftWords = (name) => (event) => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const count = () => {
    setWords(1224 - bodyRef.current.value.length);
  };

  const handleUsed = () => {
    setUsed(bodyRef.current.value.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleCampaignMessage = (e) => {
    setCampaignMessage(e.target.value);
  };

  const handleSmsCount = (e) => {
    setSmsCount(e.target.value.length);
  };

  const handleCampaignName = (e) => {
    setCampaignName(e.target.value);
  };

  const handleSenderName = (e) => {
    setSenderName(e.target.value);
  };

  const handleTotalSms = (e) => {
    setTotalSms(e.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleGroupClose = () => {
    setGroupOpen(false);
  }

  const handleUploadFromFile = () => {
    navigate('/dashboard/campaigns/import-contacts', { replace: true });
  };

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageTemplate = (e) => {
    setMessageTemplate(e.target.value.templateBody);
    setMessageTemplateId(e.target.value.templateId);
    setMessage(e.target.value.templateBody);
    console.log(e.target.value, 'event');
    handleModalClose();
  };

  const handleCampaignDescription = (e) => {
    setCampaignDescription(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    handleComposeMessage();
  };
  const handleClose = () => setOpen(false);

  const handleSender = (e) => {
    setSender(e.target.value);
  };

  // validate inputs

  const CampaignSchema = Yup.object().shape({
    contacts: Yup.mixed().required('Contacts is required'),
    campaignName: Yup.string().required('Campaign name is required'),
    senderName: Yup.string().required('Sender name is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    contacts: null,
    campaignName: '',
    senderName: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(CampaignSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      //   handleClosePreview();
      if (values.contacts) {
        enqueueSnackbar('Import Success!');
      } else {
        enqueueSnackbar('Import Failed!');
      }

      const bodyFormdata = new FormData();
      bodyFormdata.append('contacts', values.contacts);
      // bodyFormdata.append('clientId', stateClients);
      // bodyFormdata.append('groupId', stateGroups);

      dispatch(importContacts(bodyFormdata));
      // dispatch(composeMessage());
      // console.log('submit', {
      //   // clientId: stateClients,
      //   // groupId: stateGroups,
      //   contacts: values.contacts
      // });

      // navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComposeMessage = () => {
    const bodyFormdata = new FormData();
    bodyFormdata.append('message', message);
    bodyFormdata.append('senderName', senderName);
    bodyFormdata.append('campaignName', campaignName);
    bodyFormdata.append('campaignMessage', campaignMessage);
    bodyFormdata.append('file', file);
    bodyFormdata.append('fileExists', fileExists);
    bodyFormdata.append('groupIds', groupIds);
    bodyFormdata.append('messageTemplateId', messageTemplateId);
    bodyFormdata.append('senderName', senderName);

    console.log('bodyFormdata', {
      messageTemplate,
      senderName,
      campaignName,
      campaignMessage,
      file,
      groupIds,
      messageTemplateId,
    });

    dispatch(composeMessage(bodyFormdata));
  };

  // const handleCheck = (e) => {
  //   setChecked(e.target.value)
  //   handleModalClose()
  // }

  const handleSendFromMessageTemplates = () => {
    navigate('/dashboard/campaigns/create-message', { replace: true });
  };

  const handleContacts = (e) => {
    setContacts(e.target.value);
  };

  const handleGroupIds = (e) => {
    setGroupIds(e.target.value);
  };

  const handleCreateSenderIds = () => {
    navigate('/dashboard/campaigns/sender-ids', { replace: true });
  };

  const handleSenderValue = (e) => {
    setSenderValue(e.target.value);
  };

  const handleClientId = (e) => {
    setClientId(e.target.value);
  };

  const handlePurpose = (e) => {
    setPurpose(e.target.value);
  };

  useEffect(() => {
    dispatch(getMessageTemplates());
    dispatch(getSenderIds());
    dispatch(getClients());
  }, [dispatch]);

  // showUpload: true,

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 2 }}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Compose Message</Typography>
          <Button variant="contained" onClick={handleSendFromMessageTemplates}>
            Send from message Template
          </Button>
        </Box> */}
        <Typography variant="h4">Compose Message</Typography>
        <Stack sx={{}}>
          {/* <Button variant="contained">Send from message Template</Button> */}
          <Typography sx={{ my: 1 }} variant="p">
            Campaign Name
          </Typography>
          <TextField value={campaignName} size="small" disabled />
          {/* <Typography sx={{ my: 1 }} variant="p">
            Campaign Description
          </Typography>
          <TextField size="small" value={campaignDescription} onChange={handleCampaignDescription} /> */}
          <Typography sx={{ my: 1 }} variant="p">
            Sender Name
          </Typography>
          <TextField size="small" value={senderName} onChange={handleSenderName} required/>
          <Stack direction="row" sx={{ dispaly: 'flex', justifyContent: 'space-between', my: 1 }}>
            <Typography variant="p">Sender Ids</Typography>
            <Button startIcon={<AddIcon />} onClick={handleCreateSenderIds}>
              Add Sender Id
            </Button>
          </Stack>
          <FormControl sx={{ width: '100%', minWidth: '100%', my: 1 }} size="small">
            <Select
              value={sender}
              onChange={handleSender}
              // displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {senderIds?.map(({ senderValue, id }) => (
                <MenuItem value={id}>{senderValue}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField size="small" /> */}
          {/* <Typography>Select Message Template</Typography>
          <FormControl sx={{ width: '100%', minWidth: '100%', my: 1 }} size="small">
            <Select
              value={messageTemplate}
              onChange={handleMessageTemplate}
              // displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {messageTemplates?.map(({ templateId, templateBody }) => (
                <MenuItem value={templateBody}>{templateBody}</MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* <Typography>Upload Contacts From:</Typography>
          <UploadContacts /> */}
          {/* <Typography></Typography> */}
          <Typography sx={{ my: 1 }} variant="p">
            Contacts (comma separated)
          </Typography>
          {/* {filename && (
            <Typography sx={{ my: 1 }} variant="p">
              {filename}
            </Typography>
          )} */}
          {fileExists === 'YES' && (
            <Stack spacing={2} >
            <Typography>File:</Typography>
            </Stack>
            ) }
          {groupIds && (
            <Stack>
              <Typography>Groups:</Typography>
              <Box>
              <Button onClick={handleGroupClose} endIcon={<Iconify icon={'eva:close-fill'} width={20} height={20} />}>
                    {groupIds}
                  </Button>
              </Box>
            </Stack>
          )}
          <TextField size="small" multiline rows={4} value={contacts} onChange={handleContacts} />
          <Typography sx={{ my: 1 }} variant="p">
            Groups
          </Typography>
          <TextField size="small" multiline rows={4} value={groupIds} onChange={handleGroupIds} />
          {/* <Typography sx={{ my: 1 }} variant="p">
            Import Contacts:
          </Typography> */}
          {/* <ButtonGroup> */}
          {/* <Button variant="contained">Groups</Button> */}
          {/* <Button variant="contained">Files</Button> */}
          {/* </ButtonGroup> */}

          {/* <Box sx={{display:'flex'}}> */}
          <Box>
            {/* <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Auto add country code(254)" /> */}
          </Box>
          {/* <Box>
                          <Typography sx={{ my: 1, fontSize: 14 }} variant="p">Import Contacts</Typography>
                      </Box> */}
          {/* <Box>
                          <ButtonGroup variant='text'>
                              <Button>Group</Button>
                              <Button onClick={() => handleUploadFromFile}>File(Excel, CSV, Text)</Button>
                          </ButtonGroup>
                      </Box> */}

          {/* <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Remove Duplicate" /> */}
          {/* <Typography variant="body2">Account Owner</Typography>
            <FormControl sx={{ minWidth: '100%', my: 2 }} size="small">
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
            </FormControl> */}
          {/* <Typography sx={{ my: 1 }}>Enter Template Id</Typography> */}
          {/* <TextField multiline rows={4} value={messageTemplateId} onChange={handleMessageTemplate} /> */}
          <Stack direction="row" sx={{ dispaly: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography sx={{ my: 1 }}>Enter Message</Typography>
            <Button startIcon={<ContentCopyIcon />} onClick={handleModalOpen}>
              Copy Message From Template
            </Button>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h6">Choose Template</Typography>
                {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <List>
              <ListItem> */}
                <Typography variant="subtitle2">Select Using Template Name</Typography>
                {/* {messageTemplates?.map(({ templateId, templateBody, templateName }) => (
                  <Box> */}
                {/* <List> */}
                {/* <ListItem> */}
                {/* <ListItemIcon> */}
                {/* <Checkbox size="small" sx={{p:0}} edge="start" value={checked} onChange={() => setChecked(!checked)} disablePadding/> */}
                {/* </ListItemIcon> */}
                {/* <ListItemText sx={{}} value={templateId}>
                        {templateBody}
                      </ListItemText>
                      <Divider /> */}
                {/* </ListItem> */}
                {/* </List> */}
                {/* </Box>
                ))} */}

                <FormControl sx={{ width: '100%', minWidth: '100%', my: 1 }} size="small">
                  <Select
                    value={messageTemplate}
                    onChange={handleMessageTemplate}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {messageTemplates?.map((template) => (
                      <MenuItem value={template}>{template.templateName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Typography variant="subtitle2">View Message Template</Typography> */}
                {/* <TextField size="small" multiline minRows={4} sx={{ width: '100%', my: 2 }} value={messageTemplate}> */}
                {/* {messageTemplate} */}
                {/* </TextField> */}
                <Button sx={{ my: 1 }} variant="outlined" startIcon={<CancelIcon />} onClick={handleModalClose}>
                  Close
                </Button>
                {/* </ListItem>
      </List>
      </Box> */}
              </Box>
            </Modal>
            {/* <Button variant="contained">Send Message from Message Template</Button> */}
          </Stack>
          {/* <textarea multiline rows={4} ref={bodyRef} onChange={count}/> */}
          <TextField
            // label="Limit"
            inputProps={{
              maxlength: CHARACTER_LIMIT,
            }}
            value={message}
            // helperText={`${message?.length}/${CHARACTER_LIMIT}`}
            onChange={handleMessage}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />

          {/* <LengthCalculator/> */}

          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Typography>Used: {`${message.length}/${CHARACTER_LIMIT}`}</Typography>
            {/* <Typography>Left {messageTemplate.length--}</Typography> */}
            <Divider orientation="vertical" flexItem />
            {/* <TextField onChange={handleTextLength} value={textLength} placeholder="test message"/> */}
            {/* <Typography onChange={handleTextLength}>SMS Count: {textLength}</Typography> */}
            {/* <Divider orientation="vertical" flexItem /> */}
            {message.length === 0 && <Typography>SMS Count :0</Typography>}
            {message.length > 0 && message.length <= 160 && <Typography>SMS Count: 1</Typography>}
            {message.length > 160 && message.length <= 306 && <Typography>SMS Count: 2</Typography>}
            {message.length > 306 && message.length <= 459 && <Typography>SMS Count: 3</Typography>}
            {message.length > 459 && message.length <= 612 && <Typography>SMS Count: 4</Typography>}
            {message.length > 612 && message.length <= 765 && <Typography>SMS Count: 5</Typography>}
            {message.length > 765 && message.length <= 918 && <Typography>SMS Count: 6</Typography>}
            {message.length > 918 && message.length <= 1071 && <Typography>SMS Count: 7</Typography>}
            {message.length > 1071 && message.length <= 1224 && <Typography>SMS Count: 8</Typography>}
            {}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
            {/* <Button variant="contained" startIcon={<SaveIcon />}>
              Save as Draft
            </Button> */}
            <LoadingButton variant="contained" startIcon={<SendIcon />} onClick={() => handleOpen()}>
              Send
            </LoadingButton>
            <Box>
              {/* <Button variant="contained" onClick={setOpen}>
                New Filter
              </Button> */}

              <Modal
                sx={{ height: '100%' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h4" component="h2">
                    Message Preview {messages?.campaignMessage}
                  </Typography>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <MessageListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        // rowCount={productList.length}
                        // numSelected={selected.length}
                        // onRequestSort={handleRequestSort}
                        // onSelectAllClick={handleSelectAllClick}
                      />
                      {messages?.campaignMessage?.map((message, index) => (
                        <Typography>{message}</Typography>
                      ))}
                    </Table>
                    <Typography id="modal-modal-description" variant="body1">
                      Grand Total:
                    </Typography>
                  </TableContainer>

                  <Divider sx={{ mt: 2 }} />
                  <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<EmailIcon />}
                      // sx={{ backgroundColor: theme.palette.Verst.orange }}
                      onClick={() => {
                        dispatch(sendMessage({ campaignId: messages.campaign_id }));
                        handleClose();
                      }}
                    >
                      Send
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
          </Stack>

          {/* <UploadContacts/> */}

          {/* </Box> */}
        </Stack>
        {/* <UploadContacts uploadSuccess/> */}
      </Card>
    </FormProvider>
  );
}
