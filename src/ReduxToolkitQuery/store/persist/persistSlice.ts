import {createSlice} from '@reduxjs/toolkit';

const persistSlice = createSlice({
  name: 'persist',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = null;
    },
  },
});

export const {setToken, clearToken} = persistSlice.actions;
export default persistSlice;
