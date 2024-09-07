import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.do";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetproductDetails } from "../utils/broker";

export const createCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  // make a call to our catalog microservices
  const product = await GetproductDetails(input.productId);
  logger.info(product);

  if (product.stock < input.qty) {
    throw new NotFoundError("Product out of stock");
  }
  return await repo.createCart(input.customerId, {
    productId: input.productId,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: "TEST",
  } as CartLineItem);
};

export const getCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.findCart(id);

  if (!data) {
    throw new NotFoundError("Cart not found");
  }
  return data;
};

export const updateCart = async (
  input: CartEditRequestInput,
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const deleteCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(id);
  return data;
};
