"use client";

import { useRef } from "react";
import {
    Box,
    Flex,
    Text,
    Container,
    Grid,
    Input,
    Textarea,
    Button,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageSquare, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Theme ───────────────────────────────────────────────────────────────────
const c = {
    crimson: "#8B1A1A",
    crimsonDark: "#5A1010",
    gold: "#C8921A",
    goldLight: "#D4A827",
    bg: "#F7F4EF",
    bgWarm: "#EDE8DF",
    white: "#FFFFFF",
    text: "#1C1C1C",
    muted: "#6B6B6B",
    light: "#9A9A9A",
    border: "rgba(0,0,0,0.09)",
    serif: "Georgia, 'Times New Roman', serif",
    sans: "system-ui, -apple-system, sans-serif",
};

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
    children,
    delay = 0,
    y = 22,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-6%" });
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

const contactMethods = [
    {
        icon: Phone,
        title: "Call us",
        sub: "Anytime 24/7",
        detail: "(+971) 26783515",
        isLink: false,
    },
    {
        icon: MessageSquare,
        title: "Chat with us",
        sub: "Our Friendly team is here to help.",
        detail: "info@oozohr.com",
        isLink: true,
        href: "mailto:info@oozohr.com",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        sub: "Say hello at our Office.",
        detail: "Office 10, 7th Floor, Block B, AL Saman Tower, Hamdan Bin Mohammed St - Al Danah - Zone 1 - Abu Dhabi.",
        isLink: true,
        href: "https://maps.google.com/?q=Office+10,+7th+Floor,+Block+B,+AL+Saman+Tower,+Hamdan+Bin+Mohammed+St+-+Al+Danah+-+Zone+1+-+Abu+Dhabi",
    },
];

const subjectOptions = [
    "Job Inquiry",
    "Partnership",
    "Recruitment Services",
    "Other",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactUsPage() {
    return (
        <Box minH="100vh">

            {/* ── Hero / header ── */}
            <Box pt={{ base: 10, md: 14 }} pb={{ base: 12, md: 16 }}>
                <Container maxW="1400px" px={{ base: 4, md: 8 }}>

                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <Flex gap={1.5} align="center" mb={6}>
                            <Link href={"/"}>
                                <Text
                                    fontSize="xs" color={c.muted}
                                    textDecoration="none" _hover={{ color: c.crimson }} transition="color 0.2s"
                                >
                                    Home
                                </Text>
                            </Link>
                            <Text fontSize="xs" color={c.muted}>/</Text>
                            <Text fontSize="xs" color={c.text} fontWeight="500">
                                Contact us
                            </Text>
                        </Flex>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Text
                            as="h1"
                            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                            fontWeight="900"
                            color={c.text}
                            lineHeight={1.1}
                            letterSpacing="-0.02em"
                            mb={4}
                        >
                            Get in touch with us
                        </Text>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Text fontSize={{ base: "sm", md: "md" }} color={c.muted} lineHeight={1.8} maxW="1020px" mb={10}>
                            We bring you real and verified job openings from top companies around the world.
                            Each job is checked by Interpid to make sure it is safe and secure. Browse the
                            list, pick the right fit, and apply easily.
                        </Text>
                    </motion.div>

                    {/* ── Contact method cards ── */}
                    <Reveal delay={0.12}>
                        <Box
                            // bg={c.white}
                            border="1px solid"
                            borderColor={c.border}
                            borderRadius="16px"
                            p={{ base: 5, md: 7 }}
                            mb={14}
                            bg={c.bg}
                        >
                            <Grid
                                templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
                                gap={0}
                                divideX={{ sm: "1px solid" }}
                            >
                                {contactMethods.map((m, i) => (
                                    <Box
                                        key={m.title}
                                        px={{ base: 0, sm: i === 0 ? 0 : 7 }}
                                        py={{ base: i > 0 ? 6 : 0, sm: 0 }}
                                        borderTop={i > 0 ? { base: "1px solid", sm: "none" } : "none"}
                                        borderColor={c.border}
                                    >
                                        <Flex align="flex-start" gap={3.5}>
                                            <Flex
                                                w="40px" h="40px" borderRadius="10px"
                                                bg="rgba(200,146,26,0.09)"
                                                border="1px solid rgba(200,146,26,0.18)"
                                                align="center" justify="center" flexShrink={0} mt={0.5}
                                            >
                                                <m.icon size={18} color={c.gold} strokeWidth={1.75} />
                                            </Flex>
                                            <Box>
                                                <Text fontSize="md" fontWeight="700" color={c.text} mb={0.5}>
                                                    {m.title}
                                                </Text>
                                                <Text fontSize="xs" color={c.muted} mb={1.5} >
                                                    {m.sub}
                                                </Text>
                                                {m.isLink && m.href ? (
                                                    <Link href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined}>
                                                        <Text
                                                            as="a"
                                                            fontSize="sm"
                                                            fontWeight="700"
                                                            color={c.gold}
                                                            textDecoration="none"
                                                            _hover={{ textDecoration: "underline" }}
                                                        >
                                                            {m.detail}
                                                        </Text>
                                                    </Link>
                                                ) : (
                                                    <Text fontSize="sm" fontWeight="700" color={c.gold} >
                                                        {m.detail}
                                                    </Text>
                                                )}
                                            </Box>
                                        </Flex>
                                    </Box>
                                ))}
                            </Grid>
                        </Box>
                    </Reveal>

                    {/* ── Reach out + Map ── */}
                    <Grid
                        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                        gap={{ base: 10, md: 10 }}
                        alignItems="start"
                    >
                        {/* Form */}
                        <Reveal delay={0.08}>
                            <Box>
                                <Text
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="800"
                                    color={c.text}
                                    mb={1}
                                >
                                    Reach us out
                                </Text>
                                <Text fontSize="sm" color={c.muted} mb={7} >
                                    Fill out the form and we will be back to you shortly.
                                </Text>

                                <Flex direction="column" gap={4}>
                                    {/* Row 1 */}
                                    <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                                        <Input
                                            placeholder="Full Name"
                                            fontSize="sm"
                                            h="46px"
                                            borderColor={c.border}
                                            borderRadius="10px"
                                            bg={c.white}
                                            _placeholder={{ color: c.light }}
                                            _focus={{ borderColor: c.crimson, boxShadow: `0 0 0 1px ${c.crimson}` }}
                                        />
                                        <Input
                                            placeholder="Phone Number"
                                            fontSize="sm"
                                            h="46px"
                                            borderColor={c.border}
                                            borderRadius="10px"
                                            bg={c.white}
                                            _placeholder={{ color: c.light }}
                                            _focus={{ borderColor: c.crimson, boxShadow: `0 0 0 1px ${c.crimson}` }}
                                        />
                                    </Grid>

                                    {/* Row 2 */}
                                    <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                                        <Input
                                            placeholder="Email Address"
                                            type="email"
                                            fontSize="sm"
                                            h="46px"
                                            borderColor={c.border}
                                            borderRadius="10px"
                                            bg={c.white}
                                            _placeholder={{ color: c.light }}
                                            _focus={{ borderColor: c.crimson, boxShadow: `0 0 0 1px ${c.crimson}` }}
                                        />
                                        <Input
                                            placeholder="Location"
                                            fontSize="sm"
                                            h="46px"
                                            borderColor={c.border}
                                            borderRadius="10px"
                                            bg={c.white}
                                            _placeholder={{ color: c.light }}
                                            _focus={{ borderColor: c.crimson, boxShadow: `0 0 0 1px ${c.crimson}` }}
                                        />
                                    </Grid>

                                    {/* Subject dropdown */}
                                    <Box
                                        as="select"
                                        w="full"
                                        h="46px"
                                        px={3}
                                        borderRadius="10px"
                                        border="1px solid"
                                        borderColor={c.border}
                                        fontSize="sm"
                                        color={c.light}
                                        bg={c.white}
                                        cursor="pointer"
                                        style={{ outline: "none" }}
                                        _focus={{ borderColor: c.crimson }}
                                    >
                                        <option value="" disabled selected>Select the Subject</option>
                                        {subjectOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </Box>

                                    {/* Message */}
                                    <Textarea
                                        placeholder="Your Message"
                                        fontSize="sm"
                                        borderColor={c.border}
                                        borderRadius="10px"
                                        bg={c.white}
                                        rows={6}
                                        resize="none"
                                        _placeholder={{ color: c.light }}
                                        _focus={{ borderColor: c.crimson, boxShadow: `0 0 0 1px ${c.crimson}` }}
                                    />

                                    {/* Submit */}
                                    <Box>
                                        <Button
                                            bg={c.gold}
                                            color="white"
                                            fontWeight="700"
                                            fontSize="sm"
                                            h="46px"
                                            px={8}
                                            borderRadius="10px"
                                            _hover={{ bg: c.goldLight, transform: "translateY(-1px)" }}
                                            transition="all 0.2s"
                                        >
                                            Submit Now
                                        </Button>
                                    </Box>
                                </Flex>
                            </Box>
                        </Reveal>

                        {/* Map */}
                        <Reveal delay={0.14}>
                            <Box
                                borderRadius="16px"
                                overflow="hidden"
                                border="1px solid"
                                borderColor={c.border}
                                h={{ base: "320px", md: "520px" }}
                                position="relative"
                                boxShadow="0 4px 24px rgba(0,0,0,0.07)"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.659280167931!2d54.36085447535914!3d24.490617378172526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e67bf0ebc003f%3A0xd4f9e4635c5e8029!2sAl%20Saman%20Tower!5e1!3m2!1sen!2snp!4v1782016877995!5m2!1sen!2snp"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Interpid HR Location"
                                />
                            </Box>
                        </Reveal>
                    </Grid>
                </Container >
            </Box >



        </Box >
    );
}