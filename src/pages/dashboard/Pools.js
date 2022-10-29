import React, { useState } from 'react';

//
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Card, Typography, Button, Box, Stack } from '@mui/material';

import { bgcolor } from '@mui/system';
// components
import Page from '../../components/Page';
//
import {
  AllProjects,
  PendingApproval,
  Verified,
  ApprovedProjects,
  ProjectPanel,
} from '../../sections/dashboard/app/projects';
import NewApplications from './NewApplications';
import ProjectsApproved from './ProjectsApproved';
import ProjectCard from '../../sections/dashboard/app/projects/components/Projectcard';
import OngoingPools from './OngoinPools';
import VerifiedPools from './VerifiedPools';
import TokenizedPools from './TokenizedPool';
import PoolsLayout from '../../sections/pools/PoolsLayout';
import { PoolsCard } from '../../sections/pools';

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
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Number of Request" total="2" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Ongoing" total="1" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="verified" total="1" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Tokenized" total="2" />
          </Grid>
          <Grid item xs={12}>
            <OngoingPools />
          </Grid>
          <Grid item xs={12}>
            <VerifiedPools />
          </Grid>
          <Grid item xs={12}>
            <TokenizedPools />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Pending Updates" total="2" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="subtitle2">Wallet Bal.</Typography>
                <Typography variant="h4" sx={{ color: '#7BBD00' }}>
                  5 VCT'S
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Pool Stat" total="60%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PoolsCard title="Min Project Size" content="50Ha" />
          </Grid>
          <Grid item xs={12}>
            <PoolsLayout />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PoolsCard title="Location" content="Kenya" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PoolsCard title="Pool" content="KFA01" textSize={10}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PoolsCard title="Project Type" content="Forestry" textSize={10}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PoolsCard title="No of Projects" content="12" textSize={10}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
