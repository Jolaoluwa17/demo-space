import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  id: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  token: string | null;
  emailVerified: boolean;
  userType: string;
}

const initialState: AuthState = {
  id: '',
  email: '',
  password: '',
  isAuthenticated: false,
  token: null,
  emailVerified: false,
  userType: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        userType: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.userType = action.payload.userType;
    },
    setAuthState: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        token: string | null;
        emailVerified: boolean;
        id: string;
        userType: string;
      }>
    ) => {
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

      // Clear sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userType');
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setCredentials, setAuthState, logout, setAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
