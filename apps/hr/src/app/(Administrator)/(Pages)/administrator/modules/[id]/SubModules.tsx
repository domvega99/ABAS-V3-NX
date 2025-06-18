import TableComponent from '@/app/components/table/Table'
import { Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubModule, addSubModule, updateSubModule } from '@/app/services/submodule';
import { getModuleSubModules } from '@/app/services/module';
import StatusUI from '@/app/components/ui/StatusUI'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import { SubModulePermission, updateSubModulePermission } from '@/app/services/submodulePermission';
import SubModuleForm from './form/SubModuleForm'
import SubmodulePermissionForm from './form/SubModulePermissionForm'

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

const SubModules = () => {
  const params = useParams()
  const id = Number(params.id);
  const [data, setData] = useState<SubModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const fetchData = async (page: number, limit: number, search: string, order: 'asc' | 'desc', sort: string) => {
    try {
      setLoading(true)
      const response = await getModuleSubModules(id, page, limit, search, order, sort);
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

  const handleSetPage = (count: number): Promise<void> => {
    return new Promise((resolve) => {
      setPage(count);
      resolve();
    });
  };

  const handleAddSubModule = async (newSubModule: SubModule, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await addSubModule(newSubModule);
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

  const handleUpdateSubModule = async (updatedSubModule: SubModule, id: number, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await updateSubModule(id, updatedSubModule);
      if (response.status == 'success') {
        fetchData(0, 10, '', 'desc', 'id'); 
        return { status: 'success', message: response.message };
      } else {
        return { status: 'error', message: response.message };
      }
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

  const handleUpdateSubModulePermissions = async (updatedSubModulePermissions: SubModulePermission, id: number) => {
    try {
      const response = await updateSubModulePermission(id, updatedSubModulePermissions);
      if (response.status == 'success') {
        fetchData(0, 10, '', 'desc', 'id'); 
        return { status: 'success', message: response.message };
      } else {
        return { status: 'error', message: response.message };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      return { status: 'error', message: errorMessage.name };
    }
  };

  const columns: Column[] = [
    { id: 'id', label: 'ID', width: 50, sortable: true, show: false },
    { id: 'name', label: 'Sub-module Name', width: 200, sortable: true, show: true },
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
            <SubModuleForm title={'Edit Sub-module'} id={row.id} onUpdate={handleUpdateSubModule} module_id={id}/>
            <SubmodulePermissionForm onPage={handleSetPage} id={row.id} onUpdateSubModulePermission={handleUpdateSubModulePermissions}/>
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
          <SubModuleForm title={'Add Sub-module'} onAdd={handleAddSubModule} module_id={id}/>
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

export default SubModules
