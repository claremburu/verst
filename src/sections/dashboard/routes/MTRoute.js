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
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action }
}


const style = {
  height: '90%',
  overflow: 'scroll',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

const filters = ['safaricom', 'vodafone', 'Verst']

export default function MTRoute() {
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
            <Typography variant='h6'>MO/MT Routes</Typography>
          </Box>
          {/* <Box >
            <Button variant="contained">New Route</Button>
          </Box> */}
          <Box >
            <Button variant="contained" onClick={setOpen}>New Route</Button>

            <Modal
            sx={{height: '100%'}}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  New Route 
                </Typography>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography> */}

                <Typography variant='subtitle2' sx={{ my: 1 }}>Select Route Type</Typography>
                <FormControlLabel value="mo" control={<Radio />} label="MO Routes" />
        <FormControlLabel value="mt" control={<Radio />} label="MT Routes" />
                {/* <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={groups}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {accounts.map(account => <MenuItem value={accounts}>{account}</MenuItem>)}
                  </Select>
                </FormControl> */}

                <Typography sx={{ my: 1 }} variant="subtitle2">Select SMPP Client Account</Typography>
                <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth/>
                {/* <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={groups}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filters.map(filter => <MenuItem value={filters}>{filter}</MenuItem>)}
                  </Select>
                </FormControl> */}
                {/* <TextField placeholder="Account Name" size="small" fullWidth /> */}

                <Typography sx={{ my: 1 }} variant="subtitle2">Select one or more filters</Typography>
                <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth/>
                <Typography sx={{ my: 1 }} variant="subtitle2">Enter Rate</Typography>
                <TextField  type="number"InputLabelProps={{shrink: true }} fullWidth size="small"/>
          <Typography sx={{ my: 1 }} variant="subtitle2">Supplier</Typography>
          <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    // value={groups}
                    // onChange={handleChange}
                    // displayEmpty
                    // inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filters.map(filter => <MenuItem key={filter} value={filter}>{filter}</MenuItem>)}
                  </Select>
                </FormControl>
                <Typography sx={{ my: 1 }} variant="subtitle2">Route Destination</Typography>
                <TextField sx={{ minWidth: '100%' }} fullWidth placeholder="route destination" size='small'/>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" endIcon={<SaveIcon />}>
                Save
              </Button>
            </Stack>
              </Box>
            </Modal>

          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="p" sx={{}}> Show </Typography>
            <FormControl sx={{
              m: 1,
              minWidth: 120
            }}
              size="small">
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

        {/* <Typography>
          Showing 1 of 4 entries
        </Typography> */}

        {/* <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableCell>Type</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Filter</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Action</TableCell>
          </Table>
        </TableContainer> */}

      </Card>
    </>
  )
}

