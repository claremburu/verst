import React, { useState } from 'react';
import {
    Card,
    Typography,
    Box,
    Divider,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button
} from '@mui/material'

import SendIcon from '@mui/icons-material/Send';

import AvatarEditor from 'react-avatar-editor'
// const useStyles = withStyles(() => ({
//     input:{
//         height:400
//     }
// }))

import { UploadSingleFile } from '../../../components/upload';

export default function Contact() {
    const [feedback, setFeedback] = useState('');
    const [userState, setUserState] = useState({
        image: '',

    })

    const handleChange = (event) => {
        setFeedback(event.target.value);
    };
    return (
        <>
            <Card
                sx={{
                    p: 2
                }}
            >
                <Box >
                    <Typography my={1} sx={{ fontWeight: 'medium', fontSize: 20 }}>
                        Contact Us
                    </Typography>
                    <Divider my={1} />
                    <Typography variant="p" fontSize={15} my={1}>
                        Please carefully select the most appropriate subject for your request and enter the information below. Provide as much details as you can so we can effectively address your feedback.
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }} my={1}>
                        Subject
                    </Typography>
                    <FormControl sx={{ minWidth: '100%' }} size="small">
                        <Select
                            value={feedback}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>General Feedback</em>
                            </MenuItem>
                            <MenuItem value={10}>Bug Report</MenuItem>
                            <MenuItem value={20}>Feature Request</MenuItem>
                            <MenuItem value={30}>Other</MenuItem>
                            <MenuItem value={40}>Account Recharge</MenuItem>
                            <MenuItem value={50}>Payment Concerns</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography my={1}>
                        Message
                    </Typography>
                    <TextField
                        id="fullWidth"
                        sx={{
                            minWidth: "100%",
                            // height:400 
                        }}
                        size="small"
                        multiline
                        minRows={4}
                    // InputProps={{classes: {input: classes.input}}}
                    />
                </Box>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Send me a copy of this email" />
                </FormGroup>
                <Button variant="outlined" startIcon={<SendIcon />} size="small">
                    Submit
                </Button>
            </Card>
        </>
    )
}