import React, { useEffect, useState } from 'react'
import { addUpdateUserRolePermissions, addUserRolePermission, showRolePermissionByUserId, updateUserRolePermission, UserModuleRole, UserModuleRolePermissions } from '@/app/services/user-role-permission';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { IconMenu } from '@tabler/icons-react';
import { Button, Checkbox, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import AddUserRolePermissionForm from '../form/AddUserRolePermissionForm';
import ProgressLoading from '@/app/components/shared/ProgressLoading';

interface Props {
    id: number;
}

const UserRolePermission = ({ id }: Props) => {
  const [userModuleRoles, setUserModuleRoles] = useState<UserModuleRolePermissions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);


  const handleChangePanel =
  (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (id) {
      fetchUserModuleRoleData(id);
    }
  }, [id]);

  const fetchUserModuleRoleData = async (userId: number) => {
    try {
      setLoading(true)
      const res = await showRolePermissionByUserId(userId);
      setUserModuleRoles(res);
      setLoading(false)
    } catch (error) {
      console.log('Failed to fetch user data', error);
      setLoading(false)
    }
  };

  const handleCheckedChange = (permissionId: number, field: string, checked: boolean) => {
    setUserModuleRoles((prevData) =>
      prevData.map((role) => ({
        ...role,
        user_role_permission: role.user_role_permission.map((permission) =>
          permission.id === permissionId ? { ...permission, [field]: checked ? 1 : 0 } : permission
        ),
      }))
    );
  };

  const handleRowCheckedChange = (permissionId: number, checked: boolean) => {
    setUserModuleRoles((prevData) =>
      prevData.map((role) => ({
        ...role,
        user_role_permission: role.user_role_permission.map((permission) =>
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const subModulePermissions = userModuleRoles.flatMap(role => 
      role.user_role_permission.map(permission => ({
        ...permission,
        user_id: id  
      }))
    );
    try {
      const response = await addUpdateUserRolePermissions(subModulePermissions);
      if (response.status == 'success') {
        setSuccess(response.message);
      } else {
          setError(response.message);
      }
      setSnackbarOpen(true)
    } catch (error: any) {
      setError('An error occurred.');
      setSnackbarOpen(true)
    }
  } 

  const handleAdd = async (newData: UserModuleRole, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await addUserRolePermission(newData);
      fetchUserModuleRoleData(id);
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

  const handleUpdate = async (updateData: UserModuleRole, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await updateUserRolePermission(updateData);
      fetchUserModuleRoleData(id);
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

  return (
    <Stack gap="10px">
      {loading && <ProgressLoading />}
      <AddUserRolePermissionForm id={id} onAdd={handleAdd} title=''/>
      <Stack>
      {userModuleRoles && userModuleRoles.map(( item ) => (
        <Accordion expanded={expanded === item.module_id} onChange={handleChangePanel(item.module_id)} key={item.module_id}>
          <AccordionSummary
            expandIcon={<IconMenu />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Stack flexDirection='row' gap={2} alignItems='center'>
              <Typography sx={{ width: 'auto', flexShrink: 0 }}>
                { item.module_name }
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack flexDirection='row' alignItems='center'>
              <Chip label={ item.role_name } size='small' sx={{ backgroundColor: `primary.light`, color: `primary.main` }}></Chip>
              <AddUserRolePermissionForm id={id} onAdd={handleAdd} onUpdate={handleUpdate} moduleId={item.module_id} roleId={item.role_id} title='Change Role Permission'/>
            </Stack>
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
                      {item && item.user_role_permission.map((permission) => (
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
    </Stack>
  )
}

export default UserRolePermission
