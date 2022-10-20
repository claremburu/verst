import { useState } from 'react';
// material
import {
  Box,
  Card,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
  Input,
  Portal,
  Backdrop,
} from '@mui/material';

import { styled } from '@mui/material/styles';

// icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import RefreshIcon from '@mui/icons-material/Refresh';

import Iconify from '../../../components/Iconify';

import useResponsive from '../../../hooks/useResponsive';

const RootStyle = styled(Card)(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 1999,
  minHeight: 440,
  outline: 'none',
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  flexDirection: 'column',
  margin: theme.spacing(3),
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper,
}));

const InputStyle = styled(Input)(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  borderBottom: `solid 1px ${theme.palette.divider}`,
}));

export default function MultipleSelectPlaceholder({ onCloseCompose }) {
  const [range, setRange] = useState('');
  const [open, setOpen] = useState(true);
  const [clear, setClear] = useState();
  const [fullScreen, setFullScreen] = useState(false);

  const isDesktop = useResponsive('up', 'sm');

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    onCloseCompose();
    setFullScreen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  const handleClear = () => {
    setClear('');
    // console.log('This is clear');
  };

  return (
    <>
      {!!open && (
        <Portal>
          <Backdrop open={fullScreen || !isDesktop} 
        //   sx={{ zIndex: 1998 }} 

          />
          <RootStyle
            sx={{
              ...(fullScreen && {
                top: 0,
                left: 0,
                // zIndex: 1999,
                margin: 'auto',
                width: {
                  xs: `calc(100% - 24px)`,
                  md: `calc(100% - 80px)`,
                },
                height: {
                  xs: `calc(100% - 24px)`,
                  md: `calc(100% - 80px)`,
                },
              }),
            }}
          >
            <Box
              sx={{
                pl: 3,
                pr: 1,
                // height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderColor: 'divider',
              }}
            >
              <Typography variant="body2">Client Messages Sent</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {/* <Stack
                  // p={2}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="body2">Client Messages Sent</Typography>
                </Stack> */}
                <Stack>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    {/* // label={<span style={{ fontSize: '2rem' }}>{label}</span>} */}
                    <Select
                      value={range}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="" sx={{ fontSize: '0.8rem' }}>
                        <em>Month-to-date</em>
                      </MenuItem>
                      <MenuItem value={10}>Year-to-date</MenuItem>
                      {/* <MenuItem value={20}>Month-to-date</MenuItem> */}
                      <MenuItem value={30}>Today</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Box
                  spacing={2}
                  sx={{
                    display: 'flex',
                    // py:2,
                    mt: 2,
                  }}
                >
                  {/* <Stack direction='row' spacing={1}> */}
                  {/* <IconButton disableRipple>
                    <List
                      sx={{
                        // width: '100%',
                        // maxWidth:20 ,
                        bgColor: 'background.paper',
                      }}
                    >
                      <ListItemButton onClick={handleClick}>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List
                          // component='div'
                          disablePadding
                        >
                          <ListItemButton sx={{}}>
                            <ListItemText>l</ListItemText>
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </List>
                  </IconButton> */}

                  {/* <IconButton disableRipple>
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                  <IconButton disableRipple>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                  <IconButton disableRipple onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton> */}
                  <IconButton onClick={fullScreen ? handleExitFullScreen : handleEnterFullScreen}>
                    <Iconify icon={fullScreen ? 'eva:collapse-fill' : 'eva:expand-fill'} width={20} height={20} />
                  </IconButton>

                  <IconButton onClick={handleClose}>
                    <Iconify icon={'eva:close-fill'} width={20} height={20} />
                  </IconButton>
                  {/* </Stack> */}
                </Box>
              </Box>
            </Box>
      
          </RootStyle>
        </Portal>
      )}
      {/* client purchases */}
      {/* </Box> */}
    </>
  );
}
