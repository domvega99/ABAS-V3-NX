'use client';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import { Division, getAllDivisions } from '@/app/services/division';
import { Department } from '@/libs/api-services/masters/departments/department-service';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
    formik: FormikProps<Department>;
}

const DepartmentForm = ({ formik }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [divisions, setDivisions] = useState<Division[]>([]);

    useEffect(() => {
        getDivisions();
    }, []);

    const getDivisions = async () => {
        try {
            setLoading(true);
            const response = await getAllDivisions();
            setDivisions(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch division data', error);
            setLoading(false);
        }
    };

    return (
        <>
        {loading && <ProgressLoading />}
        <Stack marginTop={2} gap={2}>
            <TextField
                label="Name"
                name="name"
                value={formik.values.name}
                error={!!formik.errors.name && formik.touched.name}
                helperText={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormControl fullWidth error={!!formik.errors.division_id && formik.touched.division_id}>
                <InputLabel id="division-select-label">Division</InputLabel>
                <Select
                    labelId="division-select-label"
                    id="division-select"
                    name="division_id"
                    label="Division"
                    value={formik.values.division_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {divisions.map((row) => (
                    <MenuItem value={row.id} key={row.id}>
                        {row.name}
                    </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{formik.touched.division_id && formik.errors.division_id}</FormHelperText>
            </FormControl>
            <TextField
                type="number"
                label="Sorting"
                name="sorting"
                value={formik.values.sorting}
                error={!!formik.errors.sorting && formik.touched.sorting}
                helperText={formik.touched.sorting && formik.errors.sorting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormControl fullWidth error={!!formik.errors.stat && formik.touched.stat}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    name="stat"
                    label="Status"
                    value={formik.values.stat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                </Select>
                <FormHelperText>{formik.touched.stat && formik.errors.stat}</FormHelperText>
            </FormControl>
        </Stack>
        </>
    );
};

export default DepartmentForm;
