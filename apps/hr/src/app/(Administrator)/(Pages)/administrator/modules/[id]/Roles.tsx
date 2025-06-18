import TableComponent from '@/app/components/table/Table'
import { Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubModule  } from '@/app/services/submodule';
import { getModuleRoles  } from '@/app/services/module';
import StatusUI from '@/app/components/ui/StatusUI'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import { addRole, Role, updateRole } from '@/app/services/role';
import RoleForm from './form/RoleForm'

export type Column = {
    id: string;
    label: string;
    width?: number;
    align?: 'right';
    sortable?: boolean;
    show?: boolean;
    format?: (value: any) => string;
    renderCell?: (row: any) => React.ReactNode;
};

const Roles = () => {
    const params = useParams()
    const id = Number(params.id);
    const [data, setData] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    const fetchData = async (page: number, limit: number, search: string, order: 'asc' | 'desc', sort: string) => {
      try {
        setLoading(true)
        const response = await getModuleRoles(id, page, limit, search, order, sort);
        setData(response.data);
        setCount(response.count);
        setLoading(false)
        return response;
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setLoading(false)
        throw new Error('An error occurred while fetching data.');
      }
    };

    const handleAddRole = async (newRole: SubModule, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
      try {
        const response = await addRole(newRole);
        fetchData(0, 10, '', 'desc', 'id'); 
        return { status: 'success', message: response.message };
      } catch (error: any) {
        const errorMessages = error.response?.data?.message || 'An error occurred.';
        if (typeof errorMessages === 'object') {
          setErrorFields(errorMessages);
          return { status: 'error', message: 'An error occurred.' };
        } else {
          setErrorFields({});
          return { status: 'error', message: errorMessages };
        }
      }
    };

    const handleUpdateRole = async (updatedRole: Role, id: number, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
      try {
        const response = await updateRole(id, updatedRole);
        fetchData(0, 10, '', 'desc', 'id'); 
        return { status: 'success', message: response.message };
      } catch (error: any) {
        const errorMessages = error.response?.data?.message || 'An error occurred.';
        if (typeof errorMessages === 'object') {
          setErrorFields(errorMessages);
          return { status: 'error', message: 'An error occurred.' };
        } else {
          setErrorFields({});
          return { status: 'error', message: errorMessages };
        }
      }
    };

    const columns: Column[] = [
    { id: 'id', label: 'ID', width: 50, sortable: true, show: false },
    { id: 'name', label: 'Role', width: 200, sortable: true, show: true },
    { id: 'created_on', label: 'Created On', width: 200, sortable: true, show: true },
    { id: 'created_by', label: 'Created By', width: 200, sortable: false, show: true },
    { id: 'modified_on', label: 'Modified On', width: 200, sortable: true, show: true },
    { id: 'modified_by', label: 'Modified By', width: 200, sortable: false, show: true },
    { 
      id: 'stat', 
      label: 'Status', 
      width: 80, 
      sortable: true, 
      show: true,
      renderCell: (row: any) => (
        <>
          <StatusUI
              label={row.stat} 
              color={
              row.stat === 'Active' ? 'success' : 'error'
              } 
          />
        </>
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
              <RoleForm title={'Edit Role'} id={row.id} onUpdate={handleUpdateRole} module_id={id}/>
          </Stack>
        </>
      ),
    },
    ];

  return (
    <>
    {loading && <ProgressLoading />}
    <Stack gap={1} marginTop={1}>
      <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
          <RoleForm title={'Add Role'} onAdd={handleAddRole} module_id={id}/>
      </Stack>
      <TableComponent
        data={data}
        columns={columns}
        fetchData={fetchData}
        count={count}
      />
    </Stack>
    </>
  )
}

export default Roles
