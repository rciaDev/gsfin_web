"use client";

import { cn } from "@/lib/utils"
import SidebarItems from "./sidebar-items"
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className? : string
}

export function Sidebar({ className }: SidebarProps) {
  const { menuOpened } = useContext<any>(AuthContext);

  return (
    <div className={
      `
        w-100 
        h-[100vh]        
        shadow
        hidden
        md:block ${menuOpened ? 'w-[300px]' : 'w-[80px]'}

      `}
    >
      <div className={cn("pb-12", className)}>
        <div className="space-y-4 py-4">          
          <SidebarItems />            
        </div>
      </div>
    </div>
  )
}