import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GSFin',
  description: 'Aplicativo de finanças',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <p>Teste</p>
          { children }
        </AuthProvider>
      </body>
    </html>
  )
}
