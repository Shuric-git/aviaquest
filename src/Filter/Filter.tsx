import { useRef } from 'react';

import './Filter.css';

export const Filter = () => {
  const refCheckbox = useRef(null);
  console.log(refCheckbox);
  return (
    <>
      <div className="filter">
        <span className="filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <div className="filter__checkboxWrapper">
          <input id="transfer-all" type="checkbox" checked={true} ref={refCheckbox} />
          <label htmlFor="transfer-all">
            <span>Все</span>
          </label>
        </div>
        <div className="filter__checkboxWrapper">
          <input id="transfer-without" type="checkbox" />
          <label htmlFor="transfer-without">
            <span>Без пересадок</span>
          </label>
        </div>
        <div className="filter__checkboxWrapper">
          <input id="transfer-1" type="checkbox" />
          <label htmlFor="transfer-1">
            <span>1 пересадка</span>
          </label>
        </div>
        <div className="filter__checkboxWrapper">
          <input id="transfer-2" type="checkbox" />
          <label htmlFor="transfer-2">
            <span>2 пересадки</span>
          </label>
        </div>
        <div className="filter__checkboxWrapper">
          <input id="transfer-3" type="checkbox" />
          <label htmlFor="transfer-3">
            <span>3 пересадки</span>
          </label>
        </div>
      </div>
    </>
  );
};
