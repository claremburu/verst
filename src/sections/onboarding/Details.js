import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Box, Stack, Typography } from '@mui/material';
// routes

import BackupTableIcon from '@mui/icons-material/BackupTable';
import PersonIcon from '@mui/icons-material/Person';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
//
import { FormProvider, RHFTextField } from '../../components/hook-form';



// ----------------------------------------------------------------------

export default function Details() {
    const { login } = useAuth();

    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('First name is required'),
        phone: Yup.string().required('First name is required'),
        projectName: Yup.string().required('First name is required'),
        registrationNumber: Yup.string().required('First name is required'),
        website: Yup.string().required('First name is required')
    });

    const defaultValues = {
       firstname: '',
       lastname: '',
       phone: '',
       projectName: '',
       registrationNumber: '',
       website: '',
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
                    <Typography variant="body2">
                        We will verify the Information and onboard your project. Ensure the information is accurate to avoid any delays.                    {/* <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
      Get started
    </Link> */}
                    </Typography>
                    <Stack spacing={3} sx={{my:2}}>
                        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                        <Stack direction="row" spacing={2}>
                        <RHFTextField name="firstname" label="First Name" size="small" />
                        <RHFTextField name="lastname" label="Last Name" size="small" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                        <RHFTextField name="phone" label="Phone Number" size="small" />
                        <RHFTextField name="projectName" label="Project Name" size="small" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                        <RHFTextField name="registrationNumber" label="Registration Number" size="small" />
                        <RHFTextField name="website" label="Website" size="small" />
                        </Stack>
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
