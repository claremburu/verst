import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  // products: [],
  clients: [],
  jasminGroups: [],
  smppUsers: [],
  smppProviders: [],
  group: null,
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
  name: 'jasmin',
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
      // console.log(state.products, 'get products');
    },

    getGroupsSuccess(state, action) {
      state.isLoading = false;
      state.jasminGroups = action.payload;
      // console.log(state.jasminGroups, 'get groups');
    },

    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.smppUsers = state.smppUsers.map((user) => {
        if (user.userId === action.payload.userId) {
          return { ...user, ...action.payload };
        }

        return user;
      });
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.product = null;
      // console.log(state.product, 'deleted');
    },

    // groups ......

    deleteGroupSuccess(state, action) {
      state.isLoading = false;
      state = state.jasminGroups.filter((group) => group?.groupId !== action.payload);
    },

    addGroupSuccess(state, action) {
      state.isLoading = false;
      state.jasminGroups.push(action.payload);
      // console.log(state.jasminGroups, 'added group');
    },
    // smpp users ......
    deleteUserSuccess(state, action) {
      state.isLoading = false;
      state = state.smppUsers.filter((user) => user?.userId !== action.payload);
    },

    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.smppUsers = action.payload;
    },

    createUserSuccess(state, action) {
      state.isLoading = false;
      state.smppUsers = [action.payload, ...state.smppUsers];
    },
    createGroupSuccess(state, action){
      state.isLoading = false
      state.jasminGroups = [action.payload, ...state.jasminGroups]
    },

    getClientsSuccess(state, action) {
      state.isLoading = false;
      state.clients = action.payload;
    },

    // ... smpp providers

    // addProviderSuccess(state, action) {
    //   state.isLoading = false;
    //   state.smppProviders.push(action.payload);
    //   console.log(state.smppProviders, 'added group');
    // },
    // smpp providers
    deleteProviderSuccess(state, action) {
      state.isLoading = false;
      state.smppProviders = state.smppProviders.filter((provider) => provider?.smppProviderId !== action.payload);
    },
    getProviderSuccess(state, action) {
      state.isLoading = false;
      state.smppProviders = action.payload;
    },

    createProviderSuccess(state, action){
      state.isLoading = false
      state.smppProviders = [action.payload, ...state.smppProviders]
    },

    // add smpp user
    addUserSuccess(state, action) {
      state.isLoading = false;
      state.smppUsers.push(action.payload);
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
} = slice.actions;

// ----------------------------------------------------------------------
// jasmin groups
export function getGroups() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/groups');
      dispatch(slice.actions.getGroupsSuccess(response.data.jasminGroups));
      // console.log(response.data.jasminGroups, 'jasmin  ');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteGroup(groupId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/jasmin/groups/${groupId}`);
      // console.log(response, 'jasmin delete user');
      if (response.status === 200) {
        dispatch(slice.actions.deleteGroupSuccess(groupId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createGroup(group) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/jasmin/groups', { group });
      if (response.status === 200) {
        dispatch(slice.actions.createGroupSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function updateGroup(group) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/v1/Verstapps/jasmin/groups/${group.id}`, group);
      dispatch(slice.actions.getProductsSuccess(response.data.jasminGroups));
      // console.log(response.data.jasminGroups, 'jasmin ');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// smpp users

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/users');
      dispatch(slice.actions.getUsersSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(user) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch('/v1/Verstapps/jasmin/users', { ...user });
      dispatch(slice.actions.updateUserSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createUser(user) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/jasmin/users', { user });
      if (response.status === 200) {
        dispatch(slice.actions.createUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getClients() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/clients');
      dispatch(slice.actions.getClientsSuccess(response.data.clients));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/jasmin/users/${userId}`);
      // console.log(response, 'jasmin delete user');
      if (response.status === 200) {
        dispatch(slice.actions.deleteUserSuccess(userId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addUser() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/v1/Verstapps/jasmin/users/`);
      // console.log(response, 'jasmin add user');
      if (response.status === 200) {
        dispatch(slice.actions.addUserSuccess(response.data.smppUsers));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

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

// export function deleteGroup(groupId) {
//   console.log(deleteGroup, 'delete Group');
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.delete('/v1/Verstapps/jasmin/groups/', {groupId} );
//       console.log(response)
//       dispatch(slice.actions.deleteGroupSuccess(response.data.jasminGroups));
//     } catch (error) {
//       console.error(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// smpp providers
export function getProviders() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/jasmin/smpp-providers');
      dispatch(slice.actions.getProviderSuccess(response.data.jasminSmppProviders));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSmppProvider(smppProviderId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/jasmin/smpp-providers/${smppProviderId}`);
      // console.log(response, 'jasmin delete user');
      if (response.status === 200) {
        dispatch(slice.actions.deleteProviderSuccess(smppProviderId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createProvider(smppProvider) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/jasmin/smpp-providers', { smppProvider });
      if (response.status === 200) {
        dispatch(slice.actions.createProviderSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}