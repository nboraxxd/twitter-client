import axios from 'axios'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

function App() {
  useEffect(() => {
    const controller = new AbortController()
    for (let i = 0; i < 20; i++) {
      axios
        .get('/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          baseURL: import.meta.env.VITE_API_URL,
          signal: controller.signal,
        })
        .then((res) => {
          const profile = res.data.result
          localStorage.setItem('profile', JSON.stringify(profile))
        })
    }

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
