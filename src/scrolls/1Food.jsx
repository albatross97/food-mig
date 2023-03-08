import { FoodChart, Legend } from '../components/FoodChart.jsx';
import { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const FoodInsecure = () => {
  const [step, setStep] = useState(1);

  const onStepEnter = ({ data }) => {
    setStep(data);
  };

  return (
    <div className="u-section dot">
      <div className="u-container">
        <div className="u-main" id="food-main">
          <h4>
            <span className="u-red">Severe Food Insecurity</span> in the
            Northern Triangle
          </h4>
          <p className="u-red"> {'>>'} Hover to view detailed information</p>
          <div
            className="legends-container"
            style={{ opacity: step == 3 ? 1 : 0 }}>
            <div className="legends">
              <Legend content="moderate" />
              <Legend content="severe" />
            </div>
          </div>
          <FoodChart step={step} />
        </div>

        <div className="scroller">
          <Scrollama onStepEnter={onStepEnter} offset="0.8">
            <Step data={1} key={1}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>Severe food insecurity</h4>
                  <p>
                    The prevalence of severe food insecurity is significantly
                    higher in{' '}
                    <span className="u-back-red">
                      the Northern Triangle, where over 13.8% the population
                    </span>{' '}
                    is expected to experience it, in contrast to{' '}
                    <span className="u-back-accent">
                      the US, where less than 1% people
                    </span>{' '}
                    are confronting a similar challenge.
                  </p>
                </div>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>Gap between countries</h4>
                  <p>
                    The Northern Triangle has been grappling with food
                    insecurity for many years. This has been one of the
                    significant driving forces behind the migration of people
                    from these countries to the United States. Many individuals
                    and families feel that they have no choice but to leave in
                    search of a better life.
                  </p>
                </div>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>About half is experiencing moderate food insecurity</h4>
                  <p>
                    In the Northern Triangle regions, a significant proportion
                    of the population,{' '}
                    <span className="u-back-red">above 45.6%</span>, is expected
                    to encounter moderate food insecurity. This is in contrast
                    to the US, where{' '}
                    <span className="u-back-accent">approximately 8%</span>{' '}
                    people are confronting a comparable situation.
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

export default FoodInsecure;
