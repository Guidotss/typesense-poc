import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'POC - Typesense',
  description: 'POC - Typesense',
  generator: 'POC - Typesense',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
