// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

// const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const ICONS = {
  dashboard: getIcon('bxs:dashboard'),
  routes: getIcon('ic:round-alt-route'),
  jasmin: getIcon('ic:round-groups'),
  campaigns: getIcon('material-symbols:campaign-rounded'),
  messaging: getIcon('bxs:message'),
  purchases: getIcon('ic:round-shopping-cart'), 
  clients: getIcon('bxs:user'),
  settings: getIcon('ic:round-settings'),
  account: getIcon('ic:round-account-circle'),
  contact: getIcon('ic:round-contact-mail'),
  edituser: getIcon('ic:round-edit'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {items:[
    { title: 'welcome', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    { title: 'your details', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    { title: 'project details', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    { title: 'financial details', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    { title: 'you are all set', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
     
    ]}
    // ],
  // },

  // APP
  // ---------------------------------------------------------------------
];

export default navConfig;
