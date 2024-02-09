"use client";

import LoadingPage from "@/components/ui/loading-page";
import { AuthContext } from "@/context/auth-context";
import { useSearchParams,useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

type AuthProps = {
    handleUser: Function;
    setLoginToken: Function;
}

export default function LoginViaEmailPage(){
    const router = useRouter();

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);

    const { handleUser, setLoginToken } = useContext<AuthProps>(AuthContext);

    const trataLoginPorToken = async () => {        
        localStorage.setItem('db', params.get('cnpj') || '');
        setLoginToken(params.get('token'));
        await handleUser()
    }

    useEffect(() => {
        if(params.get('cnpj') === '' || params.get('token') === ''){
            router.push('/entrar')
            return ;
        }

        trataLoginPorToken();

        console.log(params)
    },[router]);

    
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <LoadingPage />            
        </div>
    )
}