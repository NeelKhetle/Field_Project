import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-12 text-center transition-all duration-500 hover:border-accent/50 hover:shadow-2xl animate-fade-in">
          <h2 className="mb-4 font-sans text-4xl font-bold text-card-foreground md:text-5xl text-balance">
            Ready to Start Your AI & Robotics Journey?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Join thousands of students who are already building the future. Enroll in our programs today and unlock your
            potential.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-transparent text-foreground hover:bg-secondary transition-all duration-300 hover:scale-105"
            >
              Schedule a Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
