import './Sort.css';
import { useState } from 'react';

export const Sort = () => {
  const sortBtns = [
    {
      id: 1,
      className: 'sort__btn active',
      name: 'САМЫЙ ДЕШЁВЫЙ',
    },
    {
      id: 2,
      className: 'sort__btn',
      name: 'САМЫЙ БЫСТРЫЙ',
    },
    {
      id: 3,
      className: 'sort__btn',
      name: 'ОПТИМАЛЬНЫЙ',
    },
  ];

  const [sort, setSort] = useState(sortBtns);

  const sortTickets = (id: number) => {
    let sortedArr = sort.map((item) => {
      if (item.id === id) {
        item.className = 'sort__btn active';
      } else {
        item.className = 'sort__btn';
      }
      return item;
    });
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
      {/*<button className="sortBtn active">САМЫЙ ДЕШЕВЫЙ</button>*/}
      {/*<button className="sortBtn">САМЫЙ БЫСТРЫЙ</button>*/}
      {/*<button className="sortBtn">ОПТИМАЛЬНЫЙ</button>*/}
    </div>
  );
};
