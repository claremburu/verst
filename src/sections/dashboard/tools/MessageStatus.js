import React from 'react'
import PropTypes from 'prop-types';
import {Card, Typography, CardHeader, CardContent, Divider, Box, CardActions, Button} from '@mui/material'

import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

// import { useTheme } from '@emotion/react'
MessageStatus.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

function MessageStatus({color='primary', icon, title, total, sx, ...other}) {

  return (
    // <Box sx={{border:1 ,borderColor:(theme) => theme.palette[color].lighter}}>
    <Card p={2} sx={{border:1, borderColor:(theme) => theme.palette[color].main}}>
      <CardHeader title=' SMPP Message Status' sx={{bgcolor: (theme) => theme.palette[color].main,}}/>
      <CardContent>
        <Typography variant='subtitle1'>Connection  </Typography>
        <Typography variant='subtitle1'>Bind </Typography>
        <Typography variant='subtitle1'>Sending </Typography>
        <Typography variant='subtitle1'>Message </Typography>
        <Typography variant='subtitle1'>Options</Typography>
        <Divider/>
        <CardActions sx={{}}>
        <Button variant='outlined' startIcon={<SendIcon/>}>Send Message</Button>
        <Button variant='outlined' startIcon={<ClearIcon/>}>Clear</Button>
        </CardActions>
      </CardContent>
    </Card>
    // </Box>
  )
}

export default MessageStatus