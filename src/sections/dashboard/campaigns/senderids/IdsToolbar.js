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
import { getClients, getGroups } from '../../../../redux/slices/jasmine';
import NewIds from './NewIds'
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ProviderToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '50%',
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

export default function ProviderToolbar({ numSelected, filterName, onFilterName, onDeleteUsers }) {
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

  const UsersSchema = Yup.object().shape({
    // clientId: Yup.string().required('client is required'),
    // groupId: Yup.string().required('group is required'),
    // userName: Yup.string().required('user name is required'),
    // serverName: Yup.string().required('server Name is required'),
    // password: Yup.string().required('password is required'),
  });

  const defaultValues = {
    clientId: clients.clientId,
    groupId: '',
    userName: '',
    serverName: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(UsersSchema),
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
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (

      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: isLight ? 'primary.main' : 'text.primary',
            bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <InputStyle
            stretchStart={240}
            value={filterName}
            onChange={(event) => onFilterName(event.target.value)}
            placeholder="Search smpp users..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteUsers}>
              <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>{/* <Iconify icon={'ic:round-filter-list'} /> */}</IconButton>
          </Tooltip>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {/* <Typography variant="h6">SMPP Groups</Typography> */}
          {/*  */}
          <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleOpen}>
              New Sender Id
            </Button>
          </Stack>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NewIds onCloseModal={handleClose}/>
          </Modal>
        </Box>b
      </RootStyle>
  
  );
}
