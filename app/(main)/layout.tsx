// * 站点展示页的首页布局

import MainLayoutHeader from '@/modules/main/layout/main-layout-header'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import StarsBackground from '@/components/shared/stars-background'
import StartUpMotion from '@/components/shared/start-up-motion'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen max-w-screen bg-slate-950 text-white">
      <MainLayoutHeader />
      <MaxWidthWrapper className="rounded-md">{children}</MaxWidthWrapper>

      <StartUpMotion />
      <StarsBackground />
    </main>
  )
}
