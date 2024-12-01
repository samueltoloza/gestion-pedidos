/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  customer: z.string(),
  address: z.string(),
  product: z.string({
    required_error: "Seleccione un producto",
  }),
  quantity: z
    .number()
    .positive({ message: "El valor debe ser positivo" })
    .int({ message: "El valor debe ser un entero" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .positive({ message: "El valor debe ser positivo" })
        .int({ message: "El valor debe ser un entero" })
        .nonnegative()
    ),
  price: z
    .number()
    .positive({ message: "El valor debe ser positivo" })
    .int({ message: "El valor debe ser un entero" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .positive({ message: "El valor debe ser positivo" })
        .int({ message: "El valor debe ser un entero" })
        .nonnegative()
    ),
  status: z.string(),
  carrier: z.string(),
  // suppliersId: z.string({
  //   required_error: "Seleccione un proveedor",
  // }),
  // headquartersId: z
  //   .number({ required_error: "Seleccione una sede" })
  //   .positive({ message: "El valor debe ser positivo" })
  //   .int({ message: "El valor debe ser un entero" })
  //   .or(z.string({ required_error: "Seleccione una sede" }))
  //   .pipe(
  //     z.coerce
  //       .number()
  //       .positive({ message: "El valor debe ser positivo" })
  //       .int({ message: "El valor debe ser un entero" })
  //       .nonnegative()
  //   ),
});

export default function page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customer: "",
      quantity: 0,
      product: "",
      address: "",
      price: 0,
      status: "PENDING",
      carrier: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const nuevocustomer = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(nuevocustomer);
  }
  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-4xl font-bold">Crear Pedidos</h1>
        <Form {...form}>
          {/* hacer un gid de 2 columnas */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 p-10 w-1/2"
          >
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="Cr 0 Cl 0-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Cantidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Precio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem className="col-span-2 text-center">
                  <FormLabel>Provedor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un proveedor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mause">Mause</SelectItem>
                      <SelectItem value="Teclado">Teclado</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Regleta">Regleta</SelectItem>
                      <SelectItem value="UPS">UPS</SelectItem>
                      <SelectItem value="Amplificadores">
                        Amplificadores
                      </SelectItem>
                      <SelectItem value="Guitarra">Guitarra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* boton ocupa 2 grid */}
            <Button className="col-span-2" type="submit">
              Guardar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
