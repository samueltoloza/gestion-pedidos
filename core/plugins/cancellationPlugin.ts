// @core/plugins/cancellationPlugin.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin } from "@/types/order";

export const cancellationPlugin: Plugin = {
  name: "CancellationPlugin",
  actions: ["CANCEL_ORDER"],

  init(kernel) {
    console.log(`${this.name} inicializado`);
  },

  execute(action, payload) {
    if (action === "CANCEL_ORDER") {
      payload.kernel.cancelOrder(payload.orderId);
      console.log(`Pedido ${payload.orderId} cancelado`);
    }
  },
};
