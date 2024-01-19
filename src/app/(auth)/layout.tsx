import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/auth-context';
import { CadastroProvider } from '@/context/cadastro-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <CadastroProvider>
            <section className="bg-gray-50 dark:bg-gray-900">
              { children }                      
            </section>
          </CadastroProvider>
        </AuthProvider>
      </body>
    </html>    
  )
}
