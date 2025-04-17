import GolangSvg from '@/config/svg/golang-svg'
import NextjsSvg from '@/config/svg/nextjs-svg'
import ReactSvg from '@/config/svg/reactjs-svg'
import VueSvg from '@/config/svg/vuejs-svg'
import TailwindcssSvg from '@/config/svg/tailwindcss-svg'
import TypeScriptSvg from '@/config/svg/typescript-svg'
import { ArrowDown } from 'lucide-react'

const techStackSvg = [
  <ReactSvg />,
  <VueSvg />,
  <NextjsSvg />,
  <GolangSvg />,
  <TailwindcssSvg />,
  <TypeScriptSvg />,
]

const TechStack = () => {
  return (
    <div>
      <ArrowDown height={100} width={40} className="animate-bounce mx-auto" />
      {/* 尺子量的~ */}
      <section className="relative size-[250px] md:size-[500px] rounded-full animate-ye-spin-slowly">
        {techStackSvg.map((svg, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 size-1/4 md:size-32 z-10
                        drop-shadow-[0_0_0.75rem_#211C84]
                        hover:drop-shadow-[0_0_0.75rem_#4D55CC] hover:cursor-pointer
                        origin-[center_125px] md:origin-[center_250px]
                        "
            style={{
              transform: `rotate(${i * (360 / techStackSvg.length)}deg)`,
            }}
          >
            {svg}
          </div>
        ))}
      </section>
    </div>
  )
}

export default TechStack
