"use client";

import { Button } from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { 
    faBank, 
    faFileInvoice, 
    faFileInvoiceDollar, 
    faMoneyBillTransfer, 
    faUserAltSlash, 
    faUserTie 
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { DropdownMenuSeparator } from "../dropdown-menu";


const sidebar = [
    {
        title:"Cadastros",
        items:[
            {
                title:'Clientes',
                icon:faUser,
                urlAction:'/dashboard/clientes/consultar',
                urlActive:'/dashboard/clientes/'
            },
            {
                title:'Fornecedores',
                icon:faUserTie,
                urlAction:'/dashboard/fornecedores',
                urlActive:'/dashboard/fornecedores/'
            }
        ]
    },
    {
        title:"Financeiro",
        items:[
            {
                title:'Bancos',
                icon:faBank,
                urlAction:'/dashboard/financeiro/bancos/consultar',
                urlActive:'/dashboard/financeiro/bancos/'
            },
            {
                title:'Plano de Contas',
                icon:faFileInvoice,
                urlAction:'/dashboard/financeiro/plano-de-contas',
                urlActive:'/dashboard/financeiro/plano-de-contas/'
            },
            {
                title:'Contas a Pagar',
                icon:faFileInvoiceDollar,
                urlAction:'/dashboard/financeiro/contas/pagar',
                urlActive:'/dashboard/financeiro/contas/pagar'
            },
            {
                title:'Contas a Receber',
                icon:faFileInvoiceDollar,
                urlAction:'/dashboard/financeiro/contas/receber',
                urlActive:'/dashboard/financeiro/contas/receber'
            },
            {
                title:'Pagamentos e recebimentos',
                icon:faMoneyBillTransfer,
                urlAction:'/dashboard/financeiro/contas/pagamentos-recebimentos'
            },
            {
                title:'Conta corrente',
                icon:faMoneyBillTransfer,
                urlAction:'/dashboard/financeiro/conta-corrente'
            }
            
        ]
    }
]


export default function SidebarItems(){
    const pathName = usePathname();

    const router = useRouter();

    const { menuOpened } = useContext<any>(AuthContext);

    const listLinks = (items:any) => {
        return items.map((link:any, index:number) => {
            return (
                <Button 
                    variant={pathName.indexOf(link.urlActive) !== -1 ? 'secondary' : 'ghost'} 
                    className={`w-full ${menuOpened ? 'justify-start' : 'justify-center'}`}
                    onClick={() => router.push(link.urlAction)}
                    key={index}
                    title={link.title}
                >
                    <FontAwesomeIcon 
                        icon={link.icon} 
                        className="mx-2 w-4 h-4"
                    />              
                    { menuOpened ? link.title : '' }
                </Button>
            )
        }) 
    }

    return (
        <div className="">
            { sidebar.map((item, index) => {
                return (
                    <div className="px-3 py-2" key={index}>
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">            
                            { menuOpened ? item.title :  index !== 0  ? <DropdownMenuSeparator /> : <></>}
                        </h2>
                        <div className="space-y-1">
                            { listLinks(item.items) }
                        </div>
                    </div>
                )
            }) }   
        </div>     
    )
}