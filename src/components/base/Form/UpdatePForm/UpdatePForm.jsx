/* eslint-disable react/prop-types */
import { useState } from "react";
import "./UpdatePForm.css";
import { ProductService } from "../../../../apiService/ProductService";
import toast from "react-hot-toast";

export const UpdatePForm = ({ products }) => {
  const [productToUpdate, setProductToUpdate] = useState({});

  const getProduct = async (productId) => {
    try {
      const product = await toast.promise(
        new ProductService().getProductById(productId),
        {
          loading: "Espere un momento...",
          success: "Producto obtenido con éxito",
          error: (err) => `Ocurrió un error: ${err}`,
        }
      );
      setProductToUpdate(product);
    } catch (error) {
      toast.error(`Ocurrio un error: ${error}`);
    }
  };

  const handleSelectChange = (event) => {
    const productId = event.target.value;
    getProduct(productId);
  };

  const handleUpdateProduct = async () => {
    await toast.promise(new ProductService().createProduct(productToUpdate), {
      loading: "Espere un momento...",
      success: `Se agrego un nuevo ${productToUpdate.nombre_producto}`,
      error: (err) => `Ocurrió un error: ${err}`,
    });
  };

  return (
    <div className="update-product-contain">
      <h4>Elige un producto del catalogo</h4>
      <div className="products-to-select">
        <select name="" id="" onChange={handleSelectChange}>
          <option value="">Seleccione un producto</option>
          {products.map((p, i) => (
            <option key={i} value={p.id}>
              {p.nombre_producto}
            </option>
          ))}
        </select>
      </div>

      {productToUpdate.nombre_producto && (
        <div className="update-product-detail">
          <h4>Detalles del Producto:</h4>
          <p>Nombre: {productToUpdate.nombre_producto}</p>
          <p>Descripción: {productToUpdate.descripcion_producto}</p>
          <p>Presentación: {productToUpdate.presentacion}</p>
          <p>Laboratorio: {productToUpdate.laboratorio}</p>
          <p>Stock: {productToUpdate.stock}</p>
          <p>Precio: {productToUpdate.precio}</p>
          <p>Código: {productToUpdate.codigo_producto}</p>
          <p>Categoría: {productToUpdate.categoria}</p>
          <button onClick={handleUpdateProduct}>Enviar</button>
        </div>
      )}
    </div>
  );
};
