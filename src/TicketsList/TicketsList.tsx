import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTickets, sortByPrice } from "../features/actionCreators";
import './TicketsList.css';
import { ticketsSlice } from '../features/ticketsReducer';
import { ITicket } from '../interface';

const testObj = {
  sortByPrice: true,
  sortByDuration: false,
  sortByOverall: false,
};

for (let key in testObj) {
  testObj[key] = true;
  if (key === 'sortByPrice') {
    testObj[key] = false;
  }
  console.log(testObj[key]);
}

export const TicketsList = () => {
  const { showedTickets, sort } = useAppSelector((state) => state.ticketsReducer);
  useEffect(() => {
    dispatch(fetchTickets());
  }, []);
  useEffect(() => {
    if (sort.sortByPrice) {
      dispatch(ticketsSortByPrice());
    }
    if (sort.sortByDuration) {
      dispatch(ticketsSortByDuration());
    }
  });
  const { shiftTickets, ticketsSortByPrice, ticketsSortByDuration } = ticketsSlice.actions;
  const dispatch = useAppDispatch();

  const showMoreHandler = () => {
    dispatch(shiftTickets());
  };

  function getTimeFromMins(mins: number) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  function priceBeautyfier(price: number) {
    let priceArr = Array.from(price.toString());
    priceArr.splice(priceArr.length - 3, 0, ' ');
    return priceArr.join('');
  }

  function stopsCounter(stops: number) {
    switch (stops) {
      case 0:
        return 'БЕЗ ПЕРЕСАДОК';
      case 1:
        return '1 ПЕРЕСАДКА';
      case 2:
        return '2 ПЕРЕСАДКИ';
      case 3:
        return '3 ПЕРЕСАДКИ';
      default:
        return 'БЕЗ ПЕРЕСАДОК';
    }
  }

  const antIcon = <LoadingOutlined className="spinner" spin />;

  const ticketsUI = showedTickets.map((item: ITicket) => {
    const _TO = item.segments[0];
    const _FROM = item.segments[1];
    const _TOStartHour = new Date(_TO.date).getHours();
    const _TOStartMinutes = new Date(_TO.date).getMinutes();
    let _TOTime = new Date(_TO.date),
      _TODestinationTime = new Date(+_TOTime + _TO.duration * 6e4);
    const _TODestinationHour = new Date(_TODestinationTime).getHours();
    const _TODestinationMinutes = new Date(_TODestinationTime).getMinutes();

    const _FROMStartHour = new Date(_FROM.date).getHours();
    const _FROMStartMinutes = new Date(_FROM.date).getMinutes();
    let _FROMTime = new Date(_FROM.date),
      _FROMDestinationTime = new Date(+_FROMTime + _FROM.duration * 6e4);
    const _FROMDestinationHour = new Date(_FROMDestinationTime).getHours();
    const _FROMDestinationMinutes = new Date(_FROMDestinationTime).getMinutes();

    return (
      <div key={Date.now() + Math.random() * 1000000} className="ticket">
        <div className="ticket__top">
          <span className="ticket__top__price">{`${priceBeautyfier(item.price)} Р`}</span>
          <div className="ticket__top__logo"></div>
        </div>
        <div className="ticket__info">
          <div className="ticket__info__chunk">
            <span>{`${_TO.origin} - ${_TO.destination}`}</span>
            <span>{`${_TOStartHour}:${_TOStartMinutes} - ${_TODestinationHour}:${_TODestinationMinutes}`}</span>
          </div>
          <div className="ticket__info__chunk">
            <span>В ПУТИ</span>
            <span>{getTimeFromMins(_TO.duration)}</span>
          </div>
          <div className="ticket__info__chunk">
            <span>{stopsCounter(_TO.stops.length)}</span>
            <span>
              {_TO.stops.map((item, index) => {
                if (index !== _TO.stops.length - 1) {
                  return `${item}, `;
                }
                return item;
              })}
            </span>
          </div>
          <div className="ticket__info__chunk">
            <span>{`${_FROM.origin} - ${_FROM.destination}`}</span>
            <span>{`${_FROMStartHour}:${_FROMStartMinutes} - ${_FROMDestinationHour}:${_FROMDestinationMinutes}`}</span>
          </div>
          <div className="ticket__info__chunk">
            <span>В ПУТИ</span>
            <span>{getTimeFromMins(_FROM.duration)}</span>
          </div>
          <div className="ticket__info__chunk">
            <span>{stopsCounter(_FROM.stops.length)}</span>
            <span>
              {_FROM.stops.map((item, index) => {
                if (index !== _FROM.stops.length - 1) {
                  return `${item}, `;
                }
                return item;
              })}
            </span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="TicketsList">
        {showedTickets.length ? ticketsUI : <Spin indicator={antIcon} />}
        <button className="showMore" onClick={showMoreHandler}>
          Показать еще 5 билетов!
        </button>
      </div>
    </>
  );
};
