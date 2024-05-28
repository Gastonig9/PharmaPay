export class SaleService {
  constructor() {}

  async createSale(saleData) {
    const response = await fetch(
      "https://localhost:7184/api/sale/create-sale",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      }
    );
    const data = await response.json();
    return data;
  }

  async getDaySales(sales) {
    const response = await fetch(
      "https://localhost:7184/api/close-sale/get-day-sales",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sales),
      }
    );
    const data = await response.json();
    return data;
  }

  async createCloseSale(sales) {
    const response = await fetch(
      "https://localhost:7184/api/close-sale/close-day-sales",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sales),
      }
    );
    const data = await response.json();
    return data;
  }
}
