"use client";

import clientes from '@/components/pages/dashboard/data/clientes.json'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ClienteProps } from "@/global/types";
import funcoes from "@/global/funcoes";
import ModalConfirmaOperacao from "@/components/ui/dashboard/dialog-confirma";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowLeft, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/ui/spinner';
import alertas from '@/global/alertas';


export default function ClientesRegistra(){
    const[load, setLoad] = useState(false);
    const[loadBusca, setLoadBusca] = useState(false);
    const[dados, setDados] = useState<ClienteProps>({
        codigo:'0',
        ativo:'S',
        bairro:'',
        cep:'',
        celular:'',
        cidade:'',
        complemento:'',
        cnpj:'',
        email:'',
        endereco:'',
        fantasia:'',
        nome:'',
        numero:'',
        rg:'',
        uf:''
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
               
            const data = await funcoes.post('/clientes', dados);

            if(data?.data.erro == '1') {
                alertas.alertaErro(data.data.mensagem)
                return ;
            }

            alertas.alertaSucesso(data?.data.mensagem);

            router.push(`/dashboard/clientes/registrar?id=${data?.data.codigo}`);                        
        } catch (error) {
            console.log('erro:',error)
        } finally{
            setLoad(false);
        }        
    }

    async function buscaCliente(){
        try {
            const data = await funcoes.get(`/clientes?id=${params.get('id')}`)

            if (data?.data.erro == '1'){
                alertas.alertaErro(data?.data.mensagem)
                return ;
            }
            
            setDados(data?.data)
        } catch (error) {
            
        }
    }

    async function novoCliente(){
        setDados({
            codigo:'0',
            ativo:'S',
            bairro:'',
            cep:'',
            celular:'',
            cidade:'',
            complemento:'',
            cnpj:'',
            email:'',
            endereco:'',
            fantasia:'',
            nome:'',
            numero:'',
            rg:'',
            uf:''
        })
    }

    const alteraDados = (campo: keyof ClienteProps, value:string) => {
        setDados((p) => { return {...p, [campo]:value}})
    }

    const validaCampos = () => {
        if(!dados?.cnpj || !funcoes.validaCPFCNPJ(dados.cnpj)){
            alertas.alertaErro('CNPJ inválido!');
            return false; 
        }

        if(!dados?.nome || dados?.nome.trim() === ''){
            alertas.alertaErro('Favor informar o nome do cliente!');
            return false;            
        }

        return true;
    }

    const trataCep = async (cep: string) => {
        const data = await funcoes.buscaCep(cep);

        console.log(data)

        if(!data) return ;
 
        setDados((p) => {
            return {
                ...p,
                cep: data.cep,
                endereco: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                uf: data.uf                
            }
        })
    }

    const buscaDadosReceita = async () => {
        setLoadBusca(true);
        try {
            const data = await funcoes.buscaDadosReceita(dados?.cnpj)

            if(data == undefined) return ;

            setDados((p) => {
                return {
                    ...p,
                    nome: data.nome,
                    fantasia: data.fantasia,
                    cep:funcoes.formatarCep(data.cep),
                    endereco:data.endereco,
                    bairro:data.bairro,
                    email:data.email,
                    numero: funcoes.somenteNumero(data.numero),
                    cidade: data.cidade,
                    uf:data.uf
                }
            })    
        } finally{
            setLoadBusca(false);
        }
        
    }

    useEffect(() => {
        if (params.get('id') != undefined && params.get('id') !== '')
            buscaCliente();
        else 
            novoCliente();
    },[pathName, searchParams])

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight pb-4 pt-3">Clientes</h2>
            <div className="flex-1 space-y-2 ">  
                
                <div className="w-full flex lg:flex-wrap gap-4 ">
                    <div className="w-1/3 lg:w-1/3 ">
                        <Label htmlFor="cnpj">CPF/CNPJ *</Label>
                        <div className='flex gap-2'>
                            <Input 
                                type="text" 
                                id="cnpj"
                                value={dados?.cnpj}
                                onChange={(e) => alteraDados('cnpj', funcoes.formatarCpf(e.target.value))}
                                autoFocus={true}
                            />

                            <Button 
                                variant={'ghost'}
                                title='Busca os dados na receita ferederal'
                                onClick={() => buscaDadosReceita()}
                                disabled={loadBusca}
                            >
                                { loadBusca ? 
                                    <Spinner className='w-3 h-3 fill-secondary-foreground' /> : 
                                    <FontAwesomeIcon 
                                        icon={faSearch} 
                                        className='w-3 h-3'                                                                        
                                    /> 
                                }
                            </Button>
                        </div>
                        
                    </div>

                    <div className="w-1/3 lg:w-1/4">
                        <Label htmlFor="rgIe">RG/IE</Label>
                        <Input 
                            type="text" 
                            id="cpfCnpj"
                            value={dados?.rg}
                            onChange={(e) => alteraDados('rg', e.target.value)}
                        />
                    </div>

                    <div className="w-1/3 ml-3 flex flex-col">
                        <Label>Ativo</Label>
                        <Switch
                            checked={dados?.ativo == 'S'}
                            value={'S'}
                            className="mt-3"                            
                            
                            onCheckedChange={() => alteraDados('ativo', dados?.ativo == 'S' ? 'N' : 'S')}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row lg:gap-4">
                    <div className="w-full lg:w-1/2">
                        <Label>Nome/Razão Social</Label>
                        <Input 
                            type="text" 
                            id="nome"
                            value={dados?.nome}
                            className="uppercase"
                            onChange={(e) => alteraDados('nome', e.target.value)}
                        />
                    </div>

                    <div className="w-full lg:w-1/2">
                        <Label htmlFor="fantasia">Nome de Fantasia</Label>
                        <Input 
                            type="text" 
                            id="fantasia"
                            value={dados?.fantasia}
                            className="uppercase"
                            onChange={(e) => alteraDados('fantasia', e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-4 lg:flex">                    

                    <div className="w-1/4 lg:w-1/4">
                        <Label htmlFor="celuar">Celular</Label>
                        <Input 
                            type="text" 
                            id="celuar"
                            value={dados?.celular}
                            onChange={(e) => alteraDados('celular', funcoes.formataCelular(e.target.value))}                            
                        />
                    </div>

                    <div className="w-[75%] lg:w-1/1">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="text" 
                            id="email"
                            value={dados?.email}
                            onChange={(e) => alteraDados('email', e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-4">
                    <div className="w-1/4">
                        <Label htmlFor="cep">CEP</Label>
                        <Input 
                            type="text" 
                            id="cep"
                            value={dados?.cep}
                            onChange={(e) => alteraDados('cep', e.target.value)}
                            onBlur={(e) => trataCep(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input 
                            type="text" 
                            id="endereco"
                            value={dados?.endereco}
                            className="uppercase"
                            onChange={(e) => alteraDados('endereco', e.target.value)}
                        />
                    </div>

                    <div className="w-1/4">
                        <Label htmlFor="numero">Número</Label>
                        <Input 
                            type="text" 
                            id="numero"
                            value={dados?.numero}
                            onChange={(e) => alteraDados('numero', funcoes.somenteNumero(e.target.value))}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-4">
                    <div className="w-1/3">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input 
                            type="text" 
                            id="complemento"
                            value={dados?.complemento}
                            className="uppercase"
                            onChange={(e) => alteraDados('complemento', e.target.value)}
                        />
                    </div>

                    <div className="w-1/3">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input 
                            type="text" 
                            id="bairro"
                            value={dados?.bairro}
                            className="uppercase"
                            onChange={(e) => alteraDados('bairro', e.target.value)}
                        />
                    </div>

                    <div className="w-1/3 ">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input 
                            type="text" 
                            id="cidade"
                            value={dados?.cidade}
                            disabled
                        />
                    </div>
                    <div className="w-1/6 ">
                        <Label htmlFor="cidade">UF</Label>
                        <Input 
                            type="text" 
                            id="UF"
                            value={dados?.uf}
                            disabled
                        />
                    </div>
                </div>

                <div className="w-full flex gap-2 flex justify-end py-3 ">
                    <Button
                        variant={"outline"}
                        onClick={() => router.push('/dashboard/clientes/registrar')}
                        disabled={load}
                        className='flex gap-2'
                    >
                        <FontAwesomeIcon icon={faAdd} />
                        Novo
                    </Button>

                    <Button
                        variant={"outline"}
                        onClick={() => router.push('/dashboard/clientes/consultar')}
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

