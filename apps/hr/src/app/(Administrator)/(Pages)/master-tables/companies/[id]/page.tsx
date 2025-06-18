'use client'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import withAuth from '@/app/components/shared/WithAuth'
import { Company, CompanyInitial, showCompanyById, updateCompany } from '@/app/services/company'
import { uploadImage } from '@/app/services/upload'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CompanyForm from '../form/CompanyForm'

const Page = () => {
    const params = useParams()
    const id = Number(params.id);
    const [formValues, setFormValues] = useState<Company>(CompanyInitial);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [errorFields, setErrorFields] = useState<any>({});
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const handleFormChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name as string]: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id: number) => {
        try {
            setLoading(true)
            const res = await showCompanyById(id);
            setFormValues({ 
                name: res.name,
                address: res.address,
                telephone_no: res.telephone_no,
                company_tin: res.company_tin,
                is_top_20000: res.is_top_20000,
                abbreviation: res.abbreviation,
                stat: res.stat,
                logo_path: res.logo_path
            });
            setLoading(false)
        } catch (error) {
            console.log('Failed to fetch user data', error);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true)
            let logoName = formValues.logo_path;
            if (file) {
                logoName = await uploadImage(file, 'logo');
            }
            const updateData: Company = {
                ...formValues,
                logo_path: logoName,
            };
            const { status, message } = await updateCompany(id, updateData);
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
        <PageContainer title="Companies" description="">
            <BlankPage>
                <Stack flexDirection='row' alignItems='center' justifyContent='space-between' marginBottom='5px'>
                    <Stack gap={2} flexDirection='row' alignItems='center'>
                        <IconButton
                        color='secondary'
                        size="large"
                        LinkComponent={Link}
                        href='/master-tables/companies'
                        >
                            <IconArrowLeft size="25"/>
                        </IconButton>
                        <Typography variant="h4">Edit Company</Typography>
                    </Stack>
                    <Button variant='contained' color='success' onClick={handleSave}>Save</Button>
                </Stack>
                <CompanyForm formValues={formValues} handleFormChange={handleFormChange} errorFields={errorFields} handleFileChange={handleFileChange}/>
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
