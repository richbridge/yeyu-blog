'use client'

import Image from 'next/image'
import avatar from '@/config/img/avatar.png'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const YeAvatar = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    // 摸摸头~
    // * 拍拍头切换亮暗模式~
    <figure
      className="relative cursor-grab"
      onDoubleClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Image
        src={avatar}
        alt="avatar"
        width={200}
        className="rounded-full"
        placeholder="blur"
      />
      {/* 亮模式宽度为 2, 暗模式宽度为 4, 视觉效果 */}
      <span
        className="absolute left-0 top-0 rounded-full w-full h-full 
                        ring-2 dark:ring-4 ring-pink-600 dark:ring-blue-800 
                        ring-offset-1 animate-ye-ping-one-dot-one"
      />
    </figure>
  )
}

export default YeAvatar
