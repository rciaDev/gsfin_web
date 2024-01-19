import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function ContasPagarReceber() {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Apromsnet Ltda</p>
            <p className="text-sm text-muted-foreground">
              aproms@apromsnet.com.br
            </p>
          </div>
          <div className="ml-auto font-medium">+ R$ 3.000,00</div>
        </div>
        <div className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Hrsoft Sistemas LTDA</p>
            <p className="text-sm text-muted-foreground">
              adm@rcia.com.br
            </p>
          </div>
          <div className="ml-auto font-medium">+ R$ 2.000,00</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>GN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Salário Gabriel</p>
            <p className="text-sm text-muted-foreground">
              gabrielbangarcl@gmail.com
            </p>
          </div>
          <div className="ml-auto font-medium text-destructive"> - R$ 3.000,00</div>
        </div>
        
      </div>
    )
  }