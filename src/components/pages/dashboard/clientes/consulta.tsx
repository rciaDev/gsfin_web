"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/ui/spinner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table";
import DataConsulta from '../datas/clientes.json';
import NenhumResultadoEncontrado from "@/components/ui/dashboard/nenhum-resultado";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// import { ClienteProps } from "@/global/types";
import funcoes from "@/global/funcoes";
import { ClienteProps } from "@/global/types";


export default function ClientesConsulta(){
    const[load, setLoad] = useState(false);
    const[isMounted, setIsMounted] = useState(false)

    const router = useRouter();

    const buscaDados = async () => {        
        setLoad(true)

        // simula busca
        setTimeout(() => {
            setLoad(false)
        },300)
    }
    
    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return null

    const listaclientes = () => {
        return (
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
                    <TableBody className="">
                        { DataConsulta.map((cliente:ClienteProps, index:number) => {
                            return ( 
                                <TableRow key={cliente.codigo}>
                                    <TableCell className="font-medium">{ funcoes.stripString(cliente.nome,45) }</TableCell>
                                    <TableCell>{ listaStatus(cliente.ativo) }</TableCell>
                                    <TableCell>{ cliente.cpfCnpj }</TableCell>
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
                                            <DropdownMenuItem className="flex gap-3 ">
                                                <FontAwesomeIcon icon={faEdit} className="w-3 h-3 text-muted-foreground" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex gap-3 ">
                                                <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3 text-muted-foreground" />
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
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
                    <Input 
                        className="w-[70%] md:w-[50%]"
                        placeholder="Filtre pelo nome..."
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

                { DataConsulta?.length === 0 ? <NenhumResultadoEncontrado /> : listaclientes() }                

            </div>
    
        </>
    )
}

