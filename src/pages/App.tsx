import './App.scss';
import '../scss/utilities.scss';

import Title from './0Title';
import IntroMap from './1Map';
import Food2Mig from './2Food2Mig';
import Mig2Action from './3Mig2Action';
import Mig2Eco from './4Mig2Eco';
import Grid from '../scrolls/3Grid';
import DonutEco from './5Donut';
import Summary from './6Summary';

import ProgressBar from '../components/ProgressBar';
import DotSurvey from '../scrolls/2DotSurvey';
import FoodInsecure from '../scrolls/1Food';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <Title />
      <IntroMap />
      <FoodInsecure />
      <Food2Mig />
      <DotSurvey />
      <Mig2Action />
      <Grid />
      <Mig2Eco />
      <DonutEco />
      <Summary />
    </div>
  );
}

export default App;
