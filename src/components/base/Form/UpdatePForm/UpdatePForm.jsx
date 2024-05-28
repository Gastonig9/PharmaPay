/* eslint-disable react/prop-types */
import { useState } from "react";
import "./UpdatePForm.css";
import { ProductService } from "../../../../apiService/ProductService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const UpdatePForm = ({ products }) => {
  const [productToUpdate, setProductToUpdate] = useState({});
  const { t } = useTranslation()

  const getProduct = async (productId) => {
    try {
      const product = await toast.promise(
        new ProductService().getProductById(productId),
        {
          loading: t("Alerts.creating_product"),
          success: t("Alerts.product_created_success"),
          error: (err) => `${t("Alerts.error_occurred")} ${err}`,
        }
      );
      setProductToUpdate(product);
    } catch (error) {
      toast.error(`Ocurrió un error: ${error}`);
    }
  };

  const handleSelectChange = (event) => {
    const productId = event.target.value;
    getProduct(productId);
  };

  const handleUpdateProduct = async () => {
    await toast.promise(new ProductService().createProduct(productToUpdate), {
      loading: "Espere un momento...",
      success: `Se agregó un nuevo ${productToUpdate.nombre_producto}`,
      error: (err) => `Ocurrió un error: ${err}`,
    });
  };

  return (
    <div className="update-product-contain">
      <h4>{t('UpdatePForm.select_product')}</h4>
      <div className="products-to-select">
        <select name="" id="" onChange={handleSelectChange}>
          <option value="">{t('UpdatePForm.select_product')}</option>
          {products.map((p, i) => (
            <option key={i} value={p.id}>
              {p.nombre_producto}
            </option>
          ))}
        </select>
      </div>

      {productToUpdate.nombre_producto && (
        <div className="update-product-detail">
          <h4>{t('UpdatePForm.product_details')}:</h4>
          <p>{t('ProductWindow.product_name')}: {productToUpdate.nombre_producto}</p>
          <p>{t('ProductWindow.description')}: {productToUpdate.descripcion_producto}</p>
          <p>{t('ProductWindow.presentation')}: {productToUpdate.presentacion}</p>
          <p>{t('ProductWindow.laboratory')}: {productToUpdate.laboratorio}</p>
          <p>{t('ProductWindow.stock')}: {productToUpdate.stock}</p>
          <p>{t('ProductWindow.price')}: {productToUpdate.precio}</p>
          <p>{t('ProductWindow.code')}: {productToUpdate.codigo_producto}</p>
          <p>{t('ProductWindow.category')}: {productToUpdate.categoria}</p>
          <button onClick={handleUpdateProduct}>{t('UpdatePForm.send_button')}</button>
        </div>
      )}
    </div>
  );
};
