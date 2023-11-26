import socket from '@/utils/socket'
import axios from 'axios'
import { useEffect, useState } from 'react'

const profile = JSON.parse(localStorage.getItem('profile')) || {}
const usernames = ['user654ed7dafb4f9c263db2bcc1', 'user654e5ab05edd311cb0bc3e38']

export default function Chat() {
  const [receiveUserId, setReceiveUserId] = useState('')
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    axios.get()

    socket.auth = {
      _id: profile._id,
    }
    socket.connect()

    socket.on('receive_message', (data) => {
      const { payload } = data

      setConversations((conversations) => [...conversations, payload])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (receiveUserId) {
      axios
        .get(`/conversations/receivers/${receiveUserId}`, {
          baseURL: import.meta.env.VITE_API_URL,
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          params: {
            limit: 10,
            page: 1,
          },
        })
        .then((res) => {
          setConversations(res?.data?.result?.conversations.reverse())
        })
    }
  }, [receiveUserId])

  function send(ev) {
    ev.preventDefault()
    const conversation = {
      content: value,
      sender_id: profile._id,
      receiver_id: receiveUserId,
    }

    socket.emit('send_message', {
      payload: conversation,
    })

    setValue('')
    setConversations((conversations) => [...conversations, { ...conversation, _id: crypto.randomUUID() }])
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
        {conversations.map((conversation) => {
          return (
            <div key={conversation._id} className="flex">
              <p className={conversation.sender_id === profile._id ? 'ml-auto' : ''}>{conversation.content}</p>
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
