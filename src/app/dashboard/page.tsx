import Dashboard from '@/components/pages/dashboard/home'
import Overview from '@/components/ui/dashboard/overview'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dashboard | GSFin',
  description: 'Aqui você pode controlar todas suas finanças'
}

export default function DashboardPage() {
  return <Dashboard />
}
