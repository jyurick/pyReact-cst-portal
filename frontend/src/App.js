import './App.css';
import Header from './components/Header';
import ClientList from './components/ClientList';
import AddNewClient from './components/AddNewClient';

function App() {
 


  return (
    <div className="App">
      <Header />
      <AddNewClient />
      <ClientList />
    </div>

  );
}

export default App;


