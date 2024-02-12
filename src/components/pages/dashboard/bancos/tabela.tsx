
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader,
    TableRow 
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { BancoProps } from "@/global/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TabelaBancos({ bancos }:BancoProps[] | any){    

    const listaStatus = (status?:string) => {
        return status === 'S' ? 
            <Badge variant={'outline'}>Ativo</Badge> : 
            <Badge variant={'outline'} className="text-destructive bg-white border-destructive">Inativo</Badge>
    }

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
                    { bancos.map((banco:BancoProps, index:number) => {
                        return ( 
                            <TableRow key={index}>
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