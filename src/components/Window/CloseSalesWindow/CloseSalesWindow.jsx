/* eslint-disable react/prop-types */
import { useState } from "react";
import { SaleService } from "../../../apiService/SaleService";
import { TableSales } from "../../Tables/TableSales/TableSales";
import { ButtonClose, BackgroundTransparent } from "../../base";
import "./CloseSalesWindow.css";

export const CloseSalesWindow = ({ close }) => {
  const [closeSalesData, setCloseSalesData] = useState({
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  });
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCloseSalesData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSalesSubmit = async () => {
    const { fromDate, toDate, fromTime, toTime } = closeSalesData;

    // Verifica si las fechas y horas fueron proporcionadas
    if (!fromDate || !toDate || !fromTime || !toTime) {
      setError("Fecha u horario ingresado no proporcionados o invalidos");
      setSales([]); // Asegúrate de limpiar las ventas anteriores
      return;
    }

    const fromDateTime = new Date(fromDate + "T" + fromTime);
    const toDateTime = new Date(toDate + "T" + toTime);

    const requestData = {
      FromDate: fromDateTime,
      ToDate: toDateTime,
    };

    try {
      const sales = await new SaleService().getDaySales(requestData);
      if (sales.length === 0) {
        setError(null); // No hay error, pero no hay ventas
        setSales([]); // No hay ventas en el rango especificado
      } else {
        setError(null); // No hay error
        setSales(sales); // Hay ventas en el rango especificado
      }
    } catch (error) {
      setError("Ocurrió un error al obtener las ventas.");
      setSales([]); // Asegúrate de limpiar las ventas anteriores
    }
  };

  return (
    <>
      <BackgroundTransparent />
      <div className="window-close-sale d-flex flex-column gap-4 p-3">
        <h1>Cierre de ventas</h1>
        <div className="close-sales-info">
          <div className="inputs-date">
            <input type="date" name="fromDate" onChange={handleInputChange} />
            <p>Hasta</p>
            <input type="date" name="toDate" onChange={handleInputChange} />
          </div>
          <div className="inputs-hour">
            <input
              type="time"
              name="fromTime"
              placeholder="00:00"
              onChange={handleInputChange}
            />
            <p>Hasta</p>
            <input
              type="time"
              name="toTime"
              placeholder="23:59"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div onClick={handleCloseSalesSubmit} className="show-sales">
          <button>Mostrar</button>
        </div>

        {error ? (
          <div className="error-message">
            <h4>{error}</h4>
          </div>
        ) : sales.length > 0 ? (
          <TableSales salesToClose={sales} />
        ) : (
          <div className="no-sales">
            <h4>No existen ventas en el día/horario especificado</h4>
          </div>
        )}

        <ButtonClose close={close} />
      </div>
    </>
  );
};
