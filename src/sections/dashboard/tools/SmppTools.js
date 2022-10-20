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
    Checkbox,
    CardHeader,
    Grid,
    CardContent
} from '@mui/material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function GroupsTable(owner, group, accounts, action) {
    return { owner, group, accounts, action }
}

export default function SmppTools() {
    const [groups, setGroups] = useState()
    const [value, setValue] = useState(new Date())
    const [range, setRange] = useState()

    // const theme = useTheme()

    const handleChange = (event) => {
        setGroups(event.target.value);
    }

    return (
        <>
        {/* <Container maxWidth={xl}> */}
            <Card sx={{ p: 2 }}>
                {/* <Grid container spacing={2}>
                    <Grid item xs={6}> */}
                        <Typography>Message: (640 chars max, 160 per sms)</Typography>
                        <Stack spacing={2}
                        sx={{ width: '100%' }}
                        >
                            <TextField sx={{ minWidth: '25ch' }} />
                        </Stack>

                        <Stack
                            direction='row'
                            mt={2}
                            spacing={2}
                            sx={{
                                // maxWidth: '100%',
                                // width: '30%' 
                            }}>
                            <Box sx={{}}>
                                <Typography variant='subtitle2'>From</Typography>
                                <TextField 
                                // sx={{ minWidth: '25ch' }} 
                                size='small' />
                            </Box>
                            <Box sx={{}}>
                                <Typography variant='subtitle2'>To</Typography>
                                <TextField 
                                // sx={{ minWidth: '25ch' }} 
                                size='small' />
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            // width: '45%' 
                        }}>
                            <Typography>TON/NPI Settings</Typography>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Auto" />
                            <FormControlLabel control={<Checkbox />} label="Custom" />
                        </Stack>

                        <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
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
                    {/* </Grid> */}

                    <Divider orientation='vertical' />
                    {/* <Grid sx={6} md={6}>
                        <Card p={2}>
                            <CardHeader title='SMPP Message Status' />
                            <CardContent>
                                <Typography>y</Typography>
                            </CardContent>

                        </Card> */}
                        {/* <Typography variant='h6'>Scheduled Delivery</Typography> */}
                    {/* </Grid>
                </Grid> */}

            </Card >
            {/* </Container> */}
        </>
    )
}

