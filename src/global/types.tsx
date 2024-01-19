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

export type {
    CadastroProps,
    UserProps
}