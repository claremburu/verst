import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  sentMessages: [],
  sendMessage: [],
  messages: [],
  composedMessage: [],
  file:{},
  sendFile:{},
  filePreview: {},
  sendMessage3: [],
  inbox: [],
  deliveryStats: [],
  product: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    getSentMessagesSuccess(state, action) {
      state.isLoading = false;
      state.sentMessages = action.payload;
    },

    getSmsInboxSuccess(state, action) {
      state.isLoading = false;
      state.inbox = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
    getContactGroupsSuccess(state, action) {
      state.isLoading = false;
      state.contactGroups = action.payload;
    },
    uploadTemplateSuccess(state, action) {
      state.isLoading = false;
      state.template = action.payload
    },
    sendFromFileSuccess(state, action) {
      state.isLoading = false;
      state.sendFile = action.payload
    },
    previewFileSuccess(state, action){
      state.isLoading = false;
      state.filePreview = action.payload
    },
    sendMessageSuccess(state, action) {
      state.isLoading = false;
      state.sendMessage3 = action.payload
    },
    createStatsSuccess(state, action) {
      state.isLoading = false;
      state.sendMessage3 = action.payload
    },
    createUserSuccess(state, action) {
      state.isLoading = false;
      state.sendMessage = [action.payload, ...state.sendMessage];
    },
    composeMessageSuccess(state, action) {
      state.isLoading = false;
      state.composedMessage = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = state.checkout.cart.map((_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
  uploadTemplateSuccess,
  sendFromFileSuccess,
} = slice.actions;

// export function getSentMessages() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/v1/Verstapps/campaigns/campaigns');
//       dispatch(slice.actions.getSentMessagesSuccess(response.data.campaigns));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

export function getContacts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/campaigns/contacts');
      dispatch(slice.actions.getProductsSuccess(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getContactGroups() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/campaigns/groups');
      dispatch(slice.actions.getContactGroupsSuccess(response.data.groups));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSmsInbox() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/messaging/messages/mo');
      dispatch(slice.actions.getSmsInboxSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProviders() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/smpp-providers');
      dispatch(slice.actions.getProductsSuccess(response.data.jasminSmppProviders));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSentMessages() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/messaging/messages/mt');
      dispatch(slice.actions.getSentMessagesSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function listSmsToDeliver() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/sms/todeliver?pageSize=100&pagetToken=');
      dispatch(slice.actions.getSentMessagesSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProduct(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products/product', {
        params: { name },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteMessage(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/jasmin/messaging/messages/${id}`);
      dispatch(slice.actions.getProductsSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function composeMessage(campaign) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:compose', campaign );
      if (response.status === 200) {
        dispatch(slice.actions.composeMessageSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendMessage(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:sendSMS',  body);
      if (response.status === 200) {
        dispatch(slice.actions.sendMessageSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendFromFile(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:sendFromFileStep2', body);
      dispatch(slice.actions.sendFromFileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendFromFileStep3(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:sendSMS', body);
      dispatch(slice.actions.sendMessageSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function previewFile(params) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post( `/v2/Verstapps/sms:sendFromFilePreview`, null, {
        params:{
          message: params.message,
          uploadId: params.uploadId,
          msisdnField: params.msisdnField
        }
      });
      dispatch(slice.actions.previewFileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function smsDeliveryStats(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/sms:dailyDeliveryStats',  body);
      if (response.status === 200) {
        dispatch(slice.actions.createStatsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}