"use client";

import { Box, Flex, Text, Container, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    FileCheck2,
    Megaphone,
    Users,
    Stethoscope,
    ShieldCheck,
    Building2,
    BookOpen,
    Ticket,
    Clock,
} from "lucide-react";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const c = {
    crimson: "#8B1A1A",
    crimsonLight: "#A52020",
    gold: "#C8921A",
    goldPale: "rgba(158, 109, 10, 0.08)",
    bg: "#F7F4EF",
    white: "#FFFFFF",
    text: "#1C1C1C",
    muted: "#6B6B6B",
    border: "rgba(0,0,0,0.08)",
    stepNum: "rgba(139,26,26,0.10)",
};

const steps = [
    {
        num: "01",
        title: "Document Verification from Employer",
        icon: FileCheck2,
        body: "Our recruitment procedure begins after we receive the official documents from the hiring company:",
        bullets: [
            "Demand Letter",
            "Power of Attorney",
            "Guarantee Letter",
            "Employment Contract",
            "Service Agreement",
        ],
        footer: "These documents are carefully checked and verified before we move forward.",
    },
    {
        num: "02",
        title: "Press Advertisements",
        icon: Megaphone,
        body: "Job openings are advertised in leading newspapers and online channels in Nepal. This ensures that the right job seekers know about the opportunity and apply to join the recruitment process.",
        bullets: [],
    },
    {
        num: "03",
        title: "Interview Process",
        icon: Users,
        body: "Interviews are arranged based on the company's instructions. This can happen in two ways:",
        bullets: [
            "Online Interview – Conducted directly with the employer.",
            "In-Person Interview – Employer representatives may visit our office to select candidates.",
        ],
    },
    {
        num: "04",
        title: "Medical Checkup",
        icon: Stethoscope,
        body: "All finalized candidates must undergo a full medical examination at approved medical centers. Only medically fit candidates are processed for visa applications.",
        bullets: [],
    },
    {
        num: "05",
        title: "Police Clearance Certificate (PCC)",
        icon: ShieldCheck,
        body: "Candidates must provide a Police Clearance Certificate verified by the Embassy of the hiring country. This ensures trust and transparency for both worker and employer.",
        bullets: [],
    },
    {
        num: "06",
        title: "Government Registration",
        icon: Building2,
        body: "After the visa is approved, all documents are submitted to the Ministry of Labor and Ministry of Foreign Employment, Government of Nepal. Final registration of the candidates is completed within 24 hours of submission.",
        bullets: [],
    },
    {
        num: "07",
        title: "Pre-Departure Briefing & Orientation",
        icon: BookOpen,
        body: "All outbound workers receive an official orientation session from licensed institutions under the Government of Nepal. Here, candidates learn about:",
        bullets: [
            "Rules and regulations of the destination country",
            "Job responsibilities",
            "Worker rights and safety guidelines",
        ],
    },
    {
        num: "08",
        title: "Ticketing & Immigration Clearance",
        icon: Ticket,
        body: "Employers either provide a Prepaid Ticket Advice (PTA) or send travel expenses. We then arrange ticketing and obtain immigration clearance from the Government of Nepal for the worker.",
        bullets: [],
    },
    {
        num: "09",
        title: "Deployment Timeline",
        icon: Clock,
        body: "After receiving attested and embassy-verified documents, workers are usually ready to depart within 15 to 18 days. We ensure timely processing so candidates can join the hiring company without delay.",
        bullets: [],
    },
];

