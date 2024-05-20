/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./TableProducts.css";
import { EditWindow } from "../../Window/EditWindow/EditWindow";
import { SaleService } from "../../../apiService/SaleService";
import { Ticket } from "../../base/Ticket/Ticket";

export const TableProducts = ({ productToSell, setProductToSell }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [saleData, setSaleData] = useState({});
  const [ticket, setticket] = useState({});
  const [showTicket, setshowTicket] = useState(false);

  useEffect(() => {
    console.log("el ticket " + ticket);
  }, [ticket]);

  const openEditWindow = (product) => {
    setSelectedProductId(product.id_producto);
  };

  const applyDiscount = (productId, newDesc, newType, newQuantity) => {
    setSaleData((prevSaleData) => ({
      ...prevSaleData,
      [productId]: {
        desc: newDesc,
        cantidad: newQuantity,
        tipo_de_pago: newType,
        id_producto: productId,
      },
    }));
    setSelectedProductId(null);
  };

  const sendDataSaleInfo = async () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalDiscount = 0;
    let paymentMethod = "";
    let firstProduct = 0;
    let idProducts = [];

    for (const productId in saleData) {
      const product = productToSell.find(
        (item) => item.id_producto === parseInt(productId)
      );

      if (!product) {
        console.error(`Product with id ${productId} not found in productToSell`);
        continue;
      }

      const { cantidad, desc } = saleData[productId];
      const productPrice = product.precio * cantidad;
      const discountedPrice = productPrice - (productPrice * desc) / 100;
      totalPrice += discountedPrice;
      totalQuantity += parseInt(cantidad);
      totalDiscount += parseInt(desc);
      firstProduct = productId;
      idProducts.push(productId);
    }

    const newSale = {
      id_producto: parseInt(firstProduct),
      lista_de_productos: idProducts,
      cantidad: parseInt(totalQuantity),
      descuento: parseInt(totalDiscount),
      tipo_de_pago: paymentMethod,
      precio_final: totalPrice.toFixed(2),
      horario_de_venta: new Date(),
    };

    try {
      const saleService = await new SaleService().createSale(newSale);
      setProductToSell([]);
      console.log("response" + saleService.ticket);
      setticket(saleService);
      setshowTicket(true);
    } catch (error) {
      console.error("Error al enviar la información de la venta:", error);
    }
  };

  return (
    <>
      {selectedProductId && (
        <EditWindow
          key={selectedProductId}
          productEdit={productToSell.find(
            (product) => product.id_producto === selectedProductId
          )}
          applyDiscount={applyDiscount}
        />
      )}

      {showTicket && (
        <Ticket
          ticketDate={ticket.horario_de_venta}
          ticketHour={ticket.horario_de_venta}
          ticketDesc={ticket.descuento}
          ticketFinalPrice={ticket.precio_final}
          ticketProducts={ticket.ticket}
          ticketQuantity={ticket.cantidad}
          setshowTicket={setshowTicket}
        />
      )}

      <div className="table-contain">
        <table className="table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre de producto</th>
              <th>Laboratorio</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Desc</th>
              <th>Tipo de pago</th>
              <th>Total</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {productToSell.map((product) => (
              <tr key={product.id_producto} className="body-sales">
                <td scope="row">{product.id_producto}</td>
                <td>{product.nombre_producto}</td>
                <td>{product.laboratorio}</td>
                <td>${product.precio}</td>
                <td>{saleData[product.id_producto]?.cantidad || 0}</td>
                <td>{saleData[product.id_producto]?.desc?.toFixed(2) || 0}</td>
                <td>{saleData[product.id_producto]?.tipo_de_pago || "efectivo"}</td>
                <td>
                  <p>
                    {saleData[product.id_producto]?.desc > 0
                      ? (
                          product.precio *
                          (1 - saleData[product.id_producto]?.desc / 100)
                        ).toFixed(2)
                      : product.precio.toFixed(2)}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => openEditWindow(product)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productToSell.length > 0 && (
          <div className="button-sendSale">
            <button onClick={sendDataSaleInfo} className="button-pay">
              Cobrar
            </button>
            <button
              className="button-empty"
              onClick={() => setProductToSell([])}
            >
              Vaciar lista
            </button>
          </div>
        )}
      </div>
    </>
  );
};
