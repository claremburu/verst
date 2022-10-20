import React, { useState } from 'react';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
//
// sections
import {
    CreateCampaign,ImportContacts
} from '../../sections/dashboard/campaigns';

// ----------------------------------------------------------------------

export default function CreateCampaigns() {
  const theme = useTheme();
  // const [name, setName] = useState(faker.name.firstName());

  // const setNameHandler = (event) => {
  //   setName(event.target.value);
  // }

  return (
    <Page title="Create Campaigns">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3} >
         {/* sx={{p:2}} */}
        
          <Grid item xs={12} sm={7} md={7}>
            <CreateCampaign/>
          </Grid>        
          <Grid item xs={12} sm={5} md={5}>
            <ImportContacts/>
          </Grid>
        </Grid>

        </Container>
    </Page>
  );
}