import { ThemeProvider } from '@/components/ui/theme-provider'
import { LXGW, metadata } from '@/config/constant'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // * 添加亮暗切换必报水合错误错误😅
    <html lang="zh-CN" suppressHydrationWarning className={LXGW.variable}>
      <body className="font-ye-font">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
