import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userid: null,
  isLoggedIn: false,
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.userid = action.payload.userid;
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout(state) {
      state.userid = null;
      state.isLoggedIn = false;
      state.username = '';
    },
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { login, logout, updateUsername } = authSlice.actions;

export default authSlice.reducer;
