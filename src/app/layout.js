import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DIV SoundBoard',
  description: 'soundboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        <script src='src="/socket.io/socket.io.js' />
      </header>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
