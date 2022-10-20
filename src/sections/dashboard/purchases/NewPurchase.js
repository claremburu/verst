import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// import {  } from '@mui/material';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { createProvider, createUser, getClients, getGroups, getUsers } from '../../../redux/slices/jasmine';
import useAuth from '../../../hooks/useAuth';
import { createPurchase } from '../../../redux/slices/campaigns';

// ----------------------------------------------------------------------
const type = ['Card', 'Paypal', 'Cash', 'Offline'];

const currency = ['USD', 'KSH', 'UGX', 'NGN'];

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

NewPurchase.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
  onCloseModal: PropTypes.func,
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

export default function NewPurchase({ numSelected, filterName, onFilterName, onDeleteUsers, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients, jasminGroups } = useSelector((state) => state.jasmine);
  const {user} = useAuth();
  // console.log(stateClients, 'user clients')

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const purchaseSchema = Yup.object().shape({
    // clientId: Yup.string().required('client is required'),
    purchaseAccountType: Yup.string().required('account type is required'),
    purchaseValue: Yup.string().required('purchase value is required'),
    messageRate: Yup.string().required('message rate is required'),
    paymentType: Yup.string().required('payment type is required'),
    paymentAmount: Yup.string().required('payment amount is required'),
    paymentCurrency: Yup.string().required('payment currency is required'),
    transactionReference: Yup.string().required('transaction reference is required'),
    comments: Yup.string().required('comment is required'),
  });

  const defaultValues = {
    smppServerId: '',
    clientId: user?.clientId,
    purchaseAccountType: '',
    purchaseValue: '',
    messageRate: null,
    paymentType: '',
    paymentAmount: null,
    paymentCurrency: '',
    transactionReference: '',
    comments: '',
  };

  const methods = useForm({
    resolver: yupResolver(purchaseSchema),
    defaultValues,
  });

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      console.log(values, 'data');
      //   console.log(values.groupId, 'clientId');
      await dispatch(
        createPurchase({
          clientId: user?.clientId,
          purchaseAccountType: values.purchaseAccountType,
          purchaseValue: values.purchaseValue,
          messageRate: values.messageRate,
          paymentType: values.paymentType,
          paymentAmount: values.paymentAmount,
          paymentCurrency: values.paymentCurrency,
          transactionReference: values.transactionReference,
          comments: values.comments,
          smppServerId: values.smppServerId,
        })
      );
      onCloseModal();
      //   setOpen(false);
      enqueueSnackbar('Purchase created successfully');
      reset();
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

      <Box sx={style}>
        <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            New Purchase
          </Typography>

          <CloseIcon onClick={onCloseModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account names and
          usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
        </Typography>
        <Stack spacing={2} sx={{ my: 2 }}>
          {/* <RHFTextField name="clientId" label="client" size="small" disabled/> */}
          <RHFTextField name="purchaseAccountType" label="Account Type" size="small"/>
          <RHFTextField name="purchaseValue" label="purchase value" size="small" type="number"/>
          <RHFTextField name="messageRate" label="message rate" size="small" type="number"/>
          <RHFSelect name="paymentType" label="payment type" sx={{ my: 2 }} size="small">
            <option value="" />
            {type.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="paymentAmount" label="payment amount" size="small" type="number"/>
          <RHFSelect name="paymentCurrency" label="payment currency" sx={{ my: 2 }} size="small">
            <option value="" />
            {currency.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect name="smppServerId" label="smpp server" sx={{ my: 2 }} size="small">
            <option value="" />
            {smppUsers.map(({userId, serverName}) => (
              <option key={userId} value={userId}>
                {serverName}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="transactionReference" label="transaction reference" size="small" />
          <RHFTextField name="comments" label="comments" size="small" />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<CloseIcon />} onClick={onCloseModal}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            startIcon={<SaveIcon />}
            sx={{ backgroundColor: theme.palette.Verst.orange }}
            // onClick={onCloseModal}
            // onClick={handleClose}
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
