import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'

export default function RootLayout() {
  const [isSignIn] = useState(false)

  return (
    <>
      {isSignIn ? (
        <>
          <h1 className="mb-3 text-xl">RootLayout</h1>
          <Outlet />
        </>
      ) : (
        <Navigate to={PATH.signIn} />
      )}
    </>
  )
}
