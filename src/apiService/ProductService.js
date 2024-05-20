/* eslint-disable no-useless-catch */
export class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      const response = await fetch("https://localhost:7184/api/product");
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async seachProduct(key) {
    try {
      const response = await fetch(
        `https://localhost:7184/api/product/get-by-key/?key=${key}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async createProduct(newProduct) {
      const response = await fetch(`https://localhost:7184/api/product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })
      const data = await response.json();
      return data;
  }
}
