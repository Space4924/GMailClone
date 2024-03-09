// import {lazy} from 'react'
import { Box, Typography } from '@mui/material'
import { useRouteError } from 'react-router-dom'

const ErrorComponents = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <Box style={{ marginLeft: 250 }}>
        <Typography>
          Error Loadinng Error in the market
        </Typography>
      </Box>
    </>
  )
}

export default ErrorComponents
