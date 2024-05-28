/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductService } from "../../../apiService/ProductService";
import { BackgroundTransparent, ButtonClose } from "../../base";
import "./ProductWindow.css";

export const ProductWindow = ({ products, setProducts, addProductToSell, close }) => {
  const [key, setKey] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const verifyProductsLength = async () => {
      const allProducts = await new ProductService().getAllProducts();
      if (key === "") {
        setProducts(allProducts);
      }
    };
    verifyProductsLength();
  }, [setProducts, key]);

  const searchByKey = async (searchKey) => {
    try {
      if (searchKey === "") {
        const allProducts = await new ProductService().getAllProducts();
        setProducts(allProducts);
      } else {
        const productService = await new ProductService().seachProduct(searchKey);
        if (Array.isArray(productService)) {
          setProducts(productService);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BackgroundTransparent />
      <div className="window-product d-flex flex-column gap-4 p-3">
        <h1>{t('ProductWindow.title')}</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t('ProductWindow.search_placeholder')}
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={key}
            onChange={(e) => {
              const searchKey = e.target.value;
              setKey(searchKey);
              searchByKey(searchKey);
            }}
          />
        </div>
        <div className="scroll-product">
          <table className="table">
            <thead>
              <tr>
                <th>{t('ProductWindow.code')}</th>
                <th>{t('ProductWindow.product_name')}</th>
                <th>{t('ProductWindow.price')}</th>
                <th>{t('ProductWindow.laboratory')}</th>
                <th>{t('ProductWindow.presentation')}</th>
                <th>{t('ProductWindow.category')}</th>
                <th>{t('ProductWindow.description')}</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id_producto} onClick={() => addProductToSell(product)}>
                    <td className="product-hover">{product.id}</td>
                    <td className="product-hover">{product.nombre_producto}</td>
                    <td className="product-hover">{product.precio}</td>
                    <td className="product-hover">{product.laboratorio}</td>
                    <td className="product-hover">{product.presentacion}</td>
                    <td className="product-hover">{product.categoria}</td>
                    <td className="product-hover descripcion-scroll">{product.descripcion_producto}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ButtonClose close={close} />
      </div>
    </>
  );
};
