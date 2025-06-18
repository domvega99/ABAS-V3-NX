'use client';
import React, { useState } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import TableComponent from '@/app/components/table/Table';
import withAuth from '@/app/components/shared/WithAuth';
import PageContainer from '@/app/components/shared/container/PageContainer';
import BlankPage from '@/app/components/shared/container/BlankPage';
import StatusUI from '@/app/components/ui/StatusUI';
import { IconEye, IconPlus, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import { getAllUsers, User } from '@/app/services/user';

const Page = () => {
  const [data, setData] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  const columns = [
    { id: 'id', label: 'ID', width: 40, sortable: true, show: true },
    { 
      id: 'picture', 
      label: 'Picture', 
      width: 80, 
      sortable: false, 
      show: true,
      renderCell: (row: any) => (
        <>
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </>
      ),
    },
    { id: 'username', label: 'User Name', width: 150, sortable: true, show: true },
    { id: 'first_name', label: 'First Name', width: 150, sortable: true, show: true },
    { id: 'middle_name', label: 'Middle Name', width: 150, sortable: true, show: false },
    { id: 'last_name', label: 'Last Name', width: 150, sortable: true, show: true },
    { id: 'email', label: 'Email', width: 300, sortable: true, show: false },
    { id: 'role', label: 'Role', width: 100, sortable: true, show: true },
    { id: 'user_location', label: 'Location', width: 200, sortable: true, show: true },
    { 
        id: 'status', 
        label: 'Status', 
        width: 80, 
        sortable: true, 
        show: true,
        renderCell: (row: any) => (
          <>
            <StatusUI 
              label={row.stat} 
              color={
                row.stat == 'Activated' ? 'success' : 'error'
              } 
            />
          </>
        ),
    },
    { id: 'created_on', label: 'Created On', width: 300, sortable: true, show: false },
    { id: 'created_by', label: 'Created By', width: 300, sortable: true, show: false },
    { id: 'modified_on', label: 'Modified On', width: 300, sortable: true, show: false },
    { id: 'modified_by', label: 'Modified By', width: 300, sortable: true, show: false },
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
              href={`/administrator/users/${row.id}`}
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
      const response = await getAllUsers(page, limit, search, order, sort);
      setData(response.data);
      setCount(response.count);
      return response;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      throw new Error('An error occurred while fetching data.');
    }
  };

  return (
    <PageContainer title="User Accounts" description="">
      <BlankPage>
        <Stack gap='10px'>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Stack flexDirection="row" gap={2}>
              <IconUsers />
              <Typography variant="h4">User Accounts</Typography>
            </Stack>
            <Button
              color={'success'} 
              variant={'contained'} 
              size={'medium'}
              startIcon={<IconPlus size={18}/>}
              LinkComponent={Link}
              href='/administrator/users/create'
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
