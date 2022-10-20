import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  ListItemText,
  Modal,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import useSettings from '../../../../hooks/useSettings';
import { createPurchase } from '../../../../redux/slices/campaigns';
import { getClient } from '../../../../redux/slices/clients';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  height: '70%',
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

function BuyMessages() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Username must be a valid email address').required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: 'root@Verstmedia.com',
    password: 'hakty11',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };
  const params = useParams();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { clientsById, clients } = useSelector((state) => state.clients);
  const currentClient = clientsById.find((client) => client.clientId === params.id);
  console.log(currentClient, 'currentClient');
  console.log(clientsById, 'clientsById');
  // console.log('products', clients);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [open, setOpen] = useState(false);
  const [purchaseExpanded, setPurchaseExpanded] = useState(false);

  const [smppUsername, setSmppUsername] = useState('');
  const [purchaseAccountType, setPurchaseAccountType] = useState('test');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [messageRate, setMessageRate] = useState('');
  const [paymentType, setPaymentType] = useState('Offline');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [stateClients, setStateClients] = useState([]);
  const [smppServerId, setSmppServerId] = useState('');
  const [paymentCurrency, setPaymentCurrency] = useState('10');
  const [transactionReference, setTransactionReference] = useState('');
  const [comments, setComments] = useState('');

  const handleCreatePurchase = () => {
    dispatch(
      createPurchase({
        clientId: currentClient.clientId,
        purchaseValue,
        // messageRate,
        paymentType,
        paymentAmount,
        // smppServerId,
        paymentCurrency,
        transactionReference,
        comments,

      })
    );
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleSmppUsername = (event) => {
    setSmppUsername(event.target.value);
  };

  const handlePurchaseAccountType = (event) => {
    setPurchaseAccountType(event.target.value);
  };

  const handlePurchaseValue = (event) => {
    setPurchaseValue(event.target.value);
  };

  const handleMessageRate = (event) => {
    setMessageRate(event.target.value);
  };

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const handlePaymentAmount = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePaymentCurrency = (event) => {
    setPaymentCurrency(event.target.value);
  }

  const handleSmppServerId = (event) => {
    setSmppServerId(event.target.value);
  };

  const handleTransactionReference = (event) => {
    setTransactionReference(event.target.value);
  }

  const handleComments = (event) => {
    setComments(event.target.value);
  }

  const handleExpandPurchase = () => {
    setPurchaseExpanded(!purchaseExpanded);
  };

  useEffect(() => {
    dispatch(getClient(params?.id));
  }, [dispatch]);

  useEffect(() => {
    if (clients?.length) {
      setProductList(clients);
    }
  }, [clients]);

  return (
    <Card style={{ backgroundColor: '#F4F6F8' }}>
      <CardContent>
        <Typography sx={{ my: 1.5 }} variant="h6">
          Account: {currentClient?.contactFname}
        </Typography>
        {currentClient?.mainAccountSmpps?.balance && (
          <Typography sx={{ my: 1.5 }} variant="h6">
            SMS Balance: {currentClient?.mainAccountSmpps?.balance}
          </Typography>
        )}
        <CardActions>
          <Box>
            <Button variant="contained" onClick={handleOpen}>
              Buy Messages
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Recharge Account "{currentClient?.contactFname}"
                </Typography>
                <Box>
                  <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                    Number of Messages
                  </Typography>
                  <TextField fullWidth size="small" sx={{ my: 1 }} value={purchaseValue} onChange={handlePurchaseValue} placeholder="purchase value"/>
                  <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                    Payment Type
                  </Typography>
                  <TextField fullWidth size="small" sx={{ my: 1 }} value={paymentType} onChange={handlePaymentType} placeholder="purchase value"/>
                  <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                    Payment Currency
                  </Typography>
                  <TextField fullWidth size="small" sx={{ my: 1 }} value={paymentCurrency} onChange={handlePaymentCurrency} placeholder="purchase value"/>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ListItemText primary="Recharge Amount" />
                    <ExpandMoreIcon />
                  </ExpandMore>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                        Recharge Amount
                      </Typography>
                      <TextField
                        id="standard-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        size="small"
                        fullWidth
                        value={paymentAmount}
                        onChange={handlePaymentAmount}
                        placeholder="payment amount"    
                      />
                      <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                        KSH
                      </Typography>
                      <FormControlLabel
                        sx={{ my: 1 }}
                        control={<Checkbox defaultChecked />}
                        label={` Send an email to ${currentClient?.contactFname} <${currentClient?.clientEmail}> to let them know that their account has been recharged.`}
                      />
                    </CardContent>
                  </Collapse>
                </Box>
                <ExpandMore
                  expand={purchaseExpanded}
                  onClick={handleExpandPurchase}
                  aria-expanded={purchaseExpanded}
                  aria-label="show more"
                >
                  <ListItemText primary="Paid Offline(Check / Wire Transfer)" value={paymentType}/>
                  <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={purchaseExpanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography id="modal-modal-description" variant="subtitle1" sx={{ my: 1 }}>
                      Reference #
                    </Typography>
                    <TextField
                      id="standard-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      fullWidth
                      placeholder="Enter reference # (Optional)"
                      value={transactionReference}
                      onChange={handleTransactionReference}
                    />
                    <Typography id="modal-modal-description" variant="subtitle1" sx={{ my: 1 }}>
                      Comments
                    </Typography>
                    <TextField
                      id="standard-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      fullWidth
                      placeholder="Enter comments (Optional)"
                      value={comments}
                      onChange={handleComments}
                    />

                    <Typography id="modal-modal-description" variant="h4" sx={{ my: 1 }}>
                      Recharge {paymentAmount && paymentAmount} KSH
                    </Typography>
                    <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                      Reference #: {transactionReference && transactionReference}
                    </Typography>
                    <Typography id="modal-modal-description" variant="body1" sx={{ my: 1 }}>
                      Comments: {comments}
                    </Typography>

                    <Button variant="contained" onClick={handleCreatePurchase}> Apply Purchase</Button>
                  </CardContent>
                </Collapse>

                <Divider />

                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    //   sx={{ backgroundColor: theme.palette.Verst.orang }}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default BuyMessages;
