import React, { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
//
// sections
import { SendMessage, UploadContacts, ComposeMessage } from '../../sections/dashboard/messaging';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [file, setFile] = useState({
    file: '',
  });

  const [group, setGroup] = useState({
    group: '',
  });

  const updateFileName = (e) => {
    setFile({
      file: e.target.value,
    });
  };

  const updateGroupName = (e) => {
    setGroup({
      group: e.target.value,
    });
  };

  return (
    <Page title="Send Message">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={7}>
            <ComposeMessage filename={file} updateFileName={updateFileName} updateGroupName={updateGroupName} />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <UploadContacts updateGroupName={updateGroupName} updateFileName={updateFileName} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
