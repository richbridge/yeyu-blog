import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export function useTransitionTheme() {
  const { setTheme, theme, themes, forcedTheme, resolvedTheme, systemTheme }
    = useTheme()

  const setTransitionTheme = useCallback(
    (t: 'light' | 'dark') => {
      if (theme === t)
        return
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setTheme(t)
        })
      }
      else {
        setTheme(t)
      }
    },
    [setTheme, theme],
  )

  return {
    setTransitionTheme,
    theme,
    themes,
    forcedTheme,
    resolvedTheme,
    systemTheme,
  }
}
