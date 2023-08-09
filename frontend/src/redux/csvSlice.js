import { createSlice } from "@reduxjs/toolkit";

const csvSlice = createSlice({
  name: "csv",
  initialState: {
    columns: [],
    data: [],
  },
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setColumns, setData } = csvSlice.actions;

export default csvSlice.reducer;
