import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { FormProvider } from '../../../components/hook-form';
import { getMessageTemplates, getSenderIds } from '../../../redux/slices/campaigns';
import { getClients } from '../../../redux/slices/jasmine';

import { previewFile, sendFromFile, sendFromFileStep3 } from '../../../redux/slices/messaging';
import './styles.css';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [file, setFile] = useState(null);

  const fileHandler = (e) => {
    const fileObj = e.target.files[0];
    console.log(fileObj);

    // just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setFile({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SendFromTemplate({ updateGroupName }) {
  const { sendFile, filePreview } = useSelector((state) => state.messaging);
  const { senderIds, template } = useSelector((state) => state.campaigns);

  const columns = [
    { field: 'countryName', headerName: 'Country Name', width: 140 },
    { field: 'MCCMNC', headerName: 'MCCMNC', width: 130 },
    { field: 'costPrice', headerName: 'Cost Price', width: 130 },
    {
      field: 'totalNumbers',
      headerName: 'Total Numbers',
      type: 'number',
      width: 90,
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      type: 'number',
      width: 90,
    },
  ];

  const previewHead = [
    { field: 'cellnumber', headerName: 'Cell Number', width: 140 },
    { field: 'message', headerName: 'Message', width: 130 },
    { field: 'characterCount', headerName: 'Character Count', width: 130 },
  ];

  const theme = useTheme();
  const [groups, setGroups] = useState();
  const [time, setTime] = useState(new Date());
  const bodyRef = useRef();
  const enqueueSnackbar = useSnackbar();

  // console.log('campaigns', campaigns);
  console.log('senderIds', senderIds);
  // console.log('composeMessage', messages);
  const { messageTemplates, listedGroups } = useSelector((state) => state.campaigns);
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

  const [textLength, setTextLength] = useState(0);
  const [checked, setChecked] = useState();

  // sender id
  const [senderValue, setSenderValue] = useState();
  const [clientId, setClientId] = useState();
  const [purpose, setPurpose] = useState();
  const [groupOpen, setGroupOpen] = useState(false);
  const [uploadId, setUploadId] = useState();
  const [msisdnField, setMsisdnField] = useState();
  const [excelOpen, setExcelOpen] = useState(false);

  const handleExcelOpen = (e) => {
    setExcelOpen(true);
  };

  const handleExcelClose = (e) => {
    setExcelOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSenderName = (e) => {
    setSenderName(e.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleGroupOpen = () => {
    setGroupOpen(true);
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // const handleSender = (e) => {
  //   setSender(e.target.value);
  // };

  const handleUploadId = (e) => {
    setUploadId(e.target.value);
  };

  // const handleMsisdnField = (e) => {
  //   setMsisdnField(e.target.value);
  // };

  // validate inputs

  const CampaignSchema = Yup.object().shape({
    campaignName: Yup.string().required('Campaign name is required'),
    senderName: Yup.string().required('Sender name is required'),
    message: Yup.string().required('Message is required'),
    uploadId: Yup.string().required('Upload id is required'),
    msisdnField: Yup.string().required('Contact field is required'),
  });

  const defaultValues = {
    campaignName: '',
    senderName: '',
    message: '',
    uploadId: '',
    msisdnField: '',
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
      dispatch(sendFromFile(bodyFormdata));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComposeMessage = () => {
    const bodyFormdata = new FormData();
    bodyFormdata.append('message', message);
    bodyFormdata.append('senderName', senderName);
    bodyFormdata.append('campaignName', campaignName);
    bodyFormdata.append('uploadId', template.upload_id);
    bodyFormdata.append('msisdnField', msisdnField);

    dispatch(sendFromFile(bodyFormdata));

    console.log({
      message,
      senderName,
      campaignName,
      uploadId,
      msisdnField,
    });

    setOpen(true);
  };

  const handlePreviewMessage = () => {
    dispatch(
      previewFile({
        message,
        uploadId: template.upload_id,
        msisdnField,
      })
    );
    console.log(
      {
        message,
        uploadId: template.upload_id,
        msisdnField,
      },
      'preview'
    );
    setExcelOpen(true);
  };

  const handleSendFromMessageTemplates = () => {
    navigate('/dashboard/campaigns/create-message', { replace: true });
  };

  const handleContacts = (e) => {
    setContacts(e.target.value);
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

  const handleMsisdnField = (e) => {
    setMsisdnField(e.target.value);
  };

  console.log({ templateHeaders: template?.headers });

  useEffect(() => {
    dispatch(getMessageTemplates());
    dispatch(getSenderIds());
    dispatch(getClients());
  }, [dispatch]);
  const fileHandler = (e) => {
    const fileObj = e.target.files[0];
    console.log(fileObj);

    // just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setFile({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4">Compose SMS</Typography>
        <Stack sx={{}}>
          {/* <Button variant="contained">Send from message Template</Button> */}
          <Typography sx={{ my: 1 }} variant="p">
            Campaign Name
          </Typography>
          <TextField value={campaignName} size="small" disabled name="campaignName" />

          <Typography sx={{ my: 1 }} variant="p">
            Sender Name
          </Typography>
          <TextField size="small" value={senderName} onChange={handleSenderName} />
          <Stack direction="row" sx={{ dispaly: 'flex', justifyContent: 'space-between', my: 1 }}>
            <Typography variant="p">Sender Ids</Typography>
            <Button startIcon={<AddIcon />} onClick={handleCreateSenderIds}>
              Add Sender Id
            </Button>
          </Stack>
          <FormControl sx={{ width: '100%', minWidth: '100%', my: 1 }} size="small">
            <Select
              value={sender}
              // displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {senderIds?.map(({ senderValue, id }) => (
                <MenuItem value={id}>{senderValue}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ my: 1 }} variant="p">
            Contacts
          </Typography>
          <FormControl sx={{ width: '100%', minWidth: '100%', my: 1 }} size="small">
            <Select
              value={msisdnField}
              onChange={handleMsisdnField}
              // name="msisdnField"
              // displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {template?.headers?.map((header) => (
                <MenuItem value={header}>{header}</MenuItem>
              ))}
            </Select>
          </FormControl>

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
                <Typography variant="subtitle2">Select Using Template Name</Typography>
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
                <Button sx={{ my: 1 }} variant="outlined" startIcon={<CancelIcon />} onClick={handleModalClose}>
                  Close
                </Button>
                {/* </ListItem>
      </List>
      </Box> */}
              </Box>
            </Modal>
          </Stack>
          <TextField
            // label="Limit"
            inputProps={{
              maxlength: CHARACTER_LIMIT,
            }}
            value={message}
            onChange={handleMessage}
            // name="message"
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />

          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Typography>Used: {`${message.length}/${CHARACTER_LIMIT}`}</Typography>
            <Divider orientation="vertical" flexItem />
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
            <LoadingButton
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => {
                handleComposeMessage();
              }}
            >
              Send
            </LoadingButton>
            <Box>
              <Modal
                sx={{ height: '100%' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h4" component="h2">
                    Message Preview
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell>{column.headerName}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sendFile?.campaign_summary &&
                          sendFile?.campaign_summary.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.country}</TableCell>
                              <TableCell>{item?.mccmnc}</TableCell>
                              <TableCell>{item?.cost_price}</TableCell>
                              <TableCell>{item?.total_numbers}</TableCell>
                              <TableCell>{item?.total_cost}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Divider sx={{ mt: 2 }} />
                  <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<EmailIcon />}
                      onClick={() => {
                        dispatch(sendFromFileStep3({ campaignId: sendFile.campaign_id }));
                        handleClose();
                      }}
                    >
                      Send
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            <LoadingButton
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => {
                handlePreviewMessage();
              }}
            >
              Preview
            </LoadingButton>
            <Box>
              <Modal
                sx={{ height: '100%' }}
                open={excelOpen}
                onClose={handleExcelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h4" component="h2">
                    Excel Preview
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {previewHead.map((head) => (
                            <TableCell>{head.headerName}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filePreview?.previews &&
                          filePreview?.previews.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.msisdn}</TableCell>
                              <TableCell>{item?.message}</TableCell>
                              <TableCell>{item?.character_count}</TableCell>
                            </TableRow>
                          ))}
                          <Typography variant="subtitle2">(Preview showing top 5 rows and first 26 columns)</Typography>
                      </TableBody>
                    </Table>
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
                      // onClick={() => {
                      //   dispatch(sendMessage({ campaignId: messages.campaign_id }));
                      //   handleClose();
                      // }}
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
