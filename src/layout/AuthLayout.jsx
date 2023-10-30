import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'

export default function AuthLayout() {
  const [isSignIn] = useState(false)

  return (
    <>
      {isSignIn ? (
        <Navigate to={PATH.homePage} />
      ) : (
        <>
          <h1 className="mb-3 text-xl">AuthLayout</h1>
          <Outlet />
        </>
      )}
    </>
  )
}
