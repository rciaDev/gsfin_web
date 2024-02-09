import EsqueceuSenha from "@/components/pages/esqueceu-senha"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Esqueceu Senha | GSFin',
    description: 'Recuperação de senha'
}

export default function EsqueceuSenhaPage(){
    return <EsqueceuSenha />
}