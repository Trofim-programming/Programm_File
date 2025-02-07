"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function OnlineIDE({ activeProject }) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (activeProject) {
      // В реальном приложении здесь был бы запрос к серверу для получения кода проекта
      setCode(`// ${activeProject.name} code goes here`)
    }
  }, [activeProject])

  const runCode = () => {
    // В реальном приложении здесь была бы логика выполнения кода
    setOutput(`Execution result for ${activeProject?.name || "unnamed project"}:
// Your code execution would appear here`)
  }

  const saveCode = () => {
    // В реальном приложении здесь была бы логика сохранения кода на сервере
    toast({
      title: "Code Saved",
      description: `Successfully saved code for ${activeProject?.name || "unnamed project"}`,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Online IDE</h2>
      <div className="flex space-x-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={runCode}>Run Code</Button>
        <Button onClick={saveCode} variant="outline">
          Save Code
        </Button>
      </div>
      <textarea
        className="w-full h-64 p-2 border rounded font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here"
      />
      <div className="bg-black text-white p-4 rounded font-mono">
        <pre>{output}</pre>
      </div>
    </div>
  )
}

