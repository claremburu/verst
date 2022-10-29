import React, { useState } from 'react';

//
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Card, Typography, Button, Box, Stack, List, ListItem } from '@mui/material';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

const data = [
  { bgcolor: '#00296b', completed: '60' },
  // { bgcolor: '#003f88', completed: '30' },
  // { bgcolor: '#fdc500', completed: '57' },
];

export default function Pools() {
  const theme = useTheme();

  return (
    <Page title="Projects">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} md={4}>
            <List>
                <ListItem>Test</ListItem>
            </List>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <List>
                <ListItem>Test</ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
