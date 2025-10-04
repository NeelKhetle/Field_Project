import { Bot, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-in">
            <div className="mb-4 flex items-center gap-2">
              <Bot className="h-6 w-6 text-accent animate-float" />
              <span className="font-sans text-lg font-semibold text-foreground">ARYF</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Empowering young minds with AI and robotics education for a better tomorrow.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-all duration-300 hover:text-accent hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-all duration-300 hover:text-accent hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-all duration-300 hover:text-accent hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-all duration-300 hover:text-accent hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-100">
            <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  AI Fundamentals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Robotics Engineering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Advanced AI & ML
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Summer Camps
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in animation-delay-200">
            <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in animation-delay-300">
            <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Get in Touch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground animate-fade-in animation-delay-400">
          <p>© 2025 Abhijeet Rane Youth Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
