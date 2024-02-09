"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/ui/spinner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table";
import NenhumResultadoEncontrado from "@/components/ui/dashboard/nenhum-resultado";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

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

export default function ClientesConsulta(){
    const[load, setLoad] = useState(false);
    const[isMounted, setIsMounted] = useState(false);

    const[dados, setDados] = useState<ClienteProps[]>([]);
    const[filtro, setFiltro] = useState('');
    const[conteudo, setConteudo] = useState('');

    const router = useRouter();

    const params = useSearchParams()

    const buscaDados = async (isPagination = false) => {      
        setLoad(true);

        try {
            if(filtro !== '' && filtro !== 'geral' && conteudo.trim() == '') return ;


            let cUrl = isPagination ? 
                       `/clientes?filtro=${filtro}&conteudo=${conteudo}&pageSize=10` :
                       `/clientes?filtro=${params.get('filtro')}&conteudo=${params.get('conteudo')}&page=${params.get('page')}&pageSize=10`

            const data = await funcoes.get(cUrl);

            if(!data?.data) return ;

            if(data?.data.erro == '1'){
                alertas.alertaErro(data.data.mensagem)
                return ;
            }
            console.log(data.data)

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

        const totalPaginas = Math.ceil(100 / itensPorPagina);

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
            if(params.get('page') !== ''){
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
            <div className="rounded-md border">
                <Table>                        
                    <TableHeader className="max-h-[20px]">
                        <TableRow className="p-0 py-0 rounded">
                            <TableHead>Nome</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>CPF/CNPJ</TableHead>
                            <TableHead>Celular</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="min-w-full h-[60vh] overflow-y-auto">
                        { dados.map((cliente:ClienteProps) => {
                            return ( 
                                <TableRow key={cliente.codigo}>
                                    <TableCell className="font-medium">{ funcoes.stripString(cliente.nome,45) }</TableCell>
                                    <TableCell>{ listaStatus(cliente.ativo) }</TableCell>
                                    <TableCell>{ cliente.cnpj }</TableCell>
                                    <TableCell>{ cliente.celuar }</TableCell>
                                    <TableCell>{ funcoes.trataCidade(cliente.cidade,cliente.uf) }</TableCell>
                                    <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button 
                                                variant={'outline'}
                                                size={'sm'}
                                                className="flex h-6 w-6 p-0 data-[state=open]:bg-muted"
                                            >
                                                <FontAwesomeIcon icon={faEllipsis} className="w-4 h-3"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[160px]">                                            
                                            <DropdownMenuItem 
                                                className="flex gap-3 "
                                                onClick={() => router.push(`/dashboard/clientes/registrar?id=${cliente.codigo}`)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} className="w-3 h-3 text-muted-foreground" />
                                                Editar
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem 
                                                className="flex gap-3"
                                                onClick={() => router.push(`/dashboard/clientes/registrar?id=${cliente.codigo}`)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3 text-muted-foreground" />
                                                Excluir
                                            </DropdownMenuItem>
                                            <ModalConfirmaOperacao />
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            </>
        )         
    }

    const listaStatus = (status?:string) => {
        return status === 'S' ? 
            <Badge variant={'outline'}>Ativo</Badge> : 
            <Badge variant={'outline'} className="text-destructive bg-white border-destructive">Inativo</Badge>
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

                { dados?.length === 0 ? <NenhumResultadoEncontrado /> : listaclientes() }                

            </div>
    
        </>
    )
}

