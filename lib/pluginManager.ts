// @lib/pluginManager.ts

import { OrderKernel } from "@/core/kernel";
import { cancellationPlugin } from "@/core/plugins/cancellationPlugin";
import { updateOrderPlugin } from "@/core/plugins/updateOrderStatusPlugin";
import { refundPlugin } from "@/core/plugins/refundPlugin";

export const kernel = new OrderKernel();

kernel.registerPlugin(cancellationPlugin);
kernel.registerPlugin(updateOrderPlugin);
kernel.registerPlugin(refundPlugin);

export default kernel;
