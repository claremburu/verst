import React, { useState } from 'react'

// material
import {
    Card,
    Typography,
    Box,
    FormControl,
    MenuItem,
    Select,
    OutlinedInput,
    Stack,
    Divider,
    ButtonGroup,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from '@mui/material';

export default function Purchases() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

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
                {/* <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}> */}
                <Stack
                    // p={2} 
                    sx={{ mt: 2 }}
                >
                    <Typography variant="h4">
                        Purchases
                    </Typography>
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="p" sx={{}}> Show </Typography>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select
                                value={range}
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
                        <Typography sx={{}}>Search:</Typography>
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
                {/* <Box spacing={2} sx={{
                        display: 'flex',
                        // py:2,
                        mt: 2,
                    }}>
                    </Box> */}
                {/* </Box> */}
                <Divider sx={{ my: 2 }} />
                <Typography>
                    Show 1 of 12 entries
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="p">
                                        Date
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Account
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Purchased By
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Messages
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Rate
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Amount
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Currency
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="p">
                                        Payment Method
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            // count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /><TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            // count={rows.length}
                            // rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        {/* <TablePagination>
                        </TablePagination> */}
                    </Table>
                </TableContainer>
            </Card>
        </>
    )
}