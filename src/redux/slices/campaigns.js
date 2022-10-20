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
  campaigns: [],
  contacts: [],
  contactGroups: [],
  messageTemplates: [],
  campaignMessages: [],
  moMessages: [],
  mtMessages: [],
  senderIds: [],
  products: [],
  purchases: [],
  file: {},
  template: {},
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

    getCampaignsSuccess(state, action) {
      state.isLoading = false;
      state.campaigns = action.payload;
    },

    getCampaignMessagesSuccess(state, action) {
      state.isLoading = false;
      state.campaignMessages = action.payload;
    },

    deleteCampaignSuccess(state, action) {
      const updateCampaigns = state.campaigns.filter((campaign) => campaign?.campaignId !== action.payload);
      state.campaigns = updateCampaigns;
    },

    getTemplatesSuccess(state, action) {
      state.isLoading = false;
      state.messageTemplates = action.payload;
    },

    getPurchaseSuccess(state, action) {
      state.isLoading = false;
      state.purchases = action.payload;
    },

    deleteTemplatesSuccess(state, action) {
      const updateTemplates = state.messageTemplates.filter((template) => template?.templateId !== action.payload);
      state.messageTemplates = updateTemplates;
    },
    createTemplateSuccess(state, action) {
      state.isLoading = false;
      state.messageTemplates = [action.payload, ...state.messageTemplates];
    },

    getMoMessagesSuccess(state, action) {
      state.isLoading = false;
      state.moMessages = action.payload;
    },

    getMtMessagesSuccess(state, action) {
      state.isLoading = false;
      state.mtMessages = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    getContactsSuccess(state, action) {
      state.isLoading = false;
      state.contacts = action.payload;
    },

    uploadContactsSuccess(state, action) {
      state.isLoading = false;
    },
    createContactSuccess(state, action) {
      state.isLoading = false;
      state.contacts = [action.payload, ...state.contacts];
    },
    deleteContactSuccess(state, action) {
      const updateContacts = state.contacts.filter((contact) => contact?.contactId !== action.payload);
      state.contacts = updateContacts;
    },

    listGroupsSuccess(state, action) {
      state.isLoading = false;
      state.listedGroups = action.payload;
    },

    fileUploadSuccess(state, action) {
      state.isLoading = false;
      state.uploadedFile = action.payload;
    },

    getContactGroupsSuccess(state, action) {
      state.isLoading = false;
      state.contactGroups = action.payload;
    },

    createGroupSuccess(state, action) {
      state.isLoading = false;
      state.contactGroups = [action.payload, ...state.contactGroups];
    },

    createCampaignsSuccess(state, action) {
      state.isLoading = false;
      state.campaigns = [action.payload, ...state.campaigns];
    },
    createPurchasesSuccess(state, action) {
      state.isLoading = false;
      state.purchases = [action.payload, ...state.purchases];
    },

    importContactsSuccess(state, action) {
      state.isLoading = false;
      state.file = action.payload
    },

    uploadTemplateSuccess(state, action) {
      state.isLoading = false;
      state.template = action.payload
    },

    deleteContactGroupSuccess(state, action) {
      const updateContactGroups = state.contactGroups.filter(
        (contactGroup) => contactGroup?.groupId !== action.payload
      );
      state.contactGroups = updateContactGroups;
    },

    getSenderIdsSuccess(state, action) {
      state.isLoading = false;
      state.senderIds = action.payload;
    },
    createSenderIdsSuccess(state, action) {
      state.isLoading = false;
      state.senderIds = [action.payload, ...state.senderIds];
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
  listGroupsSuccess,
  fileUploadSuccess,
  uploadTemplateSuccess,
} = slice.actions;

export function getCampaigns() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/campaigns');
      dispatch(slice.actions.getCampaignsSuccess(response.data.campaigns));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPurchases() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/purchases');
      dispatch(slice.actions.getPurchaseSuccess(response.data.purchases));

    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCampaign(campaignId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v2/Verstapps/campaigns/${campaignId}`);
      // console.log(response, 'delete campaign');
      if (response.status === 200) {
        dispatch(slice.actions.deleteCampaignSuccess(campaignId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCampaignsWithMessages() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/sms/todeliver?pageSize=100&pagetToken=');
      dispatch(slice.actions.getCampaignMessagesSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMoMessages() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/v2/Verstapps/sms/mt?pageSize=100&pagetToken=&filter.campaignIds=1&filter.campaignIds=2'
      );
      dispatch(slice.actions.getMoMessagesSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMtMessages() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/v2/Verstapps/sms/mt?pageSize=100&pagetToken=&filter.campaignIds=1&filter.campaignIds=2'
      );
      dispatch(slice.actions.getMtMessagesSuccess(response.data.messages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createContact(contact) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/contacts', { contact });
      if (response.status === 200) {
        dispatch(slice.actions.createContactSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function createPurchase(purchase) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/purchases', { purchase });
      if (response.status === 200) {
        dispatch(slice.actions.createPurchasesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getContacts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/contacts');
      dispatch(slice.actions.getContactsSuccess(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function uploadContacts(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/contacts:uploadContact', body);
      dispatch(slice.actions.uploadContactsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function importContacts(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:importContact', body);
      dispatch(slice.actions.importContactsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function uploadTemplate(body) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/sms:sendFromFileStep1', body);
      dispatch(slice.actions.uploadTemplateSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteContact(contactId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v2/Verstapps/contacts/${contactId}`);
      // console.log(response, 'delete contact');
      if (response.status === 200) {
        dispatch(slice.actions.deleteContactSuccess(contactId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
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

export function createSenderIds(senderId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/senderids', { senderId });
      if (response.status === 200) {
        dispatch(slice.actions.createSenderIdsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSenderIds() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v2/Verstapps/senderids');
      dispatch(slice.actions.getSenderIdsSuccess(response.data.senderIds));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createContactGroups(group) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/campaigns/groups', { group });
      if (response.status === 200) {
        dispatch(slice.actions.createGroupSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteContactGroup(groupId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v2/Verstapps/campaigns/groups/${groupId}`);
      // console.log(response, 'delete contact groups');
      if (response.status === 200) {
        dispatch(slice.actions.deleteContactGroupSuccess(groupId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMessageTemplates() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/campaigns/messagetemplates');
      dispatch(slice.actions.getTemplatesSuccess(response.data.messageTemplates));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createMessageTemplate(messageTemplate) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/campaigns/messagetemplates', { messageTemplate });
      if (response.status === 200) {
        dispatch(slice.actions.createTemplateSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteMessageTemplate(templateId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/campaigns/messagetemplates/${templateId}`);
      // console.log(response, 'delete message templates');
      if (response.status === 200) {
        dispatch(slice.actions.deleteTemplatesSuccess(templateId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
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

// create campaigns....
export function createCampaigns(campaign) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/campaigns', { campaign });
      if (response.status === 200) {
        dispatch(slice.actions.createCampaignsSuccess(response.data));
      }
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
