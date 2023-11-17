import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { Home, Login, ResetPassword, VerifyEmail } from '@/page'

const router = createBrowserRouter([
  {
    path: PATH.home,
    element: <Home />,
  },
  {
    path: PATH.login,
    element: <Login />,
  },
  {
    path: PATH.verify,
    element: <VerifyEmail />,
  },
  {
    path: PATH.resetPassword,
    element: <ResetPassword />,
  },
])

export default router
