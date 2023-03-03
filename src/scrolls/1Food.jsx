import FoodChart from '../components/FoodChart.jsx';
import { useState } from 'react';

const FoodInsecure = () => {
  const [step, setStep] = useState(1);
  const handleStep = (e) => {
    setStep(e.target.value);
  };

  return (
    <div className="u-section dot">
      <div className="u-container">
        <h4>
          <span className="u-red">High Food Insecurity</span> in Northern
          Triangle Region
        </h4>
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
        <FoodChart step={step} />
      </div>
    </div>
  );
};

export default FoodInsecure;
