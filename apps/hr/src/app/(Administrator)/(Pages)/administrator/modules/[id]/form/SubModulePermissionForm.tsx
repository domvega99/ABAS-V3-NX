import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconEye } from '@tabler/icons-react';
import { SubModule, showSubModuleById, showSubModulePermissionById } from '@/app/services/submodule';
import { SubModulePermission, updateSubModulePermission } from '@/app/services/submodulePermission';
import { Stack, Switch, Typography } from '@mui/material';
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
  id?: number;
  onUpdateSubModulePermission?: (updatedSubModulePermission: SubModulePermission, id: number) => Promise<any>;
  onPage?: (id: number) => Promise<void>;
}

const SubmodulePermissionForm = ({ id, onUpdateSubModulePermission, onPage }: Props) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [subModule, setSubModule] = useState<SubModule | null>(null);
  const [formValues, setFormValues] = useState<SubModulePermission>({
    id: 0,
    sub_module_id: 0,
    allow: 0,
    create: 0,
    view: 0,
    edit: 0,
    update: 0,
    cancel: 0,
    verify: 0,
    approve: 0,
    note: 0,
  });

  useEffect(() => {
    if (id && open) {
      fetchSubModulePermissionData(id);
      fetchSubModuleData(id);
    }
  }, [id, open]);

  const fetchSubModuleData = async (subModuleId: number) => {
    try {
      const res = await showSubModuleById(subModuleId);
      setSubModule(res)
    } catch (error) {
      console.log('Failed to fetch module data', error);
    }
  };

  const fetchSubModulePermissionData = async (submodulePermissionId: number) => {
    try {
      const res = await showSubModulePermissionById(submodulePermissionId);
      setFormValues({
        id: Number(res.id),
        sub_module_id: Number(res.sub_module_id),
        allow: Number(res.allow),
        create: Number(res.create),
        view: Number(res.view),
        edit: Number(res.edit),
        update: Number(res.update),
        cancel: Number(res.cancel),
        verify: Number(res.verify),
        approve: Number(res.approve),
        note: Number(res.note),
      });
    } catch (error) {
      console.log('Failed to fetch module data', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitchChange = (key: keyof SubModulePermission) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [key]: event.target.checked ? 0 : -1,
    }));
  };

  const handleSubmit = async () => {
    try {
      const subModulePermissionData: SubModulePermission = {
        id: formValues.id,
        sub_module_id: formValues.sub_module_id,
        allow: formValues.allow,
        create: formValues.create,
        view: formValues.view,
        edit: formValues.edit,
        update: formValues.update,
        cancel: formValues.cancel,
        verify: formValues.verify,
        approve: formValues.approve,
        note: formValues.note,
      };
      if (onUpdateSubModulePermission && id) {
        const { status, message } = await onUpdateSubModulePermission(subModulePermissionData, formValues.id);
        if (status === 'success') {
          setSuccess(message);
          if (onPage) {
            onPage(0); 
          }
        } else {
          console.log(message)
          setError(message);
        }
        setSnackbarOpen(true);
      }
      
    } catch (error) {
      console.log('An error occurred.', error);
    }
  };


  return (
    <React.Fragment>
      <Button
        size='small'
        variant='outlined'
        onClick={handleClickOpen}
        color='info'
        startIcon={<IconEye />}
      >
        Permission
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth='sm'
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{subModule?.name} Permissions</DialogTitle>
        <DialogContent>
          <Stack width='25%'>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Allow</Typography>
              <Switch
                checked={formValues.allow === 0}
                onChange={handleSwitchChange('allow')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Create</Typography>
              <Switch
                checked={formValues.create === 0}
                onChange={handleSwitchChange('create')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>View</Typography>
              <Switch
                checked={formValues.view === 0}
                onChange={handleSwitchChange('view')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Edit</Typography>
              <Switch
                checked={formValues.edit === 0}
                onChange={handleSwitchChange('edit')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Update</Typography>
              <Switch
                checked={formValues.update === 0}
                onChange={handleSwitchChange('update')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Cancel</Typography>
              <Switch
                checked={formValues.cancel === 0}
                onChange={handleSwitchChange('cancel')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Verify</Typography>
              <Switch
                checked={formValues.verify === 0}
                onChange={handleSwitchChange('verify')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Approve</Typography>
              <Switch
                checked={formValues.approve === 0}
                onChange={handleSwitchChange('approve')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography>Note</Typography>
              <Switch
                checked={formValues.note === 0}
                onChange={handleSwitchChange('note')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='error' size='small'>Close</Button>
          <Button onClick={handleSubmit} variant='outlined' color='success' size='small'>Update</Button>
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
};

export default SubmodulePermissionForm;
