import DotChart from '../components/DotChart';

const DotSurvey = () => {
  return (
    <div className="u-section dot">
      <div className="u-container ">
        <h4>
          <span className="u-red">Survey data,</span> food security, Migration
          Intension
        </h4>
        <p> {'>>'} Hover a dot to view survey participant's information</p>
      </div>
      <DotChart />
    </div>
  );
};

export default DotSurvey;
