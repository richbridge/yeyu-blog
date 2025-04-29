import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export function useTransitionTheme() {
  const { setTheme, theme, themes, forcedTheme, resolvedTheme, systemTheme }
    = useTheme()

  const setTransitionTheme = useCallback(
    (theme: 'light' | 'dark') => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setTheme(theme)
        })
      }
      else {
        setTheme(theme)
      }
    },
    [setTheme],
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
