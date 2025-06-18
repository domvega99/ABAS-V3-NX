import { Box, Chip, Divider, Fab, FormControl, InputAdornment, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import { IconAdjustments, IconEyeCheck, IconSearch } from '@tabler/icons-react'

const data = [
    {
        title: 'Canvass',
        status: 'For Approval',
        priority: 'High',
        transaction: '12345',
        control: '12345',
        assigned: 'Sandy Victor Shipping Corp.',
        department: 'FINANCE DEPARTMENT',
        description: 'Replenishment of Revolving Fund RF-764-24',
        date: '09-09-2024'
    },
    {
        title: 'Cash Advances',
        status: 'For Approval',
        priority: 'High',
        transaction: '12345',
        control: '12345',
        assigned: 'Sandy Victor Shipping Corp.',
        department: 'FINANCE DEPARTMENT',
        description: 'Replenishment of Revolving Fund RF-764-24',
        date: '09-09-2024'
    }
]

const Inbox = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: 1 }}>
                <FormControl variant="outlined">
                    <OutlinedInput
                        size='small'
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                                <IconSearch stroke={1.5} size="1.3rem"/>
                            </InputAdornment>}
                    />
                </FormControl>
                <Fab color="primary" size='small'>
                    <IconAdjustments/>
                </Fab>
            </Box>
            <Box>
                {data.map((row, index) => (
                    <Box key={index}>
                        <Stack gap={1} sx={{ paddingY: 1 }}>
                            <Stack flexDirection="row" gap={1} alignItems='baseline' justifyContent="space-between" flexWrap="wrap">
                                <Stack flexDirection="row" alignItems="center" gap={1}>
                                    <Typography variant="h6">{row.title}</Typography>  
                                </Stack>
                                <Typography variant="body2">{row.date}</Typography>  
                            </Stack>
                            <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                <Chip size='small' sx={{ backgroundColor: 'error.light', color: 'error.main', fontSize: '11px' }} label={`Status: ${row.status}`}/>
                                <Chip size='small' sx={{ backgroundColor: 'error.light', color: 'error.main', fontSize: '11px' }} label={`Priority: ${row.priority}`}/>
                            </Stack>
                            <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main', fontSize: '11px' }} label={`Transaction #: ${row.transaction}`}/>
                                <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main', fontSize: '11px' }} label={`Control #: ${row.control}`}/>
                            </Stack>
                            <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                <Chip size='small' sx={{ backgroundColor: 'secondary.light', color: 'secondary.main', fontSize: '11px' }} label={`Assigned: ${row.assigned}`}/>
                                <Chip size='small' sx={{ backgroundColor: 'secondary.light', color: 'secondary.main', fontSize: '11px' }} label={`Department: ${row.department}`}/>
                            </Stack>
                            <Stack>
                                <Typography variant="body1" sx={{ color: '#A4ADBF' }}>{row.description}</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={1} justifyContent="flex-end">
                                <Fab size="small" color="warning" aria-label="add">
                                    <IconEyeCheck />
                                </Fab>
                            </Stack>
                        </Stack>
                        <Divider />
                    </Box>
                ))}
            </Box>
            <Stack spacing={2} marginTop={2} alignItems='flex-end'>
                <Pagination count={10} color='primary' size='small'/>
            </Stack>
        </Box>
    )
}

export default Inbox
