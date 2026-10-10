import React, { Suspense, lazy, useState, useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
const HowItWorks = lazy(() => import("../components/HowItWorks"))
const Features = lazy(() => import("../components/Features"))
const Pricing = lazy(() => import("../components/Pricing"))
const Testimonials = lazy(() => import("../components/Testimonials"))
const CTA = lazy(() => import("../components/CTA"))
import Footer from "../components/Footer"

function ViewportSection({ children, id, minHeight = "400px" }) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash && id) {
      return window.location.hash.includes(id);
    }
    return false;
  });
  const ref = useRef(null);

  useEffect(() => {
    if (isVisible || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} id={id} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? (
        <Suspense fallback={<div className="w-full min-h-[300px] bg-[#FAFAFC]" />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

export default function Home() {
    return (
        <div className="w-full min-h-screen bg-[#FAFAFC] text-[#17151A] font-poppins">
            <Navbar />
            <main>
                <Hero />
                <ViewportSection id="how-it-works" minHeight="400px">
                    <HowItWorks />
                </ViewportSection>
                <ViewportSection id="features" minHeight="400px">
                    <Features />
                </ViewportSection>

                <ViewportSection id="pricing" minHeight="500px">
                    <Pricing />
                </ViewportSection>
                <ViewportSection id="testimonials" minHeight="400px">
                    <Testimonials />
                </ViewportSection>
                <ViewportSection id="cta" minHeight="300px">
                    <CTA />
                </ViewportSection>
            </main>
            <Footer />
        </div>
    )
}