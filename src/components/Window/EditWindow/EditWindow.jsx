/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BackgroundTransparent } from "../../base/BackgroundTransparent/BackgroundTransparent";
import "./EditWindow.css";
import { useTranslation } from "react-i18next";

export const EditWindow = ({
  productEdit,
  applyDiscount,
  setSelectedProductId,
  colorP
}) => {
  const { t } = useTranslation();
  const [descEdit, setDescEdit] = useState(0);
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
    applyDiscount(productEdit.id, parseInt(descEdit), typeOfPay, parseInt(quantity));
  };

  const handleClickOutside = (event) => {
    if (
      editWindowRef.current &&
      !editWindowRef.current.contains(event.target)
    ) {
      setSelectedProductId(null);
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
      <BackgroundTransparent colorP={colorP}/>
      <div className="edit-window-contain" ref={editWindowRef}>
        <div className="options-edit">
          <h6>{productEdit.nombre_producto}</h6>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="quantity">{t("EditWindow.labels.0")}</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="discount">{t("EditWindow.labels.1")}</label>
            <input
              type="number"
              value={descEdit}
              onChange={handleDescChange}
              min={0}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
          <label htmlFor="discount">{t("EditWindow.labels.2")}</label>
            <select name="" onChange={handleTypeChange}>
              <option value="Efectivo">{t("EditWindow.selects.0")}</option>
              <option value="Mercado pago">{t("EditWindow.selects.1")}</option>
              <option value="Debito">{t("EditWindow.selects.2")}</option>
            </select>
          </div>
          <button className="btn-apply-edit" onClick={handleApplyDiscount}>
            {t("EditWindow.btn_apply")}
          </button>
        </div>
      </div>
    </>
  );
};
