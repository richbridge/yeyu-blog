import BioSection from './internal/bio-section'
import EchoCard from './internal/echo-card'
import TechStack from './internal/tech-stack'
import YeAvatar from './internal/ye-avatar'

export default function MainLayoutContainer() {
  return (
    <main className="flex flex-col justify-center items-center gap-6 py-4 overflow-hidden">
      <YeAvatar />
      <BioSection />
      <EchoCard />
      <TechStack />
    </main>
  )
}
