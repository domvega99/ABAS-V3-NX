'use client'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import withAuth from '@/app/components/shared/WithAuth'
import useDepartments from '@/app/hooks/useDepartments'
import { Department, DepartmentInitial, showDepartmentById, updateDepartment } from '@/libs/api-services/masters/departments/department-service'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DepartmentForm from '../util/form'

const Page = () => {
    const params = useParams()
    const id = Number(params.id);
    const [formValues, setFormValues] = useState<Department>(DepartmentInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [errorFields, setErrorFields] = useState<any>({});
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const { onRefreshData } = useDepartments();

    const handleFormChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name as string]: value,
        });
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id: number) => {
        try {
            setLoading(true)
            const res = await showDepartmentById(id);
            setFormValues({ 
                name: res.name,
                division_id: res.division_id,
                sorting: res.sorting,
                stat: res.stat,
            });
            setLoading(false)
        } catch (error) {
            console.log('Failed to fetch user data', error);
        }
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
            const { status, message } = await updateDepartment(id, newData);
            if (status === 'success') {
                onRefreshData();
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
                            <Typography variant="h4">Edit Department</Typography>
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
