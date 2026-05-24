"use client"

import { AboutSection } from "./AboutSection"
import { CTASection } from "./CTA"
import { Footer } from "./Footer"
import { GlobalPartnersSection } from "./GlobalPartner"
import { HeroSection } from "./HeroSection"
import { JobsSection } from "./JobSection"
import LocationGlobe from "./LocationGlobe"
import { Navbar } from "./Navbar"
import { ProcessSection } from "./Process"
import { StatsSection } from "./StatsSecttion"
import { TestimonialsSection } from "./Testimonials"
import { TrustedCompanies } from "./TrustedCompanies"

const LandingPageMainComponent = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <TrustedCompanies/>
    <AboutSection/>
    <StatsSection/>
    <JobsSection/>
    {/* <GlobalPartnersSection/> */}
    <LocationGlobe/>
    <ProcessSection/>
    <TestimonialsSection/>
    <CTASection/>
    <Footer/>
    </>
  )
}

export default LandingPageMainComponent