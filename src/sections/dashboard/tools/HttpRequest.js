import React, { useState } from 'react'
import {
    Typography,
    Container,
    Card,
    Box,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Button,
    OutlinedInput,
    Divider,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    FormControlLabel,
    Checkbox
} from '@mui/material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function GroupsTable(owner, group, accounts, action) {
    return { owner, group, accounts, action }
}

export default function HttpRequest() {
    const [requests, setRequests] = useState()

    const handleChange = (event) => {
        setRequests(event.target.value);
    }

    return (
        <>
            <Card sx={{ p: 2 }}>
                <Typography variant='h6'>Account Details</Typography>
                <Stack spacing={2}
                // sx={{ width: '100%' }}
                >
                    <Typography>Enter the details and select the options below to see a sample HTTP request. Dont worry, your passwords are safe. Nothing is saved.

                    </Typography>
                    {/* <TextField  /> */}
                </Stack>

                <Stack
                    direction='row'
                    mt={2}
                    spacing={2}
                // sx={{ width: '100%' }}
                >
                    <Box>
                        <Typography variant='subtitle2'>Host / IP Address</Typography>
                        <TextField
                            // sx={{ 
                            //     minWidth: '25ch' }} 
                            size='small' />
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>Port</Typography>
                        <TextField
                            // sx={{ minWidth: '25ch' }} 
                            size='small' />
                    </Box>
                </Stack>
                <Stack
                    direction='row'
                    mt={2}
                    spacing={2}
                // sx={{ width: '100%' }}
                >
                    <Box>
                        <Typography variant='p'>Username</Typography>
                        <TextField
                            placeholder='Username'
                            // sx={{ 
                            //     minWidth: '25ch' }} 
                            size='small' />
                    </Box>
                    <Box>
                        <Typography variant='p'>Password</Typography>
                        <TextField
                            placeholder='*********'
                            // sx={{ minWidth: '25ch' }} 
                            size='small' />
                    </Box>
                </Stack>
                <Typography mt={1} variant='subtitle1'>Request Type</Typography>
                <Stack>
                    <FormControl sx={{ my: 1, minWidth: 120 }} size="small">
                        <Select
                            value={requests}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Send SMS MT</em>
                            </MenuItem>
                            <MenuItem value={10}>Balance Enquiry</MenuItem>
                            {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
                            <MenuItem value={30}>Check Rate</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                {/* <Stack direction='row' spacing={2} sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    // width: '45%' 
                }}>
                    <Typography>TON/NPI Settings</Typography>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Auto" />
                    <FormControlLabel control={<Checkbox />} label="Custom" />
                </Stack>

                <Stack direction='row' spacing={2} sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    //  width: '50%'
                }}>
                    <Box>
                        <Typography>Host</Typography>
                        <TextField placeholder='Host Name' size='small' />
                    </Box>
                    <Box>
                        <Typography>Port</Typography>
                        <TextField placeholder='Port' size='small' />
                    </Box>
                    <Box>
                        <Typography>Bind</Typography>
                        <TextField placeholder='Bind' size='small' />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={2} sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    // width: '50%', 
                    my: 1
                }}>
                    <Box>
                        <Typography>System ID</Typography>
                        <TextField placeholder='System ID' size='small' />
                    </Box>
                    <Box>
                        <Typography>Password</Typography>
                        <TextField placeholder='Password' size='small' />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
                    <Box>
                        <Typography>System Type</Typography>
                        <TextField placeholder='System ID' size='small' />
                    </Box>
                    <Box>
                        <Typography>Interface Version</Typography>
                        <TextField placeholder='Password' size='small' />
                    </Box>
                </Stack>
                <FormControlLabel control={<Checkbox />} label="Wait up to 30 seconds for a Delivery Report" />
                <Divider /> */}

            </Card>
        </>
    )
}

