import React, { useState } from 'react';

// material
import {
    Card,
    Typography,
    Box,
    Stack,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from '@mui/material';

// icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function DormantAccounts() {
    const [range, setRange] = useState('');

    const handleChange = (event) => {
        setRange(event.target.value);
    };


    return (
        <>
            <Card sx={{
                mt: 2,
                p: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Stack
                        // p={2} 
                        sx={{ mt: 2 }}
                    >
                        <Typography variant="body2">
                            Most Dormant Accounts
                        </Typography>
                    </Stack>
                    <Box spacing={2} sx={{
                        display: 'flex',
                        // py:2,
                        mt: 2,
                    }}>
                        <Stack direction='row' spacing={1}>
                            <KeyboardArrowUpIcon />
                            <OpenInFullIcon fontSize='small' />
                            <RefreshIcon fontSize='small' />
                            <CloseIcon fontSize='small' />
                        </Stack>
                    </Box>
                </Box>
                <Divider />
                {/* table */}
                <TableContainer component={Paper}>
                    <Table sx={{
                        // minWidth: 650
                    }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Account</TableCell>
                                <TableCell align="right">Balance</TableCell>
                                <TableCell align="right">Activity</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Card>
            {/* client purchases */}
            {/* </Box> */}
        </>
    )
}
