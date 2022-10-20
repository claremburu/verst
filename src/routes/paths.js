// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  activateAccount: path(ROOTS_AUTH, '/activate-account'),
  activateOtp: path(ROOTS_AUTH, '/activate-otp'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
  onboarding: path(ROOTS_AUTH, '/onboarding'),
  // otp: path(ROOTS_AUTH, '/otp'),
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  jasmin: {
    root: path(ROOTS_DASHBOARD, '/jasmin'),
    groups: path(ROOTS_DASHBOARD, '/jasmin/groups'),
    users: path(ROOTS_DASHBOARD, '/jasmin/users'),
    providers: path(ROOTS_DASHBOARD, '/jasmin/smpp-providers'),
    newGroup: path(ROOTS_DASHBOARD, '/jasmin/new'),
  },
  routes: {
    root: path(ROOTS_DASHBOARD, '/routes'),
    filters: path(ROOTS_DASHBOARD, '/routes/route-filters'),
    moroutes: path(ROOTS_DASHBOARD, '/routes/mo/mt-routes'),
    suppliers: path(ROOTS_DASHBOARD, '/routes/suppliers'),
  },

  // issue wtih routing......
  campaigns: {
    root: path(ROOTS_DASHBOARD, '/campaigns'),
    campaigns: path(ROOTS_DASHBOARD, '/campaigns/campaigns'),
    contacts: path(ROOTS_DASHBOARD, '/campaigns/contacts'),
    groups: path(ROOTS_DASHBOARD, '/campaigns/contact-groups'),
    templates: path(ROOTS_DASHBOARD, '/campaigns/templates'),
    importTemplates: path(ROOTS_DASHBOARD, '/campaigns/import-templates'),
    create: path(ROOTS_DASHBOARD, '/campaigns/create'),
    import: path(ROOTS_DASHBOARD, '/campaigns/import'),
    messages: path(ROOTS_DASHBOARD, '/campaigns/campaign-messages'),
    newMessage: path(ROOTS_DASHBOARD, '/campaigns/create-message'),
    senderIds: path(ROOTS_DASHBOARD, '/campaigns/sender-ids'),
  },
  // onboarding: {
  //   root: path(ROOTS_DASHBOARD, '/onboarding'),
  //   // home: path(ROOTS_DASHBOARD, '/onboarding/home')
  // },
  messaging: {
    root: path(ROOTS_DASHBOARD, '/messaging'),
    send: path(ROOTS_DASHBOARD, '/messaging/send-messages'),
    inbox: path(ROOTS_DASHBOARD, '/messaging/sms-inbox'),
    sent: path(ROOTS_DASHBOARD, '/messaging/sent-messages'),
  },
  purchases: path(ROOTS_DASHBOARD, '/purchases'),
  clients: path(ROOTS_DASHBOARD, '/clients'),
  view: path(ROOTS_DASHBOARD, '/view'),
  settings: path(ROOTS_DASHBOARD, '/settings'),
  account: path(ROOTS_DASHBOARD, '/account'),
  edituser: path(ROOTS_DASHBOARD, '/edituser'),
  contact: path(ROOTS_DASHBOARD, '/contact'),
};

