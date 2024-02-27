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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import funcoes from "@/global/funcoes";
import alertas from "@/global/alertas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ModalConfirmaOperacao from "@/components/ui/dashboard/dialog-confirma";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { BancoProps } from "@/global/types";

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

export default function Bancos(){
    const[load, setLoad] = useState(false);
    const[dados, setDados] = useState<BancoProps>({
        codigo:'0',
        nome:'',
        telefone:'',
        contato:'',
        codigo_banco:'',
        agencia:'',
        conta_corrente:'',
        codigo_cedente:'',
        titular_nome:'',
        titular_cpf:'',
        tipo_conta:'',
        ativo:'S'
    });

    const router = useRouter();
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);
    const pathName = usePathname();

    
    async function Cadastrar() {        
        setLoad(true)
        try {
            if(!validaCampos())
                return false;

            console.log(JSON.stringify(dados))
               
            const data = await funcoes.post('/bancos', dados);

            if(data?.data.erro == '1') {
                alertas.alertaErro(data.data.mensagem)
                return ;
            }

            alertas.alertaSucesso(data?.data.mensagem);

            router.push(`/dashboard/bancos/registrar?id=${data?.data.codigo}`);                        
        } catch (error) {
            console.log('erro:',error)
        } finally{
            setLoad(false);
        }        
    }

    const validaCampos = () => {
        if(!dados?.nome || dados?.nome.trim() == ''){
            alertas.alertaErro('Nome inválido!');
            return false; 
        }

        return true;
    }

    const alteraDados = (campo: keyof BancoProps, value:string) => {
        setDados((p) => { return {...p, [campo]:value}})
    }

    const alteraDadosTipoConta = (value:string) => {
        alteraDados('tipo_conta', value)
    }

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight pb-4 pt-3">Bancos</h2>
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
                                    onChange={(e) => alteraDados('nome', e.target.value)}
                                />
                            </div>
                            <div className="w-[30%] flex flex-col">
                                <Label>Ativo</Label>
                                <Switch
                                    checked={dados?.ativo == 'S'}
                                    value={'S'}
                                    className="mt-3"
                                    onCheckedChange={() => alteraDados('ativo', dados?.ativo == 'S' ? 'N' : 'S')}
                                />
                            </div>
                        </div>

                        <div className="w-full flex gap-4">
                            <div className="w-[32%]">
                                <Label htmlFor="contato">Contato</Label>
                                <Input 
                                    type="text" 
                                    id="contato"
                                    value={dados?.contato}
                                    onChange={(e) => alteraDados('contato', e.target.value)}
                                    placeholder="Ex: José Antônio"
                                />
                            </div>

                            <div className="w-[20%]">
                                <Label htmlFor="telefone">Telefone</Label>
                                <Input 
                                    type="text" 
                                    id="telefone"
                                    value={dados?.telefone}
                                    onChange={(e) => alteraDados('telefone', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[20%]">
                                <Label htmlFor="telefone">Nome do Titular</Label>
                                <Input 
                                    type="text" 
                                    id="telefone"
                                    value={dados?.titular_nome}
                                    onChange={(e) => alteraDados('titular_nome', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[20%]">
                                <Label htmlFor="telefone">CPF/CNPJ do Titular</Label>
                                <Input 
                                    type="text" 
                                    id="telefone"
                                    value={dados?.titular_cpf}
                                    onChange={(e) => alteraDados('titular_cpf', funcoes.formatarCpf(e.target.value))} 
                                />
                            </div>
                        </div>

                        <div className="w-full flex gap-4">
                            <div className="w-[20%]">
                                <Label htmlFor="codigo_banco">Código do Banco</Label>
                                <Input 
                                    type="text" 
                                    id="codigo_banco"
                                    value={dados?.codigo_banco}
                                    onChange={(e) => alteraDados('codigo_banco', e.target.value)}
                                    placeholder="Ex: 748"
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="agencia">Agência</Label>
                                <Input 
                                    type="text" 
                                    id="agencia"
                                    value={dados?.agencia}
                                    onChange={(e) => alteraDados('agencia', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[20%]">
                                <Label htmlFor="conta_corrente">Conta Corrente</Label>
                                <Input 
                                    type="text" 
                                    id="conta_corrente"
                                    value={dados?.conta_corrente}
                                    onChange={(e) => alteraDados('conta_corrente', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[15%]">
                                <Label htmlFor="codigo_cedente">Código Cedente</Label>
                                <Input 
                                    type="text" 
                                    id="codigo_cedente"
                                    value={dados?.codigo_cedente}
                                    onChange={(e) => alteraDados('codigo_cedente', e.target.value)}                                    
                                />
                            </div>

                            <div className="w-[20%] pr-0">
                                <Label htmlFor="codigo_cedente">Tipo da Conta</Label>
                                <SelectDefault 
                                    data={tipoContaData}
                                    onChange={(value) => alteraDados('tipo_conta', value)}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="configint" className="space-y-4">
                    </TabsContent>
                </Tabs>

                <div className="w-full flex gap-2 flex justify-end py-3 ">
                    <Button
                        variant={"outline"}
                        onClick={() => router.push('/dashboard/financeiro/bancos/registrar')}
                        disabled={load}
                        className='flex gap-2'
                    >
                        <FontAwesomeIcon icon={faAdd} />
                        Novo
                    </Button>

                    <Button
                        variant={"outline"}
                        onClick={() => router.push('/dashboard/financeiro/bancos/consultar')}
                        disabled={load}
                        className='flex gap-2'
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Voltar
                    </Button>

                    <ModalConfirmaOperacao
                        textButton="Salvar"  
                        title="Confirmação da operação"
                        textDescription="Você confirma a atualização ou criação desse cliente?"       
                        onConfirm={() => Cadastrar()}
                        onLoad={load}
                        icon={faSave}  
                    />

                </div>
            </div>
        </>
    )
}

