'use client'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'


const MiddleMainMenu = ({ MainMenuItems }: any) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Grid container spacing={3} columns={12} sx={{ width: { xs: "90%", md: "80%", lg: "50%" } }}>
        {MainMenuItems && MainMenuItems.map((item: any, e: any) => (
          <Grid size={{ xs: 4, md: 3}} key={e}>
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
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <Typography
                              sx={{
                              color: 'white',
                              fontWeight: 300, 
                              fontSize: { xs: '0.65rem', md: '0.875rem' },
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

export default MiddleMainMenu
