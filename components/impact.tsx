"use client"

import { useEffect, useRef, useState } from "react"

export function Impact() {
  const stats = [
    { value: 10000, suffix: "+", label: "Students Trained" },
    { value: 50, suffix: "+", label: "Partner Schools" },
    { value: 95, suffix: "%", label: "Student Satisfaction" },
    { value: 200, suffix: "+", label: "Projects Completed" },
  ]

  return (
    <section id="impact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
          <h2 className="mb-4 font-sans text-4xl font-bold text-foreground md:text-5xl">Our Impact</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Building a community of young innovators who are ready to shape the future of technology and society.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }: { stat: { value: number; suffix: string; label: string }; index: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = stat.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, stat.value])

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-2 font-sans text-5xl font-bold text-accent">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
    </div>
  )
}
