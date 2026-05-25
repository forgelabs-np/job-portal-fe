import { CTASection } from "@/components/LandingPage/CTA"
import Specialization from "./(components)/Specialization"
import { Footer } from "@/components/LandingPage/Footer"

const page = () => {
    return (
        <>
            <Specialization />
            <CTASection />
            <Footer />
        </>
    )
}

export default page