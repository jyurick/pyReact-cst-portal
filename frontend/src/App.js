import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
  const [people, setPeople] = useState([]);

  const api = axios.create({
    baseURL: 'https://cst-portal-ca281c870ff7.herokuapp.com/',
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
