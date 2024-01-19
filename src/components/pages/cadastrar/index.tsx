"use client"

import Image from "next/image"
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import alertas from "@/global/alertas";
import funcoes from "@/global/funcoes";
import Logo from '@/utils/images/logo.png';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { CadastroContext } from "@/context/cadastro-context";
import AlertInBox from "@/components/ui/alert-in-box";
import { toast } from "react-toastify";
import { CadastroProps } from "@/global/types";
import Spinner from "@/components/ui/spinner";


interface DadosProps {
    dados:CadastroProps,
    handleChange: Function
}

interface ErrorProps{
    titulo: string,
    descricao: string,
    show: boolean
}

export default function Cadastrar(){
    const[load, setLoad] = useState(false);
    const[error, setError] = useState<ErrorProps>({
        titulo:'',
        descricao:'',
        show:false,
    });

    const { dados, handleChange } = useContext<DadosProps>(CadastroContext);

    const router = useRouter();

    const toastId:any = useRef(null);
    
    async function cadastrar() {
        try {       
            
            if(!dados?.cnpj || !dados?.nome || !dados?.email || !dados?.senha){
                setError({
                    titulo: 'Erro',
                    descricao: 'Favor preencha todos os campos',
                    show: true
                })

                return ;
            }

            if(dados.senha !== dados?.confirmaSenha){
                setError({
                    titulo: 'Erro',
                    descricao: 'Senhas divergentes',
                    show: true
                })

                return ;
            }
            
            setLoad(true);

            toastId.current = toast.loading("Aguarde, agora estamos confirmando seu cadastro e configurando seu ambiente");

            const result = await api.post('cadastrar', dados);
            
            if(result.data.erro != '0'){
                setError({
                    titulo: 'Erro',
                    descricao: result.data.mensagem,
                    show: true
                })
            }

            toast.dismiss(toastId.current);

            
            toast.success('Seu cadastro foi realizado com sucesso');

            router.push('/cadastrar/confirmar-email');
        } catch (error) {
            console.log('Error ao tentar cadastrar:', error)
        } finally {
            setLoad(false);
        }

    }

    const buscaDadosReceita = async () => {
        if(dados?.cnpj && dados?.cnpj.length == 18){
            const data = await api.get(`/dados-receita?cnpj=${dados?.cnpj}`);

            if(data.data.erro == 1) return ;

            handleChange('nome', data.data.nome)
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
                        Crie sua conta como quiser
                    </h1>

                    <div className="text-center w-[80%]">
                        <span className="text-muted-foreground ">
                            Crie sua conta para começar a controlar sua grana
                        </span>
                    </div>

                    <div className="space-y-4 md:space-y-6 w-[100%]">
                        <div>
                            <Label htmlFor="email">Seu CNPJ</Label>
                            <Input 
                                type="text" 
                                id="cnpj" 
                                className="" 
                                placeholder=""
                                name="cnpj"
                                onChange={(e) => handleChange('cnpj',funcoes.formatarCpf(e.target.value))}
                                onBlur={buscaDadosReceita}
                                value={dados?.cnpj}
                            />                            
                        </div>
                        <div>
                            <Label htmlFor="email">Seu nome</Label>
                            <Input 
                                type="text" 
                                id="cnpj" 
                                className="" 
                                placeholder=""
                                name="cnpj"
                                onChange={(e) => handleChange('nome',e.target.value)}
                                value={dados?.nome}
                            />                            
                        </div>                        
                        <div>
                            <Label htmlFor="email">Seu email</Label>
                            <Input 
                                type="text" 
                                name="email" 
                                id="email" 
                                className="" 
                                placeholder="" 
                                onChange={(e) => handleChange('email',e.target.value)}
                                value={dados?.email}
                            />
                        </div>
                        <div className="w-full flex flex-row gap-3">
                            <div>
                                <Label htmlFor="senha">Sua senha</Label>
                                <Input                             
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    placeholder="*****"
                                    autoComplete="no"                                    
                                    onChange={(e) => handleChange('senha',e.target.value)}
                                    value={dados?.senha}
                                />

                            </div>
                            <div>
                                <Label htmlFor="senha">Repita a senha</Label>
                                <Input                             
                                    type="password"
                                    name="confirma-senha"
                                    id="confirma-senha"
                                    placeholder="*****"                                    
                                    onChange={(e) => handleChange('confirmaSenha',e.target.value)}
                                    value={dados?.confirmaSenha}
                                />
                            </div>
                        </div>
                        <div className="flex items">
                            <AlertInBox 
                                title={error.descricao}
                                show={error.show}
                                type="error"
                            />
                        </div>

                        <Button 
                            variant={'default'}
                            className="w-full"
                            type="button"
                            onClick={cadastrar}
                            disabled={load}
                        >
                            { load ? <Spinner className="h-5 fill-primary" /> : 'Começar a usar' }
                        </Button>
                        
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Já tem um conta? {' '}
                            <Link 
                                href="/cadastrar" 
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    
}