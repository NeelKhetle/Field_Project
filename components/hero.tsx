"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
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
    }
  }

  return (
    <section id="hero" ref={heroRef} className="relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs md:text-sm text-accent animate-slide-down">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 animate-pulse" />
            <span>Empowering the next generation</span>
          </div>

          <h1 className="mb-6 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-balance text-foreground animate-slide-up">
            Shaping Young Minds for the Age of <span className="text-accent animate-gradient">Robotics and AI</span>
          </h1>

          <p className="mb-8 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground px-4 md:px-0 animate-slide-up animation-delay-200">
            Empowering students with hands-on experience in artificial intelligence, robotics, and emerging technologies
            to build the future they imagine.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row animate-slide-up animation-delay-400 px-4 md:px-0">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("programs")}
              className="w-full sm:w-auto border-border bg-transparent text-foreground hover:bg-secondary transition-all duration-300 hover:scale-105"
            >
              View Programs
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid" />
    </section>
  )
}
