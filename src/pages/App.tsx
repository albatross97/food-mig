import React, { Component } from 'react';

import './App.scss';
import '../scss/utilities.scss';

import Title from './Title';
import IntroMap from './IntroMap';
import Food2Mig from './Food2Mig';
import Mig2Action from './Mig2Action';
import Mig2Eco from './Mig2Eco';
import DonutEco from './DonutEco';
import Summary from './Summary';

import ProgressBar from '../components/ProgressBar';
import Footer from '../components/Footer';
import DotSurvey from '../scrolls/DotSurvey';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <Title />
      <IntroMap />
      <Food2Mig />
      <DotSurvey />
      <Mig2Action />
      <Mig2Eco />
      <DonutEco />
      <Summary />
      <Footer />
    </div>
  );
}

export default App;
