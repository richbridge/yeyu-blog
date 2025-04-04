import { ModalOpenProvider } from '@/components/context/modal-open-context'
import AdminNavbar from '@/modules/admin/admin-main-layout/admin-main-layout-header'
import { SessionProvider } from 'next-auth/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ModalOpenProvider>
        <main className="min-h-screen max-w-screen bg-black text-white flex flex-col">
          <AdminNavbar />
          <div className="mt-16 px-6 m-auto w-full min-h-[calc(100vh-70px)] flex">
            <main className="flex-1 flex">{children}</main>
          </div>
        </main>
      </ModalOpenProvider>
    </SessionProvider>
  )
}
