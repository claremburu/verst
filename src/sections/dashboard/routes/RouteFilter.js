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
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Modal
} from '@mui/material'

const tHead = [
  "Owner",
  "Filter Name",
  "Type",
  "Route",
  "Action"]

const accounts = ["Verst", "Mobipesa", "Fast"]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const filters = [
  "Transparent Filter(All)",
  "Source Adress Filter(All)",
  "Destination Address Filter(All)",
  "Short Message Address(All)",
  "Date Interval Filter(All)",
  "Time Interval Filter(All)",
  "Tag Filter",
  "SMPP Server Account Filter(MT)",
  "Group Filter(MT)",
  "SMPP Client Account Filter(MO)",
]

function GroupsTable(owner, group, accounts, action) {
  return { owner, group, accounts, action }
}

export default function RouteFilter() {
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
          <Box >
            <Button variant="contained" onClick={setOpen}>New Filter</Button>

            <Modal
            sx={{height: '100%'}}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  New Route Filter
                </Typography>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography> */}

                <Typography variant='h6' sx={{ my: 1 }}>Account Owner</Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={groups}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {accounts.map(account => <MenuItem value={accounts}>{account}</MenuItem>)}
                  </Select>
                </FormControl>

                <Typography sx={{ my: 1 }} variant="subtitle2">Select Filter Type</Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={groups}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filters.map(filter => <MenuItem value={filters}>{filter}</MenuItem>)}
                  </Select>
                </FormControl>
                {/* <TextField placeholder="Account Name" size="small" fullWidth /> */}

                <Typography sx={{ my: 1 }} variant="subtitle2">Filter Name</Typography>
                <TextField placeholder="filter name" size="small" fullWidth />
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

        <Typography>
          Showing 1 of 1 entries
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {tHead.map(table => <TableCell>{table}</TableCell>)}
          </Table>
        </TableContainer>

      </Card>
    </>
  )
}

