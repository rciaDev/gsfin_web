import ConfirmarEmail from "@/components/pages/cadastrar/confirmar-email";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Confirme seu email | GSFin',
    description: 'Confirme agora seu email e começe a usar'
}

export default function ConfirmarEmailPage(){
    return <ConfirmarEmail />
}