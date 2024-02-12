import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import Client from './Client';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://cst-portal-ca281c870ff7.herokuapp.com/client_data/');
      setClients(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Client List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {clients.map(client => (
          <Client key={client['client_id']} client={client} />
        ))}
      </div>
    </div>
  );
};

export default ClientList;
