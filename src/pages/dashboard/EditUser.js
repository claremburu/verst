import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, FormControlLabel, Grid, Stack, Switch, Typography, Container, Alert } from '@mui/material';
import { Label } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Page from '../../components/Page';

// utils
// routes
// _mock
import { countries } from '../../_mock';
// components
import { FormProvider, RHFRadioGroup, RHFSelect, RHFSwitch, RHFTextField } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import { updateUser } from '../../redux/slices/clients';
import MyAvatar from '../../components/MyAvatar';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';

// USER_FIELD_UNSPECIFIED,
// ----------------------------------------------------------------------

const accounts = ["ADMINISTRATOR", "CLIENT", "RESELLER"];

export default function UserNewForm({ isEdit = true }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    contactFname: Yup.string().required('First Name is required'),
    contactLname: Yup.string().required('Last Name is required'),
    clientName: Yup.string().required(' Name is required'),
    clientEmail: Yup.string().email().required('Email is required').email(),
    contactNumber: Yup.string().required().label('Phone Number'),
    clientCountry: Yup.string().required('Country is required'),
    clientCity: Yup.string().required('City is required'),
    clientAccessLevel: Yup.string().required('Access level is required'),
    // clientBrandDomain: Yup.string().required('Website is required'),
    clientStatus: Yup.string().required('Status is required'),
  });

  const compare = {
    clientAccessLevel: 'ACCESS_LEVEL',
    clientCountry: 'CLIENT_COUNTRY',
    contactNumber: 'CLIENT_CONTACT_NUMBER',
    clientState: 'CLIENT_STATE',
    clientCity: 'CLIENT_CITY',
    address: 'CLIENT_ADDRESS',
    clientZipPostal: 'CLIENT_ZIP_POSTAL',
  };

  const defaultValues = useMemo(
    () => ({
      contactFname: user?.contactFname || '',
      contactLname: user?.contactLname || '',
      clientName: user?.clientName || '',
      clientEmail: user?.clientEmail || '',
      contactNumber: user?.contactNumber || '',
      clientCountry: user?.clientCountry || '',
      clientCity: user?.clientCity || '',
      clientAccessLevel: user?.clientAccessLevel || '',
      clientBrandDomain: user?.clientBrandDomain || '',
      clientStatus: user?.clientStatus || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && user) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, user]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // console.log({ values: Object.entries(values) });

      Object.keys(values).forEach((key, index) => {
        // dispatch(updateUser({
        //     clientId: user.clientId,
        //     field,
        //     value:stateValue,
        //   }))

        const field = compare[key];
        const value = Object.values(values)[index];

        if (field && value !== defaultValues[key]) {
          dispatch(
            updateUser({
              clientId: user.clientId,
              field,
              value,
            })
          );
        }
      });

      // reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Page title="User Profile">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="User Profile"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'User',
                href: PATH_DASHBOARD.user.root,
              },
              { name: 'User Profile' },
            ]}
          />
          <Alert severity="warning" sx={{ mb: 2 }}>
            You cannot edit disabled fields
          </Alert>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ py: 10, px: 3 }}>
                {isEdit && (
                  <Label
                    color={values.clientStatus !== 'Active' ? 'error' : 'success'}
                    sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                  >
                    {values.clientStatus}
                  </Label>
                )}

                <Stack spacing={2} direction='row' sx={{display: 'flex', alignItems:'center'}}>
                  <MyAvatar />
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>{user?.clientName}({user?.clientStatus})</Typography>

                  {/* <Typography variant="h6" sx={{ mt: 2 }}>{user?.clientStatus}</Typography> */}
                </Stack>

                {/* {isEdit && (
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            checked={field.value !== 'active'}
                            onChange={(event) => field.onChange(event.target.checked ? 'inactive' : 'active')}
                          />
                        )}
                      />
                    }
                    label={
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Banned
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Apply disable account
                        </Typography>
                      </>
                    }
                    sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                  />
                )} */}

                {/* <RHFSwitch
                  name="isVerified"
                  labelPlacement="start"
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Email Verified
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Disabling this will automatically send the user a verification email
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                /> */}
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <RHFTextField name="contactFname" label="First Name" disabled />
                  <RHFTextField name="contactLname" label="Last Name" disabled />
                  <RHFTextField name="contactNumber" label="Phone Number" />
                  <RHFTextField name="clientEmail" label="Email Address" disabled />
                  <RHFSelect name="clientCountry" label="Country" placeholder="Country">
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="clientCity" label="City" />
                  <RHFTextField name="clientBrandDomain" label="Website" disabled/>
                  <RHFTextField name="clientName" label="Client Name" disabled/>
                  <RHFSelect name="clientAccessLevel" label=" AccountType" placeholder="Account Type">
                    <option value="" />
                    {accounts.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </RHFSelect>
                  {/* <RHFTextField name="clientAccessLevel" label="Type" /> */}
                  {/* <RHFRadioGroup name="clientStus" options={['Active', 'Inactive']} disabled /> */}
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Edit User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </FormProvider>
  );
}
