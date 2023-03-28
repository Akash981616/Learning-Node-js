import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AuthProvider>
      <h1>Helfasdfadfaslo world!</h1>
    </AuthProvider>
  );
}
