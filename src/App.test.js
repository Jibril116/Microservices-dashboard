// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      try {
        await fetch('http://localhost:5000/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item: input }),
        });
        setInput('');
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>React and Web Server Example</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an item"
        />
        <button type="submit">Add</button>
      </form>

      <h2>Data from Server:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
