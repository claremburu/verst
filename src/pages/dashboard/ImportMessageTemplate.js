import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Grid, Stack, Typography, FormControl, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
// components
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFUploadSingleFile } from '../../components/hook-form';
import { uploadContacts } from '../../redux/slices/campaigns';
import { getClients } from '../../redux/slices/jasmine';
import { getContactGroups } from '../../redux/slices/messaging';
// import { UploadForm} from '../../components/upload';
//
// import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ImportContacts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, jasminGroups } = useSelector((state) => state.jasmine);
  const { contactGroups } = useSelector((state) => state.campaigns);

  const [open, setOpen] = useState(false);
  const [stateClients, setStateClients] = useState();
  const [stateGroups, setStateGroups] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    contacts: Yup.mixed().required('Contacts is required'),
  });

  const defaultValues = {
    contacts: null,
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };
  const handleGroups = (event) => {
    setStateGroups(event.target.value);
  };

  useEffect(() => {
    dispatch(getContactGroups());
    dispatch(getClients());
  }, []);

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Upload Success!');

      const bodyFormdata = new FormData();
      bodyFormdata.append('contacts', values.contacts);
      bodyFormdata.append('clientId', stateClients);
      bodyFormdata.append('groupId', stateGroups);

      dispatch(uploadContacts(bodyFormdata));
      // console.log('submit', { clientId: stateClients, groupId: stateGroups, contacts: values.contacts });

      // navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'contacts',
          file,
          // Object.assign(file, {
          //   preview: URL.createObjectURL(file),
          // })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle variant='subtitle2'>Upload only .xls/.csv files</LabelStyle>
                  <Typography variant="body2">Account Owner</Typography>
                  <FormControl sx={{ minWidth: '100%', my: 2 }} size="small">
                    <Select
                      value={stateClients}
                      onChange={handleClients}
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {clients?.map(({ clientId, clientName, contactFname }) => (
                        <MenuItem value={clientId}>
                          {clientName} - {contactFname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography variant="body2">Contact Group</Typography>
                  <FormControl sx={{ minWidth: '100%', my:2 }} size="small">
                    <Select
                      value={stateGroups}
                      onChange={handleGroups}
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {contactGroups?.map(({ groupId, groupName }) => (
                        <MenuItem value={groupId}>{groupName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} />
                  <Card>
                    <CardContent>
                      <Typography variant="body2">{values.contacts && values.contacts.name}</Typography>
                    </CardContent>
                  </Card>
                </div>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Upload
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      {/* <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
