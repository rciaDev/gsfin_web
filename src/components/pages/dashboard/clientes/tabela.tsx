import { ClienteProps } from "@/global/types";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import funcoes from "@/global/funcoes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TabelaClientes({ clientes }:ClienteProps[] | any){    

    const router = useRouter();

    const listaStatus = (status?:string) => {
        return status === 'S' ? 
            <Badge variant={'outline'}>Ativo</Badge> : 
            <Badge variant={'outline'} className="text-destructive bg-white border-destructive">Inativo</Badge>
    }

    if(!clientes || clientes == null || clientes == undefined) return null

    console.log(clientes)

    return (
        <div className="rounded-md border">
            <Table>                        
                <TableHeader className="max-h-[20px]">
                    <TableRow className="p-0 py-0 rounded">
                        <TableHead>Nome</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>CPF/CNPJ</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="min-w-full overflow-y-auto ">
                    { (clientes && clientes !== undefined) && clientes?.map((cliente:ClienteProps) => {
                        return ( 
                            <TableRow key={cliente.codigo}>
                                <TableCell className="font-medium">{ funcoes.stripString(cliente.nome,45) }</TableCell>
                                <TableCell>{ listaStatus(cliente.ativo) }</TableCell>
                                <TableCell>{ cliente.cnpj }</TableCell>
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
                                        
                                        {/* <DropdownMenuItem 
                                            className="flex gap-3"
                                            onClick={() => router.push(`/dashboard/clientes/registrar?id=${cliente.codigo}`)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3 text-muted-foreground" />
                                            Excluir
                                        </DropdownMenuItem> */}

                                        {/* <ModalConfirmaOperacao
                                            icon={faTrashAlt}
                                            classNameIcon={"h-3 w-3"}
                                            textButton="Excluir"
                                            classNameButton="bg-none w-full flex justify-start"                                                
                                        /> */}
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