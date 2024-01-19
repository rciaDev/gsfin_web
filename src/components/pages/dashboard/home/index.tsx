import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Overview from "@/components/ui/dashboard/overview";
import { ContasPagarReceber } from "@/components/ui/dashboard/contas-pagar-receber";

export default function Dashboard(){
    return (
        <main>
            <h2 className="text-2xl font-bold tracking-tight pb-4 pt-3">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Receitas
                        </CardTitle>

                        <FontAwesomeIcon 
                            icon={faDollarSign} 
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">R$ 65.231,89</div>
                        <p className="text-xs text-muted-foreground">
                            +20% que o mês passado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Despesas
                        </CardTitle>

                        <FontAwesomeIcon 
                            icon={faDollarSign} 
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 40.231,89</div>
                        <p className="text-xs text-muted-foreground">
                            +30% que o mês passado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Saldo                        
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                    </svg>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">R$ 25.000,00</div>
                    <p className="text-xs text-muted-foreground">
                        -20% que o mês passado
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Previsto
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">R$ 60.023,00</div>
                    <p className="text-xs text-muted-foreground">
                        +10% que o mês passado
                    </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Contas a pagar/receber hoje</CardTitle>
                    <CardDescription>
                      Você tem 3 contas a pagar hoje
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContasPagarReceber />
                  </CardContent>
                </Card>
              </div>
        </main>
    )
}