import type { Metadata } from 'next'
import { ClientProvider } from './providers'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart POS AI Dashboard',
  description: 'Enterprise Smart POS AI Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <ClientProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ClientProvider>
      </body>
    </html>
  )
}
