import ClientesConsulta from "@/components/pages/dashboard/clientes/consulta";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Clientes | GSFin',
    description: 'Aqui você pode controlar todas os seus clientes'
}

export default function ClientesConsultaPage(){
    return <ClientesConsulta />
}