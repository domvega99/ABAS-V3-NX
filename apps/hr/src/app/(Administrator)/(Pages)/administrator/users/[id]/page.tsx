"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, IconButton, Stack, Tab, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { showUserById, updateUser, User, UserInitial } from '@/app/services/user'
import UserRolePermission from './UserRolePermission'
import UserForm from '../form/UserForm'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import withAuth from '@/app/components/shared/WithAuth'
import UserAccess from './UserAccess'

const Page = () => {
  const params = useParams()
  const id = Number(params.id);
  const [formValues, setFormValues] = useState<User>(UserInitial);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [errorFields, setErrorFields] = useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [value, setValue] = useState('1');

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

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  // Get User Data
  const fetchUserData = async (userId: number) => {
    try {
      const res = await showUserById(userId);
      setFormValues({ 
        username: res.username, 
        first_name: res.first_name,
        last_name: res.last_name,
        middle_name: res.middle_name,
        email: res.email,
        user_location: res.user_location,
      });
    } catch (error) {
      console.log('Failed to fetch user data', error);
    }
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
      const { status, message } = await updateUser(id, userData);
      if (status === 'success') {
        setSuccess(message);
        setErrorFields({});
        setError('');
      } else {
        setError(message);
      }
      setSnackbarOpen(true);
      setLoading(false)
    } catch (error: any) {
      const errorMessages = error.response?.data?.message || 'An error occurred.';
      if (typeof errorMessages === 'object') {
        setErrorFields(errorMessages);
      } else {
        setErrorFields({});
      }
      setError('An error occurred.');
      setSnackbarOpen(true);
      setLoading(false)
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {loading && <ProgressLoading />}
      <PageContainer title="User" description="">
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
              <Typography variant="h4">Edit User</Typography>
            </Stack>
            <Button variant='contained' color='success' onClick={handleSave}>Save</Button>
          </Stack>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Basic" value="1" />
                  <Tab label="Role Permissions" value="2" />
                  <Tab label="Activities" value="3" />
                  <Tab label="Access" value="4" />
                </TabList>
              </Box>
              <Box sx={{ 
                height: '70vh', 
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
                  <UserRolePermission id={id}/>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">
                  <UserAccess />
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
