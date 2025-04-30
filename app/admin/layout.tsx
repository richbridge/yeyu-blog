import { ModalProvider } from '@/components/provider/modal-provider'
import { Toaster } from '@/components/ui/sonner'
import AdminNavbar from '@/modules/admin/layout/admin-layout-header'
import { SessionProvider } from 'next-auth/react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <main className="flex flex-col min-h-screen max-w-screen dark:bg-black dark:text-white">
        <AdminNavbar />
        <div className="flex-1 px-6 flex mt-2">
          <main className="flex-1 flex">{children}</main>
        </div>
        <ModalProvider />
        <Toaster position="top-center" richColors />
      </main>
    </SessionProvider>
  )
}
