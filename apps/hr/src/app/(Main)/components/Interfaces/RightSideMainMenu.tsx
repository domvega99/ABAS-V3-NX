'use client'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const RightSideMainMenu = ({ MainMenuItems }: any) => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={3} columns={2} direction='column' wrap='wrap' sx={{ height: '80vh', display: 'flex', alignItems: 'center', width: { xs: '100%', lg: '10%'} }}>
                {MainMenuItems && MainMenuItems.map((item: any, e: any) => (
                <Grid key={e}>
                    <Link href={item.link}>
                        <Stack justifyContent='center' alignItems='center' gap={1} width='100%'>
                            <Box
                                sx={{
                                    width: { xs: 50, md: 60}, 
                                    height: { xs: 50, md: 60}, 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: 'white',
                                    borderRadius: 2, 
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                    transform: 'translateY(-4px)', 
                                    },
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Box sx={{ width: { xs: '80%', md: '100%' }, display: 'flex', justifyContent: 'center' }}>
                                <Typography
                                    sx={{
                                    color: 'white',
                                    fontWeight: 300, 
                                    fontSize: { xs: '0.65rem', md: '0.775rem' },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Stack>
                    </Link>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default RightSideMainMenu
