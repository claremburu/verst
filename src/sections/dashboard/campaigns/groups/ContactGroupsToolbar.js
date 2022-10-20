import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
  Typography,
} from '@mui/material';

// import {  } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { getClients, createProvider, getGroups } from '../../../../redux/slices/jasmine';
import { createContactGroups } from '../../../../redux/slices/campaigns';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ContactGroupsToolbar.propTypes = {
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

export default function ContactGroupsToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  
  const dispatch = useDispatch();
  const { contactGroups } = useSelector((state) => state.campaigns);
  const { clients } = useSelector((state) => state.jasmine);

  const [groups, setGroups] = useState([]);
  const [stateClients, setStateClients] = useState('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [contacts, setContacts] = useState('');
  const [parent, setParent] = useState('');
  // const [groups, setGroups] = useState()

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleChangeClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeContacts = (event) => {
    setContacts(event.target.value);
  };

  const handleSubmitContactGroups = () => {
    // console.log({
    //   groupId: groups,
    //   clientId: clients,
    //   serverName,
    //   userName,
    //   password,
    // });

    dispatch(createContactGroups({ groupName, clientId: stateClients, description }));
  };

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
  }, []);
  // const handleCreateProvider({})

  return (
    <Box>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            // color: isLight ? 'primary.main' : 'text.primary',
            // bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
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
            placeholder="Search contact groups..."
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

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button>Copy</Button>
            <Button>CSV</Button>
            <Button>Excel</Button>
            <Button>PDF</Button>
            <Button>Print</Button>
          </ButtonGroup> */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          {/* <Box>
            <Typography variant="h6">Contact Groups</Typography>
          </Box> */}
          <FormControl sx={{ minWidth: '25ch' }} size="small">
            <Select
              value={stateClients}
              onChange={handleChangeClients}
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
          <TextField placeholder="Group Name..." size="small" value={groupName} onChange={handleChangeGroupName} />
          {/* <TextField
            placeholder="short description..."
            size="small"
            value={description}
            onChange={handleChangeDescription}
          /> */}
          <Box>
            <Button variant="contained" onClick={handleSubmitContactGroups}>
              Add Group
            </Button>
          </Box>
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
