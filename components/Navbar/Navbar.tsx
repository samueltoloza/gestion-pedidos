"use client";

import { ModeToggle } from "../ToggleButtonMode";
// import { LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { push } = useRouter();
  return (
    <nav className="flex justify-between items-center py-4">
      <h1>Pedidos</h1>
      <div className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-1 rounded-md dark:bg-gray-800">
              Provedores
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => push("/pedidos")}
            >
              Consultar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => push("/pedidos/crear")}>
              Agregar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex space-x-4">
        <ModeToggle />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </nav>
  );
}
