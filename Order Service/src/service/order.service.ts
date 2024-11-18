import { OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";

export const createOrder = async (
  userId: number,
  repo: OrderRepositoryType,
  cart: CartRepositoryType
) => {
  return {};
};

export const updateOrder = async (
  orderId: number,
  status: string,
  repo: OrderRepositoryType
) => {
  return {};
};

export const getOrder = async (orderId: number, repo: OrderRepositoryType) => {
  return {};
};

export const getOrders = async (userId: number, repo: OrderRepositoryType) => {
  return {};
};

export const deleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  return {};
};

export const handleSubscription = async (message: any) => {};
