import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  presentacionOptions,
  laboratorioOptions,
} from "../../../assets/constants";
import "./CreatePForm.css";
import { ProductService } from "../../../apiService/ProductService";
import toast from "react-hot-toast";

export const CreatePForm = () => {
  const { t } = useTranslation(); // Agregamos la función de traducción
  const validator = useRef(new SimpleReactValidator());
  const [createProductData, setCreateProductData] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    presentacion: "",
    laboratorio: "",
    stock: null,
    precio: null,
    codigo_producto: null,
    categoria: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      toast.promise(new ProductService().createProduct(createProductData), {
        loading: t("Alerts.creating_product"),
        success: t("Alerts.product_created_success"),
        error: (err) => `${t("Alerts.error_occurred")} ${err}`,
      });
      setCreateProductData({
        nombre_producto: "",
        descripcion_producto: "",
        presentacion: "",
        laboratorio: "",
        stock: null,
        precio: null,
        codigo_producto: null,
        categoria: "",
      });
    } else {
      validator.current.getErrorMessages();
      validator.current.showMessages();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitNewProduct} className="product-data-contain">
        <input
          type="text"
          name="nombre_producto"
          value={createProductData.nombre_producto}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.product_name_placeholder")} // Traducimos el placeholder
        />
        <p className="validator-error">
          {validator.current.message(
            "nombre_producto",
            createProductData.nombre_producto,
            "required|alpha_num_space|min:5|max:30"
          )}
        </p>

        <textarea
          name="descripcion_producto"
          value={createProductData.descripcion_producto}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.product_description_placeholder")} // Traducimos el placeholder
        ></textarea>
        <p className="validator-error">
          {validator.current.message(
            "descripcion_producto",
            createProductData.descripcion_producto,
            "required|min:10|max:300"
          )}
        </p>

        <select
          name="presentacion"
          value={createProductData.presentacion}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.presentation_placeholder")} // Traducimos el placeholder
        >
          <option value="">{t("CreatePForm.presentation_placeholder")}</option>
          {presentacionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="validator-error">
          {validator.current.message(
            "presentacion",
            createProductData.presentacion,
            "required"
          )}
        </p>

        <select
          name="laboratorio"
          value={createProductData.laboratorio}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.laboratory_placeholder")} // Traducimos el placeholder
        >
          <option value="">{t("CreatePForm.laboratory_placeholder")}</option>
          {laboratorioOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="validator-error">
          {validator.current.message(
            "laboratorio",
            createProductData.laboratorio,
            "required"
          )}
        </p>

        <input
          type="number"
          name="stock"
          value={createProductData.stock}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.stock_placeholder")} // Traducimos el placeholder
          min={0}
        />
        <p className="validator-error">
          {validator.current.message(
            "stock",
            createProductData.stock,
            "required|integer"
          )}
        </p>

        <input
          type="number"
          name="precio"
          value={createProductData.precio}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.price_placeholder")} // Traducimos el placeholder
          min={0}
        />
        <p className="validator-error">
          {validator.current.message(
            "precio",
            createProductData.precio,
            "required|numeric"
          )}
        </p>

        <input
          type="number"
          name="codigo_producto"
          value={createProductData.codigo_producto}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.product_code_placeholder")} // Traducimos el placeholder
          min={0}
        />
        <p className="validator-error">
          {validator.current.message(
            "codigo_producto",
            createProductData.codigo_producto,
            "required|integer|max:7"
          )}
        </p>

        <select
          name="categoria"
          value={createProductData.categoria}
          onChange={handleInputChange}
          placeholder={t("CreatePForm.category_placeholder")}
        >
          <option value="">{t("CreatePForm.category_placeholder")}</option>
          <option value="Farmacia">Farmacia</option>
          <option value="Perfumeria">Perfumería</option>
        </select>
        <p className="validator-error">
          {validator.current.message(
            "categoria",
            createProductData.categoria,
            "required"
          )}
        </p>

        <div className="btn-send-contain">
          <button>{t("CreatePForm.send_button")}</button>
        </div>
      </form>
    </>
  );
};
