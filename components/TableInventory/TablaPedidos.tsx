"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui";
import swr from "swr";
import SelectCarrier from "@/components/SelectCarrier/SelectCarrier";

type Pedido = {
  id: number;
  createdAt: string;
  customer: string;
  address: string;
  product: string;
  quantity: number;
  price: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED";
  carrier: string;
};

export default function TablaPedidos() {
  const {
    data: pedidos,
    error,
    isValidating,
  } = swr<Pedido[]>(`http://localhost:3000/api/orders`, {
    refreshInterval: 1000,
  });
  console.log(pedidos, error, isValidating);

  const actualizarEstado = async (pedidoId: number, nuevoEstado: string) => {
    const res = await fetch(`http://localhost:3000/api/orders`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "UPDATE_ORDER",
        payload: {
          orderId: pedidoId,
          updates: {
            status: nuevoEstado,
          },
        },
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <Table>
        <TableCaption>Lista de Pedidos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-center">Producto</TableHead>
            <TableHead className="text-center">Cantidad</TableHead>
            <TableHead className="text-center">Precio</TableHead>
            <TableHead className="text-center">Direccion</TableHead>
            <TableHead className="text-center">Fecha de Creacion</TableHead>
            <TableHead className="text-center">Transportista</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-right">Procesando</TableHead>
            <TableHead className="text-right">Enviado</TableHead>
            <TableHead className="text-right">Cancelar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pedidos?.map((pedido) => (
            <TableRow key={pedido.id}>
              <TableCell className="font-medium">{pedido.id}</TableCell>
              <TableCell>{pedido.customer}</TableCell>
              <TableCell className="text-center">{pedido.product}</TableCell>
              <TableCell className="text-center">{pedido.quantity}</TableCell>
              <TableCell className="text-center">{pedido.price}</TableCell>
              <TableCell className="text-center">{pedido.address}</TableCell>
              {/* coverti 2024-11-29T15:59:08.505Z a fecha normal */}
              <TableCell className="text-center">
                {new Date(pedido.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                {pedido.carrier == "" ? "SIN ASIGNAR" : pedido.carrier}
              </TableCell>
              <TableCell className="text-center">{pedido.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => actualizarEstado(pedido.id, "PROCESSING")}
                >
                  Procesar
                </Button>
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <SelectCarrier pedidoId={pedido.id} />
                {/* <Button onClick={() => actualizarEstado(pedido.id, "SHIPPED")}>
                  Enviar
                </Button> */}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  onClick={() => actualizarEstado(pedido.id, "CANCELLED")}
                >
                  Cancelar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>Total</TableCell>
            <TableCell className="text-right">{pedidos?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
