import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconPlus } from '@tabler/icons-react';
import { Checkbox, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { SubModulePermission } from '@/app/services/submodulePermission';
import { getModuleActiveRoles, getModuleSubModulePermissions } from '@/app/services/module';
import { Role } from '@/app/services/role';
import { RolePermission, RolePermissionResponse } from '@/app/services/rolepermission';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface Props {
  title: string;
  onAdd?: (newRolePermission: RolePermission) => Promise<RolePermissionResponse>;
  id: number;
}

const RolePermissionForm = ({ title, onAdd, id }: Props) => {
  const [open, setOpen] = useState(false);
  const [subModulePermissions, setSubModulePermission] = useState<SubModulePermission[]>([]);
  const [activeRoles, setActiveRoles] = useState<Role[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    if (id && open) {
      fetchData();
      fetchSubModulePermission(id);
    }
  }, [id, open]);

  const fetchSubModulePermission = async (moduleId: number) => {
    try {
      const res = await getModuleSubModulePermissions(moduleId);
      setSubModulePermission(res.data);
    } catch (error: any) {
      console.log('Failed to fetch module data', error);
    }
  };

  const fetchData = async () => {
    try {
        const response = await getModuleActiveRoles(id);
        if (response.status === 1) {
          setActiveRoles(response.data);
        } else {
          setError(response.message);
        }
    } catch (error: any) {
        const { message } = error.response.data;
        console.log('Failed to fetch module data', message);
        setError(message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const updatedCheckedItems = { ...checkedItems, [itemId]: event.target.checked };
    setCheckedItems(updatedCheckedItems);
    setIsAnyChecked(Object.values(updatedCheckedItems).some(checked => checked));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckedItems({});
    setSelectedRole('');
    setIsAnyChecked(false);
  };

  const handleSubmit = async () => {
    try {
      const selectedItems = subModulePermissions
        .filter(item => checkedItems[item.id])
        .map(item => ({
          id: 0,
          module_id: id ?? 0,
          role_id: Number(selectedRole),
          sub_module_id: item.sub_module_id,
          allow: Number(item.allow),
          create: Number(item.create),
          view: Number(item.view),
          edit: Number(item.edit),
          update: Number(item.update),
          cancel: Number(item.cancel),
          verify: Number(item.verify),
          approve: Number(item.approve),
          note: Number(item.note),
        }));

      if (onAdd) {
        for (const item of selectedItems) {
          const { status, message } = await onAdd(item);
          if (status === 'success') {
            setSuccess(message);
          } else {
            setError(message);
          }
        }
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log('An error occurred.', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        color={'success'}
        variant={'contained'}
        onClick={handleClickOpen}
        startIcon={<IconPlus size={18} />}
      >
        Add Role Permission
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth='sm'
        fullWidth={true}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack paddingTop={1}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedRole}
                onChange={handleSelectChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select Role</em>
                </MenuItem>
                {activeRoles && activeRoles.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant='subtitle1' sx={{ marginTop: 1 }}>Role Access</Typography>
            {subModulePermissions.length > 0 ?
              <>
                {subModulePermissions && subModulePermissions.map((item) => (
                  <Stack key={item.id} flexDirection='row' alignItems='center'>
                    <Checkbox
                      checked={checkedItems[item.id] || false}
                      onChange={(event) => handleChange(event, item.id)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography>{item.sub_module_name}</Typography>
                  </Stack>
                ))}
              </>
              :
              <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>No sub-module added.</Typography>
            }
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' size='small' color='error'>Cancel</Button>
          <Button onClick={handleSubmit} variant='outlined' size='small' disabled={!isAnyChecked}>Save</Button>
        </DialogActions>
        <SingleSnackbar
          open={snackbarOpen}
          severity={error ? 'error' : 'success'}
          message={error || success}
          onClose={handleSnackbarClose}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default RolePermissionForm;