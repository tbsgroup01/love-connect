import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Features from "../components/Features"
import Pricing from "../components/Pricing"
import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className="w-full min-h-screen bg-[#FAFAFC] text-[#17151A]">
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <Features />

                <Pricing />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    )
}