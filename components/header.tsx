"use client"

import { Button } from "@/components/ui/button"
import { Bot, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out ${
        scrolled
          ? "border-border/60 bg-background/98 backdrop-blur-xl shadow-lg"
          : "border-border/40 bg-background/80 backdrop-blur-lg"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <Bot className="h-7 w-7 md:h-8 md:w-8 text-accent animate-float" />
          <span className="font-sans text-base md:text-xl font-semibold text-foreground">
            <span className="hidden sm:inline">Abhijeet Rane Youth Foundation</span>
            <span className="sm:hidden">ARYF</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          <button
            onClick={() => scrollToSection("programs")}
            className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
          >
            Programs
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("impact")}
            className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
          >
            Impact
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base px-3 md:px-4"
          >
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-xl animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("programs")}
              className="text-left text-sm text-muted-foreground transition-all duration-300 hover:text-foreground py-2"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-sm text-muted-foreground transition-all duration-300 hover:text-foreground py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-sm text-muted-foreground transition-all duration-300 hover:text-foreground py-2"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-left text-sm text-muted-foreground transition-all duration-300 hover:text-foreground py-2"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-sm text-muted-foreground transition-all duration-300 hover:text-foreground py-2"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
