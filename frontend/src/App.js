import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('/api').then(res => setPeople(res.data));
  }, []);

  return people.map((p, index) => {
    return <p key={index}>{p.name} {p.age} {p.address}</p>
  })
}

export default App;
