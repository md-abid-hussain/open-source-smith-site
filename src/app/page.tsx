import BuiltUsing from "@/components/landing-page/built-using"
import Feature from "@/components/landing-page/feature"
import HeroSection from "@/components/landing-page/hero"

export default function RootPage() {
  return (
    <main>
      <HeroSection />
      <hr />
      <Feature />
      <hr />
      <BuiltUsing />
    </main>
  )
}