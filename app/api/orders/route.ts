// @app/api/orders/route

import kernel from "@/lib/pluginManager";
import { NextResponse } from "next/server";

export async function GET() {
  // Devuelve todos los pedidos
  // filtrar los pedidos para que solo se muestren los que no han sido cancelados
  const orders = kernel.getOrders().filter((o) => o.status !== "CANCELLED");
  return NextResponse.json(orders, { status: 200 });
}

export async function POST(request: Request) {
  // Crear un nuevo pedido
  const data = await request.json();
  const newOrder = kernel.createOrder(data);
  return NextResponse.json(newOrder, { status: 201 });
}

export async function PATCH(request: Request) {
  const { action, payload } = await request.json();

  if (action === "UPDATE_ORDER") {
    const { orderId, updates } = payload;

    try {
      // Verificar que el pedido exista antes de intentar actualizarlo
      const orderExists = kernel.getOrders().some((o) => o.id === orderId);
      if (!orderExists) {
        return new Response(`Pedido con ID ${orderId} no encontrado`, {
          status: 404,
        });
      }

      // Ejecutar la acción de actualización
      kernel.executeAction("UPDATE_ORDER", { kernel, orderId, updates });

      // Devolver el objeto actualizado
      const updatedOrder = kernel.getOrders().find((o) => o.id === orderId);
      return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Response(error.message, { status: 400 });
      } else {
        return new Response("Error desconocido", { status: 400 });
      }
    }
  }

  return new Response("Acción no reconocida", { status: 400 });
}

// export async function PATCH(request: Request) {
//   const { action, payload } = await request.json();

//   if (action === "UPDATE_STATUS") {
//     const { orderId, newStatus } = payload;

//     try {
//       // Verificar que el pedido exista antes de intentar actualizarlo
//       const orderExists = kernel.getOrders().some((o) => o.id === orderId);
//       if (!orderExists) {
//         return new Response(`Pedido con ID ${orderId} no encontrado`, {
//           status: 404,
//         });
//       }

//       // Ejecutar la acción de actualización de estado
//       kernel.executeAction("UPDATE_STATUS", { kernel, orderId, newStatus });

//       // Devolver el objeto actualizado
//       const updatedOrder = kernel.getOrders().find((o) => o.id === orderId);
//       return new Response(JSON.stringify(updatedOrder), { status: 200 });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return new Response(error.message, { status: 400 });
//       } else {
//         return new Response("Error desconocido", { status: 400 });
//       }
//     }
//   }

//   return new Response("Acción no reconocida", { status: 400 });
// }
