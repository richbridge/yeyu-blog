import Mandala from '@/config/svg/mandala'

export default function HorizontalDividingLine() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <hr className="absolute w-[45%] left-0 dark:border-accent border-indigo-500" />
      <Mandala className="animate-ye-spin-slowly size-10" />
      <hr className="absolute w-[45%] right-0 dark:border-accent border-indigo-500" />
    </div>
  )
}
