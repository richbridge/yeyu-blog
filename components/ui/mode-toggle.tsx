'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransitionTheme } from '@/hooks/use-transition-theme'

export function ModeToggle() {
  const { setTransitionTheme, theme } = useTransitionTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      onClick={() => setTransitionTheme(theme === 'light' ? 'dark' : 'light')}
      size="sm"
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  )
}
