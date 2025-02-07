"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AICodeAssistant({ activeProject }) {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  const generateCode = async () => {
    // В реальном приложении здесь был бы запрос к AI-сервису
    setResponse(`
function exampleFunction() {
  console.log("This is an AI-generated function");
  // Add your logic here
}
    `)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AI Code Assistant</h2>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the code you want to generate"
        rows={5}
      />
      <Button onClick={generateCode}>Generate Code</Button>
      <Textarea value={response} readOnly placeholder="AI-generated code will appear here" rows={10} />
    </div>
  )
}

