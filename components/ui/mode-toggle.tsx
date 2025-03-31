'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      {theme === 'light' ? (
        <Button onClick={() => setTheme('dark')} size={'sm'}>
          <Moon />
        </Button>
      ) : (
        <Button onClick={() => setTheme('light')} size={'sm'}>
          <Sun />
        </Button>
      )}
    </>
  )
}
