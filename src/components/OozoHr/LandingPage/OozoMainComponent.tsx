import React from 'react'
import { OozoNavbar } from './OozoNavbar'
import { AboutSection } from '@/components/LandingPage/AboutSection'
import { StatsSection } from '@/components/LandingPage/StatsSecttion'
import { JobsSection } from '@/components/LandingPage/JobSection'
import { CTASection } from '@/components/LandingPage/CTA'
import { OozoHeroPage } from './OozoHeroPage'
import { OozoTestimonials } from './OozoTestimonials'
import { OozoFooter } from './OozoFooter'
import { OozoCTASection } from './OozoCTA'

const OozoMainComponent = () => {
    return (
        <>
            <OozoNavbar />
            <OozoHeroPage />
            <StatsSection />
            <AboutSection />
            <JobsSection />
            <OozoTestimonials />
            <OozoCTASection />
            <OozoFooter />

        </>
    )
}

export default OozoMainComponent