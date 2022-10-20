import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  InputAdornment,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Box,
  Button,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  OutlinedInput,
  ButtonGroup,
  Stack
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

// import {  } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ProductListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '90%',
  position: 'absolute',
  top: '50%',
  // bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflow: 'scroll',
};

const accounts = ['Verst', 'Mobipesa', 'Fast'];

export default function ProductListToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  return (
    <Box>
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <InputStyle
          stretchStart={240}
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search smpp users..."
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteProducts}>
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/* <Iconify icon={'ic:round-filter-list'} /> */}</IconButton>
        </Tooltip>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button>Copy</Button>
            <Button>CSV</Button>
            <Button>Excel</Button>
            <Button>PDF</Button>
            
            <Button>Print</Button>
          </ButtonGroup>
        </Box>

      <Box>
        <Button variant="contained" onClick={handleOpen}>
          New Account
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                New SMPP Server Account
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                Account names and usernames <b>must</b> be unique i.e. two accounts cannot have the same username.
              </Typography>

              <Typography variant='h6' sx={{ my: 1 }}>Account Owner</Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
                <Select
                  value={groups}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {accounts.map(account=> <MenuItem value={accounts}>{account}</MenuItem>)}
                </Select>
              </FormControl>

              <Typography sx={{my:1}} variant="subtitle2"> SMPP Server Account Name</Typography>
              <TextField placeholder="Account Name" size="small" fullWidth/>

              <Typography sx={{my:1}} variant="subtitle2"> Username</Typography>
              <TextField placeholder="Username" size="small" fullWidth/>

              <Typography sx={{my:1}} variant="subtitle2"> Password</Typography>
              <TextField placeholder="******" size="small" fullWidth/>

              <Typography sx={{my:1}} variant="subtitle2"> Confirm Password</Typography>
              <TextField placeholder="******" size="small" fullWidth/>

              <Typography sx={{my:1}} variant="subtitle2">Group</Typography>

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
              <Divider/>
            <Stack direction="row" sx={{display: 'flex', justifyContent:'flex-end', pt:2}} spacing={2} >
            <Button variant='contained' startIcon={<CancelIcon/>} onClick={handleClose}>Cancel</Button>
            <Button variant='contained' endIcon={<SaveIcon/>} sx={{backgroundColor:theme.palette.Verst.orange}}>Save</Button>
            </Stack>
            </Box>
          </Modal>
      </Box>
    </RootStyle>
    <Divider/>
    {/* <Stack direction="row" sx={{p:2}}> */}
    {/* <RootStyle> */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}> */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
          {/* <Typography variant="body2" sx={{}}>
            {' '}
            Show{' '}
          </Typography> */}
          {/* <FormControl sx={{ m: 1, minWidth: 120, height:'100%' }} size="small">
            <Select value={groups} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">
                <em>20</em>
              </MenuItem>
              <MenuItem value={10}>50</MenuItem>
              <MenuItem value={20}>100</MenuItem>
              <MenuItem value={30}>200</MenuItem>
            </Select>
          </FormControl> */}
          {/* <Typography variant="body2"> entries </Typography> */}
        {/* </Box> */}
        
      {/* </Box> */}
      {/* </RootStyle> */}
      </Box>
  );
}
