import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from '@/components/ui/dashboard/sidebar';
import { Topbar } from '@/components/ui/dashboard/topbar';
import { Metadata } from 'next';
import { ProvidersDashboard } from '@/providers/providers-dashboard';
import { Main } from '@/components/ui/dashboard/main';

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ProvidersDashboard>          
          <div className='w-full h-full'>
            <Topbar />
            <div className='w-full flex justify-between'>
              <Sidebar />

              <Main>
                { children }
              </Main>              
            </div>            
          </div>        
        </ProvidersDashboard>
      </body>
    </html>    
  )
}
