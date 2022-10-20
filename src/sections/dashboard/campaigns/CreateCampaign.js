import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
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
    Checkbox,
} from '@mui/material'

import { LoadingButton } from '@mui/lab';

import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

import { UploadSingleFile } from '../../../components/upload';
import { createCampaigns, getCampaigns } from '../../../redux/slices/campaigns';
import { getClients } from '../../../redux/slices/jasmine';


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

    const {campaigns} = useSelector((state) => state.campaigns)
    const {clients} = useSelector((state) => state.jasmine)
    const [campaignName, setCampaignName] = useState('')
    const [senderName, setSenderName] = useState('')
    const [campaignMessage, setCampaignMessage] = useState('')
    const [totalSms, setTotalSms] = useState('0')
    const [stateClients, setStateClients] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setGroups(event.target.value);
    }

    const handleCampaignMessage = (e) => {
        setCampaignMessage(e.target.value);
    }

    const handleCampaignName = (e) => {
        setCampaignName(e.target.value);
    }

    const handleSenderName = (e) => {
        setSenderName(e.target.value);
    }

    const handleTotalSms = (e) => {
        setTotalSms(e.target.value);
    }

    const handleUploadFromFile = () => {
        navigate('/dashboard/campaigns/import-contacts', {replace: true})
    }

    const handleClients = (event) => {
        setStateClients(event.target.value);
    }

    const handleCreateCampaign = () => {
        dispatch(createCampaigns({
            campaignName,
            senderName,
            campaignMessage,
            totalSms
        }))
    }

    useEffect(() => {
        dispatch(getCampaigns())
        dispatch(getClients())
    }, [])


    return (
        <>
            <Card sx={{ p: 2 }}>
                <Stack sx={{}}>
                    <Typography sx={{ my: 1 }} variant="p">Campaign Name</Typography>
                    <TextField defaultValue="Camp_" size="small" />
                    {/* <Typography sx={{ my: 1 }} variant="p">Sender Id</Typography>
                    <TextField size="small" value={senderId} onChange={handleSenderName}/>
                    <Typography sx={{ my: 1 }} variant="p">Campaign Name</Typography>
                    <TextField size="small" /> */}
                    {/* <Typography sx={{ my: 1 }} variant="p">Contacts</Typography>
                    <TextField size="small" multiline rows={4} /> */}
                    {/* <Box sx={{display:'flex'}}> */}
                    <Box>
                        {/* <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Auto add country code(254)" /> */}
                    </Box>
                    {/* <Box>
                        <Typography sx={{ my: 1, fontSize: 14 }} variant="p">Import Contacts</Typography>
                    </Box> */}
                    {/* <Box>
                        <ButtonGroup variant='text'>
                            <Button>Group</Button>
                            <Button onClick={() => handleUploadFromFile}>File(Excel, CSV, Text)</Button>
                        </ButtonGroup>
                    </Box> */}

                    {/* <FormControlLabel sx={{ my: 1 }} control={<Checkbox />} label="Remove Duplicate" /> */}
                    <Typography variant="body2">Account Owner</Typography>
                  <FormControl sx={{ minWidth: '100%', my: 2 }} size="small">
                    <Select
                      value={stateClients}
                      onChange={handleClients}
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {clients?.map(({ clientId, clientName, contactFname }) => (
                        <MenuItem value={clientId}>
                          {clientName} - {contactFname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    <Typography>Enter Message</Typography>
                    <TextField multiline rows={4} value={campaignMessage} onChange={handleCampaignMessage} />
                    <Stack direction='row' spacing={2} sx={{ my: 2 }}>
                        <Typography>Used</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>Left</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>SMS Count:{totalSms}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2} sx={{ display:'flex', justifyContent:'flex-end', my: 2 }}>
                    <Button variant="contained" startIcon={<SaveIcon/>}>Save as Draft</Button>
                    <LoadingButton variant="contained" startIcon={<SendIcon/>} onClick={handleCreateCampaign}>Send</LoadingButton>
                    </Stack>


                    {/* </Box> */}
                </Stack>
            </Card>
        </>
    )
}

