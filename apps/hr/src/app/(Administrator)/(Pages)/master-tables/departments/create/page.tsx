'use client';
import BlankPage from '@/app/components/shared/container/BlankPage';
import PageContainer from '@/app/components/shared/container/PageContainer';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import withAuth from '@/app/components/shared/WithAuth';
import useDepartments from '@/app/hooks/useDepartments';
import { addDepartment, DepartmentInitial } from '@/libs/api-services/masters/departments/department-service';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import DepartmentForm from '../util/form';
import { departmentValidations } from '../util/validation';

const Page = () => {
    const [generalError, setGeneralError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { onRefreshData } = useDepartments();

    const formik = useFormik({
        initialValues: DepartmentInitial,
        validationSchema: departmentValidations,
        onSubmit: async (values, { resetForm, setErrors }) => {
            try {
                setLoading(true);
                const { status, message } = await addDepartment(values);
                if (status === 'success') {
                    onRefreshData();
                    setSuccess(message);
                    resetForm();
                    setGeneralError(''); 
                } else {
                    setGeneralError(message);
                }
                setLoading(false);
                setSnackbarOpen(true);
            } catch (error: any) {
                const errorMessages = error.response?.data?.message || 'An error occurred.';
                if (typeof errorMessages === 'object') {
                    setErrors(errorMessages); 
                    setGeneralError(errorMessages.name);
                } else {
                    setGeneralError('An error occurred.');
                }
                setLoading(false);
                setSnackbarOpen(true);
            }
        },
    });

    return (
        <>
        {loading && <ProgressLoading />}
        <PageContainer title="Departments" description="">
            <BlankPage>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="5px">
                <Stack gap={2} flexDirection="row" alignItems="center">
                <IconButton
                    color="secondary"
                    size="large"
                    LinkComponent={Link}
                    href="/master-tables/departments"
                >
                    <IconArrowLeft size="25" />
                </IconButton>
                <Typography variant="h4">Add Department</Typography>
                </Stack>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => formik.handleSubmit()}
                >
                    Save
                </Button>
            </Stack>
            <DepartmentForm formik={formik} />
            <SingleSnackbar
                open={snackbarOpen}
                severity={generalError ? 'error' : 'success'}
                message={generalError || success}
                onClose={() => setSnackbarOpen(false)}
            />
            </BlankPage>
        </PageContainer>
        </>
    );
};

export default withAuth(Page);
