"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useRef } from "react"

export function Programs() {
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
      const cards = sectionRef.current.querySelectorAll(".program-card")
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  const programs = [
    {
      title: "AI Fundamentals",
      description: "Introduction to artificial intelligence, machine learning basics, and neural networks",
      features: [
        "Python programming basics",
        "Machine learning concepts",
        "Hands-on AI projects",
        "Industry expert mentorship",
      ],
      level: "Beginner",
    },
    {
      title: "Robotics Engineering",
      description: "Build and program robots using industry-standard tools and cutting-edge technology",
      features: ["Robot design and assembly", "Sensor integration", "Autonomous navigation", "Competition preparation"],
      level: "Intermediate",
    },
    {
      title: "Advanced AI & ML",
      description: "Deep learning, computer vision, natural language processing, and real-world applications",
      features: ["Deep neural networks", "Computer vision projects", "NLP applications", "Capstone project"],
      level: "Advanced",
    },
  ]

  return (
    <section id="programs" ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 opacity-0 animate-fade-in">
          <h2 className="mb-4 font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Programs</h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground px-4 md:px-0">
            Comprehensive learning paths designed to take students from curiosity to competency in AI and robotics.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div
              key={index}
              className="program-card flex flex-col rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-500 hover:border-accent/50 hover:scale-105 hover:shadow-2xl opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs md:text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/20">
                  {program.level}
                </span>
              </div>

              <h3 className="mb-3 font-sans text-xl md:text-2xl font-semibold text-card-foreground">{program.title}</h3>

              <p className="mb-6 text-sm md:text-base leading-relaxed text-muted-foreground">{program.description}</p>

              <ul className="mb-8 flex-1 space-y-3">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent mt-0.5" />
                    <span className="text-xs md:text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
