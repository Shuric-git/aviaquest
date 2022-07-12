import './Filter.css';

export const Filter = () => {
  return (
    <>
      <div className="filter">
        <span className="filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <label htmlFor="transfer-all">
          <input id="transfer-all" type="checkbox" />
          <span>Все</span>
        </label>
        <label htmlFor="transfer-without checked">
          <input id="transfer-without" type="checkbox" />
          <span>Без пересадок</span>
        </label>
        <label htmlFor="transfer-1">
          <input id="transfer-1" type="checkbox" />
          <span>1 пересадка</span>
        </label>
        <label htmlFor="transfer-2">
          <input id="transfer-2" type="checkbox" />
          <span>2 пересадки</span>
        </label>
        <label htmlFor="transfer-3">
          <input id="transfer-3" type="checkbox" />
          <span>3 пересадки</span>
        </label>
      </div>
    </>
  );
};
