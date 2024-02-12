"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/ui/spinner"
import DataConsulta from '../data/bancos.json';
import NenhumResultadoEncontrado from "@/components/ui/dashboard/nenhum-resultado";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { BancoProps } from "@/global/types";  
import TabelaBancos from "./tabela";
import { SelectDefault } from "@/components/ui/select-default";
import funcoes from "@/global/funcoes";
import alertas from "@/global/alertas";
import { PAGE_SIZE } from "@/global/constantes";


interface ConsultaProps {
    quantidade_registros?:string,
    itens?:BancoProps[]
}


const optionsSelectFiltro = [
    {
        text:'Geral',
        value:'geral'
    },
    { 
        text:'Nome',
        value: 'nome'
    },
    { 
        text:'Código',
        value: 'id'
    }    
]

export default function BancosConsulta(){
    const[load, setLoad] = useState(false);
    const[isMounted, setIsMounted] = useState(false);
    const[filtro, setFiltro] = useState('');
    const[conteudo, setConteudo] = useState('');
    
    const[dados, setDados] = useState<ConsultaProps>();

    const router = useRouter();
    const params = useSearchParams();

    const buscaDados = async (isPagination = false) => {        
        setLoad(true);

        try {
            if(filtro !== '' && filtro !== 'geral' && conteudo.trim() == '') return ;

            let cUrl = !isPagination ? 
                       `/bancos?filtro=${filtro}&conteudo=${conteudo}&page=${params.get('page')}&pageSize=${PAGE_SIZE}` :
                       `/bancos?filtro=${params.get('filtro')}&conteudo=${params.get('conteudo')}&page=${params.get('page')}&pageSize=${PAGE_SIZE}`

            const data = await funcoes.get(cUrl);

            if(!data?.data) return ;

            if(data?.data.erro == '1'){
                alertas.alertaErro(data.data.mensagem)
                return ;
            }

            setDados(data.data)                        
        } catch (error) {
            alertas.alertaErroServidor();
        } finally {
            setLoad(false)
        }        
    }
    
    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return null

    return (
        <>
            <div className="w-full flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight  pt-3">Bancos</h2>
                    Aqui estão seus bancos cadastrados
                </div>
                

                <Button 
                    className="mt-3"
                    onClick={() => router.push('/dashboard/financeiro/bancos/registrar')}
                >
                    + Adicionar
                </Button>
                
            </div>
            
   
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                <div className="w-full flex gap-4 mt-5">
                    <div className="w-[200px]">
                        <SelectDefault 
                            data={optionsSelectFiltro}
                            onChange={(value) => setFiltro(value)}
                            placeholder="Geral"
                        />
                    </div>

                    <Input 
                        className="w-[70%] md:w-[50%]"
                        placeholder="Filtre pelo nome..."
                        onChange={(e) => setConteudo(e.target.value)}
                    />

                    <Button
                        onClick={() => buscaDados()}   
                        disabled={load}
                        className="flex gap-2"                                          
                    >
                        { load ? 
                            <div className="w-[80px]">
                                <Spinner className="w-4 h-4 fill-primary" />
                            </div> : 
                            <>
                                <FontAwesomeIcon icon={faSearch} className="w-4 h-4"/>                        
                                Consultar
                            </>
                        }                        
                    </Button>
                </div>
            </div>

            <div className="w-full mt-3 mb-4 min-h-[200px]">

                { !dados?.itens || dados?.itens.length === 0 ? <NenhumResultadoEncontrado /> : <TabelaBancos bancos={dados?.itens} /> }

            </div>
    
        </>
    )
}

