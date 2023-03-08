import MapChart from '../components/MapChart';

const IntroMap = () => {
  return (
    <div className="u-section map">
      <MapChart />
      <div className="u-container">
        <div className="card">
          <h3>
            <div className="u-red">Rise in Migration</div>
            from the Northern Triangle
          </h3>
          <p>
            Migration across the US-Mexican border has been the subject of
            political and social debate for many years.{' '}
            <span>
              In the past decade, there is a surge in migration from the
              Northern Triangle, surpassing Mexico as the largest immigrant
              group.
            </span>{' '}
            Between 2007 and 2015, the number of immigrants from the Northern
            Triangle countries of Guatemala, Honduras, and El Salvador rose by
            25%.
          </p>

          <p className="u-red">
            {'>> '}Hover a country to view detailed information
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroMap;
