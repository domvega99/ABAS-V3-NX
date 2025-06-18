'use client'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import withAuth from '@/app/components/shared/WithAuth'
import useDepartments from '@/app/hooks/useDepartments'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DepartmentForm from '../util/form'
import { addDepartment, Department, DepartmentInitial } from '@/libs/api-services/masters/departments/department-service'

const Page = () => {
    const [formValues, setFormValues] = useState<Department>(DepartmentInitial);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [errorFields, setErrorFields] = useState<any>({});
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { onRefreshData } = useDepartments();

    const handleFormChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name as string]: value,
        });
      };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true)
            const newData: Department = {
                name: formValues.name,
                division_id: formValues.division_id,
                sorting: formValues.sorting,
                stat: formValues.stat,
            };
            const { status, message } = await addDepartment(newData);
            if (status === 'success') {
                onRefreshData();
                setSuccess(message);
                setFormValues(DepartmentInitial);
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

    return (
        <>
            {loading && <ProgressLoading />}
            <PageContainer title="Departments" description="">
                <BlankPage>
                <Stack flexDirection='row' alignItems='center' justifyContent='space-between' marginBottom='5px'>
                    <Stack gap={2} flexDirection='row' alignItems='center'>
                        <IconButton
                            color='secondary'
                            size="large"
                            LinkComponent={Link}
                            href='/master-tables/departments'
                        >
                            <IconArrowLeft size="25"/>
                        </IconButton>
                        <Typography variant="h4">Add Department</Typography>
                    </Stack>
                    <Button variant='contained' color='success' onClick={handleSave}>Save</Button>
                </Stack>
                <DepartmentForm formValues={formValues} handleFormChange={handleFormChange} errorFields={errorFields}/>
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
