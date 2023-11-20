import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Chat() {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL)

    socket.on('connect', () => {
      socket.emit('join', { room: 'kitchen' })

      socket.on('Hi', ({ message }) => {
        console.log('🚧', message)
      })
    })

    socket.on('disconnect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return <div>Chat</div>
}
