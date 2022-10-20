import React, { useState } from 'react';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Divider} from '@mui/material';
// components
import Page from '../../components/Page';
//
// sections
import {
    SmppTools, MessageStatus
} from '../../sections/dashboard/tools';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  // const [name, setName] = useState(faker.name.firstName());

  // const setNameHandler = (event) => {
  //   setName(event.target.value);
  // }

  return (
    <Page title="SMPP Tools">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}
        // sx={{p:2}}
        >
          <Grid item xs={12} sm={6} md={6} >
            <SmppTools />
          </Grid>
          {/* <Divider orientation='vertical' flexItem/> */}
          <Grid item xs={12} sm={6} md={6} >
            <MessageStatus />
          </Grid>
        </Grid>

        </Container>
    </Page>
  );
}