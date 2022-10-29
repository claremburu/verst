import React, { useState } from 'react';

// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Divider, Stack, Icon } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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

ProjectCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  subheader: PropTypes.string,
  sx: PropTypes.object,
  // cardIcon: PropTypes.elementType,
};

// const styles = {

// }

export default function ProjectCard({ title, total, subheader, icon, color = 'primary', sx, ...other }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card variant="outlined">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 2,
        }}
      >
        <Typography variant="body2" fontSize={15}>
          {title}
        </Typography>
      </Box>
      <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', m: 2, justifyContent: 'center' }}>
        <AccessTimeFilledIcon color='#ff0000' fontSize='large'/>
        <Typography variant="h3" fontSize={20} sx={{ mx: 2 }}>
          {total}
        </Typography>
        <Typography variant="h2" fontSize={40} sx={{ mx: 2 }}>
          {subheader}
        </Typography>
      </Stack>
    </Card>
  );
}
