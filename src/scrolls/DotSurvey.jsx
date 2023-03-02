import DotChart from '../components/DotChart';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import rawdata from '../data/dot.csv';

const DotSurvey = () => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);

  const handleStep = (e) => {
    setStep(e.target.value);
  };

  useEffect(() => {
    d3.csv(rawdata).then((rawdata) => {
      const newdata = rawdata.slice(0, 300).map(function (d) {
        return {
          ...d,
          radius: 3,
        };
      });
      setData(newdata);
    });
  }, []);

  return (
    <div className="u-section dot">
      <div className="u-container ">
        <h4>
          <span className="u-red">Survey data: </span> food security & Migration
          Intension
        </h4>
        <p> {'>>'} Hover a dot to view survey participant's information</p>

        <div className="btn-group" onChange={handleStep}>
          <label>
            <input type="radio" value="1" name="tag" required />
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
      </div>
      <DotChart data={data} step={step} />
    </div>
  );
};

export default DotSurvey;
