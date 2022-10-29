import React, { useState } from 'react';

//
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Alert } from '@mui/material';

import { bgcolor } from '@mui/system';
// components
import Page from '../../components/Page';
//
// sections
// Login Form
// import LoginForm from '../../sections/auth/login/LoginForm';

import {
  MessagesSent,
  ClientPurchases,
  MessageStats,
  MessagesPurchased,
  ClientMessagesSent,
  MessagesByStatus,
  ClientExpenditure,
  RevenuesByClient,
  MessagesSentTrend,
  MessagesPurchasedTrend,
  MessagesReceivedTrend,
  TopReceivedKeywords,
  ReceivedByAccount,
  ReceivedByNetwork,
  ProfitAnalysis,
  PercentageBalance,
  DestinationGrowth,
  DormantAccounts,
  Footer,
  ProgressBar,
} from '../../sections/dashboard/app';

// ----------------------------------------------------------------------

const data = [
  { bgcolor: '#00296b', completed: '60' },
  // { bgcolor: '#003f88', completed: '30' },
  // { bgcolor: '#fdc500', completed: '57' },
];

export default function DashboardApp() {
  const theme = useTheme();
  // const [name, setName] = useState(faker.name.firstName());

  // const setNameHandler = (event) => {
  //   setName(event.target.value);
  // }

  // const [token, setToken] = useState()

  // if(!token){
  //   return(<LoginForm setToken={setToken}/>)
  // }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Alert sx={{mb:2}} severity="info">No data available!</Alert>
      </Container>
    </Page>
  );
}