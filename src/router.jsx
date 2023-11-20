import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { Chat, Home, Login, ResetPassword, VerifyEmail, Video } from '@/page'

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
  {
    path: PATH.watch,
    element: <Video />,
  },
  {
    path: PATH.chat,
    element: <Chat />,
  },
])

export default router
