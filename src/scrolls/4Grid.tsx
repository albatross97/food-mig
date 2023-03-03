import GridChart from '../components/GridChart.jsx';
const Grid = () => {
  let legend = <div>hello</div>;
  return (
    <div className="u-section">
      <div className="u-container">
        <h4>Food security & migration intention</h4>
        {legend}
        <div className="charts">
          <GridChart />
        </div>
      </div>
    </div>
  );
};

export default Grid;
