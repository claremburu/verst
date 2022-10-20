import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import jasmineReducer from './slices/jasmine';
import campaignReducer from './slices/campaigns';
import routeReducer from './slices/routes';
import messasgesReducer from './slices/messaging';
import clientsReducer from './slices/clients';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
 jasmine: jasmineReducer,
 routes: routeReducer,
 campaigns: campaignReducer,
  messaging: messasgesReducer,
  clients: clientsReducer,
});

export { rootPersistConfig, rootReducer };
