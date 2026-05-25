import { CTASection } from "@/components/LandingPage/CTA";
import RecuirementProcess from "./(components)/RecuirementProcess";
import { Footer } from "@/components/LandingPage/Footer";
import { ProcessSection } from "@/components/LandingPage/Process";

const page = () => {
    return (
        <>
            <RecuirementProcess />
            <ProcessSection />
            <CTASection />
            <Footer />
        </>
    )
}

export default page