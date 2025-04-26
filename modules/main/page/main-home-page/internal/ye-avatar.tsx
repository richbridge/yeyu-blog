'use client'

import Image from 'next/image'
import avatar from '@/config/img/avatar.png'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function YeAvatar() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    // 摸摸头~
    // * 拍拍头切换亮暗模式~
    <motion.figure
      className="relative cursor-grab  drop-shadow-2xl active:drop-shadow-purple-300 dark:active:drop-shadow-emerald-300"
      onDoubleClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      whileTap={{ scale: 0.9, rotate: 1 }}
    >
      <Image
        src={avatar}
        alt="avatar"
        className="rounded-full md:w-52 w-44"
        placeholder="blur"
      />
      {/* 亮模式宽度为 2, 暗模式宽度为 4, 视觉效果 */}
      <span
        className="absolute left-0 top-0 size-full rounded-full
                    ring-2 dark:ring-4 
                  ring-pink-600 dark:ring-blue-800 
                    ring-offset-1 animate-ye-ping-one-dot-one"
      />
    </motion.figure>
  )
}
