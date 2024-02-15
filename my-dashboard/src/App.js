import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Nav/Sidebar';
import Routing from './Routes';
import './App.css';

function App() {
  return (
    <>
      <div className='grid-container'>
        <Header />
        <Sidebar />
        <Routing />
      </div>
    </>
  );
}

export default App;
