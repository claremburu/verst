import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useSettings from '../../../../hooks/useSettings';
import { getClient } from '../../../../redux/slices/clients';

const bull = (
  <Box
    component="span"
    sx={{ transform: 'scale(0.8)' }}
  >
        <Divider/>

  </Box>
);

export default function ClientDetails() {
    const params = useParams();

    const { themeStretch } = useSettings();
  
    const dispatch = useDispatch();
  
    const { clientsById, clients } = useSelector((state) => state.clients);
    const currentClient = clientsById.find((client) => client.clientId === params.id);
    console.log(currentClient, 'currentClient');
    console.log(clientsById, 'clientsById');
    // console.log('products', clients);
  
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('createdAt');
  
    useEffect(() => {
      dispatch(getClient(params?.id));
    }, [dispatch]);
  
    useEffect(() => {
      if (clients?.length) {
        setProductList(clients);
      }
    }, [clients]);
  return (
    <Card sx={{ minWidth: 275 }} style={{backgroundColor: "#F4F6F8"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Website: <em>WebisteURL</em>
        </Typography>
        {bull}
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography sx={{ my: 1.5 }} color="text.secondary">
          Email Address: {currentClient?.clientEmail}
        </Typography>
        {bull}
        <Typography sx={{ my: 1.5 }} variant="body2">
         Created On: {currentClient?.createdAt}
        </Typography>
        {bull}
        <Typography sx={{ my: 1.5 }} variant="body2">
         Last Logged In: {currentClient?.lastLogin}
        </Typography>
        {bull}
        <Typography sx={{ my: 1.5 }} variant="body2">
         Account Type: {currentClient?.accountType}
        </Typography>
        {bull}
        <Typography sx={{ my: 1.5 }} variant="body2">
         Default Currency: {currentClient?.defaultCurrency}
        </Typography>
        {bull}
        <CardActions>
      <Button variant="contained">
         Change Password 
        </Button>
      </CardActions>
      </CardContent>
      
    </Card>
  );
}