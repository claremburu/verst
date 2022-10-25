import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// import Logo from '/logo/logo_full.svg'
// import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';
import { OnboardingLayout, Welcome } from '../../sections/onboarding';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding:theme.spacing(12,0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 480,
  margin: 'auto',
  // display: 'flex',
  minHeight: '100vh',
  // flexDirection: 'column',
  // justifyContent: 'center',
  padding: theme.spacing(12),
}));

// ----------------------------------------------------------------------

export default function DeveloperOnboarding() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Onboarding">
      <RootStyle>
        <Container maxWidth="xl">
          <ContentStyle>
           <Welcome/>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
