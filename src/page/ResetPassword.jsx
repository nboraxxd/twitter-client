import { useEffect, useState } from 'react'
import axios from 'axios'

import useQueryParams from '@/hook/useQueryParams'

export default function ResetPassword() {
  const { token } = useQueryParams()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    if (token) {
      axios
        .post(
          '/users/reset-password',
          { forgot_password_token: token, password: 'Abcd12345^%', confirm_password: 'Abcd12345^%' },
          { baseURL: import.meta.env.VITE_API_URL, signal: controller.signal }
        )
        .then((res) => {
          setMessage(res.data.message)
          if (res.data.result) {
            const { access_token, refresh_token } = res.data.result

            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
          }
        })
        .catch((err) => {
          throw err
        })
    }

    return () => {
      controller.abort()
    }
  }, [token])

  return <div>{message}</div>
}
