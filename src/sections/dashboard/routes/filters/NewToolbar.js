import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button, Stack,
    Toolbar, Typography
} from '@mui/material';

// import {  } from '@mui/material';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { getClients, getGroups } from '../../../../redux/slices/jasmine';
import { createFilter } from '../../../../redux/slices/routes';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

NewToolbar.propTypes = {
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

export default function NewToolbar({ numSelected, filterName, onFilterName, onDeleteUsers, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
const {filters} = useSelector(state => state.routes);
// const {clients, groups} = useSelector(state => state.jasmine);
const {clients} = useSelector(state => state.jasmine);
const [filterType, setFilterType] = useState();
const [filterValue, setFilterValue] = useState();

const handleFilterType = (event) => {
  setFilterType(event.target.value);
}

  const handleFilterValue = (event) => {
    setFilterValue(event.target.value);
  }
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

  const filtersSchema = Yup.object().shape({
    // clientId: Yup.string().required('client is required'),
    // filterType: Yup.string().required('filter type is required'),
    filterName: Yup.string().required('filter name is required'),
    filterValue: Yup.string().required('filter value is required'),
  });

  const defaultValues = {
    clientId: '',
    filterType: '',
    filterName: '',
    filterValue: '',
  };

  const methods = useForm({
    resolver: yupResolver(filtersSchema),
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
        createFilter({
          clientId: values.clientId,
          filterType: values.filterType,
          filterName: values.filterName,
          filterValue: values.filterValue,
        })
      );
      onCloseModal();
      //   setOpen(false);
      enqueueSnackbar('Route Filter created successfully');
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
            New Route Filter
          </Typography>

          <CloseIcon onClick={onCloseModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter all the <b>mandatory</b> fields below. You can go in and configure the details later. Account names and
          usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
        </Typography>
        <Stack spacing={2} sx={{ my: 2 }}>
        <RHFSelect name="clientId" label="Account Owner" placeholder="Account Owner" sx={{ my: 2 }} size="small">
          <option value="" />
          {clients.map(({ clientId, clientName }) => (
            <option key={clientId} value={clientId}>
              {clientName}
            </option>
          ))}
        </RHFSelect>
        <RHFSelect name="filterType" label="Filter Type" placeholder="Route Filters" sx={{ my: 2 }} size="small">
          <option value="" />
          {filters.map(({ filterType, filterId }) => (
            <option key={filterId} value={filterType}>
              {filterType}
            </option>
          ))}
        </RHFSelect>
          <RHFTextField name="filterName" label="filter name" size="small" />
          <RHFTextField name="filterValue" label="filter value" size="small" />
          {filters?.filterType === "TRANSPARENT_FILTER" && 
          <RHFTextField name="filterValue" label="filter value" size="small" />
              }

              {filterType === "SOURCE_ADDRESS_FILTER" && 
              <RHFTextField name="filterValue" label="source address criteria" size="small" value={filterValue} onChange={handleFilterValue}/>
              }
              {filterType === "DESTINATION_ADDRESS_FILTER" && 
              <RHFTextField name="filterValue" label="destination address criteria" size="small" />
              }

              {filterType === "SHORT_MESSAGE_FILTER" &&
              <RHFTextField name="filterValue" label="short message criteria" size="small" />
              }

              {filterType === "SMPP_CLIENT_ACCOUNT_FILTER" && 
              <RHFSelect name="clientId" label="Smpp Client Account" placeholder="Client" sx={{ my: 2 }} size="small">
          <option value="" />
          {clients.map(({ clientId, clientName }) => (
            <option key={clientId} value={clientName}>
              {clientName}
            </option>
          ))}
        </RHFSelect>
              }
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
