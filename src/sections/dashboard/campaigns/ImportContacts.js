import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FormProvider, RHFUploadSingleFile } from '../../../components/hook-form';
import { getContactGroups, uploadContacts } from '../../../redux/slices/campaigns';
// form

// @mui

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ImportContacts() {
  const dispatch = useDispatch();
  const { contactGroups } = useSelector((state) => state.campaigns);
  const { enqueueSnackbar } = useSnackbar();
  const [stateValue, setStateValue] = useState();
  const [stateClients, setStateClients] = useState();
  const [stateGroups, setStateGroups] = useState();
  //   const [values, setValues] = useState();

  const handleChange = (event, newValue) => {
    setStateValue(newValue);
  };

  const handleShowGroups = () => {
    dispatch(getContactGroups());
  };

  useEffect(() => {
    dispatch(getContactGroups());
  }, [dispatch]);

  const ContactsSchema = Yup.object().shape({
    contacts: Yup.mixed().required('Contacts is required'),
  });

  const defaultValues = {
    contacts: null,
  };

  const methods = useForm({
    resolver: yupResolver(ContactsSchema),
    defaultValues,
  });

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
      //   handleClosePreview();
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={stateValue} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Groups" {...a11yProps(0)} />
            <Tab label="From File(.xslx, .csv)" {...a11yProps(1)} />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={stateValue} index={0}>
          {contactGroups.map(({ groupName }) => (
            <ListItem>
              <ListItemText>{groupName}</ListItemText>
              {/* <Divider/> */}
            </ListItem>
          ))}
        </TabPanel>
        <TabPanel value={stateValue} index={1}>
          <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} />
           <Card sx={{my:1}}>
            <CardContent>
              <Typography variant="body2">{values.contacts && values.contacts.name}</Typography>
            </CardContent>
          </Card>
          <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
            Upload
          </LoadingButton>
          {/* <ImportContacts/> */}
        </TabPanel>
      </Box>
    </FormProvider>
  );
}
