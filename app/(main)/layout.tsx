// * 站点展示页的首页布局

import { signIn } from '@/auth'
import MainLayoutHeader from '@/modules/main/main-layout/main-layout-header'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import StarsBackground from '@/components/shared/stars-background'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen max-w-screen bg-slate-950 text-white">
      <MainLayoutHeader />

      <MaxWidthWrapper className="rounded-md">{children}</MaxWidthWrapper>

      <StarsBackground />
    </main>
  )
}
