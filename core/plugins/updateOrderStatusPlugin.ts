// @core

import { OrderKernel } from "../kernel";
import { Order, Plugin } from "@/types";

export const updateOrderPlugin: Plugin = {
  name: "updateOrder",
  actions: ["UPDATE_ORDER"],

  init() {
    console.log(`${this.name} inicializado`);
  },

  execute(
    action: string,
    payload: { kernel: OrderKernel; orderId: number; updates: Partial<Order> }
  ) {
    if (action === "UPDATE_ORDER") {
      try {
        payload.kernel.updateOrder(payload.orderId, payload.updates);
        console.log(`Pedido ${payload.orderId} actualizado con:`, payload.updates);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `Error al actualizar el pedido ${payload.orderId}: ${error.message}`
          );
        }
      }
    }
  },
};


// export const updateOrderStatusPlugin: Plugin = {
//   name: "updateOrderStatus",
//   actions: ["UPDATE_STATUS"],

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   init(kernel: OrderKernel) {
//     console.log(`${this.name} inicializado`);
//   },

//   execute(
//     action: string,
//     payload: { kernel: OrderKernel; orderId: number; newStatus: string }
//   ) {
//     if (action === "UPDATE_STATUS") {
//       // Verificar si el nuevo estado es válido
//       const validStatuses: Array<
//         "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED"
//       > = ["PENDING", "PROCESSING", "SHIPPED", "CANCELLED"];

//       if (
//         !validStatuses.includes(
//           payload.newStatus as
//             | "PENDING"
//             | "PROCESSING"
//             | "SHIPPED"
//             | "CANCELLED"
//         )
//       ) {
//         console.error(`Estado inválido: ${payload.newStatus}`);
//         return;
//       }

//       try {
//         payload.kernel.updateOrderStatus(
//           payload.orderId,
//           payload.newStatus as
//             | "PENDING"
//             | "PROCESSING"
//             | "SHIPPED"
//             | "CANCELLED"
//         );
//         console.log(
//           `Pedido ${payload.orderId} actualizado a estado ${payload.newStatus}`
//         );
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error(
//             `Error al actualizar el estado del pedido: ${error.message}`
//           );
//         }
//       }
//     }
//   },
// };
