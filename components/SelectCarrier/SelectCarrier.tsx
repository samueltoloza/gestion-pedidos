import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectCarrier({ pedidoId }: { pedidoId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [carrier, setCarrier] = useState<string | null>(null);

  const actualizarEstado = async (pedidoId: number, nuevoEstado: string, carrier: string) => {
    const res = await fetch(`http://localhost:3000/api/orders`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "UPDATE_ORDER",
        payload: {
          orderId: pedidoId,
          updates: {
            status: nuevoEstado,
            carrier: carrier,
          },
        },
      }),
    });
    const data = await res.json();
    console.log(data);
    setIsOpen(false); // Cierra el diálogo después de enviar
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Enviar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar pedido</DialogTitle>
          <DialogDescription>
            Seleccione el transportista para enviar el pedido
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Transportista" className="text-right">
              Transportista
            </Label>
            <Select onValueChange={(value) => setCarrier(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione un transportista" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transportista</SelectLabel>
                  <SelectItem value="DHL">DHL</SelectItem>
                  <SelectItem value="Fedex">Fedex</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="InterRapidisimo">
                    InterRapidisimo
                  </SelectItem>
                  <SelectItem value="Deprisa">Deprisa</SelectItem>
                  <SelectItem value="Servientrega">Servientrega</SelectItem>
                  <SelectItem value="TCC">TCC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={!carrier} // Desactiva el botón si no se seleccionó un transportista
            onClick={() => {
              if (carrier) {
                actualizarEstado(pedidoId, "SHIPPED", carrier);
              }
            }}
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
