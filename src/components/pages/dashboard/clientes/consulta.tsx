"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/ui/spinner"
import NenhumResultadoEncontrado from "@/components/ui/dashboard/nenhum-resultado";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  
// import { ClienteProps } from "@/global/types";
import funcoes from "@/global/funcoes";
import { ClienteProps } from "@/global/types";
import { SelectDefault } from "@/components/ui/select-default";
import alertas from "@/global/alertas";
import ModalConfirmaOperacao from "@/components/ui/dashboard/dialog-confirma";
import { PAGE_SIZE } from "@/global/constantes";
import TabelaClientes from "./tabela";

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
    },
    { 
        text:'CPF/CNPJ',
        value: 'cnpj'
    },
    { 
        text:'Cidade',
        value: 'cidade'
    },
    { 
        text:'UF',
        value: 'uf'
    }
]

interface ConsultaProps {
    quantidade_registros:string,
    itens:ClienteProps[]
}

export default function ClientesConsulta(){
    const[load, setLoad] = useState(false);
    const[isMounted, setIsMounted] = useState(false);

    const[dados, setDados] = useState<ConsultaProps>();

    const[filtro, setFiltro] = useState('');
    const[conteudo, setConteudo] = useState('');

    const router = useRouter();

    const params = useSearchParams()

    const buscaDados = async (isPagination = false) => {      
        setLoad(true);

        try {
            if(filtro !== '' && filtro !== 'geral' && conteudo.trim() == '') return ;

            let cUrl = !isPagination ? 
                       `/clientes?filtro=${filtro}&conteudo=${conteudo}&page=${params.get('page')}&pageSize=${PAGE_SIZE}` :
                       `/clientes?filtro=${params.get('filtro')}&conteudo=${params.get('conteudo')}&page=${params.get('page')}&pageSize=${PAGE_SIZE}`

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

    const proximaPagina = () => {
        const paginaAtual = funcoes.formatarNumero(params.get('page') || '1');
        
        return paginaAtual + 1
    }

    const voltaPagina = () => {
        const paginaAtual = funcoes.formatarNumero(params.get('page') || '1');
        
        return paginaAtual == 0 || paginaAtual == 1 ? '1' : paginaAtual - 1
    }

    const trataPaginacao = () => {
        return (
            <Pagination className="flex justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            href={
                                `/dashboard/clientes/consultar?page=${voltaPagina()}&filtro=${filtro.trim()}&conteudo=${conteudo}`
                            } 
                        />
                    </PaginationItem>

                    { trataLinks() }

                    <PaginationItem>
                        <PaginationNext
                            href={
                                `/dashboard/clientes/consultar?page=${proximaPagina()}&filtro=${filtro.trim()}&conteudo=${conteudo}`
                            } 
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    }


    const trataLinks = () => {
        const itensPorPagina = 10;

        const quantidade_registros = funcoes.formatarNumero(dados?.quantidade_registros || '100')

        const totalPaginas = Math.ceil(quantidade_registros / itensPorPagina);

        const links = [];

        for (let nPage = 0; nPage < totalPaginas; nPage++) {
            if(nPage == 5) {
                links.push(
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )

                break;
            }else {                
                links.push(
                    <PaginationItem>
                        <PaginationLink 
                            href={`/dashboard/clientes/consultar?page=${nPage + 1}&filtro=${filtro}&conteudo=${conteudo}`} 
                            isActive={funcoes.formatarNumero(params.get('page') || '1')  == nPage + 1}
                        >
                            { nPage + 1 }
                        </PaginationLink>
                    </PaginationItem>
                )
            }            
        } 

        return links
    }

    const trataPaginacaoUrl = () => {
             
        try {
            if(params.get('page') != null && params.get('page') !== ''){
                buscaDados(true);
                setFiltro(params.get('filtro') || '');
                setConteudo(params.get('conteudo') || '');                
            }
                        
        } catch (error) {
            
        }        
    }
    
    useEffect(() => {
        setIsMounted(true)
    },[])

    useEffect(() => {
        if(!isMounted) return ;

        trataPaginacaoUrl()
    },[isMounted])

    if(!isMounted) return null

    const listaclientes = () => {

        return (
            <>
                <div className="w-full py-2">
                    { trataPaginacao() }        
                </div>

                <TabelaClientes clientes={dados?.itens}/>    
            </>
        )         
    }

    return (
        <>
            <div className="w-full flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight  pt-3">Clientes</h2>
                    Aqui estão seus clientes cadastrados
                </div>
                

                <Button 
                    className="mt-3"
                    onClick={() => router.push('/dashboard/clientes/registrar')}
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
                        placeholder="Informe o conteúdo..."
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

                { !dados?.itens || dados?.itens.length === 0 ? <NenhumResultadoEncontrado /> : listaclientes() }                

            </div>
    
        </>
    )
}

