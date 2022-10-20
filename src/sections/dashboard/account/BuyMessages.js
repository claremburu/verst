import React from 'react'
import { Avatar, Card, Typography, Divider } from '@mui/material'
import useAuth from '../../../hooks/useAuth'

const userData= ["Website", "Email Address", "Created On", "Last Logged in", "Account Type", "Default Currency", "Number of Clients"]

export default function BuyMessages() {
    const {user} = useAuth()
    return(
    <>
    <Card sx={{p:2}}>
    <Typography variant="h6">Account: {user.clientEmail}</Typography>
    <Typography>Created On: {user.createdAt}</Typography>
    <Typography>Account Type: {user.clientAccessLevel}</Typography>
    <Typography>Country: {user.clientCountry}</Typography>
    <Typography>Phone Number: {user.contactNumber}</Typography>
    <Typography>Status: {user.clientStatus}</Typography>
    </Card>
    </>
    )
}