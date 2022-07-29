import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import cx from 'classnames';

import { store } from '../index';
import { Ticket } from '../Ticket/Ticket';
import { useAppDispatch, useAppSelector } from '../hooks';
import { filterTickets } from '../features/filterSortReducer';
import { ticketsSlice } from '../features/ticketsReducer';
import { ticketsAPI } from '../ticketsDB/ticketsDB';

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
    dispatch(filterTickets());
  }, [loadedTickets]);
  const dispatch = useAppDispatch();

  const showMoreHandler = () => {
    setShoewdTicketsLimit((prevState) => prevState + 5);
    dispatch(filterTickets());
  };

  const fetchIcon = (
    <LoadingOutlined className={cx(classes['ant-spin-spinning'], classes['ant-spin'], classes['anticon'])} spin />
  );

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
        {showedTickets.length ? <Ticket showedTicketsLimit={showedTicketsLimit} showedTickets={showedTickets} /> : null}
        <button className={classes.showMore} onClick={showMoreHandler}>
          Показать еще 5 билетов!
        </button>
      </div>
    </>
  );
};
