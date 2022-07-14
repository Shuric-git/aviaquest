// import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterItems } from '../utils/filterItems';

import './Filter.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const check = useSelector((state: []) => state);
  const toggleCheck = (index: number) => {
    dispatch({ type: 'clickCheck', payload: index });
  };

  console.log(check);
  return (
    <>
      <div className="filter">
        <span className="filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <ul className="filter__list">
          {filterItems.map(({ name }, index) => {
            return (
              <li key={index}>
                <div className="filter__checkboxWrapper">
                  <input
                    id={`custom-checkbox-${index}`}
                    type="checkbox"
                    checked={check[index]}
                    onChange={() => toggleCheck(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    <span>{name}</span>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
