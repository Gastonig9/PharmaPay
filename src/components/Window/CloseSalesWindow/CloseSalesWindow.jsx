/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDate } from "../../../helpers/helpers";
import { SaleService } from "../../../apiService/SaleService";
import { TableSales } from "../../Tables/TableSales/TableSales";
import { ButtonClose, BackgroundTransparent } from "../../base";
import "./CloseSalesWindow.css";

export const CloseSalesWindow = ({ close }) => {
  const [closeSalesData, setCloseSalesData] = useState({
    fromDate: null,
    toDate: null,
    fromTime: "",
    toTime: "",
  });
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  const handleInputDateChange = (e) => {
    const { name, value } = e.target;
    setCloseSalesData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSalesSubmit = async () => {
    const { fromDate, toDate, fromTime, toTime } = closeSalesData;

    const requestData = {
      FromDate: formatDate(fromDate),
      ToDate: formatDate(toDate),
      FromTime: fromTime,
      ToTime: toTime,
    };

    const sales = await new SaleService().getSales(requestData);
    if(sales.message) setError(sales.message);
    setSales(sales);
  };

  return (
    <>
      <BackgroundTransparent />
      <div className="window-close-sale d-flex flex-column gap-4 p-3">
        <h1>Cierre de ventas</h1>
        <div className="close-sales-info">
          <div className="inputs-date">
            <input
              type="date"
              name="fromDate"
              onChange={handleInputDateChange}
            />
            <p>Hasta</p>
            <input type="date" name="toDate" onChange={handleInputDateChange} />
          </div>
          <div className="inputs-hour">
            <input
              type="text"
              name="fromTime"
              placeholder="12:00"
              onChange={handleInputDateChange}
            />
            <p>Hasta</p>
            <input
              type="text"
              name="toTime"
              placeholder="20:00"
              onChange={handleInputDateChange}
            />
          </div>
        </div>
        <div onClick={handleCloseSalesSubmit} className="show-sales">
          <button>Mostrar</button>
        </div>
        <TableSales salesToClose={sales} errorMessage={error} />

        <ButtonClose close={close}/>
      </div>
    </>
  );
};
