"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function WebsiteBuilder({ activeProject }) {
  const [siteDescription, setSiteDescription] = useState("")
  const [generatedSite, setGeneratedSite] = useState("")

  const generateSite = async () => {
    // В реальном приложении здесь был бы запрос к AI-сервису для генерации сайта
    setGeneratedSite(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Website</title>
</head>
<body>
    <h1>Welcome to your AI-generated website!</h1>
    <p>This is a simple example based on your description.</p>
</body>
</html>
    `)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AI Website Builder</h2>
      <Textarea
        value={siteDescription}
        onChange={(e) => setSiteDescription(e.target.value)}
        placeholder="Describe the website you want to create"
        rows={5}
      />
      <Button onClick={generateSite}>Generate Website</Button>
      <Textarea value={generatedSite} readOnly placeholder="Generated website code will appear here" rows={10} />
    </div>
  )
}

