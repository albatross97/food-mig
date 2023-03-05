import DotChart from '../components/DotChart';

import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import rawdata from '../data/dot.csv';
import { Scrollama, Step } from 'react-scrollama';

const DotSurvey = () => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);

  const onStepEnter = ({ data }) => {
    setStep(data);
  };
  useEffect(() => {
    d3.csv(rawdata).then((rawdata) => {
      const newdata = rawdata.slice(0, 1000);
      setData(newdata);
    });
  }, []);

  return (
    <div className="u-section dot">
      <div className="u-container ">
        <div className="u-main">
          <h4>
            <span className="u-red">Survey Data: </span> Food Insecurity &
            Migration Intention
          </h4>
          <p className="u-red">
            {' '}
            {'>>'} Hover a dot to view a survey participant's information
          </p>
          <DotChart nodes={data} step={step} />
        </div>

        <div className="scroller">
          <Scrollama onStepEnter={onStepEnter} offset="0.8">
            <Step data={1} key={1}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>4,498 Survey responses</h4>
                  <p>
                    In April 2021, the World Food Programme (WFP) conducted a
                    face-to-face survey of{' '}
                    <span className="u-back-red">4,498 responses</span> in the
                    Northern Triangle -- El Salvador, Guatemala, and Honduras.
                  </p>
                </div>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>The majority are suffering from food insecurity</h4>
                  <p>
                    The participants are classified into four groups based on{' '}
                    <a
                      href="https://www.wfp.org/publications/consolidated-approach-reporting-indicators-food-security-cari-guidelines"
                      className="u-back-red u-link">
                      CARI food security indicators
                    </a>{' '}
                    given from WFP.
                  </p>
                </div>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div className="step-wrapper">
                <div className="step">
                  <h4>Around half have migration desire</h4>
                  <p>
                    <span className="u-back-red">Around half</span> of household
                    respondents indicated a desire to migrate, but{' '}
                    <span className="u-back-red">only 6% are making plans</span>{' '}
                    to do so.
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

export default DotSurvey;
