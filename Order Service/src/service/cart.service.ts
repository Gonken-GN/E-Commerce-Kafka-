import { CartRequestInput } from "../dto/cartRequest.do";
import { CartRepositoryType } from "../types/repository.type";
import { GetproductDetails } from "../utils/broker";

export const createCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  // make a call to our catalog microservices
  const product = await GetproductDetails(input.productId);

  if (product.stock < input.qty) {
    throw new Error("Product out of stock");
  }
  const data = await repo.create(input);
  return data;
};

export const getCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.find(input);
  return data;
};

export const updateCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.update(input);
  return data;
};

export const deleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.delete(input);
  return data;
};
