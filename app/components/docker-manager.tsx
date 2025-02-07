"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function DockerManager({ activeProject }) {
  const [dockerfile, setDockerfile] = useState("")

  const generateDockerfile = async () => {
    // В реальном приложении здесь был бы запрос к AI-сервису для генерации Dockerfile
    setDockerfile(`
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
    `)
  }

  const buildImage = () => {
    // Здесь была бы логика для сборки Docker-образа
    console.log("Building Docker image...")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Docker Manager</h2>
      {activeProject ? (
        <>
          <p>Active project: {activeProject.name}</p>
          <Button onClick={generateDockerfile}>Generate Dockerfile</Button>
          <Textarea
            value={dockerfile}
            onChange={(e) => setDockerfile(e.target.value)}
            placeholder="Dockerfile content"
            rows={10}
          />
          <Button onClick={buildImage}>Build Docker Image</Button>
        </>
      ) : (
        <p>Please select a project from the GitHub tab first.</p>
      )}
    </div>
  )
}

