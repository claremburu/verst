import React, { useState } from 'react'
import { Typography, Card, TextField, Stack, Box, FormControl, MenuItem, Select, InputLabel, Input, FormHelperText } from '@mui/material'
import { number } from 'prop-types';

const menu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

function HttpOptions() {
    const [range, setRange] = useState('');
    // const [method, setMethod] = useState('');

    const handleChange = (event) => {
        setRange(event.target.value);
    };
    return (
        <Card sx={{ p: 2 }}>
            <Typography variant='h6'>Http "send" Request Options</Typography>
            <Stack direction='row' spacing={2} my={1}>
                <Box>
                    <Typography>From *</Typography>
                    <TextField placeholder="source" size="small" />
                </Box>
                <Box>
                    <Typography>To *</Typography>
                    <TextField placeholder="destination" size="small" />
                </Box>
            </Stack>
            <Stack direction='row' spacing={2}>
                <Box>
                    <Typography>Content *</Typography>
                    <TextField placeholder="hello world" size="small" />
                </Box>
                

                <Box>
                    <Typography>Coding</Typography>
                        <FormControl fullWidth sx={{
                            // width:'100%'
                            // minWidth: 120 ,
                            // fullWidth={true}
                        }} size="small">
                            <Select
                                value={range}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {<MenuItem/> && menu.map((item) => <MenuItem onChange={handleChange}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                </Box>
                </Stack>
                <Typography variant="subtitle2">Priority</Typography>

        <FormControl sx={{ width:'50%'}} size="small">
                            <Select
                                value={range}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>0</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>

        </Card>
    )
}

export default HttpOptions