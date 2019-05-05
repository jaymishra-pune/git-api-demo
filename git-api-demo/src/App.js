import React from 'react';
import logo from './logo.svg';
import './App.css';
import RepoInfo from './RepoInfo';

function App() {
  let data;
  return (
    <div className="App">
      <h3>Github info</h3>      
        <RepoInfo />
    </div>
  );
}

export default App;
