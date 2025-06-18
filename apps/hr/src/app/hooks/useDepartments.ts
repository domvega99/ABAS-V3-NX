import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, setPage, setLimit, setSearch, setOrder, setSort } from '../state/slice/departmentSlice';
import { RootState, AppDispatch } from '@/app/state/store';

const useDepartments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error, count, searchQuery, order, sort, page, limit } = useSelector((state: RootState) => state.departments);
  
  const currentPageData = data[`${page}-${limit}`];
  useEffect(() => {
    if (!currentPageData && (status === 'idle' || status === 'succeeded')) {
      dispatch(fetchDepartments({ page, limit, search: searchQuery, order, sort }));
    }
  }, [dispatch, page, limit, searchQuery, currentPageData, status, order, sort]);

  const onPageChange = (newPage: number) => {
    if (newPage !== page) dispatch(setPage(newPage));
  };

  const onRowsPerPageChange = (newLimit: number) => {
    if (newLimit !== limit) dispatch(setLimit(newLimit));
  };

  const onSearchChange = (query: string) => {
    if (query !== searchQuery) dispatch(setSearch(query));
  };

  const onOrderChange = (newOrder: 'asc' | 'desc') => {
    if (newOrder !== order) dispatch(setOrder(newOrder));
  };

  const onSortChange = (newSort: string) => {
    if (newSort !== sort) dispatch(setSort(newSort));
  };

  const onRefreshData = () => {
    dispatch(fetchDepartments({ page, limit, search: searchQuery, order, sort }));
  }

  return {
    data: currentPageData || [],
    count,
    status,
    error,
    page,
    limit,
    searchQuery,
    onSearchChange,
    onPageChange,
    onRowsPerPageChange,
    onOrderChange,
    onSortChange,
    onRefreshData
  };
};

export default useDepartments;
