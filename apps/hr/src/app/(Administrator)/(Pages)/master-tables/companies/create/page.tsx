'use client'
import BlankPage from '@/app/components/shared/container/BlankPage'
import PageContainer from '@/app/components/shared/container/PageContainer'
import ProgressLoading from '@/app/components/shared/ProgressLoading'
import SingleSnackbar from '@/app/components/shared/SingleSnackbar'
import withAuth from '@/app/components/shared/WithAuth'
import { addCompany, Company, CompanyInitial } from '@/app/services/company'
import { uploadImage } from '@/app/services/upload'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useState } from 'react'
import CompanyForm from '../form/CompanyForm'

const Page = () => {
    const [formValues, setFormValues] = useState<Company>(CompanyInitial);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [errorFields, setErrorFields] = useState<any>({});
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          setFile(event.target.files[0]);
      }
    };

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
      setLoading(true);
      try {
        let logoName = '';
        if (file) {
          logoName = await uploadImage(file, 'logo');
        }
        const newData: Company = {
          ...formValues,
          logo_path: logoName,
        };
        const { status, message } = await addCompany(newData);
        if (status === 'success') {
          setSuccess(message);
          setFormValues(CompanyInitial);
          setErrorFields({});
          setError('');
        } else {
          setError(message);
        }
        setSnackbarOpen(true);
      } catch (error: any) {
        const errorMessages = error.response?.data?.message || 'An error occurred.';
        if (typeof errorMessages === 'object') {
          setErrorFields(errorMessages);
        } else {
          setErrorFields({});
        }
        setError('An error occurred.');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
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
              <Typography variant="h4">Add Company</Typography>
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
