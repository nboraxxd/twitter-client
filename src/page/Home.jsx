import { PATH } from '@/constants/path'
import { Link } from 'react-router-dom'

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  const profile = JSON.parse(localStorage.getItem('profile')) || {}

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col gap-5">
          <span>Hello my {profile.name}, you are logged in.</span>
          <Link
            to={PATH.watch}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-36"
          >
            Watch video
          </Link>
          <Link
            to={PATH.chat}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-36"
          >
            Chat
          </Link>
          <button
            onClick={logout}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-36"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to={PATH.login}>Login</Link>
      )}
    </>
  )
}
