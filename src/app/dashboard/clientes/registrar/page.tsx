
import ClientesRegistra from "@/components/pages/dashboard/clientes/registrar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cadastro de Clientes | GSFin',
    description: 'Aqui você pode controlar todos seus clientes'
}

export default function ClientesRegistraPage(){
    return <ClientesRegistra />
}