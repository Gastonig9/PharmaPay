/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ProductService } from "../../../apiService/ProductService";
import { BackgroundTransparent, ButtonClose } from "../../base";
import "./ProductWindow.css";

export const ProductWindow = ({
  products,
  setProducts,
  addProductToSell,
  close,
}) => {
  const [key, setKey] = useState("");
  console.log(products);

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
    }
  };

  return (
    <>
      <BackgroundTransparent />
      <div className="window-product d-flex flex-column gap-4 p-3">
        <h1>Productos</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en catalogo"
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
                <th>Codigo</th>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Laboratorio</th>
                <th>Presentacion</th>
                <th>Categoria</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr
                    key={product.id_producto}
                    onClick={() => addProductToSell(product)}
                  >
                    <td className="product-hover">{product.id_producto}</td>
                    <td className="product-hover">{product.nombre_producto}</td>
                    <td className="product-hover">{product.precio}</td>
                    <td className="product-hover">{product.laboratorio}</td>
                    <td className="product-hover">{product.presentacion}</td>
                    <td className="product-hover">{product.categoria}</td>
                    <td className="product-hover descripcion-scroll">
                      {product.descripcion_producto}
                    </td>
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
