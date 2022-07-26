import './Ticket.scss';

export const Ticket = () => {
  return (
    <div className="ticket">
      <div className="ticket__top">
        <span className="ticket__top__price">13 400 Р</span>
        <div className="ticket__top__logo"></div>
      </div>
      <div className="ticket__info">
        <div className="ticket__info__chunk">
          <span>MOW – HKT</span>
          <span>10:45 – 08:00</span>
        </div>
        <div className="ticket__info__chunk">
          <span>В ПУТИ</span>
          <span>21ч 15м</span>
        </div>
        <div className="ticket__info__chunk">
          <span>2 ПЕРЕСАДКИ</span>
          <span>HKG, JNB</span>
        </div>
        <div className="ticket__info__chunk">
          <span>MOW – HKT</span>
          <span>11:20 – 00:50</span>
        </div>
        <div className="ticket__info__chunk">
          <span>В ПУТИ</span>
          <span>13ч 30м</span>
        </div>
        <div className="ticket__info__chunk">
          <span>1 ПЕРЕСАДКА</span>
          <span>HKG</span>
        </div>
      </div>
    </div>
  );
};
