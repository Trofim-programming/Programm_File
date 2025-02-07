import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 TechNexus. All rights reserved.
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Version 1.1.0</p>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Documentation
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Support
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

