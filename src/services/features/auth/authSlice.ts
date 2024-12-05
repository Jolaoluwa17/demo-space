import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    email: '',
    password: '',
    isAuthenticated: false,
    token: null,
    emailVerified: false,
    userType: '',
  },
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.userType = action.payload.userType;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.emailVerified = action.payload.emailVerified;
      state.id = action.payload.id;
      state.userType = action.payload.userType;

      sessionStorage.setItem('token', action.payload.token ?? '');
      sessionStorage.setItem('userType', action.payload.userType ?? '');
      sessionStorage.setItem('id', action.payload.id ?? '');
    },
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
      state.token = null;
      state.userType = '';

      // Clear AsyncStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userType');
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setCredentials, setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
