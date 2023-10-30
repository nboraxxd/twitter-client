import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'

import { AuthLayout, RootLayout } from '@/layout'
import { Home, SignIn, SignUp } from '@/page'

const router = createBrowserRouter([
  // Main routes
  {
    path: PATH.homePage,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.signIn,
        element: <SignIn />,
      },
      {
        path: PATH.signUp,
        element: <SignUp />,
      },
    ],
  },
])

export default router
