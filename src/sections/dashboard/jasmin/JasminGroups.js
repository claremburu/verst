import React, {useState} from 'react'
import {
    Box,
    Card,
    Checkbox,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    Button,
    ButtonGroup,
    FormControl,
    Select,
    Divider,
    TextField,
    OutlinedInput,
    IconButton,
    MenuItem,
    Modal
  } from '@mui/material';

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

  const accounts = ["Verst", "Mobipesa", "Fast"]

function JasminGroups() {
    const [groups, setGroups] = useState()
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChange = (event) => {
    setGroups(event.target.value);
  }

  return (
    <>
        <Box sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1
        }}>
          {/* <Box>
            <Typography variant='h6'>SMPP Client Accounts</Typography>
          </Box> */}
          <Box >
            <Button variant="contained" onClick={handleOpen}>New Account</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{overflow: 'scroll', height: '80%'}}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  New SMPP Client Account
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography>

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

                <Typography sx={{ my: 1 }} variant="subtitle2"> Client Account Name</Typography>
                <TextField placeholder="Account Name" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2"> Host</Typography>
                <TextField placeholder="Host" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2"> Port</Typography>
                <TextField placeholder="Port" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2"> Username</Typography>
                <TextField placeholder="Username" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2"> Password</Typography>
                <TextField placeholder="******" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2"> Confirm Password</Typography>
                <TextField placeholder="******" size="small" fullWidth />

                <Typography sx={{ my: 1 }} variant="subtitle2">Bind Type</Typography>

                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={groups}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=""><em>Verst</em></MenuItem>
                  </Select>
                </FormControl>

              </Box>
            </Modal>
          </Box>
        </Box>

        <Divider />

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

      </Box>
    </>
  )
}

export default JasminGroups