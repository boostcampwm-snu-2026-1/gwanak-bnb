import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '관악BnB - 여행자 선택',
  description: 'Airbnb 스타일 여행자 선택 기능 - React 학습 프로젝트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