// ─── Animated section wrapper ────────────────────────────────────────────────
function RevealBox({
    children,
    delay = 0,
    y = 28,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-8%" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

// ─── Step card ───────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
    const Icon = step.icon;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.55,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{ height: "100%" }}
        >
            <Box
                bg={c.goldPale}
                border="1px solid"
                borderColor={c.border}
                borderRadius="16px"
                p={{ base: 6, md: 8 }}
                h="full"
                position="relative"
                overflow="hidden"
                transition="all 0.25s"
                _hover={{
                    borderColor: c.crimson,
                    boxShadow: `0 12px 40px rgba(139,26,26,0.08)`,
                    transform: "translateY(-3px)",
                }}
                display="flex"
                flexDirection="column"
                gap={4}
            >
                {/* Ghost step number */}
                <Text
                    position="absolute"
                    top="-8px"
                    right="12px"
                    fontSize={{ base: "72px", md: "96px" }}
                    fontWeight="900"
                    color={c.stepNum}
                    lineHeight={1}
                    letterSpacing="-0.04em"
                    userSelect="none"
                    pointerEvents="none"
                    fontFamily="Georgia, serif"
                >
                    {step.num}
                </Text>

                {/* Icon */}
                <Box
                    w="44px"
                    h="44px"
                    borderRadius="10px"
                    bg={c.goldPale}
                    border="1px solid"
                    borderColor="rgba(200,146,26,0.2)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                >
                    <Icon size={20} color={c.gold} strokeWidth={1.75} />
                </Box>

                {/* Title */}
                <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="700"
                    color={c.text}
                    fontFamily="Georgia, 'Times New Roman', serif"
                    lineHeight={1.3}
                    pr={8}
                >
                    {step.title}
                </Text>

                {/* Divider */}
                <Box w="32px" h="2px" bg={c.crimson} borderRadius="full" />

                {/* Body */}
                <Text
                    fontSize="sm"
                    color={c.muted}
                    lineHeight={1.75}
                    flex={step.bullets.length === 0 ? 1 : undefined}
                >
                    {step.body}
                </Text>

                {/* Bullets */}
                {step.bullets.length > 0 && (
                    <Box as="ul" pl={4} flex={1}>
                        {step.bullets.map((b) => (
                            <Box
                                as="li"
                                key={b}
                                fontSize="sm"
                                color={c.muted}
                                lineHeight={1.75}
                                mb={1}
                                _marker={{ color: c.crimson }}
                            >
                                {b}
                            </Box>
                        ))}
                    </Box>
                )}

                {step.footer && (
                    <Text fontSize="sm" color={c.muted} lineHeight={1.75} fontStyle="italic">
                        {step.footer}
                    </Text>
                )}
            </Box>
        </motion.div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function RecruitmentProcessPage() {
    return (
        <Box minH="100vh">
            <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>

                {/* Breadcrumb */}
                <RevealBox delay={0}>
                    <Flex align="center" gap={1.5} mb={6}>
                        <Text fontSize="xs" color={c.muted} >
                            Home
                        </Text>
                        <Text fontSize="xs" color={c.muted}>/</Text>
                        <Text fontSize="xs" color={c.text} fontWeight="500">
                            Recruitment process
                        </Text>
                    </Flex>
                </RevealBox>

                {/* Page title */}
                <RevealBox delay={0.05}>
                    <Text
                        as="h1"
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                        fontWeight="800"
                        color={c.text}
                        // lineHeight={1.1}
                        letterSpacing="-0.015em"
                        mb={4}
                    >
                        Recruitment Process
                    </Text>
                </RevealBox>

                {/* Subtitle */}
                <RevealBox delay={0.1}>
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color={c.muted}
                        lineHeight={1.75}
                        maxW="1020px"
                        mb={10}
                    >
                        At Interpid HR Solutions, we follow a step-by-step process to make sure every worker
                        is recruited safely, legally, and quickly. From receiving company documents to sending
                        candidates abroad, our system is clear, verified, and trusted.
                    </Text>
                </RevealBox>

                {/* Hero image */}
                <RevealBox delay={0.15}>
                    <Box
                        borderRadius="20px"
                        overflow="hidden"
                        mb={12}
                        h={{ base: "220px", sm: "300px", md: "420px" }}
                        position="relative"
                    >
                        <Image
                            as="img"
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1100&h=500&fit=crop&crop=center"
                            alt="Construction workers"
                            w="full"
                            h="full"
                            objectFit="cover"
                            display="block"
                        />
                        {/* subtle vignette */}
                        <Box
                            position="absolute"
                            inset={0}
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.25) 100%)",
                            }}
                        />
                    </Box>
                </RevealBox>

                {/* Pull-quote */}
                <RevealBox delay={0.1}>
                    <Box
                        borderLeft="4px solid"
                        borderColor={c.crimson}
                        pl={6}
                        mb={14}
                    >
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={c.text}
                            lineHeight={1.75}
                            fontWeight="500"
                            maxW="1020px"
                        >
                            Recruitment with Intrepid HR Solutions is simple, secure, and worry-free. We handle
                            everything—from documents to deployment—so companies get the right people, and
                            candidates move abroad with confidence. Every step is trusted, fast, and fully above
                            board.
                        </Text>
                    </Box>
                </RevealBox>

                <Box
                    display="grid"
                    gridTemplateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={{ base: 5, md: 6 }}
                >
                    {steps.map((step, i) => (
                        <StepCard key={step.num} step={step} index={i} />
                    ))}
                </Box>

                {/* Bottom CTA strip */}
                {/* <RevealBox delay={0.1}>
                    <Box
                        mt={14}
                        borderRadius="16px"
                        p={{ base: 7, md: 10 }}
                        position="relative"
                        overflow="hidden"
                        style={{
                            background: `linear-gradient(135deg, ${c.crimson} 0%, #5A1010 100%)`,
                        }}
                    >
                        <Box
                            position="absolute"
                            top="-40px"
                            right="-40px"
                            w="200px"
                            h="200px"
                            borderRadius="full"
                            bg="rgba(255,255,255,0.04)"
                        />
                        <Box
                            position="absolute"
                            bottom="-30px"
                            left="30%"
                            w="140px"
                            h="140px"
                            borderRadius="full"
                            bg="rgba(255,255,255,0.03)"
                        />

                        <Flex
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "flex-start", md: "center" }}
                            justify="space-between"
                            gap={6}
                            position="relative"
                            zIndex={1}
                        >
                            <Box>
                                <Text
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="800"
                                    color="white"
                                    fontFamily="Georgia, 'Times New Roman', serif"
                                    mb={2}
                                >
                                    Ready to start your journey?
                                </Text>
                                <Text fontSize="sm" color="rgba(255,255,255,0.75)" lineHeight={1.7}>
                                    Apply today and our team will guide you through every step — from documents to
                                    departure.
                                </Text>
                            </Box>
                            <Flex gap={3} flexShrink={0} flexWrap="wrap">
                                <Box
                                    as="a"
                                    href="#apply"
                                    px={6}
                                    py={3}
                                    borderRadius="9px"
                                    bg={c.gold}
                                    color="white"
                                    fontSize="sm"
                                    fontWeight="700"
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ opacity: 0.88, transform: "translateY(-1px)" }}
                                    whiteSpace="nowrap"
                                    fontFamily="system-ui"
                                >
                                    Apply Now →
                                </Box>
                                <Link
                                    as="a"
                                    href="#contact"
                                    px={6}
                                    py={3}
                                    borderRadius="9px"
                                    border="1.5px solid"
                                    borderColor="rgba(255,255,255,0.35)"
                                    color="white"
                                    fontSize="sm"
                                    fontWeight="600"
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ borderColor: "white" }}
                                    whiteSpace="nowrap"
                                    fontFamily="system-ui"
                                >
                                    Contact Us
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </RevealBox> */}

            </Container>
        </Box>
    );
}