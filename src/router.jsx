import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { Home, Login, VerifyEmail } from '@/page'

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
])

export default router
