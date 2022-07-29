import React, { FC } from 'react';
import add from 'date-fns/add';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';

import { ITicket } from '../interface';
import classes from '../TicketsList/TicketsList.module.scss';

export const Ticket: FC<{ showedTicketsLimit: number; showedTickets: ITicket[] }> = ({
  showedTicketsLimit,
  showedTickets,
}) => {
  const timeBeautyfier = (time: number): string => {
    const proxy = time.toString().split('');
    if (proxy.length < 2) {
      proxy.splice(0, 0, '0');
    }
    return proxy.join('');
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

  enum stopsCounter {
    'БЕЗ ПЕРЕСАДОК' = 0,
    '1 ПЕРЕСАДКА' = 1,
    '2 ПЕРЕСАДКИ' = 2,
    '3 ПЕРЕСАДКИ' = 3,
  }

  return (
    <>
      {limiter(showedTicketsLimit).map((item: ITicket) => {
        const _TO = item.segments[0];
        const _FROM = item.segments[1];

        let _TOTime = new Date(_TO.date);
        let _TODestinationTime = new Date(add(_TOTime, { minutes: _TO.duration }));
        const _TOStartHour = timeBeautyfier(getHours(_TOTime));
        const _TOStartMinutes = timeBeautyfier(getMinutes(_TOTime));
        const _TODestinationHour = timeBeautyfier(getHours(_TODestinationTime));
        const _TODestinationMinutes = timeBeautyfier(getMinutes(_TODestinationTime));

        let _FROMTime = new Date(_FROM.date);
        let _FROMDestinationTime = new Date(add(_FROMTime, { minutes: _FROM.duration }));
        const _FROMStartHour = timeBeautyfier(getHours(_FROMTime));
        const _FROMStartMinutes = timeBeautyfier(getMinutes(_FROMTime));
        const _FROMDestinationHour = timeBeautyfier(getHours(_FROMDestinationTime));
        const _FROMDestinationMinutes = timeBeautyfier(getMinutes(_FROMDestinationTime));

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
                <span>{stopsCounter[_TO.stops.length]}</span>
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
                <span>{stopsCounter[_FROM.stops.length]}</span>
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
      })}
    </>
  );
};
