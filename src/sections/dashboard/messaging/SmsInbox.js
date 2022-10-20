import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
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
    Stack
} from '@mui/material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function GroupsTable(owner, group, accounts, action) {
    return { owner, group, accounts, action }
}

export default function SmsInbox() {
    const theme = useTheme();
    const [groups, setGroups] = useState()
    const [value, setValue] = useState(new Date())
    const [range, setRange] = useState()

    const handleChange = (event) => {
        setGroups(event.target.value);
    }

    return (
        <>
            <Card sx={{ p: 2 }}>
                <Typography variant='h6'>SMS Inbox</Typography>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="p" sx={{}}> Show </Typography>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select
                                value={groups}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>20</em>
                                </MenuItem>
                                <MenuItem value={10}>50</MenuItem>
                                <MenuItem value={20}>100</MenuItem>
                                <MenuItem value={30}>200</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="p"> entries </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{}}>Search Message Content:</Typography>
                        <FormControl sx={{ width: '15ch', mx: 1 }}>
                            <OutlinedInput placeholder="Please enter search term" size='small' />
                            {/* <MyFormHelperText /> */}
                        </FormControl>
                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button>Copy</Button>
                            <Button>CSV</Button>
                            <Button>Excel</Button>
                            <Button>PDF</Button>
                            <Button>Print</Button>
                        </ButtonGroup>
                    </Box>
                </Box>

                <Typography>
                    Showing 1 of 1 entries
                </Typography>

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableCell>Account</TableCell>
                        <TableCell>Received</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Network</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Action</TableCell>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group" disabled>
                        <Button>First</Button>
                        <Button>Previous</Button>
                        <Button>Next</Button>
                        <Button>Last</Button>
                        {/* <Button>Print</Button> */}
                    </ButtonGroup>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                    <Box>
                        <Typography>Mark all as:</Typography>
                    </Box>
                    <Box>
                        <ButtonGroup variant="text" size="small">
                            <Button>Read</Button>
                            <Button>Unread</Button>
                        </ButtonGroup>
                    </Box>
                </Box>

                <Divider />

                <Typography variant="p" mt={2}>Filter Messages</Typography>
                <Box sx={{ display: 'flex', my: 1 }}>
                    <Box sx={{ mr: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Received Date From"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Received Date To"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', my: 2 }}>
                    <Box>
                        <TextField placeholder='Source' size="small" />
                    </Box>
                    <Box sx={{ mx: 1 }}>
                        <TextField placeholder='Destination' size="small" />
                    </Box>
                    <Box sx={{ mx: 1 }}>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <Select
                                value={groups}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>---Any Network---</em>
                                </MenuItem>
                                <MenuItem value={10}>Unknown</MenuItem>
                                {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
                                {/* <MenuItem value={30}>Today</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <Select
                                value={groups}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>---Any Account---</em>
                                </MenuItem>
                                {/* <MenuItem value={10}>Unknown</MenuItem> */}
                                {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
                                {/* <MenuItem value={30}>Today</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Stack spacing={2} direction="row">
                    <Button variant='outlined'>
                        Clear Filters
                    </Button>
                    <Button variant='contained' sx={{backgroundColor:theme.palette.Verst.orange}}>Apply Filter</Button>
                </Stack>

            </Card>
        </>
    )
}

