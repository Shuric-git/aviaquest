import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { store } from '../index';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTickets, func } from '../features/actionCreators';
import './TicketsList.css';
import { ticketsSlice } from '../features/ticketsReducer';
import { ITicket } from '../interface';

export const TicketsList = () => {
  const { loadedTickets, showedTickets, sort } = useAppSelector((state) => state.ticketsReducer);
  const [showedTicketsLimit, setShoewdTicketsLimit] = useState<number>(5);
  const { ticketsSortByPrice, ticketsSortByDuration } = ticketsSlice.actions;
  const [searchId, setSearchId] = useState('');
  // async function db() {
  // console.log(ticketsAPI.useFetchSearchIdQuery(''));
  // const { data: ticketsData } = ticketsAPI.useFetchSearchIdQuery('');
  // const { data: ticketsData } = await ticketsAPI.useFetchAllTicketsQuery(idFetching ? skipToken : fetchedId.searchId);
  // console.log(ticketsData);
  // return ticketsData ? loadTickets(ticketsData) : null;
  // }

  // export const fetchTickets = () => async (dispatch: AppDispatch) => {
  //   try {
  //     dispatch(ticketsSlice.actions.ticketsFetching());
  //     const response = await axios.get(`${TICKETS_URL}?searchId=${await getSearchId()}`);
  //     dispatch(ticketsSlice.actions.ticketsFetchingSuccess(response.data.tickets));
  //     dispatch(ticketsSlice.actions.pushTickets());
  //   } catch (e: any) {
  //     dispatch(ticketsSlice.actions.ticketsFetchingSuccess(e.message));
  //   }
  // };
  // const memoizedValue = useMemo(() => getSearchId().then((item) => item), []);
  // console.log(memoizedValue);
  useEffect(() => {
    // getSearchId().then((item) => setSearchId(item));
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((res) => {
        // console.log('res:', res);
        setSearchId(res.searchId);
      });
  }, []);
  useEffect(() => {
    // console.log(searchId);
    searchId && dispatch(fetchTickets(searchId));
    //   const timerId = setInterval(() => {
    //     dispatch(fetchTickets(searchId));
    //     if (store.getState().ticketsReducer.stopFetching()) {
    //       clearInterval(timerId);
    //     }
    //   }, 300);
    //   return () => {
    //     clearInterval(timerId);
    //   };
  }, [searchId]);
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
  console.log(store.getState().ticketsReducer);
  const showMoreHandler = () => {
    setShoewdTicketsLimit((prevState) => prevState + 5);
    dispatch(func());
  };
  // console.log(store.getState().ticketsReducer);
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

  const antIcon = <LoadingOutlined className="spinner" spin />;

  const ticketsUI = limiter(showedTicketsLimit).map((item: ITicket) => {
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
