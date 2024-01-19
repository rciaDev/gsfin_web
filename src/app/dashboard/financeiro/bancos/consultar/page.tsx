import BancosConsulta from "@/components/pages/dashboard/bancos/consulta";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Bancos | GSFin',
    description: 'Aqui você pode controlar todas suas finanças'
}

export default function BancosConsultaPage(){
    return <BancosConsulta />
}