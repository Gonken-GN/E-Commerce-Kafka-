import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.do";
import { CartRepositoryType } from "../repository/cart.repository";
import { AuthorizeError, logger, NotFoundError } from "../utils";
import { GetproductDetails, GetStockDetails } from "../utils/broker";

export const createCart = async (
  input: CartRequestInput & { customerId: number },
  repo: CartRepositoryType
) => {
  // Get product details from Catalog service
  const product = await GetproductDetails(input.productId);
  logger.info(product);

  if (product.stock < input.qty) {
    throw new NotFoundError("Product out of stock");
  }

  const linetItem = await repo.findCartByProductId(
    input.customerId,
    input.productId
  );
  if (linetItem) {
    return repo.updateCart(linetItem.id, linetItem.qty + input.qty);
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
  // Get cart details from Cart repository
  const cart = await repo.findCart(id);
  if (!cart) {
    throw new NotFoundError("Cart does not exist");
  }

  const lineItems = cart.lineItems;
  if (!lineItems.length) {
    throw new NotFoundError("Cart is empty");
  }

  const stockDetails = await GetStockDetails(
    lineItems.map((item) => item.productId)
  );

  if (Array.isArray(stockDetails)) {
    lineItems.forEach((item) => {
      const stock = stockDetails.find((stock) => stock.id === item.productId);
      if (stock) {
        item.availability = stock.stock;
      }
    });

    cart.lineItems = lineItems;
  }
  return cart;
};

const AuthorizedCart = async (
  lineitemId: number,
  customerId: number,
  repo: CartRepositoryType
) => {
  const cart = await repo.findCart(customerId);
  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  const lineItem = cart.lineItems.find((item) => item.id === lineitemId);
  if (!lineItem) {
    throw new AuthorizeError("You are not authorized to access this cart");
  }

  return lineItem;
};

export const updateCart = async (
  input: CartEditRequestInput & { customerId: number },
  repo: CartRepositoryType
) => {
  await AuthorizedCart(input.id, input.customerId, repo);
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const deleteCart = async (
  input: { id: number; customerId: number },
  repo: CartRepositoryType
) => {
  await AuthorizedCart(input.id, input.customerId, repo);
  const data = await repo.deleteCart(input.id);
  return data;
};
