import React from 'react'
import { Hero } from '../components/Hero'
import { TrustBar } from '../components/TrustBar'
import { Features } from '../components/Features '
import { TemplatesSection } from '../components/TemplatesSection'
import { AIFeatures } from '../components/AIFeatures'
import { HowItWorks } from '../components/HowItWorks'
import { Testimonials } from '../components/Testimonials'
import { FAQs } from '../components/FAQs'
import { CTA } from '../components/CTA'


export const Home = () => {
  return (
    <>
        <Hero />
        <TrustBar />
        <Features />
        <TemplatesSection />
        <AIFeatures />
        <HowItWorks />
        <Testimonials />
        <FAQs />
        <CTA />
    </>
  )
}
