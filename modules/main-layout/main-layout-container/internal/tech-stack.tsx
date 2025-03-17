import GolangSvg from '@/config/svg/golang-svg'
import NextjsSvg from '@/config/svg/nextjs-svg'
import ReactSvg from '@/config/svg/reactjs-svg'
import VueSvg from '@/config/svg/vuejs-svg'
import TailwindcssSvg from '@/config/svg/tailwindcss-svg'
import TypeScriptSvg from '@/config/svg/typescript-svg'

import { ArrowDown } from 'lucide-react'

const techStackSvg = [
  ReactSvg,
  VueSvg,
  NextjsSvg,
  GolangSvg,
  TailwindcssSvg,
  TypeScriptSvg,
]

const TechStack = () => {
  return (
    <>
      <ArrowDown height={100} width={40} className="animate-bounce mx-auto" />
      {/* 尺子量的~ */}
      <section className="size-[570px] relative mb-11 rounded-full animate-ye-spin-slowly">
        {techStackSvg.map((svg, i) => (
          <div
            key={i}
            className="absolute object-cover left-[220px] drop-shadow-[0_0_0.75rem_#211C84] hover:drop-shadow-[0_0_0.75rem_#4D55CC] hover:cursor-pointer z-10"
            style={{
              transformOrigin: `center 260px`,
              transform: `rotate(${i * (360 / techStackSvg.length)}deg)`,
            }}
          >
            {svg()}
          </div>
        ))}
      </section>
    </>
  )
}

export default TechStack
