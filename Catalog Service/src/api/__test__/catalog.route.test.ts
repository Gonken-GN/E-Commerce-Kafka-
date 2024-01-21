import request from "supertest";
import express from "express";
import { Faker, faker } from "@faker-js/faker";
import catalogRouter from "../catalog.routes";

const app = express();
app.use(express.json());
app.use("/", catalogRouter);

const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Catalog Routes", () => {
  describe("POST /products", () => {
    test("should create a product", async () => {
      const requestBody = mockProduct();
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      console.log(response);
      expect(response.status).toBe(201);
    });
  });
});
