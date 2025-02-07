import Header from "./components/header"
import TechNexusHub from "./components/tech-nexus-hub"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <TechNexusHub />
      </main>
      <Footer />
    </div>
  )
}

