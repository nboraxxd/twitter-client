import socket from '@/utils/socket'
import { useEffect, useState } from 'react'

const profile = JSON.parse(localStorage.getItem('profile'))
export default function Chat() {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState([])

  useEffect(() => {
    socket.auth = {
      _id: profile._id,
    }
    socket.connect()

    socket.on('receive private message', (data) => {
      console.log(data)
      setMessage((message) => [...message, data])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  function handleSubmit(ev) {
    ev.preventDefault()

    socket.emit('private message', {
      content: value,
      to: '654e5ab05edd311cb0bc3e38', // user_id
    })
    setValue('')
  }

  return (
    <div>
      <h1>Chat</h1>
      <div className="">
        {message.map((message, index) => {
          return (
            <div key={index}>
              <strong>{message.from}</strong>: <span>{message.content}</span>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </form>
    </div>
  )
}
