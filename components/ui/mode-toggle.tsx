'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size="sm"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
