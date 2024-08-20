import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch lists
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await fetch('http://localhost:5000/users/1'); // Adjust the endpoint to fetch the user and their lists
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  // Extract the lists from the response
  if (!data.lists || !Array.isArray(data.lists)) {
    throw new Error('Unexpected data format');
  }

  return data.lists; // Return the lists array from the data
});

// Create a new list

// Create a new list for a specific user
export const createList = createAsyncThunk('lists/createList', async ({ userId, newList }) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error details:', errorDetails);
      throw new Error('Failed to create list');
    }

    return response.json();
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
});



// Update an existing list
export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
  const response = await fetch(`http://localhost:5000/users/1/lists/${updatedList.id}`, { // Adjust the endpoint as needed
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedList),
  });
  if (!response.ok) {
    throw new Error('Failed to update list');
  }
  return response.json();
});

// Delete a list
export const deleteList = createAsyncThunk('lists/deleteList', async (listId) => {
  const response = await fetch(`http://localhost:5000/users/1/lists/${listId}`, { // Adjust the endpoint as needed
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete list');
  }
  return listId;
});

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch lists
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create a list
      .addCase(createList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update a list
      .addCase(updateList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.lists.findIndex(list => list.id === action.payload.id);
        if (index >= 0) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete a list
      .addCase(deleteList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = state.lists.filter(list => list.id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listsSlice.reducer;
