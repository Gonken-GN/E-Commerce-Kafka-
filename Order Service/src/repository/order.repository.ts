import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { orderLineItems, orders } from "../db/schema";
import { OrderWithLineItems } from "../dto/orderRequest.dto";

export type OrderRepositoryType = {
  createOrder: (lineItem: OrderWithLineItems) => Promise<number>;
  findOrder: (id: number) => Promise<OrderWithLineItems | null>;
  updateOrder: (id: number, status: string) => Promise<OrderWithLineItems>;
  deleteOrder: (id: number) => Promise<boolean>;
  findOrderByCustomerId: (customerId: number) => Promise<OrderWithLineItems[]>;
};

export const OrderRepository: OrderRepositoryType = {
  createOrder: async function (lineItem: OrderWithLineItems): Promise<number> {
    const result = await DB.insert(orders)
      .values({
        customerId: lineItem.customerId,
        orderNumber: lineItem.orderNumber,
        amount: lineItem.amount,
        status: lineItem.status,
        txnId: lineItem.txnId,
      })
      .returning();

    const [{ id }] = result;
    if (id > 0) {
      await DB.insert(orderLineItems)
        .values(
          lineItem.orderItems.map((item) => ({
            orderId: id,
            itemName: item.itemName,
            qty: item.qty,
            price: item.price,
          }))
        )
        .execute();
    }

    return id;
  },

  findOrder: async function (id: number): Promise<OrderWithLineItems | null> {
    const order = await DB.query.orders.findFirst({
      where: (orders, { eq }) => eq(orders.id, id),
      with: {
        lineItems: true,
      },
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return order as unknown as OrderWithLineItems;
  },

  updateOrder: async function (
    id: number,
    status: string
  ): Promise<OrderWithLineItems> {
    await DB.update(orders)
      .set({
        status: status,
      })
      .where(eq(orders.id, id))
      .execute();

    const order = await this.findOrder(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  },

  deleteOrder: async function (id: number): Promise<boolean> {
    await DB.delete(orders).where(eq(orders.id, id)).execute();
    return true;
  },
  
  findOrderByCustomerId: async function (
    customerId: number
  ): Promise<OrderWithLineItems[]> {
    const orders = await DB.query.orders.findMany({
      where: (orders, { eq }) => eq(orders.customerId, customerId),
      with: {
        lineItems: true,
      },
    });
    if (!orders) {
      throw new Error("Orders not found");
    }

    return orders as unknown as OrderWithLineItems[];
  },
};
