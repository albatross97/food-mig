import './App.scss';
import '../scss/utilities.scss';

import Title from './0Title';
import IntroMap from './1Map';
import Food2Mig from './2Food2Mig';
import Mig2Action from './3Mig2Action';
import Mig2Eco from './4Mig2Eco';
import Grid from '../scrolls/4Grid';
import DonutEco from './5Donut';
import Summary from './6Summary';

import ProgressBar from '../components/ProgressBar';
import Footer from './7Footer';
import DotSurvey from '../scrolls/2DotSurvey';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <Title />
      <IntroMap />
      <Food2Mig />
      <DotSurvey />
      <Mig2Action />
      <Grid />
      <Mig2Eco />
      <DonutEco />
      <Summary />
      <Footer />
    </div>
  );
}

export default App;
