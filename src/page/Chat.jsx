import { useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import socket from '@/utils/socket'

const profile = JSON.parse(localStorage.getItem('profile')) || {}
const usernames = ['user654ed7dafb4f9c263db2bcc1', 'user654e5ab05edd311cb0bc3e38']
const LIMIT = 10
const PAGE = 1

export default function Chat() {
  const [receiveUserId, setReceiveUserId] = useState('')
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState([])
  const [pagination, setPagination] = useState({ page: PAGE, total_page: 0 })

  useEffect(() => {
    axios.get()

    socket.auth = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
    socket.connect()

    socket.on('receive_message', (data) => {
      const { payload } = data

      setConversations((conversations) => [payload, ...conversations])
    })

    socket.on('connect_error', (err) => {
      console.log(err.data)
    })

    socket.on('disconnect', (reason) => {
      console.log('🔥 ~ socket.on ~ reason:', reason)
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
            limit: LIMIT,
            page: PAGE,
          },
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result

          setConversations(conversations)
          setPagination({ page, total_page })
        })
    }
  }, [receiveUserId])

  function fetchMoreConversations() {
    if (receiveUserId && pagination.page < pagination.total_page) {
      axios
        .get(`/conversations/receivers/${receiveUserId}`, {
          baseURL: import.meta.env.VITE_API_URL,
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          params: {
            limit: LIMIT,
            page: pagination.page + 1,
          },
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result

          setConversations((prev) => [...prev, ...conversations])
          setPagination({ page, total_page })
        })
    }
  }

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
    setConversations((conversations) => [{ ...conversation, _id: crypto.randomUUID() }, ...conversations])
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

      <div
        id="scrollableDiv"
        className="max-w-xl m-auto"
        style={{
          height: 200,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={conversations.length}
          next={fetchMoreConversations}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          inverse={true}
          hasMore={pagination.page < pagination.total_page}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {conversations.map((conversation) => {
            return (
              <div key={conversation._id} className="flex">
                <p className={conversation.sender_id === profile._id ? 'ml-auto' : ''}>{conversation.content}</p>
              </div>
            )
          })}
        </InfiniteScroll>
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
