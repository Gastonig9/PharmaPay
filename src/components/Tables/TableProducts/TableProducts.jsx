/* eslint-disable react/prop-types */
import { useState } from "react";
import "./TableProducts.css";
import { EditWindow } from "../../Window/EditWindow/EditWindow";
import { SaleService } from "../../../apiService/SaleService";
import { Ticket } from "../../base/Ticket/Ticket";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const TableProducts = ({ productToSell, setProductToSell }) => {
  const { t } = useTranslation();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ticket, setticket] = useState({});
  const [showTicket, setshowTicket] = useState(false);

  const openEditWindow = (product) => {
    setSelectedProductId(product.id);
  };

  const applyDiscount = (productId, newDesc, newType, newQuantity) => {
    const updatedProducts = productToSell.map((product) => {
      if (product.id === productId) {
        const updatedProduct = {
          ...product,
          descuento: newDesc,
          tipo_de_pago: newType,
          cantidad: parseInt(newQuantity),
        };
        return updatedProduct;
      }
      return product;
    });

    setProductToSell(updatedProducts);
    setSelectedProductId(null);
  };

  const sendDataSaleInfo = async () => {
    let finalDiscount = 0;
    let finalQuantity = 0;
    let finalPrice = 0;
    let insufficientStock = false;
    let finalPayment = "";

    productToSell.forEach((product) => {
      if (!product.descuento) product.descuento = 0;
      if (!product.cantidad) product.cantidad = 1;
      finalDiscount += product.descuento;
      finalQuantity += product.cantidad;
      finalPrice +=
        product.precio * product.cantidad -
        (product.precio * product.cantidad * product.descuento) / 100;

        finalPayment = product.tipo_de_pago || "efectivo";
      if(product.stock < product.cantidad){
        insufficientStock = true
      } 
    });

    if(insufficientStock) {
      toast.error("Hay uno o mas productos sin stock suficiente en relacion a la cantidad ingresada")
      return;
    }

    const newSale = {
      cantidad: finalQuantity,
      tipo_de_pago: finalPayment,
      Ticket: productToSell,
      descuento: finalDiscount,
      precio_final: finalPrice,
      horario_de_venta: new Date(),
    };
    const response = await toast.promise(
      new SaleService().createSale(newSale),
      {
        loading: "Espere un momento...",
        success: "Venta creada correctamente",
        error: (err) => `Ocurrió un error: ${err}`,
      }
    );

    setticket(response);
    setshowTicket(true);
    setProductToSell([]);
  };

  return (
    <>
      {selectedProductId && (
        <EditWindow
          key={selectedProductId}
          productEdit={productToSell.find(
            (product) => product.id === selectedProductId
          )}
          applyDiscount={applyDiscount}
          setSelectedProductId={setSelectedProductId}
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
              <th>{t("TableProducts.code")}</th>
              <th>{t("TableProducts.product_name")}</th>
              <th>{t("TableProducts.laboratory")}</th>
              <th>{t("TableProducts.price")}</th>
              <th>{t("TableProducts.quantity")}</th>
              <th>{t("TableProducts.discount")}</th>
              <th>{t("TableProducts.payment_type")}</th>
              <th>Stock</th>
              <th>{t("TableProducts.total")}</th>
              <th>{t("TableProducts.edit")}</th>
            </tr>
          </thead>
          <tbody>
            {productToSell.map((product) => (
              <tr key={product.id} className="body-sales">
                <td scope="row">{product.id}</td>
                <td>{product.nombre_producto}</td>
                <td>{product.laboratorio}</td>
                <td>${product.precio}</td>
                <td>{product.cantidad || 1}</td>
                <td>{product.descuento || 0}%</td>
                <td>{product.tipo_de_pago || "efectivo"}</td>
                <td>{product.stock}</td>
                <td>
                  <p>
                    {product.descuento > 0
                      ? `$${
                          (product.precio * product.cantidad).toFixed(2) -
                          (
                            (product.precio *
                              product.cantidad *
                              product.descuento) /
                            100
                          ).toFixed(2)
                        }`
                      : product.cantidad
                      ? `$${(product.precio * product.cantidad).toFixed(2)}`
                      : `$${product.precio}`}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => openEditWindow(product)}
                    className="btn-edit"
                  >
                    {t("TableProducts.edit")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productToSell && productToSell.length > 0 && (
          <div className="button-sendSale">
            <button onClick={sendDataSaleInfo} className="button-pay">
              {t("TableProducts.send_sale")}
            </button>
            <button
              className="button-empty"
              onClick={() => {
                setProductToSell([]);
              }}
            >
              {t("TableProducts.empty_list")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
