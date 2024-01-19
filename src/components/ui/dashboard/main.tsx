"use client";

import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"

export const Main = ({ children } : { children:React.ReactNode }) => {
    const { openedMenu } = useContext<any>(AuthContext);

    return (
        <div 
            className={`
                w-[100vw]                 
                md:${openedMenu ? 'w-[calc(100%-300px)]' : 'w-[calc(100%-80px)]'}
                m-0 
                border
                px-4
                py-4
                bg-[#F1F7FA]
            `
            }>
                <div className={`
                    bg-[#FFF]
                    rounded-lg
                    shadow
                    px-6 
                    py-2
                `}>
                    { children }
                </div>
        </div>
    )
}