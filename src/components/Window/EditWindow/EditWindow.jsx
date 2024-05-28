/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BackgroundTransparent } from "../../base/BackgroundTransparent/BackgroundTransparent";
import "./EditWindow.css";

export const EditWindow = ({ productEdit, applyDiscount, setSelectedProductId }) => {
  const [descEdit, setDescEdit] = useState(1);
  const [typeOfPay, settypeOfPay] = useState("efectivo");
  const [quantity, setQuantity] = useState(1);
  const editWindowRef = useRef(null);

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
    applyDiscount(productEdit.id,parseInt(descEdit), typeOfPay, parseInt(quantity));
  };

  const handleClickOutside = (event) => {
    if (editWindowRef.current && !editWindowRef.current.contains(event.target)) {
      setSelectedProductId(null)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <BackgroundTransparent/>
      <div className="edit-window-contain" ref={editWindowRef}>
        <div className="options-edit">
          <h6>{productEdit.nombre_producto}</h6>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="">Cantidad</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
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