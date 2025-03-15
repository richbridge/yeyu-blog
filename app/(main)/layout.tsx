// * 站点展示页的首页布局

import MainLayoutHeader from '@/modules/main-layout/main-layout-header'
import MaxWidthWrapper from '@/shared/max-width-wrapper'
import StarsBackground from '@/shared/stars-background'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen w-screen bg-slate-950 text-white">
      <MainLayoutHeader />

      <MaxWidthWrapper className="bg-slate-600">{children}</MaxWidthWrapper>

      <StarsBackground />
    </main>
  )
}
