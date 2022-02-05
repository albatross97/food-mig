import MapChart from '../components/MapChart';

const IntroMap = () => {
  return (
    <div className="u-section map">
      <div className="card">
        <h3>
          <div className="u-red">Migration status</div>
          in the Northern Triangle Region
        </h3>
        <p>
          Migration from Central America to the U.S. began rising notably in the
          1980s, and continued to increase in subsequent decades.
        </p>
        <p>
          More recently, the number of immigrants{' '}
          <span>–– from the three Northern Triangle nations rose by 25%</span>{' '}
          between 2007 and 2015. During that same period, the immigrant
          population from Mexico, the largest birth country for U.S. immigrants,
          declined 6%.
        </p>
      </div>
      <MapChart />
    </div>
  );
};

export default IntroMap;
