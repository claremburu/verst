import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button, Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// import {  } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { createFilter, getClients } from '../../../../redux/slices/routes';
// import { createFilter } from '../../../../redux/slices/routes';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

FiltersToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '65%',
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

const filters = [
  'Transparent Filter(All)',
  'Source Adress Filter(All)',
  'Destination Address Filter(All)',
  'Short Message Address(All)',
  'Date Interval Filter(All)',
  'Time Interval Filter(All)',
  'Tag Filter',
  'SMPP Server Account Filter(MT)',
  'Group Filter(MT)',
  'SMPP Client Account Filter(MO)',
];

export default function FiltersToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const { clients, filters } = useSelector((state) => state.routes);

  const dispatch = useDispatch();

  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [stateClients, setStateClients] = useState('1');
  const [filterType, setFilterType] = useState('');
  const [filtername, setFiltername] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // const handleFilterType = (event) => {

  // }

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleClients = (e) => {
    setStateClients(e.target.value);
  };
  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };
  const handleFilterName = (e) => {
    setFiltername(e.target.value);
  };
  const handleFilterValue = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleSubmitFilter = () => {
    dispatch(
      createFilter({
        clientId: stateClients,
        filterName: filtername,
        filterType,
        filterValue
      })
    );
    setOpen(false);
  };

 const handleSelectFilterType = (event) => {
    setFilterType(event.target.value);
  }

  // const handleClick=(e)=> {
  //   //     Setting state and a callback function   
  //         if (e.target.id === "button_one") {
  //           this.setState({button_one: true})
  //           this.setState({button_two: false})
  //           this.setState({button_three: false})
  //         }
  //         if (e.target.id === "button_two") {
  //           this.setState({button_one: false})
  //           this.setState({button_two: true})
  //           this.setState({button_three: false})
  //         }
  //         if (e.target.id === "button_three") {
  //           this.setState({button_one: false})
  //           this.setState({button_two: false})
  //           this.setState({button_three: true})
  //         }
  //       }
    

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
            placeholder="Search filters..."
            size="small"
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

        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button>Copy</Button>
            <Button>CSV</Button>
            <Button>Excel</Button>
            <Button>PDF</Button>
            <Button>Print</Button>
          </ButtonGroup>
        </Box> */}

        <Box>
          <Button variant="contained" onClick={setOpen}>
            New Filter
          </Button>

          <Modal
            sx={{ height: '100%' }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Stack spacing={2} direction="row" sx={{display: 'flex', justifyContent:"space-between"}}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                New Route Filter
              </Typography>
              <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
              </Stack>
              
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography> */}

              <Typography variant="h6" sx={{ my: 1 }}>
                Account Owner
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
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

              <Typography sx={{ my: 1 }} variant="subtitle2">
                Select Filter Type
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
                <Select
                  value={filterType}
                  onChange={handleFilterType}
                  // displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {filters?.map(({ filterType }) => (
                    <MenuItem value={filterType}>{filterType}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField placeholder="Account Name" size="small" fullWidth /> */}

              <Typography sx={{ my: 1 }} variant="subtitle2">
                Filter Name
              </Typography>
              <TextField
                placeholder="filter name"
                size="small"
                fullWidth
                value={filtername}
                onChange={handleFilterName}
              />
              {filterType === "TRANSPARENT_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                Filter Value
              </Typography>
              <TextField
                placeholder="filter value"
                size="small"
                fullWidth
                value={filterValue}
                onChange={handleFilterValue}
              />
              </Box>
              }

              {filterType === "SOURCE_ADDRESS_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                Source Address Criteria
              </Typography>
              <TextField
                placeholder="filter value"
                size="small"
                fullWidth
                value={filterValue}
                onChange={handleFilterValue}
              />
              </Box>
              }
              {filterType === "DESTINATION_ADDRESS_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                Destination Address Criteria
              </Typography>
              <TextField
                placeholder="filter value"
                size="small"
                fullWidth
                value={filterValue}
                onChange={handleFilterValue}
              />
              </Box>
              }

              {filterType === "SHORT_MESSAGE_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                Short Message Criteria
              </Typography>
              <TextField
                placeholder="filter value"
                size="small"
                fullWidth
                value={filterValue}
                onChange={handleFilterValue}
              />
              </Box>
              }

              {filterType === "SMPP_CLIENT_ACCOUNT_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                SMPP Client Account 
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
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
              </Box>
              }

              {/* {filterType === "SMPP_SERVER_ACCOUNT_FILTER" && 
              <Box>
              <Typography sx={{ my: 1 }} variant="subtitle2">
                SMPP Server Account Filter
              </Typography>
              <FormControl sx={{ minWidth: '100%' }} size="small">
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
              </Box>
              } */}

              <Divider sx={{ mt: 2 }} />
              <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  sx={{ backgroundColor: theme.palette.Verst.orange }}
                  onClick={handleSubmitFilter}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Box>
      </RootStyle>
      <Divider />
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
    // <Stack>
    // <RootStyle
    //   sx={{
    //     ...(numSelected > 0 && {
    //       color: isLight ? 'primary.main' : 'text.primary',
    //       bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
    //     }),
    //   }}
    // >
    //   {numSelected > 0 ? (
    //     <Typography component="div" variant="subtitle1">
    //       {numSelected} selected
    //     </Typography>
    //   ) : (
    //     <InputStyle
    //       stretchStart={240}
    //       value={filterName}
    //       onChange={(event) => onFilterName(event.target.value)}
    //       placeholder="Search groups..."
    //       size="small"
    //       InputProps={{
    //         startAdornment: (
    //           <InputAdornment position="start">
    //             {/* <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   )}

    //   {numSelected > 0 ? (
    //     <Tooltip title="Delete">
    //       <IconButton onClick={onDeleteProducts}>
    //         <Iconify icon={'eva:trash-2-outline'} />
    //       </IconButton>
    //     </Tooltip>
    //   ) : (
    //     <Tooltip title="Filter list">
    //       <IconButton>
    //         {/* <Iconify icon={'ic:round-filter-list'} /> */}
    //       </IconButton>
    //     </Tooltip>
    //   )}

    //   <Stack sx={{ display: 'flex', justifyContent:'flex-end'}} direction="row" spacing={2}>
    //     <Box>
    //       <FormControl variant="outlined" style={{ minWidth:'25ch' }} size="small">
    //         <Select>
    //           {accounts.map((account) => (
    //             <MenuItem key={account} value={account}>
    //               {account}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </Box>
    //     <Box>
    //       <TextField placeholder="enter group name" sx={{ minWidth: '20ch' }} size="small" />
    //     </Box>
    //     <Box>
    //       <Button variant="contained" color="primary" onClick={handleOpen}>
    //         Add Group
    //       </Button>
    //     </Box>
    //   </Stack>
    // </RootStyle>
    // <Divider sx={{mb:2}}/>
    //   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end', mb:2, mr:4 }}>
    //       <ButtonGroup variant="outlined" aria-label="outlined primary button group">
    //         <Button>Copy</Button>
    //         <Button>CSV</Button>
    //         <Button>Excel</Button>
    //         <Button>PDF</Button>
    //         <Button>Print</Button>
    //       </ButtonGroup>
    //     </Box>
    //     </Stack>
  );
}
