import AdminNavbar from '@/modules/admin/admin-main-layout/admin-main-layout-header'
import MaxWidthWrapper from '@/shared/max-width-wrapper'
import { SessionProvider } from 'next-auth/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <main className="min-h-screen max-w-screen bg-black text-white">
        <AdminNavbar />
        <MaxWidthWrapper className="rounded-md">{children}</MaxWidthWrapper>
      </main>
    </SessionProvider>
  )
}
