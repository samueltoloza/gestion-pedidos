import { Loader2 } from 'lucide-react';

// Pasar Atributos a un Componente
export default function Spinner() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 size="64" className="animate-spin w-10 h-10 text-gray-500" />
            <p>Loading...</p>
        </div>
    )
}