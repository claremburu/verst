import { useState, useCallback } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
// routes

import BackupTableIcon from '@mui/icons-material/BackupTable';
import PersonIcon from '@mui/icons-material/Person';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
//
import { FormProvider, RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function Financial() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    projectType: Yup.string().required('First name is required'),
    location: Yup.string().required('First name is required'),
  });

  const defaultValues = {
    projectType: '',
    location: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
    //   await login(data.username, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'contacts',
          file
          // Object.assign(file, {
          //   preview: URL.createObjectURL(file),
          // })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }} spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Financial Information
          </Typography>
          {/* <Stack direction="row" spacing={2}> */}
          <TextField
            name="location"
            size="small"
            placeholder="Who is/will be consuming the energy produced?"
            multiline
            minRows={10}
            fullWidth
          />
          <Typography variant="subtitle1" gutterBottom>
            Attach financial documentation
          </Typography>
          <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} />
          <Typography variant="subtitle1" gutterBottom>
            Estimated annual generation projections for five years
          </Typography>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="location" label="Year 1" size="small" />
            <RHFTextField name="location" label="Year 2" size="small" />
            <RHFTextField name="location" label="Year 3" size="small" />
            <RHFTextField name="location" label="Year 4" size="small" />
            <RHFTextField name="location" label="Year 5" size="small" />
          </Stack>
        </Box>
      </Stack>
    </FormProvider>
  );
}
