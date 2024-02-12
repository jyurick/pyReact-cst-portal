import './App.css';
import Header from './components/Header';
import ClientList from './components/ClientList';
import AddNewClient from './components/AddNewClient';
import React, { useState } from "react";
import { emptyClient } from './services/misc';

function App() {
  const [selectedClient, setSelectedClient] = useState(emptyClient);

  const addNewClient = (client) => {
    setSelectedClient(client);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="App">
      <Header />
      <AddNewClient client={selectedClient}/>
      <ClientList selectClient={addNewClient} />
    </div>
  );
}

export default App;
