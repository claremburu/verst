import React, {useState} from 'react';

// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Divider, Stack, Icon } from '@mui/material';

// icons
import SendIcon from '@mui/icons-material/Send';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// components
import { textAlign } from '@mui/system';
// //

// import FullScreen from '../../portable/FullScreen';



// ----------------------------------------------------------------------

// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   // alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
// }));

// ----------------------------------------------------------------------

MessagesSent.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

// const styles = {


// }

export default function MessagesSent({ title, total, icon, color = 'primary', sx, ...other }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    // <Card
    //   sx={{
    //     // py: 5,
    //     boxShadow: 0,
    //     // verticalAlign: 'top',
    //     // minWidth: 300,
    //     // display: 'flex',
    //     // textAlign: 'center',
    //     // opacity: 0.8,
    //     // color: (theme) => theme.palette[color].lighter,
    //     // bgcolor:'#fff',
    //     // bgcolor: (theme) => theme.palette.background,
    //     ...sx,
    //   }}
    //   {...other}
    // >
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          m: 2,
        }}>
        <Typography variant="body2">{title}</Typography>

        {/* <Typography variant="subtitle2"
          sx={{
            // opacity: 0.72,
            bgcolor: (theme) => theme.palette.Verst.orange,
            p: .5,
            borderRadius: .5,
            color: (theme) => theme.palette.Verst.white,
            // bgcolor: (theme) => theme.palette[color].darker,
            // bgcolor: (theme) => theme.palette[color].lighter
          }}>
          Today
        </Typography> */}
      </Box>
      {/* <Divider /> */}
      <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          m: 2
        }}>
          <Typography variant='subtitle1' fontSize={30} >
            {total}
          </Typography>
          {/* <Typography variant="subtitle2">
            Messages
          </Typography> */}
        </Box>
        <Box sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          m: 2,
          // display: 'flex',
        }}>
          {/* <Typography sx={{
            display: 'flex',
            mt: 3,
          }}
            variant='subtitle1' >
            0 this month
            <SendIcon />
          </Typography> */}
        </Box>
      </Stack>

      {/* </Stack> */}
    </Card>
  );
}
