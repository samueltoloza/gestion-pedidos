// @core/plugins/statusUpdatePlugin.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin } from "@/types/order";

export const statusUpdatePlugin: Plugin = {
  name: "StatusUpdatePlugin",
  actions: ["UPDATE_STATUS"],

  init(kernel) {
    console.log(`${this.name} inicializado`);
  },

  execute(action, payload) {
    if (action === "UPDATE_STATUS") {
      payload.kernel.updateOrderStatus(payload.orderId, payload.newStatus);
      console.log(
        `Estado del pedido ${payload.orderId} actualizado a ${payload.newStatus}`
      );
    }
  },
};
