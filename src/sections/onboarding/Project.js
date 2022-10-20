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

export default function Project() {
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
            await login(data.username, data.password);
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
                        Tell us more about your project
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Complete the following to onboard your project
                    </Typography>
                    <Stack spacing={3} sx={{ my: 2 }}>
                        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                        <Stack direction="row" spacing={2}>
                            <RHFSelect name="projectType" label="Type of Project" size="small">
                                <option value="" />
                            </RHFSelect>
                            <RHFTextField name="location" label="Location" size="small" />
                            {/* <RHFTextField name="lastname" label="Last Name" size="small" /> */}
                        </Stack>
                        <Typography variant="h5" gutterBottom>Location</Typography>
                        {/* <Stack direction="row" spacing={2}> */}
                            <TextField name="location" size="small" placeholder="Additional location if any"multiline minRows={10}/>
                            {/* <RHFTextField name="projectName" label="Project Name" size="small" /> */}
                        {/* </Stack> */}
                        <Typography variant="h5" gutterBottom>Technical Specifications</Typography>
                        <Stack direction="row" spacing={2}>
                            <RHFTextField name="location" placeholder="Project Size" size="small" />
                             <RHFTextField name="location" placeholder="Estimated annual generation projection" size="small" />
                        </Stack>
                        <Typography variant="subtitle1" gutterBottom>Estimated annual generation projections for five years</Typography>
                        <Stack direction="row" spacing={2}>
                            <RHFTextField name="location" label="Year 1" size="small" />
                             <RHFTextField name="location" label="Year 2" size="small" />
                             <RHFTextField name="location" label="Year 3" size="small" />
                             <RHFTextField name="location" label="Year 4" size="small" />
                             <RHFTextField name="location" label="Year 5" size="small" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <RHFSelect name="projectType" label="Stage of project" size="small">
                                <option value="" />
                            </RHFSelect>
                            <RHFTextField name="location" label="Capacity Factor" size="small" />
                            {/* <RHFTextField name="lastname" label="Last Name" size="small" /> */}
                        </Stack>
                        <Typography variant="h5" gutterBottom>Permits and Approvals</Typography>
                        {/* <Stack direction="row" spacing={2}> */}
                        <TextField name="location" size="small" placeholder="Please desacribe the regulatory landscape and all interactions with local/national government officials and agencies regarding this project" multiline minRows={10}/>
                        <Typography variant="subtitle1" gutterBottom>Attach pertmits and approvals that have been received to date</Typography>
                        <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} />
                        <Typography variant="h5" gutterBottom>Financial Information</Typography>
                        {/* <Stack direction="row" spacing={2}> */}
                        <TextField name="location" size="small" placeholder="Who is/will be consuming the energy produced?" multiline minRows={10}/>
                        <Typography variant="subtitle1" gutterBottom>Attach financial documentation</Typography>
                        <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} />
                        <Typography variant="subtitle1" gutterBottom>Estimated annual generation projections for five years</Typography>
                        <Stack direction="row" spacing={2}>
                            <RHFTextField name="location" label="Year 1" size="small" />
                             <RHFTextField name="location" label="Year 2" size="small" />
                             <RHFTextField name="location" label="Year 3" size="small" />
                             <RHFTextField name="location" label="Year 4" size="small" />
                             <RHFTextField name="location" label="Year 5" size="small" />
                        </Stack>

                             {/* <RHFTextField name="location" label="Year 2" size="small" />
                             <RHFTextField name="location" label="Year 3" size="small" />
                             <RHFTextField name="location" label="Year 4" size="small" />
                             <RHFTextField name="location" label="Year 5" size="small" /> */}
                        {/* </Stack> */}
                    </Stack>
                    {/* <Stack direction="row" spacing={2} sx={{ my: 2 }} alignItems="center">
                        <PersonIcon />
                        <Box>
                            <Typography variant="subtitle1">Your Information</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Your Contact Details</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ my: 2 }} alignItems="center">
                        <BackupTableIcon />
                        <Box>
                            <Typography variant="subtitle1">Project Information</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>The project licenses, financial and technical details</Typography>
                        </Box>
                    </Stack> */}
                </Box>

                {/* <Tooltip title={capitalCase(method)} placement="right"> */}
                <>
                    {/* 
        <Image
          disabledEffect
          src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
          sx={{ width: 32, height: 32 }}
        /> */}
                </>
                {/* </Tooltip> */}
            </Stack>
        </FormProvider>
    );
}
