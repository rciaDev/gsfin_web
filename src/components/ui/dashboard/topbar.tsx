"use client"

import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/ui/dashboard/user-nav"
import Logo from '@/utils/images/logo.png';
import Image from "next/image"
import { Button } from "../button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className? : string  
}

export function Topbar({ className }: SidebarProps) {
  const { user,openMenu,menuOpened } = useContext<any>(AuthContext);

  const pathName = usePathname();

  return (
    <nav className={
      cn(
        `
          w-full 
          shadow 
          h-[55px]
          flex
          items-center
          justify-between          
        `,className)}
    >
      <div className={`
        w-[50%] 
        lg:w-[300px] 
        h-[100%]
        flex 
        items-center 
        justify-center
        gap-3 
      `}>
        <Button 
          variant={'ghost'}
          onClick={() => openMenu(!menuOpened)}
        >
          <FontAwesomeIcon icon={menuOpened ? faXmark : faBars} />
        </Button>

        <Image 
          src={Logo} 
          width="150"
          height="55"
          alt="Text"
          className="w-[100px]"
        />
      </div>

      {/* <div className="hidden md:block w-[30%] md:w-[calc(100%-10%-300px)]">
        <h2 className="tracking-tighter font-semibold">Dashboard</h2> */}
        {/* { trataPaginaAtual() } */}
      {/* </div> */}

      <div className={`
          px-6
          flex
          items-center
          justify-center
          h-full
          w-[20%]
          md:w-[10%]
        `}
      >
        <UserNav />   
      </div>   
    </nav>
  )
}