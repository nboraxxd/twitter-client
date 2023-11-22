import socket from '@/utils/socket'
import { useEffect, useState } from 'react'

const profile = JSON.parse(localStorage.getItem('profile'))
export default function Chat() {
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.auth = {
      _id: profile._id,
    }
    socket.connect()

    socket.on('receive private message', (data) => {
      const { content } = data
      setMessages((message) => [...message, { content, isSender: false }])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  function send(ev) {
    ev.preventDefault()

    socket.emit('private message', {
      content: value,
      to: '654e5ab05edd311cb0bc3e38', // user_id
    })
    setValue('')
    setMessages((message) => [...message, { content: value, isSender: true }])
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-center mb-5">CHAT</h1>
      <div className="mx-32">
        {messages.map((message, index) => {
          return (
            <div key={index} className="flex">
              <p className={message.isSender ? 'ml-auto' : ''}>{message.content}</p>
            </div>
          )
        })}
      </div>
      <form onSubmit={send}>
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
