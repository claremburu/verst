// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'system',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'notifications', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'system logs', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'settings', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'users', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'roles', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'projects',
    items: [
      // MANAGEMENT : USER
      {
        title: 'projects',
        path: PATH_DASHBOARD.projects.root,
        icon: ICONS.user,
        children: [
          { title: 'projects dashboard', path: PATH_DASHBOARD.projects.view },
          { title: 'new applications', path: "" },
          { title: 'approved projects', path: "" },
          { title: 'verified projects', path: "" },
          { title: 'project health', path: "" },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'pools',
    items: [
      {
        title: 'pools',
        path: PATH_DASHBOARD.pools.root,
        icon: ICONS.mail,
        children: [
          { title: 'pool dashboard', path: PATH_DASHBOARD.pools.view },
          { title: 'pool management', path: PATH_DASHBOARD.blog.postById },
          { title: 'tokenize pool', path: PATH_DASHBOARD.blog.newPost },
        ],
      },
    ],
  },

  {
    subheader: 'verra',
    items: [
      {
        title: 'verra',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        children: [
          { title: 'verification requests', path: PATH_DASHBOARD.blog.posts },
          { title: 'verified projects', path: PATH_DASHBOARD.blog.postById },
          { title: 'issued carbon credits', path: PATH_DASHBOARD.blog.newPost },
          { title: 'retired carbon credits', path: PATH_DASHBOARD.blog.newPost },
        ],
        info: (
          <Label variant="outlined" color="error">
            NEW
          </Label>
        ),
      },
    ],
  },

  {
    subheader: 'marketplace',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        children: [
          { title: 'listed tokens', path: PATH_DASHBOARD.blog.posts },
          { title: 'purchased tokens', path: PATH_DASHBOARD.blog.postById },
          { title: 'retired tokens', path: PATH_DASHBOARD.blog.newPost },
          { title: 'platform fees', path: PATH_DASHBOARD.blog.newPost },
        ],
      },
    ],
  },

  {
    subheader: 'DAO',
    items: [
      {
        title: 'DAO',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        children: [
          { title: 'DAO dashboard', path: PATH_DASHBOARD.blog.posts },
          { title: 'DAO users', path: PATH_DASHBOARD.blog.postById },
          { title: 'proposals', path: PATH_DASHBOARD.blog.newPost },
          { title: 'treasury', path: PATH_DASHBOARD.blog.newPost },
          { title: 'governance', path: PATH_DASHBOARD.blog.newPost },
        ],
      },
    ],
  },
];

export default navConfig;
