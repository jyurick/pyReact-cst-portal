import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Client from './Client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const ClientList = ({ selectClient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://cst-portal-ca281c870ff7.herokuapp.com/client_data/?search_query=${searchQuery}`);
      setClients(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Client List</h1>
      <div>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px'   }}>
          {clients.map(client => (
            <Client key={client['client_id']} client={client} selectClient={selectClient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;
