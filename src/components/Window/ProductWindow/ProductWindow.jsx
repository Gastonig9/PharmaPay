/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductService } from "../../../apiService/ProductService";
import { BackgroundTransparent, ButtonClose } from "../../base";
import "./ProductWindow.css";
import { Loaders } from "../../base/Loader/Loaders";

export const ProductWindow = ({
  products = [],
  setProducts,
  addProductToSell,
  close,
  colorP,
}) => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const verifyProductsLength = async () => {
      try {
        setLoading(true);
        const allProducts = await new ProductService().getAllProducts();
        if (key === "") {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    verifyProductsLength();
  }, [setProducts, key]);

  const searchByKey = async (searchKey) => {
    try {
      setLoading(true);
      if (searchKey === "") {
        const allProducts = await new ProductService().getAllProducts();
        setProducts(allProducts);
      } else {
        const productService = await new ProductService().seachProduct(
          searchKey
        );
        if (Array.isArray(productService)) {
          setProducts(productService);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundTransparent colorP={colorP} />
      <div
        className={
          colorP.colorMode
            ? "window-product d-flex flex-column gap-4 p-3"
            : "window-product-dark d-flex flex-column gap-4 p-3"
        }
      >
        <h1>{t("ProductWindow.title")}</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t("ProductWindow.search_placeholder")}
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
                <th>{t("ProductWindow.code")}</th>
                <th>{t("ProductWindow.product_name")}</th>
                <th>{t("ProductWindow.price")}</th>
                <th>{t("ProductWindow.laboratory")}</th>
                <th>{t("ProductWindow.presentation")}</th>
                <th>{t("ProductWindow.category")}</th>
                <th>{t("ProductWindow.description")}</th>
                <th>Stock</th>
              </tr>
            </thead>
            {loading ? (
              <Loaders />
            ) : (
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} onClick={() => addProductToSell(product)}>
                      <td className={`product-hover ${ product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.id}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}
                      >
                        {product.nombre_producto}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.precio}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.laboratorio}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.presentacion}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.categoria}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.descripcion_producto}
                      </td>
                      <td className={`product-hover ${product.stock <= 0 ? "no-stock" : ""}`}>
                        {product.stock}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">{t("ProductWindow.no_products_found")}</td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
        <ButtonClose close={close} />
      </div>
    </>
  );
};
