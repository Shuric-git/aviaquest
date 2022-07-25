import './Sort.css';
import { useState } from 'react';
import classNames from 'classnames/bind';

import { useAppDispatch } from '../hooks';
import { sortByPrice, sortByDuration } from '../features/actionCreators';
import { store } from '../index';

export const Sort = () => {
  const sortBtns = [
    {
      id: 'sortByPrice',
      className: 'sort__btn active',
      name: 'САМЫЙ ДЕШЁВЫЙ',
    },
    {
      id: 'sortByDuration',
      className: 'sort__btn',
      name: 'САМЫЙ БЫСТРЫЙ',
    },
    {
      id: 'sortByOverall',
      className: 'sort__btn',
      name: 'ОПТИМАЛЬНЫЙ',
    },
  ];

  const [sort, setSort] = useState(sortBtns);

  const dispatch = useAppDispatch();

  let btnClass = classNames({
    sort__btn: true,
    active: store.getState().sortReducer['id'],
  });

  const sortTickets = (id: string) => {
    let sortedArr = sort.map((item) => {
      if (item.id === id) {
        item.className = 'sort__btn active';
      } else {
        item.className = 'sort__btn';
      }
      return item;
    });
    if (id === 'sortByPrice') {
      dispatch(sortByPrice(id));
    }
    if (id === 'sortByDuration') {
      dispatch(sortByDuration(id));
    }
    setSort(sortedArr);
  };

  return (
    <div className="sort">
      <ul className="sort__list">
        {sort.map((item) => {
          return (
            <button key={item.id} className={btnClass} onClick={() => sortTickets(item.id)}>
              {item.name}
            </button>
          );
        })}
      </ul>
    </div>
  );
};
