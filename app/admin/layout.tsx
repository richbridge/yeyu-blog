import MaxWidthWrapper from '@/shared/max-width-wrapper'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen max-w-screen bg-black text-white">
      <MaxWidthWrapper className="rounded-md">{children}</MaxWidthWrapper>
    </main>
  )
}
