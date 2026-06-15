import { CTASection } from "@/components/LandingPage/CTA";
import RecuirementProcess from "./(components)/RecuirementProcess";
import { Footer } from "@/components/LandingPage/Footer";
import { ProcessSection } from "@/components/LandingPage/Process";
import { OozoFooter } from "@/components/OozoHr/LandingPage/OozoFooter";
import { OozoCTASection } from "@/components/OozoHr/LandingPage/OozoCTA";

const page = () => {
    return (
        <>
            <RecuirementProcess />
            <ProcessSection />
            {/* <CTASection /> */}
            <OozoCTASection/>
            {/* <Footer /> */} {/* This footer is for Interpid */}
        </>
    )
}

export default page