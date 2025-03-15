import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-webfont/1.7.0/lxgwwenkai-regular.min.css"
        />
      </head>
      <body className="ye-font">{children}</body>
    </html>
  )
}
