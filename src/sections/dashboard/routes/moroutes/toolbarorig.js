import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Radio,
  Select,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// import {  } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { getClients, getProviders, getUsers } from '../../../../redux/slices/jasmine';
import { createMoRoutes, createMtRoutes, getRouteFilters, getSuppliers } from '../../../../redux/slices/routes';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

MoToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: 'auto',
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

// const filters = ['safaricom', 'vodafone', 'Verst'];

export default function MoToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const dispatch = useDispatch();

  const { filters, suppliers } = useSelector((state) => state.routes);
  // console.log(filters, 'filters');
  // console.log(suppliers, 'suppliers');
  const { smppProviders, smppUsers, clients } = useSelector((state) => state.jasmine);
  console.log(smppUsers, 'smppUsers');
  // console.log(smppProviders, 'smppProviders');
  // console.log(clients, 'clients');
  // console.log(smppUsers, 'smppUsers');

  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [mtOpen, setMtOpen] = useState(false)

  const [stateProviders, setStateProviders] = useState();
  const [stateFilters, setStateFilters] = useState([]);

  const [stateMoRoutes, setStateMoRoutes] = useState(false);
  const [stateMtRoutes, setStateMtRoutes] = useState(false);

  const [stateClients, setStateClients] = useState();
  const [filterIds, setFilterIds] = useState([]);
  const [smppClients, setSmppClients] = useState([]);
  const [routeDestination, setRouteDestination] = useState();
  const [rate, setRate] = useState();
  const [routeDir, setRouteDir] = useState();
  const [smppServerIds, setSmppServerIds] = useState([]);
  const [supplierId, setSupplierId] = useState();
  const [clientId, setClientId] = useState();

  const [smppUser, setSmppUser] = useState();

  const [smppServer, setSmppServer] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setGroups(event.target.value);
  };

  const handleSmppUser  = (event) => {
    setSmppUser(event.target.value);
  }

  const handleSmppServer = (event) => {
    setSmppServer(event.target.value);
  }

  const handleChangeProviders = (event) => {
    setStateProviders(event.target.value);
  };

  const handleChangeFilters = (event) => {
    setFilterIds(event.target.value);
  };

  const handleClients = (event) => {
    setStateClients(event.target.value);
  };

  const handleSmmppServerIds = (event) => {
    setSmppServerIds(event.target.value);
  }

  const handleSupplierId = (event) => {
    setSupplierId(event.target.value);
  }

  const handleClientId = (event) => {
    setClientId(event.target.value);
  }

  const handleFilterId = (event) => {
    setFilterIds(event.target.value);
  };

  const handleSmppClients = (event) => {
    setSmppClients(event.target.value);
  };

  const handleRouteDestination = (event) => {
    setRouteDestination(event.target.value);
  };

  const handleRate = (event) => {
    setRate(event.target.value);
  };

  const handleRouteDir = (event) => {
    setRouteDir(event.target.value);
  };

  const handleMtOpen = (e) => {
    setMtOpen(true);
  }

  const handleMtClose = (e) => {
    setMtOpen(false);
  }

  const handleCreateMoRoutes = () => {
    dispatch(
      createMoRoutes({
        clientId,
        filterIds,
        smppServerIds,
        // routeDestination,
        // rate,
        // routeDir
      })
    );
    handleClose();
  };

  const handleCreateMtRoutes = () => {
    dispatch(
      createMtRoutes({
        clientId: stateClients,
        filterIds,
        smppClientIds: smppClients,
        route_destination: routeDestination,
        rate,
        supplierId
        // routeDir
      })
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getRouteFilters());
    dispatch(getSuppliers());
    dispatch(getClients());
    dispatch(getUsers());
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
            placeholder="Search mo/mt routes..."
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
        <Stack direction="row" spacing={2}>
        <Box>
          <Button variant="contained" onClick={setOpen}>
            New Mo Route
          </Button>

          <Modal
            sx={{ height: '100%' }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Stack spacing={2} direction="row" sx={{display:"flex", justifyContent:"space-between"}}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                New Mo Route
              </Typography>
              <CloseIcon onClick={handleClose} sx={{cursor:"pointer"}} />
              </Stack>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography> */}

              {/* <Typography variant="subtitle2" sx={{ my: 1 }}>
                Select Route Type
              </Typography>
              <FormControlLabel
                id="moroutes"
                value={routeDir}
                onChange={(e) => setRouteDir(e.target.checked)}
                control={<Radio />}
                label="MO Routes"
              />
              <FormControlLabel
                id="mtroutes"
                checked={stateMtRoutes}
                value={routeDir}
                onChange={(e) => setRouteDir(e.target.checked)}
                // value="mt"
                control={<Radio />}
                label="MT Routes"
              /> */}
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

              <Box>
                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Select SMPP Client Account
                </Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={smppClients}
                    onChange={handleSmppClients}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    multiple
                  >
                    {smppProviders?.map(({ smppProviderId, ownerName, clientId }) => (
                      <MenuItem value={clientId}>{ownerName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
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

                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Select one or more filters
                </Typography>
                <FormControl sx={{ width: '100%' }} size="small">
                  <Select
                    value={filterIds}
                    onChange={handleChangeFilters}
                    multiple
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filters?.map(({ filterId, filterName, filterType }) => (
                      <MenuItem value={filterId}>
                        {filterName} - {filterType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
                {/* <Typography sx={{ my: 1 }} variant="subtitle2">
                Enter Rate
              </Typography> */}
                {/* <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth size="small" value={rate} onChange={handleRate} /> */}
                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Supplier
                </Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={stateClients}
                    onChange={handleClients}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {clients?.map(({ clientId, clientName }) => (
                      <MenuItem value={clientId}>{clientName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Typography sx={{ my: 1 }} variant="subtitle2">
                Route Destination
              </Typography> */}
                {/* <TextField sx={{ minWidth: '100%' }} fullWidth placeholder="route destination" size="small" value={routeDestination} onChange={handleRouteDestination}/> */}
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" endIcon={<SaveIcon />} onClick={handleCreateMoRoutes}>
                    Save
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>
        </Box>

        <Box>
          <Button variant="contained" onClick={setOpen}>
            New Mo Route
          </Button>

          <Modal
            sx={{ height: '100%' }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                New Mo Route
              </Typography>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter all the <b>mandatory</b> fields below. You can go in and configure the details later.
                </Typography> */}

              {/* <Typography variant="subtitle2" sx={{ my: 1 }}>
                Select Route Type
              </Typography>
              <FormControlLabel
                id="moroutes"
                value={routeDir}
                onChange={(e) => setRouteDir(e.target.checked)}
                control={<Radio />}
                label="MO Routes"
              />
              <FormControlLabel
                id="mtroutes"
                checked={stateMtRoutes}
                value={routeDir}
                onChange={(e) => setRouteDir(e.target.checked)}
                // value="mt"
                control={<Radio />}
                label="MT Routes"
              /> */}
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

              <Box>
                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Select SMPP Server Account
                </Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={clientId}
                    onChange={handleClientId}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    // multiple
                  >
                    {clients?.map(({ clientId, clientName }) => (
                      <MenuItem value={clientId}>{clientName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
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

                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Select one or more filters
                </Typography>
                <FormControl sx={{ width: '100%' }} size="small">
                  <Select
                    value={filterIds}
                    onChange={handleChangeFilters}
                    multiple
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filters?.map(({ filterId, filterName, filterType }) => (
                      <MenuItem value={filterId}>
                        {filterName} - {filterType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Select one or more servers
                </Typography>
                <FormControl sx={{ width: '100%' }} size="small">
                  <Select
                    value={smppServerIds}
                    onChange={handleSmmppServerIds}
                    multiple
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {smppUsers?.map(({ userId, serverName }) => (
                      <MenuItem value={userId}>
                        {serverName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
                {/* <Typography sx={{ my: 1 }} variant="subtitle2">
                Enter Rate
              </Typography> */}
                {/* <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth size="small" value={rate} onChange={handleRate} /> */}
                <Typography sx={{ my: 1 }} variant="subtitle2">
                  Supplier
                </Typography>
                <FormControl sx={{ minWidth: '100%' }} size="small">
                  <Select
                    value={stateClients}
                    onChange={handleClients}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {clients?.map(({ clientId, clientName }) => (
                      <MenuItem value={clientId}>{clientName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography sx={{ my: 1 }} variant="subtitle2">
                Route Destination
              </Typography>
                <TextField sx={{ minWidth: '100%' }} fullWidth placeholder="route destination" size="small" value={routeDestination} onChange={handleRouteDestination}/>
                <Typography sx={{ my: 1 }} variant="subtitle2">
                Rate
              </Typography>
              <TextField sx={{ minWidth: '100%' }} fullWidth placeholder="rate" size="small" value={rate} onChange={handleRate}/>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" endIcon={<SaveIcon />} onClick={handleCreateMtRoutes}>
                    Save
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>
        </Box>
       
        </Stack>
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
