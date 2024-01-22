import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalotService } from "../catalog.service";
import { Product } from "../../models/product.model";
import { Factory } from "rosie";
import { ProductFactory } from "../../utils/fixtures";

const mockProduct = (reset: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    ...reset,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });
  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });
  // Update the test case for createProduct
  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new CatalotService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      const result = await service.createProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw an error unable to create product", async () => {
      const service = new CatalotService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw an error product already exists", async () => {
      const service = new CatalotService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists"))
        );
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exists"
      );
    });
  });

  // Update the test case for updateProduct
  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = new CatalotService(repository);
      const reqBody = mockProduct({
        id: faker.number.int({ min: 10, max: 1000 }),
        price: +faker.commerce.price(),
      });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    });

    test("should throw an error with product does not exists", async () => {
      const service = new CatalotService(repository);
      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exists"))
        );
      await expect(service.updateProduct({})).rejects.toThrow(
        "product does not exists"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalotService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const mockProducts = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(mockProducts));
      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(mockProducts);
    });

    test("should throw an error with products does not exists", async () => {
      const service = new CatalotService(repository);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("products does not exists"))
        );
      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "products does not exists"
      );
    });
  });

  describe("getProduct", () => {
    test("should get products by id", async () => {
      const service = new CatalotService(repository);
      const mockProduct = ProductFactory.build();

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(mockProduct));
      const result = await service.getProduct(mockProduct.id!);

      expect(result).toMatchObject(mockProduct);
    });
  });

  describe("deleteProduct", () => {
    test("should delete products by id", async () => {
      const service = new CatalotService(repository);
      const mockProduct = ProductFactory.build();

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: mockProduct.id }));
      const result = await service.deleteProduct(mockProduct.id!);

      expect(result).toMatchObject({
        id: mockProduct.id,
      });
    });
  });
});
