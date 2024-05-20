/* eslint-disable react/prop-types */
import "./TableSales.css";

export const TableSales = ({ salesToClose, errorMessage }) => {
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
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Desc</th>
            <th>Tipo de pago</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesToClose.map((sale, index) => (
            <tr key={index} className="body-sales">
              <td scope="row">{sale.id_producto}</td>
              <td>{sale.cantidad}</td>
              <td>{sale.descuento}%</td>
              <td>{sale.tipo_de_pago || "efectivo"}</td>
              <td>${sale.precio_final}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
