import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Mission } from "@/components/mission"
import { Programs } from "@/components/programs"
import { Testimonials } from "@/components/testimonials"
import { Impact } from "@/components/impact"
import { Contact } from "@/components/contact"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Mission />
      <Programs />
      <Testimonials />
      <Impact />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}
