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
        <div className="mt-16 px-6 m-auto w-full min-h-[calc(100vh-70px)] flex">
          <main className="flex-1 flex">{children}</main>
        </div>
        <ModalProvider />
        <Toaster position="top-center" expand richColors />
      </main>
    </SessionProvider>
  )
}
