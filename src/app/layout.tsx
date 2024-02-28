import { Metadata } from 'next';

import './globals.css'
import Navbar from './Components/NavBar/Navbar'

export const metadata: Metadata= {
  title: 'Delivery.Eats',
  description: 'Order',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body className='no-scrollbar' >
      <header className='fixed top-0 z-20 w-full'>
      <Navbar/>
      </header>
      <main className='relative mt-16'>
      {children}
      </main>
      </body>
    </html>
  )
}
