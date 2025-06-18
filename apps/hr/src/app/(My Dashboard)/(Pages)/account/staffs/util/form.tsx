'use client'
import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Division, getAllDivisions } from '@/app/services/division';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import { Department } from '@/libs/api-services/masters/departments/department-service';

interface Props {
    formValues: Department;
    errorFields: any;
    handleFormChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const DepartmentForm = ({ formValues, handleFormChange, errorFields }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [divisions, setDivisions] = useState<Division[]>([]);

    useEffect(() => {
        fetchDivisionData()
    }, []);

    const fetchDivisionData = async () => {
        try {
            setLoading(true)
            const response = await getAllDivisions();
            setDivisions(response.data)
            setLoading(false)
        } catch (error) {
            console.log('Failed to fetch module data', error);
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <ProgressLoading />}
            <Stack marginTop={2} gap={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={formValues.name}
                    error={!!errorFields.name}
                    helperText={errorFields.name}
                    onChange={handleFormChange}
                />
                <FormControl fullWidth error={!!errorFields.division_id}>
                    <InputLabel id="demo-simple-select-label">Division</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="division_id"
                        value={formValues.division_id}
                        label="Division"
                        error={!!errorFields.division_id}
                        onChange={handleFormChange as any}
                    >
                        {divisions && divisions.map((row) => (
                            <MenuItem value={row.id} key={row.id}>{ row.name }</MenuItem>
                        ))}
                    </Select>
                    {errorFields.division_id && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.division_id}</FormHelperText>}
                </FormControl>
                <TextField
                    type='number'
                    label="Sorting"
                    name="sorting"
                    value={formValues.sorting}
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

export default DepartmentForm;
