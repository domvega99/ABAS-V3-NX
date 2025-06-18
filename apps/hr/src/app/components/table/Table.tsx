import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { IconSearch } from '@tabler/icons-react';
import ExportComponent from './Export';
import ColumnSelector from './ColumnSelector';
import { IconButton, InputBase, Stack, Typography, Box } from '@mui/material';
import useDebounce from '@/utils/useDebounce';
import ProgressLoading from '../shared/ProgressLoading';

interface TableComponentProps {
  columns: any[];
  fetchData: (page: number, limit: number, search: string, order: 'asc' | 'desc', sort: string, tab?: string, year?: string, type?: string, id?: number) => Promise<any>;
  tab?: string;
  year?: string;
  type?: string;
  id?: number;
  count: number;
  data: any[];
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, fetchData, tab, year, type, data, count, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [sort, setSort] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [initialColumns, setColumns] = useState<any[]>(columns);
  const debouncedSearchTerm = useDebounce(search, 500);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchData(page, limit, debouncedSearchTerm, order, sort, tab, year, type, id);
      if (response.status !== 1) {
        setError(response.message);
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, limit, debouncedSearchTerm, order, sort, tab, year, type, id]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
    setError(null);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = sort === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
    setPage(0);
  };

  const handleColumnToggle = (id: string, show: boolean) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === id ? { ...column, show } : column
      )
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleColumns = initialColumns.filter(column => column.show);

  return (
    <>
      {loading && <ProgressLoading />}
      <Stack
        flexDirection='column'
        alignItems='center'
        paddingBottom={2}
        justifyContent='space-between'
        gap={1}
        sx={{
          '@media (min-width: 960px)': {
            width: '100%',
            flexDirection: 'row'
          },
        }}
      >
        <Paper
          component="form"
          elevation={0}
          sx={{
            p: '2px 2px',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.default',
            width: '100%',
            '@media (min-width: 960px)': {
              width: '30%'
            },
          }}
        >
          <IconButton sx={{ p: '10px' }}>
            <IconSearch />
          </IconButton>
          <InputBase
            sx={{ flex: 1 }}
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </Paper>
        <Stack flexDirection='row' gap={1}>
          <ColumnSelector
            columns={initialColumns}
            onColumnToggle={handleColumnToggle}
          />
          <ExportComponent data={data} columns={columns} />
        </Stack>
      </Stack>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer
          sx={{
            height: 500,
            maxWidth: '100%',
            '&::-webkit-scrollbar': {
              width: '5px',
              height: '5px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#546E7A',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'background.paper',
            },
          }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={sort === column.id}
                        direction={order}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      <Typography variant="body2">
                        {column.label}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length} sx={{ textAlign: 'center' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index} sx={{ ":hover": { backgroundColor: 'background.default' } }}>
                    {visibleColumns.map((column) => {
                      const value = row[column.id];
                      if (column.renderCell) {
                        return (
                          <TableCell key={column.id} align={column.align} style={{ width: column.width, fontSize: '11px', height: '50px' }}>
                            {column.renderCell(row)}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align} style={{ width: column.width, fontSize: '11px', height: '50px' }}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default TableComponent;
