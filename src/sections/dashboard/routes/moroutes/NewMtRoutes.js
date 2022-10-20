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
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { createProvider, createUser, getClients, getGroups } from '../../../../redux/slices/jasmine';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

NewMtRoute.propTypes = {
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

export default function NewMtRoute({ numSelected, filterName, onFilterName, onDeleteUsers, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients, jasminGroups } = useSelector((state) => state.jasmine);

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

  const providersSchema = Yup.object().shape({
    // clientId: Yup.string().required('client is required'),
    accountName: Yup.string().required('account name required'),
    port: Yup.string().required('port is required'),
    host: Yup.string().required('host is required'),
    username: Yup.string().required('usename is required'),
    password: Yup.string().required('password is required'),
  });

  const defaultValues = {
    accountName: '',
    port: '',
    host: '',
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(providersSchema),
    defaultValues,
  });

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
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
        createProvider({
          clientId: clients?.clientId,
          accountName: values.accountName,
          port: values.port,
          host: values.host,
          username: values.username,
          password: values.password,
        })
      );
      onCloseModal();
    //   setOpen(false);
      enqueueSnackbar('SMPP Provider created successfully');
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
            New Provider Account
          </Typography>

          <CloseIcon onClick={onCloseModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account names and
          usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
        </Typography>
        <Stack spacing={2} sx={{ my: 2 }}>
          <RHFTextField name="accountName" label="Account Name" size="small" />
          <RHFTextField name="port" label="port" size="small" />
          <RHFTextField name="host" label="host" size="small" />
          <RHFTextField name="username" label="username" size="small" />
          {/* <RHFSelect name="host" label="Host" placeholder="Host" sx={{ my: 2 }} size="small">
            <option value="" />
            {jasminGroups.map(({ groupId, groupName }) => (
              <option key={groupId} value={groupId}>
                {groupName}
              </option>
            ))}
          </RHFSelect> */}
          <RHFTextField name="password" label="Password" type="password" size="small" />
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
