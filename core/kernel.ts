// @core/kernel.ts

import { Order } from "@/types";
import { Plugin } from "@/types";

export class OrderKernel {
  private orders: Order[] = [];
  private plugins: Plugin[] = [];

  // Registrar plugins
  registerPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
    plugin.init(this);
  }

  // Crear un pedido
  createOrder(orderData: Omit<Order, "id" | "createdAt">): Order {
    const newOrder: Order = {
      id: this.orders.length + 1,
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  
  updateOrder(orderId: number, updates: Partial<Omit<Order, "id" | "createdAt">>) {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error(`Pedido con ID ${orderId} no encontrado`);
  
    Object.assign(order, updates); // Actualiza solo los campos proporcionados
  }
  

  // Cancelar pedido
  cancelOrder(orderId: number) {
    this.updateOrder(orderId, { status: "CANCELLED" });
  }

  // Ejecutar acción de un plugin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executeAction(action: string, payload: any) {
    for (const plugin of this.plugins) {
      if (plugin.actions.includes(action)) {
        plugin.execute(action, payload);
      }
    }
  }

  // Obtener pedidos
  getOrders(): Order[] {
    return this.orders;
  }
}
