import BioSection from './internal/bio-section'
import ContactMe from './internal/contact-me'
import TechStack from './internal/tech-stack'
import YeAvatar from './internal/ye-avatar'

export default function MainLayoutContainer() {
  return (
    <main className="text-white flex items-center justify-center flex-col gap-6 py-4">
      <YeAvatar />
      <BioSection />
      <TechStack />
      <ContactMe />
    </main>
  )
}
