import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);

  const addNewUser = async () => {
    const response = await fetch('http://localhost:5000/profileUser/create', {
      method: 'POST',
      body: JSON.stringify({ login: 'Vlad', userName: 'Lazutik' }),
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    return console.log(response.json());
  };

  const getAllUsers = async () => {
    const response = await fetch('http://localhost:5000/profileUser/allUsers', {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    return console.log(response.json());
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={addNewUser}>Add new user</button>
      <button onClick={getAllUsers}>Get all users from database</button>
    </>
  );
}

export default App;
