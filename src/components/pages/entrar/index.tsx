"use client";

import Image from "next/image"
import Logo from '@/utils/images/logo.png';
// import Input from "@/components/forms/Input";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useState } from "react";
import AlertInBox from "@/components/ui/alert-in-box";
import { TEXT_CAMPOS_OBRIGATORIOS } from "@/global/texts";
import api from "@/services/api";
import alertas from "@/global/alertas";
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
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


export default function Entrar(){
    const[load, setLoad] = useState(false);
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');

    const { setUser, setLoginToken } = useContext<LoginProps>(AuthContext);

    const router = useRouter();

    const[error, setError] = useState<ErrorProps>({
        titulo:'',
        descricao:'',
        show:false,
    });

    const entrar = async () => {
        setError({
            titulo:'',
            descricao:'',
            show:false
        })

        try {
            if(email.indexOf('@') == -1){
                setError({
                    titulo:'',
                    descricao:'Email inválido',
                    show:true
                })
                return ;
            }

            if(email.trim() === '' && senha.trim() === ''){
                setError({
                    titulo:'',
                    descricao:TEXT_CAMPOS_OBRIGATORIOS,
                    show:true
                })
                return ;
            }

            setLoad(true);

            const json = {
                email,
                senha
            }

            const result = await api.post(`entrar`,json);

            console.log(result)
            
            if(result.data.erro == 1){
                alertas.alertaErro(result.data.mensagem)
                return;
            }

            localStorage.setItem('db', result.data.cnpj)

            setUser(result.data);
            setLoginToken(result.data.token);

            alertas.alertaSucesso('Bem vindo novamente...')

            router.push('/dashboard')
            console.log(result)
        } catch (error) {
            console.log('Erro ao logar:',error)
        } finally {
            setLoad(false)
        }
    }

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
                        Entre com sua conta
                    </h1>
                    <div className="space-y-4 md:space-y-6">
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
                            <Label htmlFor="senha">Sua senha</Label>
                            <Input                             
                                type="password"
                                name="senha"
                                id="senha"
                                placeholder="*****"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                        <div>
                            <AlertInBox 
                                title={error.descricao}
                                show={error.show}
                                type="error"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">                                    
                                    <Input 
                                        id="lembrar" 
                                        aria-describedby="remember" 
                                        type="checkbox"                                    
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <Label htmlFor="lembrar" className="text-gray-400">Lembrar</Label>                                    
                                </div>
                            </div>

                            <Link 
                                href="/esqueceu-senha" 
                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>

                        <Button 
                            variant={'default'}
                            className="w-full"
                            onClick={() => entrar()}
                            disabled={load}
                        >
                            { load ? <Spinner className="h-5 fill-primary" /> : 'Entrar' }
                        </Button>

                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Não tem uma conta ainda? {' '}
                            <Link 
                                href="/cadastrar" 
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Criar agora
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}