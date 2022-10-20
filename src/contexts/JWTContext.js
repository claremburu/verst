import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------
const initialState = {
  isAuthenticated: false,
  user: {},
  isInitialized: false,
};

const storeName = 'Verstapps';

const saveToLocalStorage = (state) => {
  try {
    const stringState = JSON.stringify(state);
    localStorage.setItem(storeName, stringState);
  } catch (err) {
    // console.log('Error saving state to async storage: ', err);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stringState = localStorage.getItem(storeName);
    if (stringState === null) return undefined;
    // setPersistedStorage(JSON.parse(stringState));
    return JSON.parse(stringState);
  } catch (err) {
    return undefined;
  }
};

// const initialState = {
//   isAuthenticated: true, // TODO: remove this
//   isInitialized: true,
//   user: {
//     clientId: '24',
//     clientName: 'clarem',
//     isTrial: false,
//     mainAccount: '',
//     accountType: '',
//     defaultCurrency: 'KSH',
//     address: '',
//     clientCity: '',
//     clientState: '',
//     clientCountry: '',
//     clientZipPostal: '',
//     clientWebsite: '',
//     contactFname: 'clare',
//     contactLname: 'mburu',
//     contactNumber: '',
//     clientEmail: 'clareVerst@test.com',
//     clientPassword: '',
//     profileUrl: '',
//     clientStatus: 'Active',
//     clientAccessLevel: 'ADMINISTRATOR',
//     clientBrandDomain: '',
//     clientBrandName: '',
//     clientBrandEmailSenderName: '',
//     clientBrandEmailSenderAddress: '',
//     lastLoginIp: '',
//     lastLogin: '2022-06-08T07:47:23Z',
//     createdAt: '2022-06-07T07:53:47Z',
//     clientOwnerId: 24,
//     uiPrefs: {},
//   },
// };

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user, refreshToken } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      refreshToken,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    // const { createdUser } = action.payload;

    return {
      ...state,
      // createdUser,
    };
  },
  REQUEST_OTP: (state, action) => {
    const { tempJwt, phone } = action.payload;

    return {
      ...state,
      tempJwt,
      phone,
    };
  },
  ACTIVATE_OTP: (state, action) => {
    const { code, message } = action.payload;
    if (code && message) {
      return {
        ...state,
      };
    }

    return {
      ...state,
      clientStatus: 'Active',
    };
  },
  UPDATE_USER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  RESET_PASSWORD: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  activateOtp: () => Promise.resolve(),
  requestOtp: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [persistedState, setPersistedState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, persistedState);

  // useEffect(() => {
  //   const persistedState = localStorage.getItem(storeName);
  //   if (persistedState) {
  //     setPersistedState(JSON.parse(persistedState));
  //   }
  // },[]);

  // useEffect(() => {
  //   if(persistedState !== initialState) {
  //     localStorage.setItem(storeName, JSON.stringify(persistedState));
  //   }

  // },[state])

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        // console.log('state', state);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.post('/v1/Verstapps/clients:refreshSession', {
            refreshToken: localStorage.getItem('refreshToken'),
            clientId: localStorage.getItem('clientId'),
          });

          const { token, client: user } = response.data;

          setSession(token);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [state?.refreshToken, state.user?.clientId]);

  const login = async (username, password) => {
    const response = await axios.post('/v1/Verstapps/clients:signIn', {
      username,
      password,
    });
    const { token: accessToken, client: user, refreshToken } = response.data;

    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('clientId', user.clientId);
    // localStorage.setItem("clientId",user.clientId);

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        refreshToken,
      },
    });
  };

  const register = async (email, password, firstName, lastName, phone) => {
    const response = await axios.post('/v1/Verstapps/clients', {
      client: {
        clientEmail: email,
        clientPassword: password,
        contactFname: firstName,
        contactLname: lastName,
        clientName: `${firstName} ${lastName}`,
        clientAccessLevel: 'ADMINISTRATOR',
        clientOwnerId: '14',
        contactNumber: phone,
      },
    });
    const createdUser = response.data;

    dispatch({
      type: 'REGISTER',
      payload: {
        createdUser,
      },
    });
  };

  const requestOtp = async (phone) => {
    const response = await axios.post('/v1/Verstapps/clients:requestActivateAccountOTP', {
      phone
    });
    const { tempJwt } = response.data;

    dispatch({
      type: 'REQUEST_OTP',
      payload: {
        tempJwt,
        phone
      },
    });
  };

  const activateOtp = async (otp) => {
    console.log(state, 'context state');

    const response = await axios.post(
      '/v1/Verstapps/clients:activateAccountOTP',
      {
        phone: state.phone,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${state?.tempJwt} `,
        },
      }
    );
  };

  const updateUser = async (user) => {
    const response = await axios.patch(`/v1/Verstapps/clients:updateClientField`, {
      client: user,
    });
    const updatedUser = response.data;

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        user: updatedUser,
      },
    });
  };

  const resetPassword = async (email) => {
    const response = await axios.post('/v1/Verstapps/clients:updatePassword', {
      clientEmail: email,
    });
    const user = response.data;

    dispatch({
      type: 'RESET_PASSWORD',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        updateUser,
        resetPassword,
        requestOtp,
        activateOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
