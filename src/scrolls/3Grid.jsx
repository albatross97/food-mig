import { Legend, GridChart } from '../components/GridChart.jsx';
import { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { Scrollama, Step } from 'react-scrollama';

import insecureIntFile from '../data/mig_food_insecure.csv';
import secureIntFile from '../data/mig_food_secure.csv';

const Grid = () => {
  const [secureInt, setSecureInt] = useState([]);
  const [securePrep, setSecurePrep] = useState([]);
  const [insecureInt, setInsecureInt] = useState([]);
  const [insecurePrep, setInsecurePrep] = useState([]);

  const [step, setStep] = useState(null);
  const onStepEnter = ({ data }) => {
    setStep(data);
  };

  const calcPercentage = useCallback((data, length, filter = false) => {
    if (filter) {
      data = data.filter((d) => +d.mig_intensity > 1);
    }
    const calcMap = d3.rollup(
      data.sort((a, b) => d3.descending(+a.mig_intensity, +b.mig_intensity)),
      (arr) => Math.round((length * arr.length) / data.length),
      (d) => +d.mig_intensity
    );
    const calcArray = Array.from(calcMap, ([mig_intensity, count]) =>
      Array(count)
        .fill()
        .map((d, i) => {
          return {
            index: `mig${mig_intensity}-${i}`,
            mig_intensity: mig_intensity,
          };
        })
    );
    return calcArray.flat();
  }, []);

  useEffect(() => {
    Promise.all([d3.csv(secureIntFile), d3.csv(insecureIntFile)]).then(
      ([secureIntData, insecureIntData]) => {
        setSecureInt(calcPercentage(secureIntData, 400));
        setSecurePrep(calcPercentage(secureIntData, 400, true));
        setInsecureInt(calcPercentage(insecureIntData, 400));
        setInsecurePrep(calcPercentage(insecureIntData, 400, true));
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
            {secureInt.length && securePrep.length ? (
              <GridChart
                step={step}
                data={secureInt}
                dataPrep={securePrep}
                content="food-secure's intention"
              />
            ) : (
              <div>loading</div>
            )}
            {insecureInt.length && insecurePrep.length ? (
              <GridChart
                step={step}
                data={insecureInt}
                dataPrep={insecurePrep}
                content="food-insecure's intention"
              />
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
        <div className="scroller">
          <Scrollama onStepEnter={onStepEnter} offset="1">
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
                      20% among the food-insecure
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
