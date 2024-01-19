'use client';

import { AuthProvider } from "../context/auth-context"

export const ProvidersDashboard = ({ children } : { children:React.ReactNode }) => {
    return <AuthProvider>{ children }</AuthProvider>
}