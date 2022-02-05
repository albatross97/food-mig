import React, { memo } from 'react';
import DonutChart from '../components/DonutChart';

type SquareProps = {
  color: string;
  width: number;
};

const Square = ({ color, width }: SquareProps) => (
  <div style={{ backgroundColor: color, width: width, height: width }}></div>
);

const Eco = () => {
  return (
    <div className="u-section donut">
      <div className="u-container">
        <h4>
          Those have to <span className="u-red">work for food</span> are more
          likely to make plans for migration.
        </h4>
        <div className="top-legend">
          <Square color="#DFBFBF" width={15} />
          <span>Work for food but NO PLAN to migrate</span>
        </div>
        <div className="top-legend">
          <Square color="#CC0000" width={15} />
          <span>Work for food and HAVE PLAN to migrate</span>
        </div>
        <div className="main-content">
          <div className="donut-chart-wrapper">
            <p className="title">NO PLAN TO MIGRATE</p>
            <DonutChart
              dataArray={[
                { name: 'a', value: 77 },
                { name: 'b', value: 23 },
              ]}
              colorsArray={['#D9D9D9', '#DFBFBF']}
            />
            <div className="donut-chart-footer">
              <div className="bottom-legend">
                <Square color="#D9D9D9" width={12} />
                <span>Not Work For Food</span>
              </div>
              <div className="bottom-legend">
                <Square color="#DFBFBF" width={12} />
                <span>Work For Food</span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="donut-chart-wrapper">
            <p className="title">HAS PLAN TO MIGRATE</p>
            <DonutChart
              dataArray={[
                { name: 'a', value: 68 },
                { name: 'b', value: 32 },
              ]}
              colorsArray={['#D9D9D9', '#CC0000']}
            />
            <div className="donut-chart-footer">
              <div className="bottom-legend">
                <Square color="#D9D9D9" width={12} />
                <span>Not Work For Food</span>
              </div>
              <div className="bottom-legend">
                <Square color="#CC0000" width={12} />
                <span>Work For Food</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eco;
