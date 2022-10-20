import React, { useState } from 'react';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
//
// sections
import {
    HttpRequest, HttpOptions, HttpUrl
} from '../../sections/dashboard/tools';

// ----------------------------------------------------------------------

export default function HttpRequests() {
  const theme = useTheme();
  // const [name, setName] = useState(faker.name.firstName());

  // const setNameHandler = (event) => {
  //   setName(event.target.value);
  // }

  return (
    <Page title="HTTP Requests">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}
        // sx={{p:2}}
        >
          <Grid item xs={12} sm={6} md={6} >
            <HttpRequest />
          </Grid>
          <Grid item xs={12} sm={6} md={6} >
            <HttpOptions />
          </Grid>
        </Grid>

        <Grid container spacing={3}
        // sx={{p:2}}
        >
          <Grid item xs={12} sm={12} md={12} >
            <HttpUrl />
          </Grid>
        </Grid>

        </Container>
    </Page>
  );
}