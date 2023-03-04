import { Legend, GridChart } from '../components/GridChart.jsx';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import insecureIntFile from '../data/food-insecure-mig-int.csv';
import insecurePrepFile from '../data/food-insecure-mig-prep.csv';
import secureIntFile from '../data/food-secure-mig-int.csv';
import securePrepFile from '../data/food-secure-mig-prep.csv';

const Grid = () => {
  const [secureInt, setSecureInt] = useState([]);
  const [securePrep, setSecurePrep] = useState([]);
  const [insecureInt, setInsecureInt] = useState([]);
  const [insecurePrep, setInsecurePrep] = useState([]);

  const [step, setStep] = useState('1');
  const handleStep = (e) => {
    setStep(e.target.value);
  };

  useEffect(() => {
    Promise.all([
      d3.csv(secureIntFile),
      d3.csv(securePrepFile),
      d3.csv(insecureIntFile),
      d3.csv(insecurePrepFile),
    ]).then(
      ([secureIntData, securePrepData, insecureIntData, insecurePrepData]) => {
        setSecureInt(
          secureIntData.sort((a, b) =>
            d3.descending(+a.mig_int_global, +b.mig_int_global)
          )
        );
        setSecurePrep(securePrepData);
        setInsecureInt(insecureIntData);
        setInsecurePrep(insecurePrepData);
      }
    );
  }, []);

  return (
    <div className="u-section dot">
      <div className="u-container">
        <h4>Food security & migration intention</h4>
        <div className="btn-group" onChange={handleStep}>
          <label>
            <input type="radio" value="1" name="tag" defaultChecked />
            <span className="1">step1</span>
          </label>
          <label>
            <input type="radio" value="2" name="tag" />
            <span className="2">step2</span>
          </label>
          <label>
            <input type="radio" value="3" name="tag" />
            <span className="3">step3</span>
          </label>
        </div>
        <div className="legends-container2">
          <div className="legends">
            <Legend content="does not want to migrate" category={0} />
            <Legend content="wants to migrate but has no plan" category={1} />
            <Legend content="has plan but no preparation" category={2} />
            <Legend content="has plan and preparation" category={3} />
          </div>
        </div>
        <div className="charts">
          <GridChart
            step={step}
            data={secureInt}
            content="food secure's intention"
          />
          <GridChart
            step={step}
            data={insecureInt}
            content="food insecure's intention"
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;
