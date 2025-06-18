'use client';
import BlankPage from '@/app/components/shared/container/BlankPage';
import PageContainer from '@/app/components/shared/container/PageContainer';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import withAuth from '@/app/components/shared/WithAuth';
import useDepartments from '@/app/hooks/useDepartments';
import {
    Department,
    DepartmentInitial,
    showDepartmentById,
    updateDepartment,
} from '@/libs/api-services/masters/departments/department-service';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DepartmentForm from '../util/form';
import { departmentValidations } from '../util/validation';

const Page = () => {
    const params = useParams();
    const id = Number(params.id);
    const [loading, setLoading] = useState<boolean>(false);
    const [generalError, setGeneralError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const { onRefreshData } = useDepartments();

    const fetchData = async (setValues: (values: Department) => void) => {
        try {
            setLoading(true);
            const res = await showDepartmentById(id);
            setValues({
                name: res.name,
                division_id: res.division_id,
                sorting: res.sorting,
                stat: res.stat,
            });
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch department data', error);
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: DepartmentInitial,
        validationSchema: departmentValidations,
        onSubmit: async (values, { setErrors }) => {
            try {
                setLoading(true);
                const { status, message } = await updateDepartment(id, values);
                if (status === 'success') {
                    onRefreshData();
                    setSuccess(message);
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (id) {
            fetchData(formik.setValues);
        }
    }, [id]);

    return (
        <>
            {loading && <ProgressLoading />}
            <PageContainer title="Departments" description="">
                <BlankPage>
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        marginBottom="5px"
                    >
                        <Stack gap={2} flexDirection="row" alignItems="center">
                            <IconButton
                                color="secondary"
                                size="large"
                                LinkComponent={Link}
                                href="/master-tables/departments"
                            >
                                <IconArrowLeft size="25" />
                            </IconButton>
                            <Typography variant="h4">Edit Department</Typography>
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
                        onClose={handleSnackbarClose}
                    />
                </BlankPage>
            </PageContainer>
        </>
    );
};

export default withAuth(Page);
