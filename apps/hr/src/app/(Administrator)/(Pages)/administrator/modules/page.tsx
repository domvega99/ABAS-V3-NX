'use client';
import BlankPage from '@/app/components/shared/container/BlankPage';
import PageContainer from '@/app/components/shared/container/PageContainer';
import withAuth from '@/app/components/shared/WithAuth';
import TableComponent from '@/app/components/table/Table';
import StatusUI from '@/app/components/ui/StatusUI';
import { Department, getAllDepartments } from '@/libs/api-services/masters/departments/department-service';
import { Button, Stack, Typography } from '@mui/material';
import { IconCopy, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const [data, setData] = useState<Department[]>([]);
  const [count, setCount] = useState<number>(0);

  const columns = [
    { id: 'id', label: 'ID', width: 20, sortable: true, show: true },
    { id: 'name', label: 'Name', width: 400, sortable: true, show: true },
    { id: 'division', label: 'Division', width: 400, sortable: false, show: true },
    { id: 'sorting', label: 'Sorting', width: 170, sortable: true, show: false },
    { id: 'accounting_code', label: 'Accounting Code', width: 200, sortable: true, show: false },
    { id: 'created', label: 'Created On', width: 170, sortable: true, show: true },
    { id: 'created_by', label: 'Created By', width: 300, sortable: false, show: true },
    { id: 'modified', label: 'Modified On', width: 170, sortable: true, show: true },
    { id: 'modified_by', label: 'Modified By', width: 300, sortable: false, show: true },
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
              color={'info'} 
              variant={"outlined"} 
              size={"small"}
              LinkComponent={Link}
              href={`/administrator/modules/${row.id}`}
              startIcon={<IconEye size={18}/>}
            >
              View
            </Button>
          </Stack>
        </>
      ),
    },
  ];

  const fetchData = async (page: number, limit: number, search: string, order: 'asc' | 'desc', sort: string) => {
    try {
      const response = await getAllDepartments(page, limit, search, order, sort);
      setData(response.data);
      setCount(response.count);
      return response;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      throw new Error('An error occurred while fetching data.');
    }
  };

  return (
    <PageContainer title="Modules" description="">
      <BlankPage>
        <Stack gap='10px'>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Stack flexDirection="row" gap={2}>
              <IconCopy />
              <Typography variant="h4">Modules</Typography>
            </Stack>
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
