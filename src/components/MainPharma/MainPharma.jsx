import { useState, useEffect, useCallback } from "react";
import "./MainPharma.css";
import { ButtonBar } from "../base";
import { TableProducts } from "../Tables/TableProducts/TableProducts";
import { ProductService } from "../../apiService/ProductService";
import { CloseSalesWindow, CreateProductWindow, ProductWindow } from "../Window";
import { useTranslation } from "react-i18next";

const MainPharma = () => {
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

  const addProductToSell = useCallback((product) => {
    const verifyProduct = productToSell.some(p => p.id === product.id)
    if(verifyProduct) return
    setProductToSell((prevState) => [...prevState, product]);
      closeWindow('openProductWindow');
  }, [productToSell]);

  return (
    <div className="pharma-contain">
      {windowStates.openProductWindow && (
        <ProductWindow
          products={products}
          addProductToSell={addProductToSell}
          setProducts={setProducts}
          close={() => closeWindow('openProductWindow')}
        />
      )}

      {windowStates.openCreateProductWindow && (
        <CreateProductWindow products={products} close={() => closeWindow('openCreateProductWindow')} />
      )}

      {windowStates.openCloseSalesWindow && (
        <CloseSalesWindow close={() => closeWindow('openCloseSalesWindow')} />
      )}

      <div className="w-100 d-flex justify-content-center text-light">
        <ButtonBar buttonTitle={t('ButtonTitle.see_products')} open={() => toggleWindowState('openProductWindow')} />
        <ButtonBar buttonTitle={t('ButtonTitle.add_products')} open={() => toggleWindowState('openCreateProductWindow')} />
        <ButtonBar buttonTitle={t('ButtonTitle.close_sales')} open={() => toggleWindowState('openCloseSalesWindow')} />
      </div>

      <div className="sale-contain">
        <TableProducts
          productToSell={productToSell}
          setProductToSell={setProductToSell}
        />
      </div>
    </div>
  );
};

export default MainPharma;