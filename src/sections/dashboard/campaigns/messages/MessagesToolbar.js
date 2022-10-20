import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Divider, IconButton, InputAdornment, Stack, Toolbar, Tooltip, Typography } from '@mui/material';

// import {  } from '@mui/material';
// components
import { subDays } from 'date-fns';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { createUser, getClients, getGroups } from '../../../../redux/slices/jasmine';
// import MaterialTable from 'material-table'
// import XLSX from 'xlsx'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

MessagesToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
  onSelectDate: PropTypes.func,
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

export default function MessagesToolbar({ numSelected, filterName, onFilterName, onDeleteUsers, onSelectDate }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients: stateClients, jasminGroups } = useSelector((state) => state.jasmine);

  // date
  const [date, setDate] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const handleToday = () => {
    setDate(new Date());
  };

  const handleYesterday = () => {
    subDays(date, 1);
  };

 

  // const handleLast2Days = () => {
  //   return dateFrom, dateTo;
  // };

  // console.log(stateClients, 'user clients')

  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState('1');
  const [clients, setClients] = useState('1');
  const [serverName, setServerName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitUser = () => {
    dispatch(
      createUser({
        y: groups,
        clientId: clients,
        serverName,
        userName,
        password,
      })
    );
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };
  const handleClients = (event) => {
    setClients(event.target.value);
  };
  const handleServerName = (event) => {
    setServerName(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    dispatch(getClients());
    dispatch(getGroups());
  }, []);

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
            placeholder="Search messages..."
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
            <IconButton onClick={onDeleteUsers}>
              <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>{/* <Iconify icon={'ic:round-filter-list'} /> */}</IconButton>
          </Tooltip>
        )}

        <Button variant="contained" startIcon={<DownloadIcon />}>
          Download
        </Button>
      </RootStyle>
      <Stack spacing={2} direction="row" sx={{ px: 3, mb: 2 }}>
        <Typography variant="body1">Preferred Range: </Typography>
        <Button variant="outlined" onClick={() => onSelectDate(0)}>
          Today
        </Button>
        <Button variant="outlined" onClick={() => onSelectDate(1)}>
          Yesterday
        </Button>
        <Button variant="outlined" onClick={() => onSelectDate(2)}>
          Last 2 Days
        </Button>
        <Button variant="outlined" onClick={() => onSelectDate(7)}>
          Last week
        </Button>
        {/* <Button variant="outlined" onClick={()=> onSelectDate(1)}>Custom</Button> */}
      </Stack>
      <Divider />
    </Box>
  );
}
