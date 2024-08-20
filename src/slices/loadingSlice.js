import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false, // Initial state indicating loading is not active
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true; // Set loading state to true
    },
    hideLoader: (state) => {
      state.isLoading = false; // Set loading state to false
    },
  },
});

// Export actions to be used in components or thunks
export const { showLoader, hideLoader } = loadingSlice.actions;

// Export the reducer to be included in the store
export default loadingSlice.reducer;
