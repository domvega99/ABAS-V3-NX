import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import { TransitionProps } from '@mui/material/transitions';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Role, showRoleById } from '@/app/services/role';

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
    onAdd?: (newRole: Role, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => Promise<any>;
    onUpdate?: (updatedRole: Role, id: number, setErrorFields: React.Dispatch<React.SetStateAction<any>>) => Promise<any>;
    id?: number;
    module_id?: number;
}

const RoleForm = ({ title, onAdd, onUpdate, id, module_id }: Props) => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [errorFields, setErrorFields] = useState<any>({});
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [formValues, setFormValues] = useState<{ name: string, stat: number }>({ name: '', stat: 1 });

    useEffect(() => {
        if (id && open) {
            fetchRoleData(id);
        }
    }, [id, open]);

    const fetchRoleData = async (roleId: number) => {
        try {
            const res = await showRoleById(roleId);
            setFormValues({ name: res.name, stat: res.stat });
        } catch (error) {
            console.log('Failed to fetch module data', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormValues({
        ...formValues,
        [name as string]: value,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        try {
            const roleData: Role = {
                id: id || 0,
                name: formValues.name,
                module_id: module_id ?? 0,
                stat: formValues.stat
            };
            if (onAdd) {
                const { status, message } = await onAdd(roleData, setErrorFields);
                if (status === 'success') {
                    setSuccess(message);
                    setFormValues({ name: '', stat: 1 });
                    setErrorFields({});
                    setError('');
                } else {
                    setError(message);
                }
                setSnackbarOpen(true);
            } else {
                if (onUpdate && id) {
                    const { status, message } = await onUpdate(roleData, id, setErrorFields);
                    if (status === 'success') {
                        setSuccess(message);
                        setErrorFields({});
                        setError('');
                    } else {
                        setError(message);
                    }
                    setSnackbarOpen(true);
                }
            }
        } catch (error) {
            console.log('An error occurred.', error);
        }
    };

    return (
        <React.Fragment>
            <Button 
                color={onAdd ? 'success' : 'warning'} 
                variant={onAdd ? "contained" : "outlined"} 
                size={onAdd ? "medium" : "small"}
                onClick={handleClickOpen} 
                startIcon={onAdd ? <IconPlus size={18}/> : <IconEdit size={18}/>}
            >
                {onAdd ? 'Add' : 'Edit'}
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                <Stack marginTop={2} gap={2}>
                    <TextField
                    size='small'
                    label="Role Name"
                    name="name"
                    error={!!errorFields.name}
                    helperText={errorFields.name}
                    value={formValues.name}
                    onChange={handleChange}
                    />
                    <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="stat"
                        value={formValues.stat}
                        label="Status"
                        onChange={handleChange as any}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                    </FormControl>
                </Stack>
                <SingleSnackbar
                    open={snackbarOpen}
                    severity={error ? 'error' : 'success'}
                    message={error || success}
                    onClose={handleSnackbarClose}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant='outlined' size='small' color='error'>Close</Button>
                <Button onClick={handleSave} variant='outlined' size='small'>{onAdd ? 'Save' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default RoleForm;
