/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import "./MainPharma.css";
import { ButtonBar } from "../base";
import { shortcutEmptyProductList, shortcutWindow } from "../../helpers/helpers";
import { TableProducts } from "../Tables/TableProducts/TableProducts";
import { ProductService } from "../../apiService/ProductService";
import {
  CloseSalesWindow,
  CreateProductWindow,
  ProductWindow,
} from "../Window";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const MainPharma = ({ colorP }) => {
  const [windowStates, setWindowStates] = useState({
    openProductWindow: false,
    openCreateProductWindow: false,
    openCloseSalesWindow: false,
  });
  const [products, setProducts] = useState([]);
  const [productToSell, setProductToSell] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productService = await new ProductService().getAllProducts();
        setProducts(productService);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleShortcuts = (event) => {
      shortcutWindow(event, setWindowStates);
      shortcutEmptyProductList(event, setProductToSell);
    };

    document.addEventListener('keydown', handleShortcuts);

    return () => {
      document.removeEventListener('keydown', handleShortcuts);
    };
  }, []);
  

  const toggleWindowState = (window) => {
    setWindowStates((prevState) => ({
      ...prevState,
      [window]: !prevState[window],
    }));
  };

  const closeWindow = (window) => {
    setWindowStates((prevState) => ({
      ...prevState,
      [window]: false,
    }));
  };

  const addProductToSell = useCallback(
    (product) => {
      const verifyProduct = productToSell.some((p) => p.id === product.id);
      if (product.stock <= 0) {
        toast.error(t("Alerts.no_stock"));
        return;
      }
      if (verifyProduct) return;
      setProductToSell((prevState) => [...prevState, product]);
      closeWindow("openProductWindow");
    },
    [productToSell]
  );

  return (
    <div className="pharma-contain">
      {windowStates.openProductWindow && (
        <ProductWindow
          products={products}
          addProductToSell={addProductToSell}
          setProducts={setProducts}
          close={() => closeWindow("openProductWindow")}
          colorP={colorP}
        />
      )}

      {windowStates.openCreateProductWindow && (
        <CreateProductWindow
          colorP={colorP}
          products={products}
          close={() => closeWindow("openCreateProductWindow")}
        />
      )}

      {windowStates.openCloseSalesWindow && (
        <CloseSalesWindow
          colorP={colorP}
          close={() => closeWindow("openCloseSalesWindow")}
        />
      )}

      <div className="w-100 d-flex justify-content-center text-light">
        <ButtonBar
          buttonTitle={t("ButtonTitle.see_products")}
          colorP={colorP}
          open={() => toggleWindowState("openProductWindow")}
        />
        <ButtonBar
          buttonTitle={t("ButtonTitle.add_products")}
          colorP={colorP}
          open={() => toggleWindowState("openCreateProductWindow")}
        />
        <ButtonBar
          buttonTitle={t("ButtonTitle.close_sales")}
          colorP={colorP}
          open={() => toggleWindowState("openCloseSalesWindow")}
        />
      </div>

      <div className="sale-contain">
        <TableProducts
          colorP={colorP}
          productToSell={productToSell}
          setProductToSell={setProductToSell}
        />
      </div>
    </div>
  );
};

export default MainPharma;
