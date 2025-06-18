import { Box, Button, Card, CardActions, CardContent, Chip, Fab, FormControl, InputAdornment, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import { IconAdjustments, IconSearch } from '@tabler/icons-react'
import DashboardCard from '../../../components/shared/DashboardCard'

const Inbox = () => {
    return (
        <DashboardCard title="My Inbox">
            <Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                <Box sx={{ paddingY: '10px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <Card>
                        <CardContent>
                            <Stack gap={1}>
                                <Stack>
                                    <Typography variant="h6">Canvass </Typography>  
                                </Stack>
                                <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="T# - 10023" />
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="C# - 4328" />
                                    <Chip size='small' sx={{ backgroundColor: 'error.light', color: 'error.main' }} label="High" />
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Sandy Victor Shipping Corp.</Typography>
                                    <Typography variant="body2">FINANCE DEPARTMENT</Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="body1">Replenishment of Revolving Fund RF-764-24</Typography>
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Prepared by: Dominic Vega</Typography>
                                    <Typography variant="body2">Verified by: Dominic Vega</Typography>  
                                    <Typography variant="body2">Approved by: Dominic Vega</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Chip size='small' sx={{ backgroundColor: 'warning.light', color: 'warning.main' }} label="For Canvass Approval" />
                            <Button size="small" color='info' variant='outlined'>View</Button>
                        </CardActions>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack gap={1}>
                                <Stack>
                                    <Typography variant="h6">Canvass </Typography>  
                                </Stack>
                                <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="T# - 10023" />
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="C# - 4328" />
                                    <Chip size='small' sx={{ backgroundColor: 'error.light', color: 'error.main' }} label="High" />
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Sandy Victor Shipping Corp.</Typography>
                                    <Typography variant="body2">FINANCE DEPARTMENT</Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="body1">Replenishment of Revolving Fund RF-764-24</Typography>
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Prepared by: Dominic Vega</Typography>
                                    <Typography variant="body2">Verified by: Dominic Vega</Typography>  
                                    <Typography variant="body2">Approved by: Dominic Vega</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Chip size='small' sx={{ backgroundColor: 'warning.light', color: 'warning.main' }} label="For Canvass Approval" />
                            <Button size="small" color='info' variant='outlined'>View</Button>
                        </CardActions>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack gap={1}>
                                <Stack>
                                    <Typography variant="h6">Canvass </Typography>  
                                </Stack>
                                <Stack flexDirection="row" gap={1} flexWrap="wrap">
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="T# - 10023" />
                                    <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="C# - 4328" />
                                    <Chip size='small' sx={{ backgroundColor: 'error.light', color: 'error.main' }} label="High" />
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Sandy Victor Shipping Corp.</Typography>
                                    <Typography variant="body2">FINANCE DEPARTMENT</Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="body1">Replenishment of Revolving Fund RF-764-24</Typography>
                                </Stack>
                                <Stack gap={1}>
                                    <Typography variant="body2">Prepared by: Dominic Vega</Typography>
                                    <Typography variant="body2">Verified by: Dominic Vega</Typography>  
                                    <Typography variant="body2">Approved by: Dominic Vega</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Chip size='small' sx={{ backgroundColor: 'warning.light', color: 'warning.main' }} label="For Canvass Approval" />
                            <Button size="small" color='info' variant='outlined'>View</Button>
                        </CardActions>
                    </Card>
                </Box>
                <Stack spacing={2} marginTop={2} alignItems='flex-end'>
                    <Pagination count={10} color='primary' size='small'/>
                </Stack>
            </Box>
        </DashboardCard>
    )
}

export default Inbox
