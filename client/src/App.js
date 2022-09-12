import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'axios';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api').then(response => {
      setMessage(response.data.message);
    })
    .catch((err) => {
      setMessage("Error");
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message === '' ? 'Fetching data from server...' : message}
        </p>
      </header>
    </div>
  );
}

export default App;
