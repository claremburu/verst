import React, { useState } from 'react'
//
import { Typography, Avatar, Box, Stack, Button } from '@mui/material';
import AvatarEditor from 'react-avatar-editor'
import useAuth from '../../../hooks/useAuth';

function Information() {
    const {user} = useAuth()
    const [name, setName] = useState();
    const [isActive, setIsActive] = useState(true);

    const handleActive = () => {
        setIsActive(!isActive);
    }

    const setNameHandler = (event) => {
        setName(event.target.value);
    }
    return (
        <div>
            <Stack direction='row' spacing={2}>
                <Box>
                    {/* <Avatar>D</Avatar> */}
                    {/* <Button variant="text">Change Photo</Button> */}
                    {/* <AvatarEditor
                        AvatarEditor image=""
                        width={250}
                        height={250}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={1.2}
                        rotate={0}
                    /> */}
                </Box>
                <Box>
                    <Typography variant="p" sx={{ mb: 5 }}>
                        {/* Dominic Kanake ({isActive ? 'Active' : 'Inactive'}) */}
                        {user.clientName}({user.clientStatus})
                    </Typography>
                    <Typography>Contact Number: <em>{user.contactNumber}</em></Typography>

                    <Typography>Address: {user.clientEmail}</Typography>
                    <Typography variant="p" fontSize={14}>Please contact your account manager if you have any questions relating to these items or your account in general.</Typography>
                </Box>
            </Stack>

        </div>
    )
}

export default Information