"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import GitHubIntegration from "./github-integration"
import DockerManager from "./docker-manager"
import AICodeAssistant from "./ai-code-assistant"
import OnlineIDE from "./online-ide"
import WebsiteBuilder from "./website-builder"
import NeuralNetworkLab from "./neural-network-lab"
import ProjectVisualizer from "./project-visualizer"
import CollaborationSpace from "./collaboration-space"

export default function TechNexusHub() {
  const [activeProject, setActiveProject] = useState(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleProjectChange = (project) => {
    setActiveProject(project)
    toast({
      title: "Project Selected",
      description: `You are now working on ${project.name}`,
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <Alert>
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>Please log in or register to access TechNexus Hub.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold mb-6">TechNexus Hub</h1>
      {!activeProject && (
        <Alert className="mb-6">
          <AlertTitle>No active project</AlertTitle>
          <AlertDescription>Please select a project from the GitHub tab to get started.</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Development Workspace</CardTitle>
          <CardDescription>Access all your development tools in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="github" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="ide">Online IDE</TabsTrigger>
              <TabsTrigger value="website">Website Builder</TabsTrigger>
              <TabsTrigger value="neural">Neural Network</TabsTrigger>
              <TabsTrigger value="visualizer">Project Visualizer</TabsTrigger>
              <TabsTrigger value="collab">Collaboration</TabsTrigger>
            </TabsList>
            <TabsContent value="github">
              <GitHubIntegration setActiveProject={handleProjectChange} />
            </TabsContent>
            <TabsContent value="docker">
              <DockerManager activeProject={activeProject} />
            </TabsContent>
            <TabsContent value="ai">
              <AICodeAssistant activeProject={activeProject} />
            </TabsContent>
            <TabsContent value="ide">
              <OnlineIDE activeProject={activeProject} />
            </TabsContent>
            <TabsContent value="website">
              <WebsiteBuilder activeProject={activeProject} />
            </TabsContent>
            <TabsContent value="neural">
              <NeuralNetworkLab />
            </TabsContent>
            <TabsContent value="visualizer">
              <ProjectVisualizer activeProject={activeProject} />
            </TabsContent>
            <TabsContent value="collab">
              <CollaborationSpace activeProject={activeProject} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

