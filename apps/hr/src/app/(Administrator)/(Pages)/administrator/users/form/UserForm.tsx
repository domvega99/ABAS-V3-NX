"use client"
import React, { useEffect, useState } from 'react'
import { UserLocation, getAllActiveUserLocations } from '@/app/services/user-location'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { User } from '@/app/services/user'
import ProgressLoading from '@/app/components/shared/ProgressLoading'

interface Props {
  formValues: User;
  errorFields: any;
  handleFormChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const UserForm = ({ formValues, handleFormChange, errorFields }: Props) => {
  const [locations, setLocations] = useState<UserLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    try {
      setLoading(true);
      const response = await getAllActiveUserLocations();
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Stack>
      {loading && <ProgressLoading />}
      <Stack gap={2}>
        <TextField
          fullWidth
          label="Link to Employee"
          name="user_id"
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formValues.username}
          onChange={handleFormChange}
          error={!!errorFields.username}
          helperText={errorFields.username}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formValues.last_name}
          onChange={handleFormChange}
          error={!!errorFields.last_name}
          helperText={errorFields.last_name}
        />
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formValues.first_name}
          onChange={handleFormChange}
          error={!!errorFields.first_name}
          helperText={errorFields.first_name}
        />
        <TextField
          fullWidth
          label="Middle Name"
          name="middle_name"
          value={formValues.middle_name}
          onChange={handleFormChange}
          error={!!errorFields.middle_name}
          helperText={errorFields.middle_name}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleFormChange}
          error={!!errorFields.email}
          helperText={errorFields.email}
        />
        <FormControl fullWidth error={!!errorFields.user_location}>
          <InputLabel id="user-location-select-label">User Location</InputLabel>
          <Select
            labelId="user-location-select-label"
            id="user-location-select"
            name="user_location"
            value={formValues.user_location}
            label="User Location"
            onChange={handleFormChange as any}
            error={!!errorFields.user_location}
          >
            {locations.map((location) => (
              <MenuItem value={location.location_name} key={location.id}>{location.location_name}</MenuItem>
            ))}
          </Select>
          {errorFields.user_location && <FormHelperText sx={{ color: '#FA5980' }}>{errorFields.user_location}</FormHelperText>}
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default UserForm;
