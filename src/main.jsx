// React 앱의 진입점(entry point)
// index.html의 <div id="root"> 에 App 컴포넌트를 마운트한다

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // 전역 스타일 (Tailwind CSS 포함)
import App from './App.jsx'

// StrictMode: 개발 환경에서 잠재적 문제를 감지하기 위해 컴포넌트를 두 번 렌더링
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
