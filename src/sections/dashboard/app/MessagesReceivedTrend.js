import React, { useEffect, useState } from 'react'

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

export default function MessagesReceivedTrend() {
    const [range, setRange] = useState('');
    const [OpenInFull, setOpenInFull] = useState(false);
    const [expandLess, setExpandLess] = useState();
    const [expandMore, setExpandMore] = useState();
    const [refresh, setRefresh] = useState();

    const handleChange = (event) => {
        setRange(event.target.value);
    };

    const handleOpenInFull = () => {
        setOpenInFull(!OpenInFull);
    }
    const handleExpandLess = () => {
        setExpandLess(!expandLess);
    }
    const handleExpandMore = () => {
        setExpandMore(!expandMore);
    }

    // useEffect = () => ({
    //     setRefresh(!refresh);
    // }, [])

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
                            Messages Received Trend
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
                            <OpenInFullIcon fontSize='small' onClick={handleOpenInFull}/>
                            <RefreshIcon fontSize='small' onClick={refresh}/>
                            <CloseIcon fontSize='small' />
                        </Stack>
                    </Box>
                </Box>
                <Divider />
            </Card>
        </>
    )
}