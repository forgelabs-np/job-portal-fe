"use client";

import { useState, useRef } from "react";
import { Box, Flex, Text, Container, Grid, Image, Stack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { Globe, Scale, HeartHandshake, Quote, ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import { AboutCompany, ChairmanImage, LicenseBackImage, LicenseImage, PanCertificate, PanImage, RegistrationImage } from "@/assets/images/landing";
import { WEBSITE_THEME_COLOR } from "@/constants/color";

// ─── Theme ───────────────────────────────────────────────────────────────────
const c = {
    crimson: "#8B1A1A",
    crimsonDark: "#5A1010",
    gold: "#C8921A",
    bg: "#F7F4EF",
    bgWarm: "#EDE8DF",
    white: "#FFFFFF",
    text: "#1C1C1C",
    muted: "#6B6B6B",
    border: "rgba(0,0,0,0.09)",
    serif: "Georgia, 'Times New Roman', serif",
    sans: "system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function RevealBox({
    children,
    delay = 0,
    y = 24,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-6%" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
export function HeroSection() {
    return (
        <Box pt={{ base: 10, md: 14 }} pb={{ base: 12, md: 16 }}>
            <Container maxW="1400px" px={{ base: 4, md: 8 }}>
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <Flex gap={1.5} align="center" mb={6}>
                        <Link as="a" href="/" color={c.muted}>Home</Link>
                        <Text fontSize="xs" color={c.muted}>/</Text>
                        <Text fontSize="xs" color={c.text} fontWeight="500">About</Text>
                    </Flex>
                </motion.div>

                {/* Heading */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
                    <Text
                        as="h1"
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                        fontWeight="900"
                        color={c.text}
                        lineHeight={1.1}
                        letterSpacing="-0.02em"
                        mb={2}
                    >
                        Interpid Recruitment Services Where
                    </Text>
                    <Text
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                        fontWeight="900"
                        color={WEBSITE_THEME_COLOR}
                        lineHeight={1.1}
                        letterSpacing="-0.02em"
                        mb={6}
                    >
                        Talent Meets Opportunity!
                    </Text>
                </motion.div>

                {/* Two-col intro */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={10}>
                        <Text fontSize="sm" color={c.muted} lineHeight={1.85}>
                            Welcome to Interpid Recruitment Services, your trusted partner in recruitment and talent
                            acquisition. In Interpid Recruitment Services, we understand that finding the right talent is crucial
                            to the success of any organization. That's why we are committed to providing exceptional
                            recruitment services that connect top talent with leading companies worldwide.
                        </Text>
                        <Text fontSize="sm" color={c.muted} lineHeight={1.85}>
                            Whether it's streamlining recruitment processes, implementing performance management
                            systems, or designing employee development programs, Interpid Recruitment Services has a
                            team of experts ready to deliver solutions that meet the immediate needs and long-term goals
                            of our clients. Our strong network and deep industry knowledge in different sectors help your
                            company helps organizations to unlock the full potential of their workforce.
                        </Text>
                    </Grid>
                </motion.div>

                {/* Hero image */}
                <RevealBox delay={0.15}>
                    <Box borderRadius="20px" overflow="hidden" h={{ base: "220px", sm: "320px", md: "440px" }}>
                        <Image
                            as="img"
                            src={AboutCompany.src}
                            alt="Office interior"
                            w="full" h="full" objectFit="cover" display="block"
                        />
                    </Box>
                </RevealBox>

                {/* Pull-quote */}
                <RevealBox delay={0.08}>
                    <Box borderLeft="4px solid" borderColor={c.crimson} pl={6} mt={10}>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={c.text}
                            lineHeight={1.75}
                            fontWeight="500"
                            fontStyle="italic"
                            maxW="860px"
                        >
                            Recruitment with Intrepid HR Solutions is simple, secure, and worry-free. We handle
                            everything—from documents to deployment—so companies get the right people, and candidates
                            move abroad with confidence. Every step is trusted, fast, and fully above board.
                        </Text>
                    </Box>
                </RevealBox>
            </Container>
        </Box>
    );
}

const whyCards = [
    {
        icon: Globe,
        title: "Global Network",
        sub: "We work in India, Nepal, and 50+ Lanka",
        body: "Our wide network gives access to a diverse pool of skilled workers to international recruitment needs.",
    },
    {
        icon: Scale,
        title: "Legal Expertise",
        sub: "Safe and fully compliant hiring every time",
        body: "Our team ensures all recruitment follows laws and regulations, giving clients and candidates peace of mind.",
    },
    {
        icon: HeartHandshake,
        title: "Client-Centric Approach",
        sub: "Solutions to fit your needs",
        body: "We customize services to each client, building long-term partnerships based on trust and reliability.",
    },
];

export function WhyChooseSection() {
    return (
        <Box bg={c.white} py={{ base: 14, md: 20 }} borderTop="1px solid" borderColor={c.border} >
            <Container maxW="1400px" px={{ base: 4, md: 8 }}>
                <RevealBox>
                    <Text textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="800" color={c.text} mb={3}>
                        Why Choose Interpid for Your Recruitment Needs
                    </Text>
                    <Text textAlign="center" fontSize="sm" color={c.muted} maxW="520px" mx="auto" lineHeight={1.75} mb={12}>
                        We connect companies with skilled workers safely and quickly. Here's why global clients trust us.
                    </Text>
                </RevealBox>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    {whyCards.map((card, i) => (
                        <RevealBox key={card.title} delay={i * 0.1}>
                            <Box
                                bg={c.bg}
                                border="1px solid"
                                borderColor={c.border}
                                borderRadius="16px"
                                p={7}
                                h="full"
                                transition="all 0.25s"
                                _hover={{ borderColor: c.crimson, boxShadow: "0 8px 32px rgba(139,26,26,0.07)", transform: "translateY(-2px)" }}
                            >
                                <Flex
                                    w="44px" h="44px" borderRadius="10px"
                                    bg="rgba(200,146,26,0.1)" border="1px solid rgba(200,146,26,0.2)"
                                    align="center" justify="center" mb={4}
                                >
                                    <card.icon size={20} color={c.gold} strokeWidth={1.75} />
                                </Flex>
                                <Text fontSize="md" fontWeight="700" color={c.text} mb={1}>{card.title}</Text>
                                <Text fontSize="xs" color={c.gold} fontWeight="600" mb={3}>{card.sub}</Text>
                                <Box w="28px" h="2px" bg={c.crimson} borderRadius="full" mb={4} />
                                <Text fontSize="sm" color={c.muted} lineHeight={1.8}>{card.body}</Text>
                            </Box>
                        </RevealBox>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

// ─── 3. LEADERSHIP MESSAGE ───────────────────────────────────────────────────
const leaders = [
    { role: "Chairman", name: "Shawan Kumar Dahal", active: true },
    { role: "CEO", name: "Shawan Kumar Dahal", active: false },
    { role: "Managing Director", name: "Managing Director", active: false },
];

export function LeadershipSection() {
    const [active, setActive] = useState(0);
    return (
        <Box
            py={{ base: 14, md: 20 }}
            style={{ background: `linear-gradient(135deg, ${c.crimson} 0%, ${c.crimsonDark} 100%)` }}
            position="relative"
            overflow="hidden"
        >
            {/* decorative circles */}
            <Box position="absolute" top="-60px" right="-60px" w="280px" h="280px" borderRadius="full" bg="rgba(255,255,255,0.03)" pointerEvents="none" />
            <Box position="absolute" bottom="-40px" left="10%" w="200px" h="200px" borderRadius="full" bg="rgba(255,255,255,0.03)" pointerEvents="none" />

            <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
                <RevealBox>
                    <Text textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="white" mb={2}>
                        Message from Our Leadership
                    </Text>
                    <Text textAlign="center" fontSize="sm" color="rgba(255,255,255,0.65)" mb={10} maxW="500px" mx="auto" lineHeight={1.7}>
                        Hear directly from the people who guide Interpid's vision and ensure safe, reliable recruitment for global clients.
                    </Text>
                </RevealBox>

                {/* Tab row */}
                <RevealBox delay={0.08}>
                    <Flex gap={3} mb={10} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                        {leaders.map((l, i) => (
                            <Stack
                                key={l.role}
                                as="button"
                                px={5} py={2.5}
                                borderRadius="full"
                                fontSize="sm"
                                fontWeight="900"
                                cursor="pointer"
                                border="1.5px solid"
                                transition="all 0.2s"
                                bg={active === i ? c.gold : "transparent"}
                                borderColor={active === i ? c.gold : "rgba(255,255,255,0.3)"}
                                color={active === i ? "black" : "white"}
                                _hover={{ borderColor: c.gold, color: "white" }}
                                onClick={() => setActive(i)}
                                gap={1}
                            >
                                {l.role}
                                <Text as="span" display="block" fontSize="md" fontWeight="400" opacity={0.8}>{l.name}</Text>
                            </Stack>
                        ))}
                    </Flex>
                </RevealBox>

                {/* Message card */}
                <RevealBox delay={0.1}>
                    <Box bg="rgba(255,255,255,0.07)" border="1px solid rgba(255,255,255,0.12)" borderRadius="20px" p={{ base: 6, md: 10 }}>
                        <Grid templateColumns={{ base: "1fr", md: "200px 1fr" }} gap={{ base: 8, md: 12 }} >
                            {/* Photo */}
                            <Box>
                                <Box borderRadius="16px" overflow="hidden" h="220px" bg="rgba(255,255,255,0.08)">
                                    <Image
                                        as="img"
                                        src={ChairmanImage.src}
                                        alt={leaders[active].name}
                                        w="full" h="full" objectFit="cover"
                                    />
                                </Box>
                            </Box>

                            {/* Message */}
                            <Box>
                                <Box color={c.gold} mb={4} opacity={0.6}>
                                    <Quote size={32} fill="rgba(200,146,26,0.15)" />
                                </Box>
                                <Text fontSize={{ base: "sm", md: "md" }} color="rgba(255,255,255,0.88)" lineHeight={1.85} mb={6} >
                                    As the {leaders[active].role} of Interpid Recruitment Services PVT LTD, I extend my warmest greetings to you.
                                    At Interpid, we believe in the power of collaboration and partnerships. We recognize the vital role agency
                                    plays in the success of our recruitment efforts, and we are committed to building strong, mutually beneficial
                                    relationships with our clients. Our mission is to provide exceptional outsourcing services while maintaining
                                    the highest standards of integrity, professionalism, and ethical conduct.
                                    <br /><br />
                                    We value transparency and open communication in all our interactions. By working together, we can leverage
                                    our strengths to achieve greater success for clients and candidates. Let us join forces to create opportunities,
                                    drive innovation, and make a positive impact in the recruitment industry.
                                    <br /><br />
                                    Thank you for your continued support and trust in Interpid Recruitment Services PVT LTD. We look forward to
                                    forging enduring partnerships with you.
                                </Text>
                                <Text fontSize="md" fontWeight="700" color={c.gold} >{leaders[active].name}</Text>
                                <Text fontSize="xs" color="rgba(255,255,255,0.55)">{leaders[active].role} · chairman@interpidhr.com</Text>
                            </Box>
                        </Grid>
                    </Box>
                </RevealBox>
            </Container>
        </Box>
    );
}

// ─── 4. ORG CHART ────────────────────────────────────────────────────────────
interface OrgNode {
    role: string;
    name: string;
    children?: OrgNode[];
}

const orgData: OrgNode = {
    role: "Chairman",
    name: "Shawan Kumar Dahal",
    children: [
        {
            role: "Managing Director",
            name: "Nina Raj Poudel",
            children: [
                { role: "Chairman", name: "Shawan Kumar Dahal", children: [{ role: "Chairman", name: "Shawan Kumar Dahal" }] },
                { role: "Managing Director", name: "Nina Raj Poudel", children: [{ role: "Chairman", name: "Shawan Kumar Dahal" }, { role: "Managing Director", name: "Nina Raj Poudel" }] },
                { role: "Chairman", name: "Shawan Kumar Dahal", children: [{ role: "Chairman", name: "Shawan Kumar Dahal" }] },
            ],
        },
    ],
};

function OrgCard({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
    return (
        <Box
            bg={isRoot ? c.crimson : c.gold}
            borderRadius="10px"
            px={4}
            py={2.5}
            display="inline-flex"
            alignItems="center"
            gap={2.5}
            minW="160px"
        >
            <Box
                w="28px" h="28px" borderRadius="full"
                bg="rgba(255,255,255,0.2)"
                display="flex" alignItems="center" justifyContent="center"
                flexShrink={0}
            >
                <Text fontSize="2xs" fontWeight="800" color="white">
                    {node.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </Text>
            </Box>
            <Box>
                <Text fontSize="2xs" color="rgba(255,255,255,0.75)" >{node.role}</Text>
                <Text fontSize="xs" fontWeight="700" color="white" lineHeight={1.2}>{node.name}</Text>
            </Box>
        </Box>
    );
}

function OrgTree({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
    return (
        <Flex direction="column" align="center" gap={0}>
            <OrgCard node={node} isRoot={depth === 0} />
            {node.children && node.children.length > 0 && (
                <>
                    {/* Vertical connector */}
                    <Box w="2px" h="24px" bg={c.border} />
                    {/* Children row */}
                    <Flex align="flex-start" gap={{ base: 4, md: 6 }} position="relative">
                        {/* Horizontal line spanning all children */}
                        {node.children.length > 1 && (
                            <Box
                                position="absolute"
                                top="0"
                                left="50%"
                                h="2px"
                                bg={c.border}
                                style={{ transform: "translateX(-50%)", width: `calc(100% - 80px)` }}
                            />
                        )}
                        {node.children.map((child, i) => (
                            <Flex key={i} direction="column" align="center" gap={0} pt="2px">
                                <Box w="2px" h="42px" bg={c.border} />
                                <OrgTree node={child} depth={depth + 1} />
                            </Flex>
                        ))}
                    </Flex>
                </>
            )}
        </Flex>
    );
}

export function OrgChartSection() {
    return (
        <Box py={{ base: 14, md: 20 }} borderTop="1px solid" borderColor={c.border}>
            <Container maxW="1100px" px={{ base: 4, md: 8 }}>
                <RevealBox>
                    <Text textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color={c.text} mb={3}>
                        Organization Chart
                    </Text>
                    <Text textAlign="center" fontSize="sm" color={c.muted} maxW="500px" mx="auto" lineHeight={1.75} mb={12}>
                        We connect companies with skilled workers safely, legally, and quickly. Here's why global clients trust us.
                    </Text>
                </RevealBox>

                <RevealBox delay={0.1}>
                    <Box
                        bg={c.white}
                        border="1px solid"
                        borderColor={c.border}
                        borderRadius="20px"
                        p={{ base: 6, md: 10 }}
                        overflowX="auto"
                    >
                        <Box minW="800px" display="flex" justifyContent="center">
                            <OrgTree node={orgData} />
                        </Box>
                    </Box>
                </RevealBox>
            </Container>
        </Box>
    );
}

// ─── 5. CERTIFICATIONS ───────────────────────────────────────────────────────
const certDocs = [
    {
        label: "License",
        src: LicenseImage.src,
        thumb: LicenseImage.src,
    },
    {
        label: "Registration Certificate",
        src: RegistrationImage.src,
        thumb: RegistrationImage.src,
    },
    {
        label: "License",
        src: LicenseBackImage.src,
        thumb: LicenseBackImage.src,
    },
    {
        label: "PAN Registration",
        src: PanImage.src,
        thumb: PanImage.src,
    },
    {
        label: "PAN Certificate",
        src: PanCertificate.src,
        thumb: PanCertificate.src,
    },
];

export function CertificationsSection() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const slides = certDocs.map((d) => ({ src: d.src }));

    const openAt = (i: number) => {
        setLightboxIndex(i);
        setLightboxOpen(true);
    };

    return (
        <Box bg={c.white} py={{ base: 14, md: 20 }} borderTop="1px solid" borderColor={c.border}>
            <Container maxW="1400px" px={{ base: 4, md: 8 }}>
                <RevealBox>
                    <Text textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color={c.text} mb={3}>
                        Our Certifications & Registrations
                    </Text>
                    <Text textAlign="center" fontSize="sm" color={c.muted} maxW="480px" mx="auto" lineHeight={1.75} mb={12}>
                        We are fully licensed and certified to provide safe and legal overseas recruitment services.
                    </Text>
                </RevealBox>

                {/* Doc grid */}
                <Grid
                    templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                    gap={4}
                >
                    {certDocs.map((doc, i) => (
                        <RevealBox key={i} delay={i * 0.07}>
                            <Box
                                borderRadius="12px"
                                overflow="hidden"
                                border="1px solid"
                                borderColor={c.border}
                                cursor="pointer"
                                position="relative"
                                role="group"
                                onClick={() => openAt(i)}
                                transition="all 0.25s"
                                _hover={{ borderColor: c.crimson, boxShadow: "0 8px 28px rgba(139,26,26,0.1)" }}
                            >
                                {/* Thumbnail */}
                                <Box h={{ base: "120px", md: "220px" }} overflow="hidden" bg={c.bgWarm}>
                                    <Image
                                        as="img"
                                        src={doc.thumb}
                                        alt={doc.label}
                                        w="full" h="full" objectFit="cover"
                                        transition="transform 0.35s"
                                        _groupHover={{ transform: "scale(1.05)" }}
                                    />
                                    {/* Zoom overlay */}
                                    <Box
                                        position="absolute"
                                        inset={0}
                                        bg="rgba(139,26,26,0)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        transition="background 0.25s"
                                        _groupHover={{ bg: "rgba(139,26,26,0.45)" }}
                                    >
                                        <Box
                                            opacity={0}
                                            _groupHover={{ opacity: 1 }}
                                            transition="opacity 0.25s"
                                        >
                                            <ZoomIn size={24} color="white" />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Label bar */}
                                <Box bg={c.crimson} px={3} py={2}>
                                    <Text fontSize="2xs" fontWeight="700" color="white" textAlign="center">
                                        {doc.label}
                                    </Text>
                                </Box>
                            </Box>
                        </RevealBox>
                    ))}
                </Grid>
            </Container>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={slides}
                index={lightboxIndex}
            />
        </Box>
    );
}

