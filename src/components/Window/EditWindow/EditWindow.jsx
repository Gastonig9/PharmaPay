/* eslint-disable react/prop-types */
import { useState } from "react";
import { BackgroundTransparent } from "../../base/BackgroundTransparent/BackgroundTransparent";
import "./EditWindow.css";

export const EditWindow = ({ productEdit, applyDiscount }) => {
  const [descEdit, setDescEdit] = useState(productEdit.desc);
  const [typeOfPay, settypeOfPay] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleDescChange = (event) => {
    setDescEdit(event.target.value);
  };

  const handleTypeChange = (event) => {
    settypeOfPay(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleApplyDiscount = () => {
    applyDiscount(
      productEdit.id_producto,
      parseInt(descEdit),
      typeOfPay,
      quantity
    );
  };

  return (
    <>
      <BackgroundTransparent/>
      <div className="edit-window-contain">
        <div className="options-edit">
          <h6>{productEdit.nombre_producto}</h6>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="">Cantidad</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={0}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="">Desc</label>
            <input
              type="number"
              value={descEdit}
              onChange={handleDescChange}
              min={0}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="">Metodo de pago</label>
            <select name="" onChange={handleTypeChange}>
              <option value="Efectivo">Efectivo</option>
              <option value="Mercado pago">Mercado pago</option>
              <option value="Debito">Debito</option>
            </select>
          </div>
          <button className="btn-apply-edit" onClick={handleApplyDiscount}>
            Aplicar
          </button>
        </div>
      </div>
    </>
  );
};
