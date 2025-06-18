'use client';
import BlankPage from '@/app/components/shared/container/BlankPage';
import PageContainer from '@/app/components/shared/container/PageContainer';
import withAuth from '@/app/components/shared/WithAuth';
import TableComponent from '@/app/components/table/Table';
import StatusUI from '@/app/components/ui/StatusUI';
import { Company, getAllCompanies } from '@/app/services/company';
import { Button, Stack, Typography } from '@mui/material';
import { IconPencil, IconPlus, IconStack } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const [data, setData] = useState<Company[]>([]);
  const [count, setCount] = useState<number>(0);

  const columns = [
    { id: 'id', label: 'ID', width: 20, sortable: true, show: false },
    { id: 'name', label: 'Name', width: 400, sortable: true, show: true },
    { id: 'address', label: 'Address', width: 400, sortable: false, show: true },
    { id: 'telephone_no', label: 'Telephone', width: 170, sortable: true, show: true },
    { id: 'company_tin', label: 'TIN', width: 200, sortable: true, show: true },
    { id: 'abbreviation', label: 'Abbreviation', width: 200, sortable: true, show: true },
    { id: 'fax_no', label: 'Fax No', width: 200, sortable: true, show: false },
    { id: 'is_top_20000', label: 'Is top 20,000', width: 200, sortable: true, show: true },
    { id: 'created', label: 'Created On', width: 170, sortable: true, show: false },
    { id: 'created_by', label: 'Created By', width: 300, sortable: false, show: false },
    { id: 'modified', label: 'Modified On', width: 170, sortable: true, show: false },
    { id: 'modified_by', label: 'Modified By', width: 300, sortable: false, show: false },
    { 
      id: 'stat', 
      label: 'Status', 
      width: 80, 
      sortable: true, 
      show: true,
      renderCell: (row: any) => (
        <StatusUI 
          label={row.stat} 
          color={row.stat == 'Active' ? 'success' : 'error'} 
        />
      ),
    },
    { 
      id: 'actions', 
      label: 'Actions', 
      width: 150, 
      sortable: false, 
      show: true, 
      renderCell: (row: any) => ( 
        <>
          <Stack flexDirection='row' gap={1}>
            <Button 
              color={'warning'} 
              variant={"outlined"} 
              size={"small"}
              LinkComponent={Link}
              href={`/master-tables/companies/${row.id}`}
              startIcon={<IconPencil size={18}/>}
            >
              Edit
            </Button>
          </Stack>
        </>
      ),
    },
  ];

  const fetchData = async (page: number, limit: number, search: string, order: 'asc' | 'desc', sort: string) => {
    try {
      const response = await getAllCompanies(page, limit, search, order, sort);
      setData(response.data);
      setCount(response.count);
      return response;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      throw new Error('An error occurred while fetching data.');
    }
  };

  return (
    <PageContainer title="Companies" description="">
      <BlankPage>
        <Stack gap='10px'>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Stack flexDirection="row" gap={2}>
              <IconStack />
              <Typography variant="h4">Companies</Typography>
            </Stack>
            <Button
              color={'success'} 
              variant={'contained'} 
              size={'medium'}
              startIcon={<IconPlus size={18}/>}
              LinkComponent={Link}
              href='/master-tables/companies/create'
            >
              Add
            </Button>
          </Stack>
          <TableComponent
            count={count}
            data={data}
            columns={columns}
            fetchData={fetchData}
          />
        </Stack>
      </BlankPage>
    </PageContainer>
  );
};

export default withAuth(Page);
