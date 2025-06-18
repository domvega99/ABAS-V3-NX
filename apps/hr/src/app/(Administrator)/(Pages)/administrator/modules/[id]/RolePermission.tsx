import React, { useEffect, useState } from 'react'
import { Box, Checkbox, Stack, Button } from '@mui/material'
import { useParams } from 'next/navigation'
import { RolePermission, addRolePermission, updateRolePermission } from '@/app/services/rolepermission';
import { ModuleRolePermission, getModuleRolePermissions } from '@/app/services/module';
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { IconMenu } from '@tabler/icons-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import RolePermissionForm from './form/RolePermissionForm'

const RolePermissionComponent = () => {
    const params = useParams()
    const id = Number(params.id);
    const [data, setData] = useState<ModuleRolePermission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<number | false>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');

    const handleChange =
      (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getModuleRolePermissions(id);
            if (response.status === 1) {
                setData(response.data);
            } else {
                setError(response.message);
            }
            setLoading(false);
        } catch (error: any) {
            const { message } = error.response.data;
            console.log('Failed to fetch module data', message);
            setError(message);
            setLoading(false);
        }
    };

    const handleAddRolePermission = async (newRolePermission: RolePermission) => {
        try {
          const response = await addRolePermission(newRolePermission);
          fetchData(); 
          setError('');
          return { status: 'success', message: response.message };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'An error occurred.';
          return { status: 'error', message: errorMessage };
        }
    };

    const handleCheckedChange = (permissionId: number, field: string, checked: boolean) => {
        setData((prevData) =>
            prevData.map((role) => ({
                ...role,
                sub_module_permissions: role.sub_module_permissions.map((permission) =>
                    permission.id === permissionId ? { ...permission, [field]: checked ? 1 : 0 } : permission
                ),
            }))
        );
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleRowCheckedChange = (permissionId: number, checked: boolean) => {
        setData((prevData) =>
            prevData.map((role) => ({
                ...role,
                sub_module_permissions: role.sub_module_permissions.map((permission) =>
                    permission.id === permissionId
                        ? {
                              ...permission,
                              allow: permission.allow == -1 ? permission.allow : (permission.allow == 1 ? 0 : 1),
                              create: permission.create == -1 ? permission.create : (permission.create == 1 ? 0 : 1),
                              view: permission.view == -1 ? permission.view : (permission.view == 1 ? 0 : 1),
                              edit: permission.edit == -1 ? permission.edit : (permission.edit == 1 ? 0 : 1),
                              update: permission.update == -1 ? permission.update : (permission.update == 1 ? 0 : 1),
                              cancel: permission.cancel == -1 ? permission.cancel : (permission.cancel == 1 ? 0 : 1),
                              verify: permission.verify == -1 ? permission.verify : (permission.verify == 1 ? 0 : 1),
                              approve: permission.approve == -1 ? permission.approve : (permission.approve == 1 ? 0 : 1),
                              note: permission.note == -1 ? permission.note : (permission.note == 1 ? 0 : 1),
                          }
                        : permission
                ),
            }))
        );
    };
    

    const handleSubmit = async () => {
        const subModulePermissions = data.flatMap(role => role.sub_module_permissions);
        try {
            setLoading(true);
            const updatePromises = subModulePermissions.map(permission => 
                updateRolePermission(permission.id, permission)
            );
            await Promise.all(updatePromises);
            setSuccess('All permissions updated successfully.');
            setSnackbarOpen(true);
            setLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred.';
            setSuccess(errorMessage);
            setSnackbarOpen(true);
            setLoading(false);
        }
    };
    

  return (
    <>
    {loading && <ProgressLoading />}
    <Stack gap={1} marginTop={1}>
        <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
            <RolePermissionForm title={'Add Role Permission'} id={id} onAdd={handleAddRolePermission}/>
        </Stack>
        {error ? (
                <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>{error}</Typography>
            ) : (
        <Box 
            sx={{ 
                overflowY: 'auto', 
                height: '60vh', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1, 
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
            }}
        >
            <Stack>
                {data && data.map((role) => (
                    <Accordion expanded={expanded === role.role_id} onChange={handleChange(role.role_id)} key={role.role_id}>
                        <AccordionSummary
                            expandIcon={<IconMenu />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {role.role_name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell width='40%'>Access</TableCell>
                                        <TableCell align="center">Allow</TableCell>
                                        <TableCell align="center">Create</TableCell>
                                        <TableCell align="center">View</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                        <TableCell align="center">Update</TableCell>
                                        <TableCell align="center">Cancel</TableCell>
                                        <TableCell align="center">Verify</TableCell>
                                        <TableCell align="center">Approve</TableCell>
                                        <TableCell align="center">Note</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {role && role.sub_module_permissions.map((permission) => (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={permission.id}>
                                            <TableCell component="th" scope="row" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                <Stack direction="row" alignItems="center">
                                                <Checkbox
                                                    size="small"
                                                    indeterminate={
                                                        (permission.allow !== -1 && permission.allow !== 1) ||
                                                        (permission.create !== -1 && permission.create !== 1) ||
                                                        (permission.view !== -1 && permission.view !== 1) ||
                                                        (permission.edit !== -1 && permission.edit !== 1) ||
                                                        (permission.update !== -1 && permission.update !== 1) ||
                                                        (permission.cancel !== -1 && permission.cancel !== 1) ||
                                                        (permission.verify !== -1 && permission.verify !== 1) ||
                                                        (permission.approve !== -1 && permission.approve !== 1) ||
                                                        (permission.note !== -1 && permission.note !== 1)
                                                    }
                                                    onChange={(e) => handleRowCheckedChange(permission.id, e.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                                    {permission.sub_module_name}
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.allow == -1 ? '' : 
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.allow == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'allow', e.target.checked)}
                                                        disabled={permission.allow == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.create == -1 ? '' : 
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.create == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'create', e.target.checked)}
                                                        disabled={permission.create == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.view == -1 ? '' :
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.view == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'view', e.target.checked)}
                                                        disabled={permission.view == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.edit == -1 ? '' : 
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.edit == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'edit', e.target.checked)}
                                                        disabled={permission.edit == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.update == -1 ? '' :
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.update == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'update', e.target.checked)}
                                                        disabled={permission.update == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.cancel == -1 ? '' : 
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.cancel == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'cancel', e.target.checked)}
                                                        disabled={permission.cancel == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.verify == -1 ? '' :
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.verify == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'verify', e.target.checked)}
                                                        disabled={permission.verify == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.approve == -1 ? '' :
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.approve == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'approve', e.target.checked)}
                                                        disabled={permission.approve == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '1px solid #A9A9A9' }}>
                                                {permission.note == -1 ? '' :
                                                    <Checkbox
                                                        size="small"
                                                        checked={permission.note == 1}
                                                        onChange={(e) => handleCheckedChange(permission.id, 'note', e.target.checked)}
                                                        disabled={permission.note == -1}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
            <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
                <Button variant="outlined" color='success' onClick={handleSubmit}>Update Role Permissions</Button>
            </Stack>
            <SingleSnackbar
                open={snackbarOpen}
                severity={error ? 'error' : 'success'}
                message={error || success}
                onClose={handleSnackbarClose}
            />
        </Box>
        )}
    </Stack>
    </>
  )
}

export default RolePermissionComponent
