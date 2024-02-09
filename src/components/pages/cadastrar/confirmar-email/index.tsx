"use client"

import Image from "next/image"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import alertas from "@/global/alertas";
import funcoes from "@/global/funcoes";
import Logo from '@/utils/images/logo.png';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { CadastroContext } from "@/context/cadastro-context";
import { CadastroProps } from "@/global/types";
import { AuthContext } from "@/context/auth-context";

interface DadosProps {
    dados:CadastroProps,
    alteraDados: Function
}

interface UserProps{
    setLoginToken: Function
    setUser: Function
}

export default function ConfirmarEmail(){
    const[codigo, setCodigo] = useState('');

    const { dados } = useContext<DadosProps>(CadastroContext);

    const { setLoginToken, setUser } = useContext<UserProps>(AuthContext);

    const router = useRouter();

    const confirmarEmail = async () => {
        try {
            if(!dados?.cnpj || dados.cnpj == '' || dados?.cnpj == undefined) {                 
                router.push('/cadastrar'); 
                return ;
            }

            const db   = dados.cnpj.replace(/\./g,'').replace('/','').replace('-','');
            const data = await api.post(`/valida-email?cnpj=${db}&code=${codigo}&email=${dados?.email}`);

            if(data.data.erro == 1){
                alertas.alertaErro(data.data.mensagem);
                return ;
            }

            setLoginToken(data.data.token);
            setUser(data.data);

            localStorage.setItem('db',db)
            
            setTimeout(() => {
               alertas.alertaSucesso('Bem vindo, entrando...')
            },300)            
                    
            router.push('/dashboard/');
        } catch (error) {
            console.log('Erro ao confirmar email:', error)
        }
    }

    useEffect(() => {
        if(!dados?.cnpj || dados?.cnpj === '' || dados?.cnpj === undefined) {
            router.push('/cadastrar')
        }
    },[])
    
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">            
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image src={Logo} width={200} height={100} alt="Logo"/>
            </a>
            <div 
                className="
                    w-full 
                    bg-white 
                    rounded-lg 
                    shadow 
                    dark:border 
                    md:mt-0 
                    sm:max-w-md 
                    xl:p-0 
                    dark:bg-gray-800 
                    dark:border-gray-700
                "
            >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center items-center">
                    <h1 
                        className="
                            text-xl 
                            font-bold 
                            leading-tight 
                            tracking-tight 
                            text-gray-900
                            md:text-2xl 
                            dark:text-white 
                            text-center
                        "
                    >
                        Confirmação de email!
                    </h1>

                    <div className="text-center w-[80%]">
                        <span className="text-muted-foreground ">
                        Agora precisamos que você informe o código que enviamos no seu email
                        </span>
                    </div>

                    <div className="space-y-4 md:space-y-6 w-[100%]">
                        <div>
                            <Label htmlFor="email">Código</Label>
                            <Input 
                                type="text" 
                                id="codigo-confirmacao" 
                                className="" 
                                placeholder=""
                                name="codigo"
                                onChange={(e) => setCodigo(funcoes.somenteNumero(e.target.value))}                                
                                value={codigo}
                            />                        
                        </div>

                        <Button 
                            variant={'default'}
                            className="w-full"
                            type="button"
                            disabled={codigo.trim() === ''}
                            onClick={() => confirmarEmail()}
                        >
                            Confirmar
                        </Button>                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
    
}