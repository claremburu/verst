import React, { useState } from 'react';

//
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Card, Typography, Button } from '@mui/material';

import { bgcolor } from '@mui/system';
// components
import Page from '../../components/Page';
//
import { AllProjects, PendingApproval, Verified, ApprovedProjects, ProjectPanel } from '../../sections/dashboard/app/projects';
import NewApplications from './NewApplications';
import ProjectsApproved from './ProjectsApproved';
import ProjectCard from '../../sections/dashboard/app/projects/components/Projectcard';

// ----------------------------------------------------------------------

const data = [
  { bgcolor: '#00296b', completed: '60' },
  // { bgcolor: '#003f88', completed: '30' },
  // { bgcolor: '#fdc500', completed: '57' },
];

export default function Projects() {
  const theme = useTheme();

  return (
    <Page title="Projects">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AllProjects />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PendingApproval/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ApprovedProjects />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Verified />
          </Grid>
          <Grid item xs={12}>
            <NewApplications />
          </Grid>
          <Grid item xs={12}>
            <ProjectsApproved />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectCard title="Pending Updates" total="2"  />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{p:4}}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography variant="subtitle1" sx={{textTransform: 'uppercase'}}>Pending Approval</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
          <ProjectPanel/>
          </Grid>
        </Grid>
      </Container>
      </Page>
  );
}
