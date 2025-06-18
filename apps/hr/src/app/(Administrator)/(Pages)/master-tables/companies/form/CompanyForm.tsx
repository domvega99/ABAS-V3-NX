'use client'
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import { Company } from '@/app/services/company';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import NoImage from '@/app/assets/no-image.png';
import Image from 'next/image';
import { IMAGE_ROOT } from '../../../../../../../apiConfig';



interface Props {
  formValues: Company;
  errorFields: any;
  handleFormChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyForm = ({ formValues, handleFormChange, errorFields, handleFileChange }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file)); 
      handleFileChange(event); 
    }
  };

  return (
    <>
    {loading && <ProgressLoading />}
      <Stack marginTop={2} gap={2}>
        <Stack>
          <Typography variant="body1">Logo</Typography>
          {imagePreview ? (
            <Image src={imagePreview} alt="logo-image-preview" height={100} width={100} />
          ) : formValues.logo_path ? (
            <img src={`${IMAGE_ROOT}/logo/${formValues.logo_path}`} alt="logo-image" height={100} width={100} />
          ) : (
            <Image src={NoImage} alt="no-image" height={100} width={100} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </Stack>
        <TextField
          label="Name"
          name="name"
          value={formValues.name || ''}
          error={!!errorFields.name}
          helperText={errorFields.name}
          onChange={handleFormChange}
        />
        <TextField
          label="Address"
          name="address"
          value={formValues.address || ''}
          error={!!errorFields.address}
          helperText={errorFields.address}
          onChange={handleFormChange}
        />
        <TextField
          label="Telephone No"
          name="telephone_no"
          value={formValues.telephone_no || ''}
          error={!!errorFields.telephone_no}
          helperText={errorFields.telephone_no}
          onChange={handleFormChange}
        />
        <TextField
          label="Fax No"
          name="fax_no"
          value={formValues.fax_no || ''}
          error={!!errorFields.fax_no}
          helperText={errorFields.fax_no}
          onChange={handleFormChange}
        />
        <TextField
          label="Tax Identification No."
          name="company_tin"
          value={formValues.company_tin || ''}
          error={!!errorFields.company_tin}
          helperText={errorFields.company_tin}
          onChange={handleFormChange}
        />
        <FormControl fullWidth error={!!errorFields.is_top_20000}>
          <InputLabel id="demo-simple-select-label">Is Top 20,000?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="is_top_20000"
            value={formValues.is_top_20000}
            error={!!errorFields.is_top_20000}
            label="Is Top 20,000?"
            onChange={handleFormChange as any}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
          {errorFields.is_top_20000 && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.is_top_20000}</FormHelperText>}
        </FormControl>
        <TextField
          label="Abbreviation"
          name="abbreviation"
          value={formValues.abbreviation || ''}
          error={!!errorFields.abbreviation}
          helperText={errorFields.abbreviation}
          onChange={handleFormChange}
        />
        <FormControl fullWidth error={!!errorFields.stat}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="stat"
            value={formValues.stat}
            error={!!errorFields.stat}
            label="Status"
            onChange={handleFormChange as any}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </Select>
          {errorFields.stat && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.stat}</FormHelperText>}
        </FormControl>
      </Stack>
    </>
  );
};

export default CompanyForm;
