import './Sort.css';
import { useState } from 'react';

import { useAppDispatch } from '../hooks';
// import { ticketsSlice } from '../features/ticketsReducer';
import { sortByPrice, sortByDuration } from '../features/actionCreators';

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

  // const { sortPrice, sortDuration } = ticketsSlice.actions;
  const dispatch = useAppDispatch();

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
      console.log(id);
      dispatch(sortByPrice(id));
    }
    if (id === 'sortByDuration') {
      console.log(id);
      dispatch(sortByDuration(id));
    }
    setSort(sortedArr);
  };

  return (
    <div className="sort">
      <ul className="sort__list">
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
