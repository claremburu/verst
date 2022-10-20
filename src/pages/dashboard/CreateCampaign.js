import React, { useState } from 'react'
import { useNavigate } from 'react-router';
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
    Checkbox
} from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import ImportContacts from './ImportContacts';



const tableHead = [
    "Owner",
    "Group Name",
    "#Contacts",
    "Parent",
    "Description",
    "Action",
    "Start Date/Time",
    "Total Cost",
    "Action"]

function GroupsTable(owner, group, accounts, action) {
    return { owner, group, accounts, action }
}



export default function CreateCampaign() {
    const [groups, setGroups] = useState()
    const [time, setTime] = useState(new Date())

    const navigate = useNavigate()

    const handleChange = (event) => {
        setGroups(event.target.value);
    }

    const handleUploadFromFile = () => {
        navigate('/dashboard/campaigns/import')
    }

    // console.log(handleUploadFromFile())

    return (
        <>
            <Card sx={{ p: 2 }}>
                <Stack sx={{}}>
                    <Typography sx={{ my: 1 }} variant="p">Campaign Name</Typography>
                    <TextField defaultValue={`Camp_ ${time.toLocaleDateString()}`} size="small" />
                    <Typography sx={{ my: 1 }} variant="p">Sender Id</Typography>
                    <TextField size="small" />
                    <Typography sx={{ my: 1 }} variant="p">Contacts</Typography>
                    <TextField size="small" multiline rows={4} />
                    {/* <Box sx={{display:'flex'}}> */}
                    <Box>
                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Auto add country code(254)" />
                    </Box>
                    <Box>
                        <Typography sx={{ my: 1, fontSize: 14 }} variant="p">Import Contacts</Typography>
                    </Box>
                    <Box>
                        <ButtonGroup variant='text'>
                            <Button>Group</Button>
                            <Button onClick={() => handleUploadFromFile}>File(Excel)</Button>
                        </ButtonGroup>
                    </Box>
                    <Button onClick={() => handleUploadFromFile}>File(Excel)</Button>


                    <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Remove Duplicate" />
                    <Typography>Enter Message</Typography>
                    <TextField multiline rows={4} />
                    <Stack direction='row' spacing={2} sx={{ my: 2 }}>
                        <Typography>Used</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>Left</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>SMS Count</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2} sx={{ display:'flex', justifyContent:'flex-end', my: 2 }}>
                    <Button variant="contained" startIcon={<SaveIcon/>}>Save as Draft</Button>
                    <Button variant="contained" startIcon={<SendIcon/>}>Send</Button>
                    </Stack>


                    {/* </Box> */}
                </Stack>
            </Card>
        </>
    )
}

