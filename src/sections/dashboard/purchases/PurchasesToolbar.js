import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import {
  Box,
  Button, IconButton,
  InputAdornment,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

// import {  } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import NewPurchase from './NewPurchase';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

PurchasesToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: '50%',
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

export default function PurchasesToolbar({ numSelected, filterName, onFilterName, onDeleteUsers }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients, jasminGroups } = useSelector((state) => state.jasmine);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  return (

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

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {/* <Typography variant="h6">SMPP Groups</Typography> */}
          {/*  */}
          <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleOpen}>
              New Purchase
            </Button>
          </Stack>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NewPurchase onCloseModal={handleClose}/>
          </Modal>
        </Box>
      </RootStyle>
  
  );
}
