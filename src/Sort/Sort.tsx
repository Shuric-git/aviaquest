import { useState } from 'react';
import cx from 'classnames';

import { useAppDispatch } from '../hooks';
import { sortByPrice, sortByDuration, sortByOverall } from '../features/filterSortReducer';

import classes from './Sort.module.scss';

export const Sort = () => {
  const sortBtns = [
    {
      id: 'sortByPrice',
      className: cx(classes['sort__btn'], classes['active']),
      name: 'САМЫЙ ДЕШЁВЫЙ',
    },
    {
      id: 'sortByDuration',
      className: classes['sort__btn'],
      name: 'САМЫЙ БЫСТРЫЙ',
    },
    {
      id: 'sortByOverall',
      className: classes['sort__btn'],
      name: 'ОПТИМАЛЬНЫЙ',
    },
  ];

  const [sort, setSort] = useState(sortBtns);

  const dispatch = useAppDispatch();

  const sortTickets = (id: string) => {
    let sortedArr = sort.map((item) => {
      if (item.id === id) {
        item.className = cx(classes['sort__btn'], classes['active']);
      } else {
        item.className = classes['sort__btn'];
      }
      return item;
    });
    if (id === 'sortByPrice') {
      dispatch(sortByPrice(id));
    }
    if (id === 'sortByDuration') {
      dispatch(sortByDuration(id));
    }
    if (id === 'sortByOverall') {
      dispatch(sortByOverall(id));
    }
    setSort(sortedArr);
  };

  return (
    <div className={classes.sort}>
      <ul className={classes['sort__list']}>
        {sort.map((item) => {
          return (
            <button key={item.id} className={item.className} onClick={() => sortTickets(item.id)}>
              {item.name}
            </button>
          );
        })}
      </ul>
    </div>
  );
};
