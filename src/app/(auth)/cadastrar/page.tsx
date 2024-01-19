import Cadastrar from "@/components/pages/cadastrar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cadastrar | GSFin',
    description: 'Faça seu cadastro agora mesmo e comece a controlar suas finanças'
}

export default function CadastrarPage(){
    return <Cadastrar />
}