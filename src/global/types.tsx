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
    nome:string,
    cpfCnpj:string,
    celuar: string,
    endereco:string,
    numero:string,
    cidade:string,
    uf:string,
    complemento:string,
    bairro:string,
    rg:string,
    email:string,
    ativo:string
}

export type {
    CadastroProps,
    UserProps,
    ClienteProps
}