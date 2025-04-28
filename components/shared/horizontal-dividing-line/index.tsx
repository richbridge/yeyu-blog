'use client'

import Mandala from '@/config/svg/mandala'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export default function HorizontalDividingLine() {
  const { setTheme } = useTheme()
  const rotate = useMotionValue(0)
  const [duration, setDuration] = useState(4)

  useAnimationFrame((_, delta) => {
    rotate.set(rotate.get() + (360 * delta) / (duration * 1000))
  })

  return (
    <div className="relative w-full flex items-center justify-center">
      <hr className="absolute w-[45%] left-0 dark:border-accent border-indigo-500" />
      <motion.div
        style={{ rotate }}
        drag={'x'}
        dragDirectionLock
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.15}
        whileDrag={{ cursor: 'grabbing' }}
        onDragStart={() => setDuration(0.8)}
        onDragEnd={(event, info) => {
          setDuration(4)
          const THRESHOLD = 500
          if (info.offset.x < -THRESHOLD) {
            setTheme('light')
          } else if (info.offset.x > THRESHOLD) {
            setTheme('dark')
          }
        }}
      >
        <Mandala className="size-10 cursor-grabbing" />
      </motion.div>
      <hr className="absolute w-[45%] right-0 dark:border-accent border-indigo-500" />
    </div>
  )
}
