/* eslint-disable react/prop-types */
import { simplificarFecha, simplificarHora } from "../../../helpers/helpers";
import "./Ticket.css";
export const Ticket = ({
  ticketQuantity,
  ticketDesc,
  ticketDate,
  ticketHour,
  ticketProducts,
  ticketFinalPrice,
  setshowTicket
}) => {
  return (
    <div
      className="l-col-right ticket-wrap"
      aria-label="A fake boat ticket demonstrating mixing font weights and widths"
    >
      <div className="ticket" aria-hidden="true">
        <div className="ticket__header">
          <div className="ticket__co">
            <svg
              className="ticket__co-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
            >
              <circle fill="#506072" cx="32" cy="32" r="32" />
              <path
                fill="#F4F5F6"
                d="M17.8 23.7c.5.2 1.1.1 1.4.2.6.1 1.3.1 1.8-.1.2-.1.5-.3.8-.5.3-.3.6-.6 1.1-1 .4-.4.9-.8 1.5-1.2.6-.4 1.3-.7 2.1-.8.4-.1.7-.1 1.1-.1h1c.7.1 1.4.3 2 .6 1.3.7 2.2 1.7 2.8 2.4.6.7 1.1 1.2 1.7 1.4.7.2 1.5.3 2.2.1.7-.2 1.4-.7 2.3-1.5.5-.4 1-.8 1.6-1.1.6-.3 1.2-.5 1.9-.6 1.2-.1 2.5.1 3.6.8 1 .7 1.7 1.6 2.5 2.3.8.7 1.8 1.2 2.9 1.2-.6 0-1.2-.1-1.8-.4-.5-.3-1-.6-1.5-1-1-.7-2-1.7-3.2-1.9-.6-.1-1.2-.1-1.7 0-.6.1-1.1.3-1.5.6-.8.5-1.3 1.6-2.4 2.8-.6.6-1.3 1.1-2.2 1.4-.9.3-1.7.3-2.6.1-1.1-.2-2-.7-2.7-1.3-.7-.6-1.1-1.1-1.5-1.5-.8-.8-1.3-1.1-1.8-1.2-.5-.1-.8-.1-.9 0-.1 0 0 .1.3.1-.2 0-.4 0-.6.1-.2.1-.3.1-.5.3-.3.2-.4.5-.6.6-.3.2-.6.5-.8.7-.4.3-.7.6-1.2 1-1 .7-2.4 1.3-3.6 1.4-.2.1-.5.1-.9.2h-.9c-.8-.2-1.6-.6-2.2-1.1-.6-.5-1-1.1-1.4-1.6-.7-1.1-1.4-2.1-2.8-2.4.3 0 .5-.1.5-.1l-.6-.3c-.5-.3-.7-.3-1-.4.2-.1.4-.1.7-.1h.8c.5 0 1.1.2 1.7.4 1 .4 1.9 1.2 2.6 1.5z"
              />
              <g opacity=".85" fill="#F4F5F6">
                <path d="M48.9 40.3l-.3-.3c0 .1.1.1.1.2s.1.1.2.1zM48.3 39.7l-.1-.1h-.1zM47.6 39.1l.3.3c0-.1-.1-.2-.3-.3zM48 39.6s.1-.1 0 0l.1-.1-.2-.1c.1.1.1.2.1.2zM48 39.6v.2c.1 0 .1-.1 0-.2zM47.1 40.3c-.1 0 .1-.2 0-.3-.3-.2-.6-.3-.9-.4-.1 0-.1-.4-.3-.4-.4-.1-1.2.1-.8.2.6.2 1 .4 1.6.8.5.3 1 .6 1.6 1 .1.1.3.2.4.4-.2-.2-.3-.4-.5-.6-.1-.4-.7-.4-1.1-.7zM51.6 41.8c-.1 0-.2.1-.2.1-.3-.3-.7-.2-1-.3l.1.2c.2.1.3 0 .1-.1.3.3.8.4 1.2.4-.1-.2-.1-.3-.2-.3zM52 42h-.2.2z" />
                <path d="M46 38.4c-1-.5-2.1-.5-3.1-.4-.1.1-.1.2-.2.1h-.3l-.4.1-.1.1c-.1.1 0 .1 0 .1h0-.2c-.1.1-.2.2-.4.2.1-.1.2-.2.4-.2l.2-.2.1-.1c-.3.1-.6.3-.9.5-.1 0-.1.1-.2.1-.2.2-.3.4-.5.4l-.1.1h-.1l-.6.5c-.1.2-.1.3-.2.5h-.2c0 .1 0 .2-.1.3.2 0 .3 0 .4-.1.2 0 0-.5.4-.4-.3-.1-.2.4-.4.4-.1 0-.3 0-.4.1-.1.3-.4.5-.6.5.2-.3.4-.3.7-.3.1-.1.1-.2.1-.3h.2c.1-.1.2-.3.2-.5-.4.3-.7.6-1.1.9-.6.4-1.3.6-2 .7-.7.1-1.4 0-2-.3-.6-.2-1.2-.7-1.7-1.2s-1.1-1.2-1.8-1.8c-.8-.6-1.9-1-2.9-1.1-1-.1-2.1.1-3.1.5-.9.5-1.6 1.2-2.2 1.7-.6.5-1.1.9-1.6 1.1-.5.2-1.2.2-1.7.1-.6-.2-1-.5-1.3-1-.3-.4-.8-1-1.7-1.8-.5-.4-1-.8-1.5-1-.6-.3-1.1-.4-1.6-.5-.6 0-1 .2-1.2.4-.3.2-.3.4-.3.6 0 .4.3.8.3.8.5.6.8.8 1.2 1 .4.3.9.6 1.4 1.6-.4-.6-.1-.6.4-.2.5.4 1.1 1.2 1.6 2 .4.6 1.1 1.1 1.9 1.3.8.2 1.6.2 2.5 0 .9-.2 1.7-.6 2.4-1.1.7-.5 1.2-1 1.7-1.4.5-.4.8-.8 1.2-1 .5-.2 1-.2 1.6-.2.6.1 1 .2 1.5.5.5.4 1.1 1 2.1 1.8.4.4 1 .7 1.7 1 .6.3 1.3.4 2 .5 1.4.1 2.7-.5 3.6-1.2.7-.5 1.4-.9 1.8-1.3.6-.6 1-1.1 1.3-1.5-.5.4-.7.8-1.3 1.4-.4.4 0-.6.2-.9.1-.2.5-.1.5-.2.2-.2.3-.5.6-.7.1-.1.2.2.3.1l.4-.4c.1-.2.3-.3.4-.2.2 0 .4 0 .6.1h.4l.2-.1c-.1-.1-.1-.2-.1-.3.1 0 .3.1.4.1-.1 0-.3-.1-.4-.1 0 .1 0 .2.1.3.6-.2 1.3-.1 2 .1-.4-.2-.7-.3-1-.6.2.1.1.2-.1.2l-.4-.4c.4 0 .8 0 1 .4h.3c.1.1 0 .2 0 .3.1 0 .1.1.2.1-.1-.2-.5-.6-.5-.6z" />
                <path d="M41.7 38.5c.1 0 .1-.1.2-.1-.3.1-.5.2-.7.4.2 0 .3-.2.5-.3z" />
              </g>
              <path
                fill="#F4F5F6"
                d="M12 28.7c.4.2 1 .3 1.8.6.7.3 1.5.9 2 1.5.6.6 1 1.2 1.5 1.7s.9.8 1.3 1c.6.3 1.2.3 1.6.4.4 0-.5.1-1.6-.4-.5-.2-1-.5-1.5-1 .5.8 1.2 1.4 1.9 1.7.5.1 1 .1 1.5.1 1.2 0 2.3-.6 3.1-1.4.8-.7 1.6-1.6 2.5-1.9.3-.1.9-.3 1.5-.3s1.1.1 1.4.2c-.7-.2-1.4-.2-2.1-.1-.7.1-1.3.5-1.9 1-.6.5-1.1 1.1-1.8 1.7-.7.5-1.6.9-2.5 1h.3c.9-.1 1.9-.6 2.6-1.2.7-.6 1.3-1.2 1.9-1.6.2-.1.4-.3.7-.4-.2.1-.4.2-.7.4-.5.4-1 1-1.6 1.6-.4.4-1 .7-1.5 1-.4.2-.9.2-1.4.3-.3.1-.6.1-.8.1h-.3c.2.1.8.3 1.6.2.9-.1 1.9-.6 2.7-1.3.8-.6 1.4-1.1 1.9-1.4.5-.2.8-.3 1-.3.5-.2 1.2-.6 1.9-.4.2.1.4.2.6.2h.3c.5.2.7.8 1.2 1 .1.1.2.5.3.9.1.4.2.7.3.7.7-.3.1-.1 1 .6.1.1.6 0 .8.2.7.5 1.1.4 2 .4.3 0 .6 0 .9-.1h.6c.2 0 .4-.1.6-.1.2-.1.4-.2.7-.5.1-.1.5-.3.8-.7.3-.3.6-.7.6-.7 1-.8 1.2-1.7 2.2-1.7.3-.4.8-.6 1.4-.7.6 0 1.1.1 1.6.2 1 .2 1.1.7 1.5 1.5.2.2.3.3.4.5 0 .2.5.3.7.6l-.2.1c.1.1.2.3.3.3.1.1 0 .1-.1.1-.1.1-.3.1-.2.3.3.4.8.9 1.3 1.2.6.2 1.3.3 1.9.3.1-.1.1-.2.2-.2.2 0 .3 0 .5-.1.1-.2.1-.4.2-.5.1-.5.6-1 .5-1.5 0-.2-.7-.2-.9-.5 0-.1.1-.2.2-.4-.3-.1-.3-.3-.1-.4-.1 0-.1-.1-.1-.1 0-.1.1-.2.1-.2-.5-.4-.6-1-1.5-1.6-.2-.1-.5-.3-.8-.4-.1-.1-.3-.4-.4-.5-.3 0-.4.2-.6.3-.1-.2-.4-.4-.7-.6-.3-.2-.6-.4-1-.6-.7-.3-1.2-.2-1.3.1-.8-.1-.9.2-1.7.3-.5.1-1.1.2-1.7.5-.6.3-1.1.7-1.5 1.1L38.7 32l-.4.4c-.7.6-1.3.9-2.1.9s-1.5-.1-2-.5c-.6-.3-1.1-.9-1.8-1.6-.7-.7-1.7-1.4-2.9-1.7-1.2-.2-2.4-.1-3.5.4s-1.9 1.3-2.6 2c-.7.7-1.4 1.3-2.2 1.4-.8.2-1.7.1-2.3-.1-1.3-.5-2-1.9-3-2.9-.5-.5-1.1-1-1.7-1.2-.3-.1-.5-.2-.8-.3-.2-.1-.4-.1-.6-.1H12z"
                opacity=".8"
              />
            </svg>
            <span className="ticket__co-name">PharmaPay</span>
            <span className="u-upper ticket__co-subname">
              Informacion sobre tu compra
            </span>
          </div>
        </div>
        <div className="ticket__body">
          <p className="ticket__route">Ticket</p>
          <div className="ticket__timing">
            <p>
              <span className="u-upper ticket__small-label">Fecha</span>
              <span className="ticket__detail">
                {simplificarFecha(ticketDate)}
              </span>
            </p>
            <p>
              <span className="u-upper ticket__small-label">Horario</span>
              <span className="ticket__detail">
                {simplificarHora(ticketHour)}
              </span>
            </p>
          </div>
          <p className="ticket__fine-print">Informacion de compra </p>
          <div className="info-ticket">
            <p>{ticketQuantity} productos en esta compra</p>
            <div className="t-desc">
              <p>Descuentos</p>
              <p>{ticketDesc}%</p>
            </div>
            <div className="ticket-productos">
              {ticketProducts &&
                ticketProducts.map((ticketP, index) => (
                  <>
                    <div key={index} className="t-card">
                      <p>{index}</p>
                      <p>{ticketP.nombre_producto} ${ticketP.precio}</p>
                    </div>
                  </>
                ))}
            </div>
            <p>Precio final {ticketFinalPrice}</p>
          </div>
          <img
            className="ticket__barcode"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png"
            alt="Fake barcode"
          />
       
        </div>
        <span onClick={() => {setshowTicket(false)}} className="close-ticket">Cerrar ticket</span>
      </div>
    </div>
  );
};
