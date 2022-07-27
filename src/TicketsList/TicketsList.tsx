import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import cx from 'classnames';

import { store } from '../index';
import { useAppDispatch, useAppSelector } from '../hooks';
import { func } from '../features/actionCreators';
import { ticketsSlice } from '../features/ticketsReducer';
import { ITicket } from '../interface';
import { ticketsAPI } from '../ticketsDB/ticketsDB';

// @ts-ignore
import classes from './TicketsList.module.scss';

export const TicketsList = () => {
  const { loadedTickets, showedTickets } = useAppSelector((state) => state.ticketsReducer);
  const { sort } = useAppSelector((state) => state.sortReducer);
  const [showedTicketsLimit, setShoewdTicketsLimit] = useState<number>(5);
  const { ticketsSortByPrice, ticketsSortByDuration, loadTickets, stopFetching } = ticketsSlice.actions;
  const { data: ticketsData } = ticketsAPI.useFetchAllTicketsQuery(
    store.getState().ticketsReducer.searchIdStore ? store.getState().ticketsReducer.searchIdStore : skipToken,
    { pollingInterval: !store.getState().ticketsReducer.stopFetching ? 3000 : 0 }
  );

  useEffect(() => {
    ticketsData && dispatch(loadTickets(ticketsData));
    ticketsData && ticketsData.stop && dispatch(stopFetching());
  }, [ticketsData]);
  useEffect(() => {
    if (sort.sortByPrice) {
      dispatch(ticketsSortByPrice());
    }
    if (sort.sortByDuration) {
      dispatch(ticketsSortByDuration());
    }
  }, [showedTickets]);
  useEffect(() => {
    dispatch(func());
  }, [loadedTickets]);
  const dispatch = useAppDispatch();

  const showMoreHandler = () => {
    setShoewdTicketsLimit((prevState) => prevState + 5);
    dispatch(func());
  };

  const limiter = (showedTicketsLimit: number) => {
    const limitedTickets = [...showedTickets];
    limitedTickets.length = showedTicketsLimit;
    return limitedTickets;
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

  const fetchIcon = (
    <LoadingOutlined className={cx(classes['ant-spin-spinning'], classes['ant-spin'], classes['anticon'])} spin />
  );

  const timeBeautyfier = (time: number): string => {
    const proxy = time.toString().split('');
    if (proxy.length < 2) {
      proxy.splice(0, 0, '0');
    }
    return proxy.join('');
  };

  const ticketsUI = limiter(showedTicketsLimit).map((item: ITicket) => {
    const _TO = item.segments[0];
    const _FROM = item.segments[1];
    const _TOStartHour = timeBeautyfier(new Date(_TO.date).getHours());
    const _TOStartMinutes = timeBeautyfier(new Date(_TO.date).getMinutes());
    let _TOTime = new Date(_TO.date),
      _TODestinationTime = new Date(+_TOTime + _TO.duration * 6e4);
    const _TODestinationHour = timeBeautyfier(new Date(_TODestinationTime).getHours());
    const _TODestinationMinutes = timeBeautyfier(new Date(_TODestinationTime).getMinutes());

    const _FROMStartHour = timeBeautyfier(new Date(_FROM.date).getHours());
    const _FROMStartMinutes = timeBeautyfier(new Date(_FROM.date).getMinutes());
    let _FROMTime = new Date(_FROM.date),
      _FROMDestinationTime = new Date(+_FROMTime + _FROM.duration * 6e4);
    const _FROMDestinationHour = timeBeautyfier(new Date(_FROMDestinationTime).getHours());
    const _FROMDestinationMinutes = timeBeautyfier(new Date(_FROMDestinationTime).getMinutes());

    return (
      <div key={Date.now() + Math.random() * 1000000} className={classes.ticket}>
        <div className={classes['ticket__top']}>
          <span className={classes['ticket__top__price']}>{`${priceBeautyfier(item.price)} Р`}</span>
          <img src={`//pics.avs.io/99/36/${item.carrier}.png`} className={classes['ticket__top__logo']}></img>
        </div>
        <div className={classes['ticket__info']}>
          <div className={classes['ticket__info__chunk']}>
            <span>{`${_TO.origin} - ${_TO.destination}`}</span>
            <span>{`${_TOStartHour}:${_TOStartMinutes} - ${_TODestinationHour}:${_TODestinationMinutes}`}</span>
          </div>
          <div className={classes['ticket__info__chunk']}>
            <span>В ПУТИ</span>
            <span>{getTimeFromMins(_TO.duration)}</span>
          </div>
          <div className={classes['ticket__info__chunk']}>
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
          <div className={classes['ticket__info__chunk']}>
            <span>{`${_FROM.origin} - ${_FROM.destination}`}</span>
            <span>{`${_FROMStartHour}:${_FROMStartMinutes} - ${_FROMDestinationHour}:${_FROMDestinationMinutes}`}</span>
          </div>
          <div className={classes['ticket__info__chunk']}>
            <span>В ПУТИ</span>
            <span>{getTimeFromMins(_FROM.duration)}</span>
          </div>
          <div className={classes['ticket__info__chunk']}>
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
      <div className={classes.TicketsList}>
        {!store.getState().ticketsReducer.stopFetching && (
          <div className={classes['spinner-wrapper']}>
            <Spin indicator={fetchIcon} />
            <span> Подгружаем билеты</span>
          </div>
        )}
        {!store.getState().checkboxesReducer.checkboxes.includes(true) && (
          <span className={classes['filter-warning']}>Рейсов, подходящих под заданные фильтры, не найдено</span>
        )}
        {showedTickets.length ? ticketsUI : null}
        <button className={classes.showMore} onClick={showMoreHandler}>
          Показать еще 5 билетов!
        </button>
      </div>
    </>
  );
};
