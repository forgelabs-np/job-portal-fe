import { CTASection } from "@/components/LandingPage/CTA";
import { Footer } from "@/components/LandingPage/Footer";
import { ProcessSection } from "@/components/LandingPage/Process";
import ContactUsPage from "./(components)/Contact";
import { OozoCTASection } from "@/components/OozoHr/LandingPage/OozoCTA";

const page = () => {
    return (
        <>
            <ContactUsPage />
            {/* <CTASection /> */}
            <OozoCTASection/>
            {/* <Footer /> */}
        </>
    )
}

export default page