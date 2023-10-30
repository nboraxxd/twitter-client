import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

export default function Home() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Google OAuth 2.0</h1>
      <Link to={PATH.login}>Login</Link>
    </>
  )
}
