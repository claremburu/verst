// form
// @mui
import { Box, Stack, Typography } from '@mui/material';
// routes
// hooks
// components

import PersonIcon from '@mui/icons-material/Person';
import BackupTableIcon from '@mui/icons-material/BackupTable';

// ----------------------------------------------------------------------

export default function AllSet() {
  return (
    <Stack alignItems="center" sx={{ mb: 5 }} spacing={2}>
      <Typography variant="h4" gutterBottom>
        Congratulations! you have successfully added 'your project'
      </Typography>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src="/icons/complete.png" alt="complete" width="200%" height="200%"/>
      </Box>
      <Typography variant="body2" gutterBottom>
        We need to verify the information before we enable you to proceed with the setup orlogin to your developer
        console. This typically takes less than 6 hours, once verified we will alert you via email. We may call the
        contact person as we verify. Reach out to us for any clarification
      </Typography>
    </Stack>
  );
}
