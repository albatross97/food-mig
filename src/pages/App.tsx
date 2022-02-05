import React, { Component } from 'react';
import './App.scss';
import '../scss/utilities.scss';

import Title from './Title';
import IntroMap from './IntroMap';

function App() {
  return (
    <div className="App">
      <Title />
      <IntroMap />
    </div>
  );
}

export default App;
