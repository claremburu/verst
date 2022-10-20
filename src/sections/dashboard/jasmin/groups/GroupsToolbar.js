import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Input
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useDispatch, useSelector } from 'react-redux';

// import {  } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { dispatch } from '../../../../redux/store';

import { createGroup, getGroups, getClients } from '../../../../redux/slices/jasmine';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

GroupsToolbar.propTypes = {
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const accounts = ['Verst', 'Mobipesa', 'Fast'];

export default function GroupsToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const dispatch = useDispatch();

  const { clients, jasminGroups } = useSelector((state) => state.jasmine);

  // const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [stateClients, setStateClients] = useState('1');
  // const [groups, setGroups] = useState('1')
  const [groupName, setGroupName] = useState('');
  const [text, setText] = useState('');

  // implement search
  const [searchQuery, setSearchQuery] = useState()
  const [filteredName, setFilteredName] = useState()

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);


  // const handleChange = (event) => {
  //   setGroups(event.target.value);
  // };

  const handleGroupName = (event) => {
    setGroupName(event.target.value);
  };

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleClick = (event) => {
    dispatch(createGroup(event.target.value));
  };

  const handleText = (event) => {
    setText(event.target.value);
  }

  const handleSubmitGroup = () => {
    // console.log({
    //   clientId: stateClients,
    //   groupName,
    // });

    dispatch(
      createGroup({
        // groupId: groups,
        clientId: clients?.clientId,
        groupName,
      })
    );
  };

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);


  return (
    <Stack>
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
            placeholder="Search groups..."
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

        <Stack sx={{ display: 'flex', justifyContent: 'flex-end' }} direction="row" spacing={2}>
          <Box>
            {/* <FormControl sx={{ minWidth: '25ch' }} size="small">
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
            </FormControl> */}
          </Box>
          <Box>
            <TextField value={groupName} onChange={handleGroupName} placeholder="enter group name" sx={{ minWidth: '20ch' }} size="small" />
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleSubmitGroup} disabled={!groupName}>
              Add Group
            </Button>
          </Box>
        </Stack>
      </RootStyle>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2, mr: 4 }}>
        {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group">
        <Input readOnly/>
          <Button>Copy</Button>
          <Button>CSV</Button>
          <Button>Excel</Button>
          <Button>PDF</Button>
          <Button>Print</Button>
        </ButtonGroup> */}
      </Box>
    </Stack>
  );
}
