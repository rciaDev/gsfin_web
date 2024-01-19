import Clientes from "@/components/pages/dashboard/clientes";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Clientes | GSFin',
    description: 'Aqui você pode controlar todas suas finanças'
}

export default function ClientesPage(){
    return <Clientes />
}