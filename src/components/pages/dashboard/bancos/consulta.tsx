"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/ui/spinner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table";
import DataConsulta from '../datas/data-bancos.json';
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
  

interface BancoProps{
    codigo?:string
    nome?:string
    telefone?:string
    contato?:string
    codigo_banco?:string
    agencia?:string
    conta_corrente?:string
    codigo_cedente?:string
    titular_conta?:string
    cpf_cnpj?:string
    tipo_conta?:string,
    ativo?:string
}

export default function BancosConsulta(){
    const[load, setLoad] = useState(false)

    const router = useRouter();

    const buscaDados = async () => {        
        setLoad(true)

        // simula busca
        setTimeout(() => {
            setLoad(false)
        },300)
    }

    

    const listaBancos = () => {
        return (
            <div className="rounded-md border">
                <Table>                        
                    <TableHeader className="max-h-[20px]">
                        <TableRow className="p-0 py-0 rounded">
                            <TableHead>Nome</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        { DataConsulta.map((banco:BancoProps, index:number) => {
                            return ( 
                                <TableRow>
                                    <TableCell className="font-medium">{ banco.nome }</TableCell>
                                    <TableCell>{ listaStatus(banco.ativo) }</TableCell>
                                    <TableCell>{ banco.contato }</TableCell>
                                    <TableCell>{ banco.telefone }</TableCell>
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
                    <h2 className="text-2xl font-bold tracking-tight  pt-3">Bancos</h2>
                    Aqui estão seus bancos cadastrados
                </div>
                

                <Button 
                    className="mt-3"
                    onClick={() => router.push('/registrar')}
                >
                    + Adicionar Banco
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

                { DataConsulta?.length === 0 ? <NenhumResultadoEncontrado /> : listaBancos() }                

            </div>
    
        </>
    )
}

