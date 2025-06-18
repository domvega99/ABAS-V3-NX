import { LinearProgress } from '@mui/material'
import React from 'react'

const ProgressLoading = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 11 }}>
      <LinearProgress color="primary" />
    </div>
  )
}

export default ProgressLoading
