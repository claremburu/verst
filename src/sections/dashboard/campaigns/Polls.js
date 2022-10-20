import React, { useState } from 'react'
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
  Paper
} from '@mui/material'

const tableHead = [
  "Client",
  "Poll", 
  "Created", 
  "Last Campaign", 
  "Responses",
  "Leading",
  "Action"
]

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action }
}

export default function Polls() {
  const [groups, setGroups] = useState()

  const handleChange = (event) => {
    setGroups(event.target.value);
  }

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Box>
            <Typography variant='h6'>Polls</Typography>
          </Box>
          <Box >
            <Button variant="contained">New Poll</Button>
          </Box>
        </Box>

        <Divider sx={{my:2}}/>

        {/* <Typography variant="p">
            Set up automatic responses for your inbound campaigns here.
            You can create multiple auto responses for different keywords.
          </Typography> */}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="p" sx={{}}> Show </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={groups}
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

        <Typography>
          Showing 1 of 1 entries
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {tableHead.map((table)=> {return<TableCell>{table}</TableCell>})}
            {/* <TableCell>group</TableCell>
            <TableCell>accounts</TableCell>
            <TableCell>action</TableCell> */}
          </Table>
        </TableContainer>

      </Card>
    </>
  )
}

