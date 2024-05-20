import { useState, useEffect, useCallback } from "react";
import "./MainPharma.css";
import { ButtonBar } from "../base";
import { TableProducts } from "../Tables/TableProducts/TableProducts";
import { ProductService } from "../../apiService/ProductService";
import { CloseSalesWindow, CreateProductWindow, ProductWindow } from "../Window";

const MainPharma = () => {
  const [windowStates, setWindowStates] = useState({
    openProductWindow: false,
    openCreateProductWindow: false,
    openCloseSalesWindow: false,
  });
  const [products, setProducts] = useState([]);
  const [productToSell, setProductToSell] = useState([]);

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
    if (!productToSell.some((pS) => pS.id_producto === product.id_producto)) {
      setProductToSell((prevState) => [...prevState, product]);
      closeWindow('openProductWindow');
    }
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
        <CreateProductWindow close={() => closeWindow('openCreateProductWindow')} />
      )}

      {windowStates.openCloseSalesWindow && (
        <CloseSalesWindow close={() => closeWindow('openCloseSalesWindow')} />
      )}

      <div className="w-100 d-flex justify-content-center text-light">
        <ButtonBar buttonTitle="Ver productos" open={() => toggleWindowState('openProductWindow')} />
        <ButtonBar buttonTitle="Agregar producto" open={() => toggleWindowState('openCreateProductWindow')} />
        <ButtonBar buttonTitle="Cierre de ventas" open={() => toggleWindowState('openCloseSalesWindow')} />
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
