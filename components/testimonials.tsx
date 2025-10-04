"use client"

import { Quote } from "lucide-react"
import { useEffect, useRef } from "react"

export function Testimonials() {
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
      const cards = sectionRef.current.querySelectorAll(".testimonial-card")
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Student, AI Fundamentals",
      content:
        "The AI program opened my eyes to endless possibilities. The hands-on projects and mentorship helped me build real AI applications. I'm now pursuing computer science with confidence!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Rahul Patel",
      role: "Parent",
      content:
        "My son's transformation has been incredible. He went from playing video games to building robots. The foundation's approach to teaching complex topics in an engaging way is remarkable.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Ananya Desai",
      role: "Student, Robotics Engineering",
      content:
        "Building and programming robots taught me more than just technical skills. I learned teamwork, problem-solving, and perseverance. This program changed my career aspirations completely.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 opacity-0 animate-fade-in">
          <h2 className="mb-4 font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Our Students Say
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground px-4 md:px-0">
            Real stories from students and parents who have experienced the transformative power of our programs.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-500 hover:border-accent/50 hover:scale-105 hover:shadow-2xl opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-accent/30 mb-4 transition-all duration-300 group-hover:text-accent/50 group-hover:scale-110" />

              <p className="mb-6 text-sm md:text-base leading-relaxed text-card-foreground italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-accent/20 transition-all duration-300 group-hover:border-accent/50"
                />
                <div>
                  <h4 className="font-sans text-sm md:text-base font-semibold text-card-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
