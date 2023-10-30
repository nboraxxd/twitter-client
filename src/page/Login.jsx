import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import getGoogleOAuthURL from '@/utils/getGoogleOAuthURL'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { PATH } from '@/constants/path'

export default function Login() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const googleOAuthURL = getGoogleOAuthURL()

  useEffect(() => {
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)

    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      navigate(PATH.home)
    }
  }, [navigate, params])

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
      <Link to={googleOAuthURL}>Login with Google</Link>
    </>
  )
}
