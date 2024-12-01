// @core/plugins/refundPlugin.ts

import { Plugin } from '@/types/order';

export const refundPlugin: Plugin = {
  name: 'RefundPlugin',
  actions: ['PROCESS_REFUND'],

  init() {
    console.log(`${this.name} inicializado`);
  },

  execute(action, payload) {
    if (action === 'PROCESS_REFUND') {
      const order = payload.kernel.getOrders().find((o) => o.id === payload.orderId);
      if (order && order.status === 'CANCELLED') {
        console.log(`Reembolso procesado para el pedido ${payload.orderId}`);
      } else {
        console.log(`El pedido ${payload.orderId} no puede ser reembolsado`);
      }
    }
  },
};
