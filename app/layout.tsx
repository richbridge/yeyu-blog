import { ThemeProvider } from '@/components/ui/theme-provider'
import { LXGW_WenKai_Mono_TC } from 'next/font/google'
import './globals.css'

const LXGW = LXGW_WenKai_Mono_TC({
  weight: ['300', '700'],
  display: 'swap',
  variable: '--ye-font',
  preload: false,
})

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
      </body>
    </html>
  )
}
