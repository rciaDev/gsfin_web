import Bancos from "@/components/pages/dashboard/bancos/registrar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cadastro de Bancos | GSFin',
    description: 'Aqui você pode controlar todas suas finanças'
}

export default function BancosIncluirPage(){
    return <Bancos />
}