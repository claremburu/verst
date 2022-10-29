import { yupResolver } from '@hookform/resolvers/yup';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Step, StepLabel, Stepper } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { FormProvider } from '../../components/hook-form';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import AllSet from './AllSet';
import Details from './Details';
import Financial from './Financial';
import Home from './Home';
import Project from './Project';

const drawerWidth = 300;

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.vertical}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.vertical}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.vertical}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsPowerIcon />,
    2: <PersonIcon />,
    3: <DescriptionIcon />,
    4: <StorageIcon />,
    5: <DoneIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Welcome',
    description: <Home />,
  },
  {
    label: 'Your Details',
    description: <Details />,
  },
  {
    label: 'Project Details',
    description: <Project />,
  },
  {
    label: 'Financial Details',
    description: <Financial />,
  },
  {
    label: 'You are all set',
    description: <AllSet />,
  },
];

function Welcome(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setComplete(navigate('dashboard/projects/view'))
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleComplete = () => {
    navigate('dashboard/projects/view');
  };

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Username must be a valid email address').required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: 'root@Verstmedia.com',
    password: 'hakty11',
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
      navigate('dashboard/projects/view');
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{ mx: 2 }}
        // alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} orientation="vertical">
              {step.label}
            </StepLabel>
          </Step>
         ))}
        <Divider sx={{my:2}}/>
        <ListItem key="1" disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard/app")}>
            <ListItemText primary="Go to your portal" />
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Stepper>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex' }}>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          {/* <Toolbar /> */}
          {steps[activeStep].description}
          <Box sx={{ mb: 2 }}>
            <div>
              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
}

Welcome.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Welcome;
