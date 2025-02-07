"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function GitHubIntegration({ setActiveProject }) {
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const { toast } = useToast()
  const [newRepoName, setNewRepoName] = useState("")
  const [newRepoDescription, setNewRepoDescription] = useState("")

  const fetchRepos = async (page = 1) => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=10`)
      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const data = await response.json()
      setRepos((prevRepos) => (page === 1 ? data : [...prevRepos, ...data]))
      setPage(page)
      if (data.length === 0) {
        toast({
          title: "No more repositories",
          description: "You've reached the end of the list.",
        })
      }
    } catch (error) {
      console.error("Error fetching repos:", error)
      setError("Failed to fetch repositories. Please check the username and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    fetchRepos(page + 1)
  }

  const createNewRepo = async () => {
    setIsLoading(true)
    setError("")
    try {
      // В реальном приложении здесь был бы запрос к GitHub API для создания нового репозитория
      // Для демонстрации мы просто имитируем создание
      const newRepo = {
        id: Date.now(),
        name: newRepoName,
        description: newRepoDescription,
        stargazers_count: 0,
        language: "JavaScript",
      }
      setRepos((prevRepos) => [newRepo, ...prevRepos])
      toast({
        title: "Repository Created",
        description: `Successfully created ${newRepoName}`,
      })
      setNewRepoName("")
      setNewRepoDescription("")
    } catch (error) {
      console.error("Error creating repo:", error)
      setError("Failed to create repository. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input placeholder="GitHub username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button onClick={() => fetchRepos(1)} disabled={isLoading}>
          {isLoading ? "Fetching..." : "Fetch Repos"}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Repo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Repository</DialogTitle>
              <DialogDescription>Enter the details for your new GitHub repository.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newRepoDescription}
                  onChange={(e) => setNewRepoDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createNewRepo} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Repository"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {repos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <Card key={repo.id} className="cursor-pointer hover:bg-accent" onClick={() => setActiveProject(repo)}>
                <CardHeader>
                  <CardTitle>{repo.name}</CardTitle>
                  <CardDescription>{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Stars: {repo.stargazers_count}</p>
                  <p>Language: {repo.language}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </>
      ) : (
        <p>No repositories to display. Enter a GitHub username and click "Fetch Repos" or create a new repository.</p>
      )}
    </div>
  )
}

