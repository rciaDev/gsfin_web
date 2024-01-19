import Entrar from "@/components/pages/entrar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Entrar | GSFin',
    description: 'Entre agora na plataforma mesmo e comece a controlar suas finanças'
}

export default function PageEntrar(){
    return <Entrar />
}
