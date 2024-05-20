import { useEffect, useCallback } from "react";
import "./MainPharma.css";
import { ButtonBar } from "../base";
import { TableProducts } from "../Tables/TableProducts/TableProducts";
import { ProductService } from "../../apiService/ProductService";
import { CloseSalesWindow, CreateProductWindow, ProductWindow } from "../Window";
import { setProducts, setProductToSell, addProductToSell } from "../../features/productSlice";
import { setOpenProductWindow, setCloseProductWindow, setOpenCreateProductWindow, setCloseCreateProductWindow, setOpenSalesWindow, setCloseSalesWindow } from "../../features/windowSlice";
import { useDispatch, useSelector } from "react-redux";

const MainPharma = () => {
  const dispatch = useDispatch();
  const { products, productToSell } = useSelector(state => state.product);
  const { openProductWindow, openCreateProductWindow, openCloseSalesWindow } = useSelector(state => state.window);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productService = await new ProductService().getAllProducts();
        dispatch(setProducts(productService));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const addProductToSellHandler = useCallback((product) => {
    if (!productToSell.some((pS) => pS.id_producto === product.id_producto)) {
      dispatch(addProductToSell(product));
      dispatch(setCloseProductWindow());
    }
  }, [productToSell, dispatch]);

  return (
    <div className="pharma-contain">
      {openProductWindow && (
        <ProductWindow
          products={products}
          addProductToSell={addProductToSellHandler}
          setProducts={(products) => dispatch(setProducts(products))}
          close={() => dispatch(setCloseProductWindow())}
        />
      )}

      {openCreateProductWindow && (
        <CreateProductWindow close={() => dispatch(setCloseCreateProductWindow())} />
      )}

      {openCloseSalesWindow && (
        <CloseSalesWindow close={() => dispatch(setCloseSalesWindow())} />
      )}

      <div className="w-100 d-flex justify-content-center text-light">
        <ButtonBar buttonTitle="Ver productos" open={() => dispatch(setOpenProductWindow())} />
        <ButtonBar buttonTitle="Agregar producto" open={() => dispatch(setOpenCreateProductWindow())} />
        <ButtonBar buttonTitle="Cierre de ventas" open={() => dispatch(setOpenSalesWindow())} />
      </div>

      <div className="sale-contain">
        <TableProducts
          productToSell={productToSell}
          setProductToSell={(products) => dispatch(setProductToSell(products))}
        />
      </div>
    </div>
  );
};

export default MainPharma;
