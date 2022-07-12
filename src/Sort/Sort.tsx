import './Sort.css';

export const Sort = () => {
  return (
    <div className="SortWrapper">
      <button className="sortBtn active">САМЫЙ ДЕШЕВЫЙ</button>
      <button className="sortBtn">САМЫЙ БЫСТРЫЙ</button>
      <button className="sortBtn">ОПТИМАЛЬНЫЙ</button>
    </div>
  );
};
