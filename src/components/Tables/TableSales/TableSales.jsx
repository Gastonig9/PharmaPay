/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { SaleService } from "../../../apiService/SaleService";
import "./TableSales.css";

export const TableSales = ({ salesToClose, errorMessage }) => {
  const sendCloseDate = async () => {
    try {
      const sendSales = await new SaleService().createCloseSale(salesToClose)
      console.log(sendSales)
    } catch (error) {
       toast.error(error)
    }
  }
  if (!Array.isArray(salesToClose)) {
    return (
      <div className="error-message">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-sales-contain">
      <table className="table">
        <thead>
          <tr>
            <th>Codigo de venta</th>
            <th>Cantidad</th>
            <th>Desc</th>
            <th>Tipo de pago</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesToClose.map((sale, index) => (
            <tr key={index} className="body-sales">
              <td scope="row">{sale.id}</td>
              <td>{sale.cantidad}</td>
              <td>{sale.descuento}%</td>
              <td>{sale.tipo_de_pago || "efectivo"}</td>
              <td>${sale.precio_final}</td>
            </tr>
          ))}
        </tbody>
       
      </table>
      <div onClick={sendCloseDate} className="table-close-sales-button">
          <button>Cerrar ventas</button>
        </div>
    </div>
  );
};
