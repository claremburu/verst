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
    InputLabel,
    FormHelperText,
    Divider
} from '@mui/material';

// icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function MessagesPurchased() {
    const [range, setRange] = useState('');
    const [open, setOpen] = useState(true);

    const handleChange = (event) => {
        setRange(event.target.value);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        {open && (
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
                            Messages Purchased
                        </Typography>
                    </Stack>
                    <Stack>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select
                                value={range}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Month-to-date</em>
                                </MenuItem>
                                <MenuItem value={10}>Year-to-date</MenuItem>
                                {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
                                <MenuItem value={30}>Today</MenuItem>
                            </Select>
                        </FormControl>
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
                            <CloseIcon fontSize='small' onClick={handleClose} />
                        </Stack>
                    </Box>
                </Box>
                <Divider />
            </Card>)}
        </>
    )
}