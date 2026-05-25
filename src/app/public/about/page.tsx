import { CTASection } from "@/components/LandingPage/CTA";
import { Footer } from "@/components/LandingPage/Footer";
import { CertificationsSection, HeroSection, LeadershipSection, WhyChooseSection } from "./(components)/About";

export default function AboutPage() {
    return (
        <>
            <HeroSection />
            <WhyChooseSection />
            <LeadershipSection />
            {/* <OrgChartSection /> */}
            <CertificationsSection />
            <CTASection />
            <Footer />
        </>
    );
}