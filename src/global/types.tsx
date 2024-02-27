interface CadastroProps {
    nome?:string,
    cnpj?:string,
    email?:string,
    senha?:string,
    confirmaSenha?:string    
}

interface UserProps {
    erro?:string,
    mensagem?:string,
    token:string,
    codigo:string,
    nome:string,
    email:string,
    cnpj:string,
    db:string,
}

interface ClienteProps{
    codigo?:string,
    nome?:string,
    fantasia?:string,
    cnpj?:string,
    celular?: string,
    cep?:string,
    endereco?:string,
    numero?:string,
    cidade?:string,
    uf?:string,
    complemento?:string,
    bairro?:string,
    rg?:string,
    email?:string,
    ativo?:string
}

interface BancoProps{
    codigo?:string;
    nome?:string;
    telefone?:string;
    contato?:string;
    codigo_banco?:string;
    agencia?:string;
    conta_corrente?:string;
    codigo_cedente?:string;
    tipo_conta?:string;
    titular_nome?:string;
    titular_cpf?:string;
    ativo?:string;
}

type CepProps = {
    logradouro:string,
    bairro:string,
    cep:string,
    ddd:string,
    ibge:string,
    /* cidade */
    localidade:string,
    uf:string
}

export type {
    CadastroProps,
    UserProps,
    ClienteProps,
    CepProps,
    BancoProps
}