// @mui
import PropTypes from 'prop-types';
import { alpha, styled, withStyles } from '@mui/material/styles';
import { Card, Typography, Box, Divider, Stack, Icon } from '@mui/material';

// icons
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

// components
import { textAlign } from '@mui/system';
// //';



// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  // alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

ClientPurchases.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

// const styles = {


// }

export default function ClientPurchases({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      // sx={{
      //   // py: 5,
      //   boxShadow: 0,
      //   verticalAlign: 'top',
      //   // minWidth: 300,
      //   // display: 'flex',
      //   // textAlign: 'center',
      //   color: (theme) => theme.palette.Verst.white,
      //   bgcolor: (theme) => theme.palette.Verst.blue,
      //   ...sx,
      // }}
      // {...other}
    >
      {/* <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle> */}
      {/* <Stack sx={{display:'flex'}} space={2}> */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          m: 2,
        }}>
        <Typography variant="body2">Client Purchases</Typography>

        <Typography variant="subtitle2"
          sx={{
            // opacity: 0.72,
            p:.5,
            borderRadius: .5,
            color: (theme) => theme.palette.Verst.white,
            bgcolor: (theme) => theme.palette.Verst.orange,
            // bgcolor: (theme) => theme.palette[color].darker,
            // bgcolor: (theme) => theme.palette[color].lighter
          }}>
          This Month
        </Typography>
      </Box>
      <Divider />
      <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          m: 2
        }}>
          <Typography variant='subtitle1' fontSize={30}>
            0.00 KES
          </Typography>
          <Typography variant="subtitle2">
            0 Messages
          </Typography>
        </Box>
        <Box sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          m: 2,
          // display: 'flex',
        }}>
          {/* <Typography sx={{ display: 'flex' , mt:3}} variant='subtitle1' >
            0 this month */}
            <LocalAtmIcon sx={{mt:3}}/>
          {/* </Typography> */}
        </Box>
      </Stack>

      {/* </Stack> */}
    </Card>
  );
}
