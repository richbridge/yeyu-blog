import MainLayoutHeader from '@/modules/main/layout/main-layout-header'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import StarsBackground from '@/components/shared/stars-background'
import StartUpMotion from '@/components/shared/start-up-motion'
import ContactMe from '@/components/shared/contact-me'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      className="min-h-screen max-w-screen overflow-x-hidden 
                bg-slate-200 dark:bg-black dark:text-white
                  md:text-lg"
    >
      <MainLayoutHeader />
      <MaxWidthWrapper>
        {children}
        <ContactMe />
      </MaxWidthWrapper>

      <StartUpMotion />
      <StarsBackground />
    </main>
  )
}
