// @types/order.ts

import { OrderKernel } from "@/core/kernel";

export interface Order {
  id: number;
  customer: string;
  product: string;
  address: string;
  quantity: number;
  price: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED";
  carrier: string;
  createdAt: string;
}

export interface Plugin {
  name: string;
  actions: string[];
  init: (kernel: OrderKernel) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (action: string, payload: any) => void;
}
