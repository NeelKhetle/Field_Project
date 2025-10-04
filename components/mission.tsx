"use client"

import { Brain, Code, Cpu, Lightbulb } from "lucide-react"
import { useEffect, useRef } from "react"

export function Mission() {
  const sectionRef = useRef<HTMLElement>(null)

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

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".value-card")
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Brain,
      title: "Critical Thinking",
      description: "Develop problem-solving skills through hands-on AI and robotics challenges",
    },
    {
      icon: Code,
      title: "Technical Skills",
      description: "Learn programming, machine learning, and robotics engineering fundamentals",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Foster creativity and innovation through project-based learning experiences",
    },
    {
      icon: Cpu,
      title: "Future Ready",
      description: "Prepare for careers in AI, robotics, and emerging technology fields",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 opacity-0 animate-fade-in">
          <h2 className="mb-4 font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Mission</h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground px-4 md:px-0">
            We believe every young person deserves access to world-class AI and robotics education. Our programs bridge
            the gap between curiosity and capability.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card group rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-accent/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20 group-hover:rotate-6">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-sans text-lg md:text-xl font-semibold text-card-foreground">{value.title}</h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
