"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CollaborationSpace({ activeProject }) {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const sendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { user: "You", text: message }])
      setMessage("")
      // В реальном приложении здесь был бы код для отправки сообщения другим пользователям
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Collaboration Space</h2>
      <div className="border p-4 h-64 overflow-y-auto">
        {chat.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}

