import { CTASection } from "@/components/LandingPage/CTA";
import { Footer } from "@/components/LandingPage/Footer";
import { CertificationsSection, HeroSection, LeadershipSection, WhyChooseSection } from "./(components)/About";
import { OozoCTASection } from "@/components/OozoHr/LandingPage/OozoCTA";

export default function AboutPage() {
    return (
        <>
            <HeroSection />
            <WhyChooseSection />
            <LeadershipSection />
            {/* <OrgChartSection /> */}
            <CertificationsSection />
            {/* <CTASection /> */}
            <OozoCTASection/>
            {/* <Footer /> */}{/* This footer is for Interpid*/}
        </>
    );
}