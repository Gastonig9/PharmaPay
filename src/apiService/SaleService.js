export class SaleService {
  constructor() {}

  async createSale(saleData) {
    try {
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
    } catch (error) {
      console.error("Error al enviar la venta al servidor:", error);
      throw new Error("Error al enviar la venta al servidor");
    }
  }

  async getSales(sales) {
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
