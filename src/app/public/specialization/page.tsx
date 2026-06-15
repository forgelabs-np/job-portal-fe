import { CTASection } from "@/components/LandingPage/CTA"
import Specialization from "./(components)/Specialization"
import { Footer } from "@/components/LandingPage/Footer"
import { OozoFooter } from "@/components/OozoHr/LandingPage/OozoFooter"
import { OozoCTASection } from "@/components/OozoHr/LandingPage/OozoCTA"

const page = () => {
    return (
        <>
            <Specialization />
            {/* <CTASection /> */}
            <OozoCTASection/>
            {/* <OozoFooter/> */}
            {/* <Footer /> */} {/* This footer is for Interpid */}
        </>
    )
}

export default page