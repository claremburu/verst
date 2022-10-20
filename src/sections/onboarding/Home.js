// form
// @mui
import { Box, Stack, Typography } from '@mui/material';
// routes
// hooks
// components


import PersonIcon from '@mui/icons-material/Person';
import BackupTableIcon from '@mui/icons-material/BackupTable';

// ----------------------------------------------------------------------

export default function Home() {

    return (
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }} spacing={2}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome FName
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Lets Get You Started
                </Typography>
                <Typography variant="body2">
                    Here's what we'll need to list your project in Verst in just a few minutes.
                    {/* <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
      Get started
    </Link> */}
                </Typography>
                <Stack direction="row" spacing={2} sx={{my:2}} alignItems="center">
                    <PersonIcon />
                    <Box>
                        <Typography variant="subtitle1">Your Information</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Your Contact Details</Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{my:2}} alignItems="center">
                    <BackupTableIcon />
                    <Box>
                        <Typography variant="subtitle1">Project Information</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>The project licenses, financial and technical details</Typography>
                    </Box>
                </Stack>
            </Box>

            {/* <Tooltip title={capitalCase(method)} placement="right"> */}
            <>
                {/* 
        <Image
          disabledEffect
          src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
          sx={{ width: 32, height: 32 }}
        /> */}
            </>
            {/* </Tooltip> */}
        </Stack>
    );
}
