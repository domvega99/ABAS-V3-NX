'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import withAuth from '@/app/components/shared/WithAuth'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { IconButton, Stack, Typography, Box, Tab, Button } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import UserForm from '../form/UserForm'
import { addUser, User, UserInitial } from '@/app/services/user'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import UserRolePermissionForm from '../form/UserRolePermissionForm'

const Page = () => {
  const [value, setValue] = useState('1');
  const [formValues, setFormValues] = useState<User>(UserInitial);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [errorFields, setErrorFields] = useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleFormChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      const userData: User = {
        username: formValues.username,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        middle_name: formValues.middle_name,
        email: formValues.email,
        user_location: formValues.user_location,
        module_id: formValues.module_id,
        role_id: formValues.role_id
      };
      const { status, message } = await addUser(userData);
      if (status === 'success') {
        setSuccess(message);
        setFormValues(UserInitial);
        setErrorFields({});
        setError('');
      } else {
        setError(message);
      }
      setLoading(false);
      setSnackbarOpen(true);
    } catch (error: any) {
      const errorMessages = error.response?.data?.message || 'An error occurred.';
      if (typeof errorMessages === 'object') {
        setErrorFields(errorMessages);
      } else {
        setErrorFields({});
      }
      setLoading(false);
      setError('An error occurred.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    {loading && <ProgressLoading />}
    <PageContainer title="Users" description="">
      <BlankPage>
        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' marginBottom='5px'>
          <Stack gap={2} flexDirection='row' alignItems='center'>
            <IconButton
              color='secondary'
              size="large"
              LinkComponent={Link}
              href='/administrator/users'
            >
              <IconArrowLeft size="25" />
            </IconButton>
            <Typography variant="h4">Add User</Typography>
          </Stack>
          
          <Button variant='contained' color='success' onClick={handleSave}>Save</Button>
        </Stack>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Basic" value="1" />
                <Tab label="Role Permission" value="2" />
              </TabList>
            </Box>
            <Box sx={{ 
              height: '72vh', 
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '5px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#546E7A',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'background.paper',
              },
            }}>
              <TabPanel value="1">
                <UserForm formValues={formValues} handleFormChange={handleFormChange} errorFields={errorFields}/>
              </TabPanel>
              <TabPanel value="2">
                <UserRolePermissionForm formValues={formValues} handleFormChange={handleFormChange} errorFields={errorFields}/>
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
        <SingleSnackbar
          open={snackbarOpen}
          severity={error ? 'error' : 'success'}
          message={error || success}
          onClose={handleSnackbarClose}
        />
      </BlankPage>
    </PageContainer>
    </>
  )
}

export default withAuth(Page)
