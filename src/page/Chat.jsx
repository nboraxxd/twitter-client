import socket from '@/utils/socket'
import axios from 'axios'
import { useEffect, useState } from 'react'

const profile = JSON.parse(localStorage.getItem('profile')) || {}
const usernames = ['user654ed7dafb4f9c263db2bcc1', 'user654e5ab05edd311cb0bc3e38']

export default function Chat() {
  const [receiveUserId, setReceiveUserId] = useState('')
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
      from: profile.username,
      to: receiveUserId,
    })
    setValue('')
    setMessages((message) => [...message, { content: value, isSender: true }])
  }

  function getProfile(username) {
    axios.get(`/users/${username}`, { baseURL: import.meta.env.VITE_API_URL }).then((res) => {
      setReceiveUserId(res?.data?.user?._id)
    })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-center mb-1">CHAT</h1>
      <div className="flex flex-col items-center">
        {usernames.map((username, index) => {
          if (username === profile.username) return null
          return (
            <button
              key={index}
              className="border-purple-800 border max-w-[280px] py-2 px-5 bg-purple-800 text-white mb-10"
              onClick={() => getProfile(username)}
            >
              {username}
            </button>
          )
        })}
      </div>
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
