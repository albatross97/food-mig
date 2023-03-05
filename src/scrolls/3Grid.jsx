import { Legend, GridChart } from '../components/GridChart.jsx';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Scrollama, Step } from 'react-scrollama';

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
  const onStepEnter = ({ data }) => {
    setStep(data);
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
        <div className="u-main">
          <h4>Food Insecurity & Migration Intention, Plan and Preparation</h4>
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
              content="food-secure's intention"
            />
            <GridChart
              step={step}
              data={insecureInt}
              content="food-insecure's intention"
            />
          </div>
        </div>
        <div className="scroller">
          <Scrollama onStepEnter={onStepEnter} offset="0.8">
            <Step data={1} key={1}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>Food-secure people have higher desire to migrate</h4>
                  <p>
                    The percentage of individuals with a migration desire is
                    higher among{' '}
                    <span className="u-back-accent">
                      the food-secure population at 44%
                    </span>
                    , compared to
                    <span className="u-back-red">
                      37% for the food-insecure group
                    </span>
                    .
                  </p>
                  <p>However, it takes more than a desire to make action.</p>
                </div>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>Desire is not equal to action</h4>
                  <p>
                    Although food-secure people has a higher percentage of
                    individuals with a migration desire, it's worth noting that
                    a desire alone is insufficient to prompt action. In reality,{' '}
                    <span className="u-back-red">
                      the food-insecure group is more likely to take concrete
                      steps towards migration
                    </span>
                    .
                  </p>
                </div>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>
                    The food-insecure is more likely to take concrete actions
                  </h4>
                  <p>
                    The proportion of having migration intention and having
                    plans is:
                  </p>
                  <li>
                    <span className="u-back-accent">
                      14% among the food-secure
                    </span>
                  </li>
                  <li>
                    <span className="u-back-red">
                      19% among the food-insecure
                    </span>
                  </li>
                  <p>
                    Considering that individuals who are food-insecure are
                    already experiencing challenges in meeting their fundamental
                    needs, it is probable that their actions towards migration
                    are more driven by desperation rather than choice.
                  </p>
                </div>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </div>
  );
};

export default Grid;
