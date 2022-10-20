import React from 'react'
import {
    Typography,
    Box,
    FormControl,
    MenuItem,
    Select,
    Card,
    TextField,
    Stack,
    Button,
    Table,
    TableCell,
    TableContainer,
    Paper,
    Divider
} from '@mui/material'

const tableHead = ["Account", "Setup By", "Threshold1", "Threshold2", "Empty"]

export default function Settings() {
    return (
        <>
            <Card sx={{
                mt: 2,
                p: 2,
            }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="p" fontSize={20} fontWeight='medium'>
                        Low Balance Settings
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="p" fontSize={14}>
                        Select SMPP server Account
                    </Typography>

                    <FormControl variant="outlined" size='small' sx={{ mx: 1 }}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={'1'}>
                            <MenuItem value={'1'}>
                                <em>mawingu</em>
                            </MenuItem>
                            <MenuItem value={'2'}>twahome</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>

                </Box> */}
                <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    <Typography>1. When my account balance falls below</Typography>
                    <TextField placeholder='1' size="small" sx={{ width: '20%' }} />
                    <Typography>messages</Typography>
                </Stack>

                <Stack direction='row' fullWidth spacing={2} sx={{ ml: 2 }}>
                    <Box>
                        <Typography>Send an email to: </Typography>
                        <TextField placeholder='dkanake@Verstmedia.com' size="small" fullWidth />
                    </Box>
                    <Box>
                        <Typography>Send an SMS to: </Typography>
                        <TextField placeholder='+254722222222' size="small" />
                    </Box>
                </Stack>
                <Typography variant="subtitle2">2. When my account balance is empty:</Typography>
                
                <Box sx={{ml:2}}>
                <Typography variant="subtitle2">Send an email to</Typography>
                <TextField placeholder='dkanake@Verstmedia.com' size="small" sx={{ width: '50%' }} />
                </Box>

                <Box sx={{ my: 2 }}>
                    <Button variant="contained">Save Changes</Button>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Typography>These are the low balance settings that you and your clients have enabled.</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        {tableHead.map((table) => { return <TableCell>{table}</TableCell> })}
                    </Table>
                </TableContainer>
            </Card>
        </>
    )
}