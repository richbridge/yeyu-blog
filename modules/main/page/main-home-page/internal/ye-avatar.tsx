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
      <span className="absolute left-0 top-0 rounded-full w-full h-full ring-4 ring-blue-800 ring-offset-1 animate-ye-ping-one-dot-one" />
    </figure>
  )
}

export default YeAvatar
