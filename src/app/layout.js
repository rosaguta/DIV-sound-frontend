import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DIV SoundBoard',
  description: 'soundboard',
  icon: ""
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
      <link rel="icon" type="image/x-icon" href="https://git.digitalindividuals.com/uploads/-/system/appearance/header_logo/1/div_logo_2.png" />
        <script src='src="/socket.io/socket.io.js"' defer/>
      </header>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
