import request from "supertest";
import express from "express";
import { Faker, faker } from "@faker-js/faker";
import catalogRouter, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use("/", catalogRouter);

// Mock the catalog service
const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Catalog Routes", () => {
  // Add test for POST /products
  describe("POST /products", () => {
    test("should create a product", async () => {
      const requestBody = mockProduct();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockProduct();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should response with an internal code 500", async () => {
      const requestBody = mockProduct();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });
  // Add test for PATCH /products/:id
  describe("PATCH /products/:id", () => {
    test("should update product successfully", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
      };
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: -1,
      };
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });
    
    test("should response with an internal code 500", async () => {
      const requestBody = mockProduct();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.reject(new Error("unable to update product")));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to update product");
    });
  });
});
