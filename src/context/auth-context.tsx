"use client"

import LoadingPage from "@/components/ui/loading-page";
import { useRouter } from "next/navigation";
import { usePathname  } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import api from "@/services/api";
import { UserProps } from "@/global/types";
import alertas from "@/global/alertas";

export const AuthContext:any = React.createContext({});

export function AuthProvider({ children } : { children:React.ReactNode }){
    const[user,setUser] = useState<UserProps>();
    // const[expandMain, setExpandMain] = useState(false);
    const[menuOpened, setMenuOpened] = useState(true);
    const[load,setLoad] = useState(false);

    const router = useRouter();
    const pathName = usePathname();
    
    const TOKEN_KEY = "@gsfin-token"

    function getToken() {
        const { '@gsfin-token':token } = parseCookies();
        return token;
    }

    function setLoginToken(token:string) {
        setCookie(undefined, TOKEN_KEY,token,{
            maxAge:60 * 60 * 24, // 1 dia
            path:'/' 
        })
        return true;
    }

    function setLogoutToken() {
        try {
            setCookie(undefined, TOKEN_KEY,'',{
                maxAge:-1,
                path:'/' 
            });  
            
            router.push('/');
        } catch (error) {
            console.log('logout ',error)
        }
    }

    function Logout(){
        try {
            // conectar na api e fazer logout
            setLogoutToken();
        } catch (error) {
            
        }
    }

    const openMenu = () => {
        localStorage.setItem('menuOpened',!menuOpened ? 'true' : 'false')
        setMenuOpened(!menuOpened)
    }

    useEffect(() => {
        const handleMenu = () => {
            const isOpened = localStorage.getItem('menuOpened');

            console.log(isOpened)
            
            if(isOpened !== null)
               setMenuOpened(isOpened === 'true');
        }

        handleMenu();
    },[])

    // useEffect(() => {        
    //     localStorage.setItem('menuOpened',menuOpened ? 'true' : 'false')
    // },[menuOpened])

    useEffect(() => {
        async function handleUser(){
            setLoad(true)

            try {                
                const token = getToken();
                const db    = localStorage.getItem('db');
                
                if(!token && pathName.indexOf('dashboard') != -1){
                    setLogoutToken();
                    return ;
                }      

                const data_user = await api.get('/dados-usuario?db='+db);

                if(data_user.data.erro == '99'){
                    setLogoutToken();

                    router.push('/entrar')
                }

                if(data_user.data.erro == '1'){
                    alertas.alertaErro('Erro ao atualizar pagina')
                    return ;
                }
                
                setUser(data_user.data);
                
                if(pathName.indexOf('entrar') !== -1)
                    router.push('/dashboard');                
            } catch (error) {
                console.log('erro ',error)                
            } finally {
                setLoad(false)
            }
        }

        if(!user && pathName.startsWith('/dashboard')){
            console.log('Chamou data')
            handleUser()
        }
    },[router]);
    
  
    return (
        <AuthContext.Provider
            value={{ 
                user,
                setUser,
                getToken,
                setLoginToken,
                setLogoutToken,
                Logout,
                // expandMain,
                // setExpandMain,
                menuOpened,
                openMenu
            }}
        >
            <ToastContainer />
            { load ? 'Buscando dados' : children }
        </AuthContext.Provider>
    );
}