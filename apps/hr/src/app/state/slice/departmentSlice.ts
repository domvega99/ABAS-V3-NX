import { Department, fetchAllDepartments, FetchDepartmentsParams } from '@/libs/api-services/masters/departments/department-service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DepartmentsState {
  data: { [key: string]: Department[] };
  count: number;
  searchQuery: string;
  order: 'asc' | 'desc';
  sort: string;
  page: number;
  limit: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DepartmentsState = {
  data: {},
  count: 0,
  searchQuery: '',
  order: 'desc',
  sort: '',
  page: 0,
  limit: 10,
  status: 'idle',
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  '[Departments API]',
  async (params: FetchDepartmentsParams) => await fetchAllDepartments(params)
);

const departmentSlice = createSlice({
  name: '[Departments API]',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
      state.data = {};
    },
    setOrder: (state, action) => {
      state.order = action.payload;
      state.data = {};
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.data = {};
    },
    setPage: (state, action) => {
      state.page = action.payload;
      state.data = {};
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        const { page, limit } = action.meta.arg;
        const key = `${page}-${limit}`;
        state.data[key] = action.payload.data;
        state.count = action.payload.count;
        state.status = 'succeeded';
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching departments';
      });
  },
});

export const { setSearch, setOrder, setSort, setPage, setLimit } = departmentSlice.actions;
export default departmentSlice.reducer;
