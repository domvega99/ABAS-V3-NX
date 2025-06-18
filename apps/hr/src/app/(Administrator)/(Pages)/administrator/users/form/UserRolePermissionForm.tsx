import React, { useEffect, useState } from 'react'
import { User } from '@/app/services/user';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { getAllActiveModules, getModuleActiveRoles, Module } from '@/app/services/module';
import { Role } from '@/app/services/role';

interface Props {
  formValues: User;
  errorFields: any;
  handleFormChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const UserRolePermissionForm = ({ formValues, handleFormChange, errorFields }: Props) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);


  useEffect(() => {
    fetchModuleData()
    if (formValues.module_id) {
        fetchRoleData(Number(formValues.module_id));
    } else {
        setRoles([]);  
    }
  }, [formValues.module_id]);

  // Get Module Data
  const fetchModuleData = async () => {
    try {
      const response = await getAllActiveModules();
      setModules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get Role Data
  const fetchRoleData = async (moduleId: number) => {
    try {
        const response = await getModuleActiveRoles(moduleId);
        setRoles(response.data);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Stack gap={2}>
      <FormControl fullWidth error={!!errorFields.module_id}>
        <InputLabel id="module-select-label">Module</InputLabel>
        <Select
          labelId="module-select-label"
          id="module-select"
          name="module_id"
          value={formValues.module_id}
          label="Module"
          onChange={handleFormChange as any}
          error={!!errorFields.module_id}
        >
            <MenuItem value={0}>None</MenuItem>
            {modules.map((module) => (
                <MenuItem value={module.id} key={module.id}>{module.name}</MenuItem>
            ))}
        </Select>
        {errorFields.module_id && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.module_id}</FormHelperText>}
    </FormControl>
    <FormControl fullWidth error={!!errorFields.role_id} disabled={!formValues.module_id ? true : false}>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          name="role_id"
          value={formValues.role_id}
          label="Role"
          onChange={handleFormChange as any}
          error={!!errorFields.role_id}
        >
            <MenuItem value={0}>None</MenuItem>
            {roles.map((role) => (
                <MenuItem value={role.id} key={role.id}>{role.name}</MenuItem>
            ))}
        </Select>
        {errorFields.role_id && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.role_id}</FormHelperText>}
      </FormControl>
    </Stack>
  )
}

export default UserRolePermissionForm
