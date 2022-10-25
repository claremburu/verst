import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
// import CreateCampaigns from 'src/pages/dashboard/CreateCampaigns';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard/app')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: 'activate-otp',
          element: <ActivateOtp />,
        },
        {
          path: 'activate-account',
          element: <ActivateAccount />,
        },
        // { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'onboarding', element: <DeveloperOnboarding /> },
        // { path: 'otp', element: <OTP /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
          <DashboardLayout />
        // </AuthGuard>

        // {/* <AuthGuard>
        // </AuthGuard> */}
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'jasmin',
          children: [
            // { element: <Navigate to="/dashboard/jasmin/groups" replace />, index: true },
            { path: 'groups', element: <JasminGroups /> },
            { path: 'users', element: <JasminUsers /> },
            { path: 'smpp-providers', element: <SmppProviders /> },
            // { path: 'new', element: <JasminCreate /> },
          ],
        },
        {
          path: 'routes',
          children: [
            // { element: <Navigate to="/dashboard/filters" replace />, index: true },
            { path: 'route-filters', element: <RouteFilters /> },
            { path: 'mo/mt-routes', element: <MORoutes /> },
            { path: 'suppliers', element: <Suppliers /> },
          ],
        },
        {
          path: 'campaigns',
          children: [
            // { element: <Navigate to="/dashboard/campaign-manager/campaigns" replace />, index: true },
            { path: 'campaigns', element: <Campaigns /> },
            { path: 'contacts', element: <Contacts /> },
            { path: 'contact-groups', element: <ContactGroups /> },
            { path: 'templates', element: <MessageTemplates /> },
            { path: 'import-templates', element: <ImportMessageTemplate /> },
            { path: 'create', element: <CreateCampaigns /> },
            { path: 'import', element: <ImportContacts /> },
            { path: 'campaign-messages', element: <CampaignMessages /> },
            {path: 'create-message', element: <SendFromTemplates />},
            {path: 'sender-ids', element: <SenderIds />},
          ],
        },
        {
          path: 'messaging',
          children: [
            // { element: <Navigate to="/dashboard/sent-messages" replace />, index: true },
            { path: 'sent-messages', element: <SentMessages /> },
            { path: 'send-messages', element: <SendMessages /> },
            { path: 'sms-inbox', element: <SmsInbox /> },
          ],
        },
        { path: 'purchases', element: <Purchases /> },
        { path: 'clients', element: <Clients /> },
        { path: 'view/:id', element: <ViewClients /> },
        { path: 'settings', element: <Settings /> },
        { path: 'account', element: <MyAccount /> },
        { path: 'edituser', element: <EditUser /> },
        { path: 'contact', element: <ContactUs /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '/', element: <Navigate to="/auth/login" replace /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const ActivateOtp = Loadable(lazy(() => import('../pages/auth/ActivateOtp')));
const ActivateAccount = Loadable(lazy(() => import('../pages/auth/ActivateAccount')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// const OTP = Loadable(lazy(() => import('../pages/auth/OTP')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/DashboardApp')));

// onboarding

const DeveloperOnboarding = Loadable(lazy(() => import('../pages/onboarding/DeveloperOnboarding')));

// Jasmin
const JasminGroups = Loadable(lazy(() => import('../pages/dashboard/JasminGroups')));
const JasminUsers = Loadable(lazy(() => import('../pages/dashboard/JasminUsers')));
// const JasminCreate = Loadable(lazy(() => import('../pages/dashboard/jasmin')));
const SmppProviders = Loadable(lazy(() => import('../pages/dashboard/SmppProviders')));

// Campaigns
const Campaigns = Loadable(lazy(() => import('../pages/dashboard/Campaigns')));
const Contacts = Loadable(lazy(() => import('../pages/dashboard/Contacts')));
const ContactGroups = Loadable(lazy(() => import('../pages/dashboard/ContactGroups')));
const ImportMessageTemplate = Loadable(lazy(() => import('../pages/dashboard/ImportMessageTemplate')));
const MessageTemplates = Loadable(lazy(() => import('../pages/dashboard/MessageTemplates')));
const CreateCampaigns = Loadable(lazy(() => import('../pages/dashboard/CreateCampaigns')));
const UploadContacts = Loadable(lazy(() => import('../sections/dashboard/campaigns')));
const ImportContacts = Loadable(lazy(() => import('../pages/dashboard/ImportContacts')));
const CampaignMessages = Loadable(lazy(() => import('../pages/dashboard/CampaignMessages')));
const SendFromTemplates = Loadable(lazy(() => import('../pages/dashboard/SendFromTemplates')));
const SenderIds = Loadable(lazy(() => import('../pages/dashboard/SenderIds')));

// Routes
const RouteFilters = Loadable(lazy(() => import('../pages/dashboard/RouteFilters')));
const MORoutes = Loadable(lazy(() => import('../pages/dashboard/MtRoutes')));
const Suppliers = Loadable(lazy(() => import('../pages/dashboard/Suppliers')));

// Messaging
const SentMessages = Loadable(lazy(() => import('../pages/dashboard/SentMessage')));
const SendMessages = Loadable(lazy(() => import('../pages/dashboard/SendMessage')));
const SmsInbox = Loadable(lazy(() => import('../pages/dashboard/SmsInbox')));

const Purchases = Loadable(lazy(() => import('../pages/dashboard/Purchases')));
const Clients = Loadable(lazy(() => import('../pages/dashboard/Clients')));
const ViewClients = Loadable(lazy(() => import('../pages/dashboard/ViewClients')));

const MyAccount = Loadable(lazy(() => import('../pages/dashboard/MyAccount')));
const EditUser = Loadable(lazy(() => import('../pages/dashboard/EditUser')));
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));
const ContactUs = Loadable(lazy(() => import('../pages/dashboard/ContactUs')));

// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));