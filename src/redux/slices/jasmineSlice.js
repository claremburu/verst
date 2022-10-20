import { createSlice } from '@reduxjs/toolkit';
import config from './config';

const baseUrl = 'https://18.168.211.166';

const initialState = {
  groups: [],
  smpp: [],
  users: [],
  error: null,
};

const jasmineSlice = createSlice({
  name: 'jasmin',
  initialState,
  reducers: {
    // groups
    loadGroups(state, action) {
      state.groups.push = action.payload;
    },
    loadGetGroups(state, action) {
      state.groups = action.payload;
    },
    loadGetSingleUser(state, action) {
      state.users = action.payload;
    },
    removeGroups(state, action) {
      state.groups.splice(action.payload, 1);
    },
    loadUsers(state, action) {
      //
    },

    // smpps client account
    loadSmpps(state, action) {
      state.smpp.push = action.payload;
    },
    loadGetSmpps(state, action) {
      state.smpp = action.payload;
    },
    updateSmpps(state, action) {
      state.smpp = action.payload;
    },
    removeSmpps(state, action) {
      state.smpp.splice(action.payload, 1);
    },
    loadSingleSmpp(state, action) {
      state.smpp = action.payload;
    },
    startClient(state, action) {
      state.smpp = action.payload;
    },
    stopClient(state, action) {
      state.smpp = action.payload;
    },

    // smpp server account
    getUsers(state, action) {
      state.users = action.payload;
    },
    createUsers(state, action) {
      state.users = action.payload;
    },
    deleteUsers(state, action) {
      state.users = action.payload;
    },
    updateUsers(state, action) {
      state.users = action.payload;
    },
    disableUsers(state, action) {
      state.users = action.payload;
    },
    enableUsers(state, action) {
      state.users = action.payload;
    },
    errors(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  // groups
  loadGroups,
  loadGetGroups,
  loadGetSingleUser,
  removeGroups,

  // smpps client account
  loadSmpps,
  loadGetSmpps,
  removeSmpps,
  updateSmpps,
  loadSingleSmpp,
  startClient,
  stopClient,

  // smpp server account
  getUsers,
  createUsers,
  deleteUsers,
  updateUsers,
  disableUsers,
  enableUsers,
  errors,
} = jasmineSlice.actions;

const getGroups = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  loadGetGroups(data.groups);
  // console.log(data);
};

export const loadJasmineGroupsThunk = async (token) => {
  await getGroups(localStorage.getItem('token'));
  // console.log('creating group');
  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  const data = await response.json();
  if (response.status === 200) {
    loadGroups(data);
  }
  // console.log(data);
};

export const removeJasmineGroupsThunk = async (token) => {
  await getGroups(localStorage.getItem('token'));
  // console.log('deleting group');
  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.setItem('token')}`,
    }),
  });
  const data = await response.json();
  removeGroups(data);
  // console.log(data);
};

const getSingleUserThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups/{groupId}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  loadGetSingleUser(data);
  // console.log(data);
};

// smpps ...

const getSmppProvidersThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/smpp-providers`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  loadGetSmpps(data);
  // console.log(data);
};

const loadSmppServerThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/smpp-providers`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  loadSmpps(data);
  // console.log(data);
};

export const removeSmppsThunk = async (token) => {
  await getGroups(localStorage.getItem('token'));
  // console.log('deleting group');
  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.setItem('token')}`,
    }),
  });
  const data = await response.json();
  removeSmpps(data);
  // console.log(data);
};

export const updateSmppsThunk = async (token) => {
  await getGroups(localStorage.getItem('token'));
  // console.log('deleting group');
  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/groups`, {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.setItem('token')}`,
    }),
  });
  const data = await response.json();
  updateSmpps(data);
  // console.log(data);
};

const getSingleSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/smpp-providers{smppProviderId}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  loadSingleSmpp(data);
  // console.log(data);
};

const startClientThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/smpp-providers:startClient`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  startClient(data);
  // console.log(data);
};

const stopClientThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/smpp-providers:stopClient`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  stopClient(data);
  // console.log(data);
};

// smpp server account
const createSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/users`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  createUsers(data);
  // console.log(data);
};

const getSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`$${baseUrl}/v1/Verstapps/jasmin/users`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  getUsers(data);
  // console.log(data);
};

const UpdateSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/users`, {
    method: 'PATCH',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  updateUsers(data);
  // console.log(data);
};

const DeleteSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/users{userId}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  deleteUsers(data);
  // console.log(data);
};

const DisableSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/users:disableAccount`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  disableUsers(data);
  // console.log(data);
};

const EnableSmppThunk = async (token) => {
  // console.log('getting group');

  const response = await fetch(`${baseUrl}/v1/Verstapps/jasmin/users:enableAccount`, {
    method: 'DELETE',
    body: JSON.stringify({}),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  enableUsers(data);
  // console.log(data);
};

export default jasmineSlice.reducer;
