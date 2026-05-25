import { CTASection } from "@/components/LandingPage/CTA";
import { Footer } from "@/components/LandingPage/Footer";
import { ProcessSection } from "@/components/LandingPage/Process";
import ContactUsPage from "./(components)/Contact";

const page = () => {
    return (
        <>
            <ContactUsPage />
            <CTASection />
            <Footer />
        </>
    )
}

export default page