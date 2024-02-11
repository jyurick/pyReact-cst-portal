/*import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
  const [people, setPeople] = useState([]);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  });
  
  api.get('/client_data/')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));

  useEffect(() => {
    api.get('/client_data/').then(res => setPeople(res.data));
  }, []);

  return people.map((p, index) => {
    return <p key={index}>{p.first_name} {p.last_name}</p>
  })
}

export default App;
*/

import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
    </div>

  );
}

export default App;


