import React from 'react'
import {Card, TextField, Typography, Stack, Button} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';

function HttpUrl() {
  return (
    <Card sx={{p:2, my:2}}>
        <Typography variant="h6">Generated HTTP Url</Typography>
        <Stack>
        <TextField placeholder="http://localhost:3000/api/v1/sms/send" size="small" />
        </Stack>
        <Stack spacing={2} direction='row' sx={{my:2}}>
        <Button variant="contained" startIcon={<ContentCopyIcon/>}>Copy</Button>
        <Button variant="contained" startIcon={<SendIcon/>}>Send Request</Button>
        </Stack>
    </Card>
  )
}

export default HttpUrl