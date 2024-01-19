"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { SelectDefault } from "@/components/ui/select-default";
import { useRouter } from "next/navigation";

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

const tipoContaData = [
    {
        value:'C',
        text:'Caixa'
    },
    {
        value:'B',
        text:'Banco'
    }
]

export default function ClientesRegistra(){
    const[dados, setDados] = useState<BancoProps>();

    const router = useRouter();
    
    async function Cadastrar() {
        
    }

    const handleChange = (campo: keyof BancoProps, value:string) => {
        setDados((p) => { return {...p, [campo]:value}})
    }

    const handleChangeTipoConta = (value:string) => {
        console.log('a')
        handleChange('tipo_conta', value)
    }

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight pb-4 pt-3">Clientes</h2>
            <div className="flex-1 space-y-4 ">
                <Tabs defaultValue="banco" className="space-y-4">
                    <TabsList className="bg-secondary">
                        <TabsTrigger value="banco" >
                            Banco
                        </TabsTrigger>
                        <TabsTrigger value="configint" >
                            Configurações de Integração
                        </TabsTrigger>                        
                    </TabsList>
                    <TabsContent value="banco" className="space-y-4 flex flex-col">
                        <div className="w-full flex gap-4">
                            <div className="w-[40%]">
                                <Label>Nome</Label>
                                <Input 
                                    type="text" 
                                    id="nome" 
                                    placeholder="Ex: Sicredi"
                                    value={dados?.nome}
                                    onChange={(e) => handleChange('nome', e.target.value)}
                                />
                            </div>
                            <div className="w-[30%] flex flex-col">
                                <Label>Ativo</Label>
                                <Switch
                                    checked={dados?.ativo == 'S'}
                                    value={'S'}
                                    className="mt-3"
                                    onCheckedChange={() => handleChange('ativo', dados?.ativo == 'S' ? 'N' : 'S')}
                                />
                            </div>
                        </div>

                        <div className="w-full flex gap-4">
                            <div className="w-[24%]">
                                <Label htmlFor="contato">Contato</Label>
                                <Input 
                                    type="text" 
                                    id="contato"
                                    value={dados?.contato}
                                    onChange={(e) => handleChange('contato', e.target.value)}
                                    placeholder="Ex: José Antônio"
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="telefone">Telefone</Label>
                                <Input 
                                    type="text" 
                                    id="telefone"
                                    value={dados?.telefone}
                                    onChange={(e) => handleChange('telefone', e.target.value)}                                    
                                />
                            </div>
                        </div>

                        <div className="w-full flex gap-4">
                            <div className="w-[15%]">
                                <Label htmlFor="codigo_banco">Código do Banco</Label>
                                <Input 
                                    type="text" 
                                    id="codigo_banco"
                                    value={dados?.codigo_banco}
                                    onChange={(e) => handleChange('codigo_banco', e.target.value)}
                                    placeholder="Ex: 748"
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="agencia">Agência</Label>
                                <Input 
                                    type="text" 
                                    id="agencia"
                                    value={dados?.agencia}
                                    onChange={(e) => handleChange('agencia', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="conta_corrente">Conta Corrente</Label>
                                <Input 
                                    type="text" 
                                    id="conta_corrente"
                                    value={dados?.conta_corrente}
                                    onChange={(e) => handleChange('conta_corrente', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="codigo_cedente">Código Cedente</Label>
                                <Input 
                                    type="text" 
                                    id="codigo_cedente"
                                    value={dados?.codigo_cedente}
                                    onChange={(e) => handleChange('codigo_cedente', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="codigo_cedente">Tipo da Conta</Label>
                                <SelectDefault 
                                    data={tipoContaData}
                                    onChange={() => handleChangeTipoConta}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="configint" className="space-y-4">
                        <p>config</p>
                    </TabsContent>
                </Tabs>

                <div className="w-full flex gap-2 flex justify-end py-3 ">
                    <Button
                        variant={"outline"}
                        onClick={() => router.push('/dashboard/financeiro/bancos/consultar')}
                    >
                        Cancelar
                    </Button>

                    <Button>
                        Salvar
                    </Button>
                </div>
            </div>
        </>
    )
}

