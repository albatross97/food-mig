import React, { Component } from 'react';
import './App.scss';
import '../scss/utilities.scss';

import Title from './Title';
import IntroMap from './IntroMap';
import ProgressBar from '../components/ProgressBar';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <Title />
      <IntroMap />
    </div>
  );
}

export default App;
