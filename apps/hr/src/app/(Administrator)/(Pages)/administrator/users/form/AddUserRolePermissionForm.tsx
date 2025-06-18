import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllActiveModules, getModuleActiveRoles, Module } from '@/app/services/module';
import { Role } from '@/app/services/role';
import { UserModuleRole } from '@/app/services/user-role-permission';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import { IconPencil } from '@tabler/icons-react';

interface Props {
    id: number;
    onAdd?: (newData: UserModuleRole, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => Promise<{status: string, message: string}>;
    onUpdate?: (updateData: UserModuleRole, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => Promise<{status: string, message: string}>;
    moduleId?: number;
    roleId?: number;
    title: string;
}

const AddUserRolePermissionForm = ({ id, onAdd, onUpdate, moduleId, roleId, title }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [modules, setModules] = useState<Module[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [errorFields, setErrorFields] = useState<any>({});
    const [formValues, setFormValues] = useState<any>({
      role_id: roleId ? roleId : '',  
      module_id: moduleId ? moduleId : '',  
    });

    useEffect(() => {
        fetchModuleData();
    }, []);

    useEffect(() => {
        if (formValues.module_id) {
            fetchRoleData(formValues.module_id);
        } else if (moduleId) {
            fetchRoleData(moduleId);
        } else {
            setRoles([]);  
            setFormValues({
                ...formValues,
                role_id: '', 
            });
        }
    }, [formValues.module_id, moduleId]);

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

    const handleClose = () => {
        setOpen(false);
        setErrorFields({});
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        if (name === 'module_id') {
            setFormValues({
                ...formValues,
                [name as string]: value,
                role_id: '',  
            });
        } else {
            setFormValues({
                ...formValues,
                [name as string]: value,
            });
        }
    };

    const handleSave = async () => {
        try {
            const newData: UserModuleRole = {
                user_id: id,
                module_id: formValues.module_id,
                role_id: formValues.role_id,
            };
            if (onAdd && !moduleId) {
                setLoading(true);
                const { status, message } = await onAdd(newData, setErrorFields) as any;
                if (status === 'success') {
                    setSuccess(message);
                    setErrorFields({});
                    setFormValues({
                        role_id: '',  
                        module_id: '',  
                    });
                    setError('');
                } else {
                setError(message);
                }
                setLoading(false);
                setSnackbarOpen(true);
            } else {
                if (moduleId && onUpdate) {
                    setLoading(true);
                    const { status, message } = await onUpdate(newData, setErrorFields) as any;
                    if (status === 'success') {
                        setSuccess(message);
                        setErrorFields({});
                        setError('');
                    } else {
                    setError(message);
                    }
                setLoading(false);
                setSnackbarOpen(true);
                }
            }
        } catch (error) {
          console.log('An error occurred.', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="flex-end">
            { moduleId ? 
                <IconButton
                    color='warning'
                    size="small"
                    onClick={handleClickOpen}
                >
                    <IconPencil size="18" />
                </IconButton>
                : <Button onClick={handleClickOpen} variant='outlined'>Add Module</Button>
            }
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{ title }</DialogTitle>
                <DialogContent>
                    <Stack gap="20px" paddingTop="20px">
                    <FormControl fullWidth error={!!errorFields.module_id}>
                        <InputLabel id="module-select-label">Module</InputLabel>
                        <Select
                            labelId="module-select-label"
                            id="module-select"
                            name="module_id"
                            value={formValues.module_id}
                            disabled={moduleId ? true : false}
                            label="Module"
                            onChange={handleChange as any}
                            error={!!errorFields.module_id}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            {modules.map((module) => (
                                <MenuItem value={module.id} key={module.id}>{module.name}</MenuItem>
                            ))}
                        </Select>
                        {errorFields.module_id && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.module_id}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth error={!!errorFields.role_id} disabled={moduleId ? false : !formValues.module_id ? true : false}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            name="role_id"
                            value={formValues.role_id}
                            label="Role"
                            onChange={handleChange as any}
                            error={!!errorFields.role_id}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            {roles.map((role) => (
                                <MenuItem value={role.id} key={role.id}>{role.name}</MenuItem>
                            ))}
                        </Select>
                        {errorFields.role_id && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.role_id}</FormHelperText>}
                    </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>{moduleId ? 'Update' : 'Save'}</Button>
                </DialogActions>
                <SingleSnackbar
                    open={snackbarOpen}
                    severity={error ? 'error' : 'success'}
                    message={error || success}
                    onClose={handleSnackbarClose}
                />
            </Dialog>
        </Stack>
    )
}

export default AddUserRolePermissionForm
