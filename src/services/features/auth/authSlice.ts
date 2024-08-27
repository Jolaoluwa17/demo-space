import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    isAuthenticated: false,
    accessToken: null,
    emailVerified: false,
    refreshToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.emailVerified = action.payload.emailVerified;

      sessionStorage.setItem('accessToken', action.payload.accessToken ?? '');
      sessionStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
      state.accessToken = null;
      state.emailVerified = true;
      state.refreshToken = null;

      // Clear AsyncStorage
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setCredentials, setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
