"use client";

import LoadingPage from "@/components/ui/loading-page";
import React, { useState } from "react";

export const CadastroContext:any = React.createContext({});

interface CadastroProps {
    nome?:string,
    cnpj?:string,
    email?:string,
    senha?:string,
    confirmaSenha?:string    
}

export function CadastroProvider({ children } : { children:React.ReactNode }){
    const[dados, setDados] = useState<CadastroProps>({})
    const[load, setLoad] = useState(false);

    const alteraDados = (campo:string, value:string) => {
        setDados((p) => { return {...p, [campo]:value}})
    }

    return (
        <CadastroContext.Provider 
            value={{
                dados,
                alteraDados
            }}
        >
            { load ? <LoadingPage /> : children }
        </CadastroContext.Provider>
    );
}