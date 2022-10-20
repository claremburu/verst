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
  Paper,
  Modal,
  Checkbox,
  Stack,
  FormControlLabel
} from '@mui/material'

const tableHead = ["Account", " Title", "Keywords", "Auto Response", "Status", "Action"]

const style = {
  height: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action }
}

export default function AutoResponders() {
  const [groups, setGroups] = useState()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

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
            <Typography variant='h6'>Auto Responders</Typography>
          </Box>
          <Box >
            <Button variant="contained" onClick={handleOpen}>New Auto Responder</Button>

            <Modal
            // sx={{height: '100%', overflow: 'scroll', top: '10%'}}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  Auto Responder
                </Typography>

                <Typography variant='p' sx={{ my: 1 }}>All fields are mandatory</Typography>

                <Typography variant='subtitle2' sx={{ my: 1 }}>Auto Responder Title</Typography>
                <TextField placeholder="eg. thank you for weekly discount promo" size="small" fullWidth />
                <Stack>
                  <Typography variant='subtitle2' sx={{ my: 1 }}>When inbound message:</Typography>

                  <FormControlLabel control={<Checkbox defaultChecked />} label="Does Not" />

                </Stack>

                <Typography variant='h6' sx={{ my: 1 }}>Preferred</Typography>
                <TextField placeholder="Preferred" size="small" fullWidth />

                <Typography variant='h6' sx={{ my: 1 }}>Balance URL</Typography>
                <TextField placeholder="Balance URL" size="small" fullWidth />

                <Typography variant='h6' sx={{ my: 1 }}>Credit Limit</Typography>
                <TextField placeholder="Credit Limit" size="small" fullWidth />

                <Typography variant='h6' sx={{ my: 1 }}>Balance</Typography>
                <TextField placeholder="Balance" size="small" fullWidth />

                <Typography variant='h6' sx={{ my: 1 }}>Bucket</Typography>
                <TextField placeholder="Bucket" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2">Select Filter Type</Typography>
              </Box>
            </Modal>

          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="p">
          Set up automatic responses for your inbound campaigns here.
          You can create multiple auto responses for different keywords.
        </Typography>

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
            {tableHead.map((table) => { return <TableCell>{table}</TableCell> })}
            {/* <TableCell>group</TableCell>
            <TableCell>accounts</TableCell>
            <TableCell>action</TableCell> */}
          </Table>
        </TableContainer>

      </Card>
    </>
  )
}

