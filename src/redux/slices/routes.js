// import { createSlice } from '@reduxjs/toolkit';
// import sum from 'lodash/sum';
// import uniqBy from 'lodash/uniqBy';
// // utils
// import axios from '../../utils/axios';
// //
// import { dispatch } from '../store';

// // ----------------------------------------------------------------------

// const initialState = {
//   isLoading: false,
//   error: null,
//   routes: [],
//   product: null,
//   sortBy: null,
//   filters: {
//     gender: [],
//     category: 'All',
//     colors: [],
//     priceRange: '',
//     rating: '',
//   },
//   checkout: {
//     activeStep: 0,
//     cart: [],
//     subtotal: 0,
//     total: 0,
//     discount: 0,
//     shipping: 0,
//     billing: null,
//   },
// };

// const slice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     // START LOADING
//     startLoading(state) {
//       state.isLoading = true;
//     },

//     // HAS ERROR
//     hasError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },

//     // GET routes
//     getGroupsSuccess(state, action) {
//       console.log('getGroupsSuccess', action.payload);	
//       state.isLoading = false;
//       state.routes = action.payload;
//     },

//     // GET PRODUCT
//     getGroupSuccess(state, action) {
//       state.isLoading = false;
//       state.product = action.payload;
//     },

//     //  SORT & FILTER routes
//     sortByroutes(state, action) {
//       state.sortBy = action.payload;
//     },

//     filterroutes(state, action) {
//       state.filters.gender = action.payload.gender;
//       state.filters.category = action.payload.category;
//       state.filters.colors = action.payload.colors;
//       state.filters.priceRange = action.payload.priceRange;
//       state.filters.rating = action.payload.rating;
//     },

//     deleteCart(state, action) {
//       const updateCart = state.checkout.cart.filter((item) => item.id !== action.payload);
//       state.checkout.cart = updateCart;
//     },
//   },
// });

// // Reducer
// export default slice.reducer;

// // Actions
// export const {
//   deleteCart,
//   sortByroutes,
//   filterroutes,
//   getGroupsSuccess,
// } = slice.actions;

// // ----------------------------------------------------------------------

// export function getGroups() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/v1/Verstapps/jasmin/groups');
//       console.log('get groups',slice.actions(response.data.jasminGroups))
//       dispatch(slice.actionsgetGroupsSuccess(response.data.jasminGroups));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getGroup(name) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/routes/product', {
//         params: { name },
//       });
//       dispatch(slice.actions.getGroupSuccess(response.data.product));
//     } catch (error) {
//       console.error(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }



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
  filters: [],
  moroutes: [],
  mtroures:[],
  suppliers: [],
  clients: [],
  product: null,
  sortBy: null,
  // filters: {
  //   gender: [],
  //   category: 'All',
  //   colors: [],
  //   priceRange: '',
  //   rating: '',
  // },
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

    // GET route filters
    getfiltersSuccess(state, action) {
      state.isLoading = false;
      state.filters = action.payload;
    },

    // delete route filters
    deleteFilterSuccess(state, action) {
      state.isLoading = false;
      state.filters = state.filters.filter((filter) => filter?.filterId !== action.payload);
    },

    createFilterSuccess(state, action) {
      state.isLoading = false;
      state.filters = [action.payload, ...state.filters];
    },
    getroutesSuccess(state, action) {
      state.isLoading = false;
      state.moroutes = action.payload;
    },
    createMoRoutesSuccess(state, action) {
      state.isLoading = false;
      state.moroutes = [action.payload, ...state.moroutes];
    },
    createMtRoutesSuccess(state, action) {
      state.isLoading = false;
      state.mtroutes = [action.payload, ...state.mtroutes];
    },
    deleteRoutesSuccess(state, action) {
      state.isLoading = false;
      state.moroutes = state.moroutes.filter((route) => route?.routeId !== action.payload);
    },
    getsuppliersSuccess(state, action) {
      state.isLoading = false;
      state.suppliers = action.payload;
    },
    createSupplierSuccess(state, action) {
      state.isLoading = false;
      state.suppliers = [ action.payload,  ...state.suppliers];
    },
    deleteSupplierSuccess(state, action) {
      state.isLoading = false;
      state.suppliers = state.suppliers.filter((supplier) => supplier?.supplierId !== action.payload);
    },
    updateSuppliersSuccess(state, action) {
      state.isLoading = false;
      state.suppliers = state.suppliers.map((supplier) => {
        if (supplier.supplierId === action.payload.supplierId) {
          return action.payload;
        }
        return supplier;
      });
    },

    // GET PRODUCT
    getroutesuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    getClientsSuccess(state, action) {
      state.isLoading = false;
      state.clients = action.payload;
    },
    getProvidersSuccess(state, action) {
      state.isLoading = false;
      state.providers = action.payload;
    },

    //  SORT & FILTER routes
    sortByroutes(state, action) {
      state.sortBy = action.payload;
    },

    filterroutes(state, action) {
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
  sortByroutes,
  filterroutes,
} = slice.actions;

// smpp route filters
export function getRouteFilters() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/route-filters');
      // console.log(response, 'fetch filters');
      dispatch(slice.actions.getfiltersSuccess(response.data.filters));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteRouteFilters(filterId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/route-filters/${filterId}`);
      // console.log(response, 'delete filters');
      if (response.status === 200) {
        dispatch(slice.actions.deleteFilterSuccess(filterId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createFilter(filter) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/route-filters', { filter });
      if (response.status === 200) {
        dispatch(slice.actions.createFilterSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// smpp mop/mt routes
export function getRoutes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/routes');
      dispatch(slice.actions.getroutesSuccess(response.data.routes));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createMoRoutes(route) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/routes:createMORoute', { route });
      if (response.status === 200) {
        dispatch(slice.actions.createMoRoutesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createMtRoutes(route) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v2/Verstapps/routes:createMTRoute', { route });
      if (response.status === 200) {
        dispatch(slice.actions.createMtRoutesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function deleteRoutes(routeId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/routes/${routeId}`);
      // console.log(response, 'delete routes');
      if (response.status === 200) {
        dispatch(slice.actions.deleteRoutesSuccess(routeId));
      }
      // dispatch(slice.actions.getProductsSuccess(response.data.smppUsers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// route suppliers
export function getSuppliers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/Verstapps/suppliers');
      dispatch(slice.actions.getsuppliersSuccess(response.data.suppliers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSuppliers(supplierId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/v1/Verstapps/suppliers/${supplierId}`);
      // console.log(response, 'delete suppliers');
      if (response.status === 200) {
        dispatch(slice.actions.deleteSupplierSuccess(supplierId));
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
      dispatch(slice.actions.getProvidersSuccess(response.data.jasminSmppProviders));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createSuppliers(supplier) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/Verstapps/routes/suppliers', { supplier });
      if (response.status === 200) {
        dispatch(slice.actions.createSupplierSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateSupplier(supplier) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch('/v1/Verstapps/suppliers', { ...supplier });
      dispatch(slice.actions.updateSuppliersSuccess(response.data.suppliers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getProduct(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/routes/product', {
        params: { name },
      });
      dispatch(slice.actions.getroutesuccess(response.data.product));
    } catch (error) {
      console.error(error);
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

// export function getFilters() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/v1/Verstapps/route-filters');
//       dispatch(slice.actions.getfiltersSuccess(response.data.filters));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

