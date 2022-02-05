import React, { Component } from 'react';
import './App.scss';
import '../scss/utilities.scss';

import Title from './Title';
import IntroMap from './IntroMap';
import ProgressBar from '../components/ProgressBar';
import Food2Mig from './Food2Mig';
import Mig2Action from './Mig2Action';
import Mig2Eco from './Mig2Eco';
import Eco from './Eco';
import Summary from './Summary';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <Title />
      <IntroMap />
      <Food2Mig />
      <Mig2Action />
      <Mig2Eco />
      <Eco />
      <Summary />
      <Footer />
    </div>
  );
}

export default App;
