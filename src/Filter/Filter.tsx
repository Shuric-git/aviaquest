import { useEffect } from 'react';

import { filterItems } from '../utils/filterItems';
import { checkboxesSlice } from '../features/checkboxes';
import './Filter.css';
import { useAppDispatch, useAppSelector } from '../hooks';

export const Filter = () => {
  const { checkboxes } = useAppSelector((state) => state.checkboxesReducer);
  const { checkAll, uncheckAll, check, autoCheck, autoUncheck } = checkboxesSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    let checky = [...checkboxes];
    checky.shift();
    if (!checky.includes(false)) {
      dispatch(autoCheck());
    }
    if (checky.includes(false)) {
      dispatch(autoUncheck());
    }
  });
  const toggleCheck: (index: number) => void = (index) => {
    if (index === 0 && checkboxes[0]) {
      dispatch(uncheckAll());
      return;
    }
    if (index === 0 && !checkboxes[0]) {
      dispatch(checkAll());
      return;
    }
    dispatch(check(index));
  };

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
                    checked={checkboxes[index]}
                    onChange={() => {
                      toggleCheck(index);
                    }}
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
