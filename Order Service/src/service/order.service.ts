import { OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { OrderStatus } from "../types/order.type";

export const createOrder = async (
  userId: number,
  repository: OrderRepositoryType,
  CartRepository: CartRepositoryType
) => {
  const cart = await CartRepository.findCart(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  let cartTotal = 0;
  let orderLineItems: OrderLineItemType[] = [];

  cart.lineItems.forEach((item) => {
    cartTotal += item.qty * Number(item.price);
    orderLineItems.push({
      productId: item.productId,
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    } as OrderLineItemType);
  });

  const orderInput: OrderWithLineItems = {
    orderNumber: Math.floor(Math.random() * 1000000),
    txnId: null,
    customerId: userId,
    amount: cartTotal.toString(),
    orderItems: orderLineItems,
    status: OrderStatus.PENDING, // Set a default status or dynamic value
  };

  const order = await repository.createOrder(orderInput);
  await CartRepository.deleteCart(userId);
  console.log("Order created", order);

  return { orderNumber: orderInput.orderNumber };
};

export const updateOrder = async (
  orderId: number,
  status: OrderStatus,
  repo: OrderRepositoryType
) => {
  await repo.updateOrder(orderId, status);

  // Fire a message to the subscription service

  // If order is cancelled, refund the amount
  if (status === OrderStatus.CANCELLED) {
  }
  return { message: "Order updated" };
};

export const getOrder = async (orderId: number, repo: OrderRepositoryType) => {
  const order = await repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

export const getOrders = async (userId: number, repo: OrderRepositoryType) => {
  const orders = await repo.findOrderByCustomerId(userId);
  if (!orders.length) {
    throw new Error("Orders not found");
  }

  return {};
};

export const deleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  await repo.deleteOrder(orderId);
  return true;
};

export const handleSubscription = async (message: any) => {};
