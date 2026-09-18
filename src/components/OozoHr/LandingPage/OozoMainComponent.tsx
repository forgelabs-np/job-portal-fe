import React from 'react'
import { OozoNavbar } from './OozoNavbar'
import { AboutSection } from '@/components/LandingPage/AboutSection'
import { StatsSection } from '@/components/LandingPage/StatsSecttion'
import { JobsSection } from '@/components/LandingPage/JobSection'
import { OozoHeroPage } from './OozoHeroPage'
import { OozoTestimonials } from './OozoTestimonials'
import { OozoFooter } from './OozoFooter'
import { OozoCTASection } from './OozoCTA'
import { RecruitmentProcessSection } from './RecruitmentProcessSection'
import { IndustriesSection } from './IndustriesSection'
import { GlobalSupportSection } from './GlobalSupportSection'

const OozoMainComponent = () => {
    return (
        <>
            <OozoNavbar />
            <OozoHeroPage />
            <StatsSection />
            <AboutSection />
            <JobsSection />
            <IndustriesSection />
            <RecruitmentProcessSection />
            <GlobalSupportSection />
            <OozoTestimonials />
            <OozoCTASection />
            <OozoFooter />

        </>
    )
}

export default OozoMainComponent