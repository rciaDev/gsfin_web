"use client";

import Logo from '@/utils/images/logo.png';
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AlertInBox from "@/components/ui/alert-in-box";
import { TEXT_CAMPOS_OBRIGATORIOS, TEXT_ERROR_API } from "@/global/texts";
import api from "@/services/api";
import alertas from "@/global/alertas";
import { AuthContext } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner";


interface ErrorProps{
    titulo: string,
    descricao: string,
    show: boolean
}

interface LoginProps{
    setUser : Function,
    setLoginToken: Function
}


export default function EsqueceuSenha (){
    const[load, setLoad] = useState(false);
    const[email, setEmail] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams(); 
    const params =  new URLSearchParams(searchParams.toString())   

    const[error, setError] = useState<ErrorProps>({
        titulo:'',
        descricao:'',
        show:false,
    });

    const recuperarSenha = async () => {
        setLoad(true);

        setError({
            titulo:'',
            descricao:TEXT_CAMPOS_OBRIGATORIOS,
            show:false
        }) 

        try {
            if(email.trim() === '' || email.indexOf('@') == -1){
                setError({
                    titulo:'',
                    descricao:TEXT_CAMPOS_OBRIGATORIOS,
                    show:true
                })

                return ;
            }

            const json = {
                email
            }

            const data = await api.post('/recuperar-senha', json);

            if(data.data.erro == '1'){
                alertas.alertaErro(data.data.mensagem);
                return ;
            }

            router.push('/esqueceu-senha?sended=true')
            
        } catch (error) {
            setError({
                titulo:'',
                descricao:TEXT_ERROR_API,
                show:true
            })
        } finally {
            setLoad(false);
        }
    }

    return <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                    { params.get('sended') !== 'true' ? 'Recuperar senha' : 'Solicitação realizada com sucesso' }
                </h1>                
                <div className="space-y-4 md:space-y-6">                    
                    { params.get('sended') !== 'true' && (
                        <>
                            <div>
                                <Label htmlFor="email">Seu email</Label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="" 
                                    placeholder="" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}                            
                                />
                            </div>                    

                            <div>
                                <AlertInBox 
                                    title={error.descricao}
                                    show={error.show}
                                    type="error"
                                />
                            </div>

                            <Button 
                                variant={'default'}
                                className="w-full"
                                onClick={() => recuperarSenha()}
                                disabled={load}
                            >
                                { load ? <Spinner className="h-5 fill-primary" /> : 'Recuperar senha' }
                            </Button>
                        </>
                    )}                    

                    { params.get('sended') == 'true' && (
                        <div className="flex flex-col gap-3">                            
                            <span className="text-center">
                                <small>
                                    Verifique seu email. Você receberá um email com 
                                    instruções para acessar o sistema.
                                </small>
                            </span>   
                        </div>
                    )}                    
                </div>
            </div>
        </div>
    </div>
}