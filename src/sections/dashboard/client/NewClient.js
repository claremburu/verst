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
import { createProvider, createUser, getClients, getGroups } from '../../../redux/slices/jasmine';
import useAuth from '../../../hooks/useAuth';
import { createClient } from '../../../redux/slices/clients';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

NewClient.propTypes = {
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

const accounts = ['ADMINISTRATOR', 'RESELLER', 'CLIENT'];

export default function NewClient({ numSelected, filterName, onFilterName, onDeleteUsers, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  // const { smppUsers, clients, jasminGroups } = useSelector((state) => state.jasmine);
  // const {clients} = useSelector((state) => state.clients);
  const {error} = useSelector((state) => state.clients);
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

  const clientSchema = Yup.object().shape({
    // clientEmail: Yup.string().email().required("email is required"),
    // contactNumber: Yup.string().required("contact number is required"),
    // // clientName: Yup.string().required("client name is required"),
    // contactFname: Yup.string().required("contact first name is required"),
    // contactLname: Yup.string().required("contact last name is required"),
    // clientAccessLevel: Yup.string().required("client access level is required"),
    // clientPassword: Yup.string().required("client password is required"),
    // clientOwnerId: Yup.string().required("client owner is required"),
  });

  const defaultValues = {
    clientEmail: '',
    contactNumber: '',
    // clientName: '',
    contactFname: '',
    contactLname: '',
    clientAccessLevel: '',
    // clientOwnerId: user?.clientId,
    clientPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(clientSchema),
    defaultValues,
  });

  useEffect(() => {
    // dispatch(getClients());

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
      // console.log(values, 'data');
        // console.log(values);
      await dispatch(
        createClient({
          clientOwnerId: user?.clientId,
            clientEmail: values.clientEmail,
            contactNumber: values.contactNumber,
            clientName: `${values.contactFname} ${values.contactLname}`,
            contactFname: values.contactFname,
            contactLname: values.contactLname,
            clientAccessLevel: values.clientAccessLevel,
            clientPassword: values.clientPassword,
        })
      );
      // if(error?.message){
      //   console.log(error?.message, 'error')
      //   enqueueSnackbar(error?.message, {
      //     variant: 'error',
      //   });
      //   return
      // } 
      onCloseModal();
    //   setOpen(false);
    // if(values === ){
    //   enqueueSnackbar('Client created successfully');
    // }
      reset();
    } catch (error) {
      console.error(error);
      reset(); 
      // if (isMountedRef.current) {
      //   setError('afterSubmit', error);
      // }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Box sx={style}>
        <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            New Client
          </Typography>

          <CloseIcon onClick={onCloseModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Typography id="modal-modal-description" sx={{ my: 1 }}>
          Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account names and
          usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
        </Typography>
        {!!error?.message && <Alert severity="error">Please enter all details</Alert>}
        <Stack spacing={2} sx={{ my: 2 }}>
        <RHFTextField name="contactFname" label="First Name" size="small" />
          <RHFTextField name="contactLname" label="Last Name" size="small" />
          {/* <RHFTextField name="clientName" label="Full Name" size="small" /> */}
          <RHFTextField name="clientEmail" label="Email Address" size="small" />
          <RHFTextField name="contactNumber" label="Phone Number" size="small" />
          {/* <RHFTextField name="contactNumber" label="Phone Number" size="small" /> */}
          <RHFSelect name="clientAccessLevel" label="Account Type" sx={{ my: 2 }} size="small">
            <option value="" />
            {accounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="clientPassword" label="Password" type="password" size="small" />
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

        {/* <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
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
            </Stack> */}
      </Box>
    </FormProvider>
  );
}
