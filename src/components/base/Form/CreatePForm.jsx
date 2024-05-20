/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  presentacionOptions,
  laboratorioOptions,
} from "../../../assets/constants";
import "./CreatePForm.css";
import { ProductService } from "../../../apiService/ProductService";
import { Alert } from "../Alert/Alert";

export const CreatePForm = () => {
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
  const [alert, setAlert] = useState({});

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
      try {
        const newProduct = await new ProductService().createProduct(
          createProductData
        );
        setAlert({
          show: true,
          message: newProduct.message,
          type: "success",
        });
      } catch (error) {
        setAlert({
          show: true,
          message: `Ocurrió un error: ${error}`,
          type: "error",
        });
      }
    } else {
      validator.current.getErrorMessages();
      validator.current.showMessages();
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmitNewProduct} className="product-data-contain">
        <input
          type="text"
          name="nombre_producto"
          value={createProductData.nombre_producto}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
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
          placeholder="Descripción del producto"
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
        >
          <option value="">Seleccionar Presentación</option>
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
        >
          <option value="">Seleccionar Laboratorio</option>
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
          placeholder="Stock"
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
          placeholder="Precio"
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
          placeholder="Código del producto"
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
        >
          <option value="">Seleccionar Categoría</option>
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
          <button>Enviar</button>
        </div>
      </form>
    </>
  );
};
