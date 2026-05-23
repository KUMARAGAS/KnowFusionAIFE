import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    selectedId: null,
    uploadError: null,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setUploadError: (state, action) => {
      state.uploadError = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setSelectedId, setUploadError } = uiSlice.actions;
export default uiSlice.reducer;
