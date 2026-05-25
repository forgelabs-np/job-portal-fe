"use client";

import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// ─── Theme ───────────────────────────────────────────────────────────────────
const c = {
    crimson: "#8B1A1A",
    gold: "#C8921A",
    bg: "#F7F4EF",
    white: "#FFFFFF",
    text: "#1C1C1C",
    muted: "#6B6B6B",
    border: "rgba(0,0,0,0.09)",
    numColor: "rgba(139,26,26,0.13)",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const specializations = [
    {
        num: "01",
        title: "Securities Recruitment",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "02",
        title: "Recruiting Aviation Staffs",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "03",
        title: "Recruitment for Health Sector",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "04",
        title: "Agricultural Recruitment",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "05",
        title: "Hospitality Staffing",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "06",
        title: "Oil & Gas Recruitment",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
    {
        num: "07",
        title: "Construction Recruitment",
        paragraphs: [
            "Interpid connects skilled and unskilled workers to top construction companies in the Gulf, Europe, and Asia. From helpers to heavy machine operators, we match you with safe and verified jobs.",
            "We work with trusted partners who need workers for big projects like roads, buildings, and infrastructure. With our support, you get fair contracts, secure placements, and clear guidance at every step.",
        ],
    },
];

function SpecRow({
    item,
    index,
    isLast,
}: {
    item: (typeof specializations)[0];
    index: number;
    isLast: boolean;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-6%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link href={`#  `}>
                <Box
                    as="a"
                    display="block"
                    textDecoration="none"
                    role="group"
                    cursor="pointer"
                >
                    {/* Top border */}
                    <Box h="1px" bg={c.border} />

                    <Flex
                        py={{ base: 8, md: 10 }}
                        gap={{ base: 4, md: 8, lg: 12 }}
                        align="flex-start"
                        direction={{ base: "column", md: "row" }}
                        position="relative"
                        transition="background 0.2s"
                        _groupHover={{ "& .arrow-box": { bg: c.crimson, borderColor: c.crimson } }}
                        px={{ base: 0, md: 2 }}
                    >
                        <Text
                            fontSize={{ base: "xs", md: "sm" }}
                            fontWeight="600"
                            color={c.muted}
                            letterSpacing="0.05em"
                            flexShrink={0}
                            w={{ base: "auto", md: "48px" }}
                            pt={{ base: 0, md: "3px" }}
                        >
                            {item.num}
                        </Text>

                        {/* Title */}
                        <Text
                            fontSize={{ base: "xl", sm: "2xl" }}
                            fontWeight="800"
                            color={c.text}
                            lineHeight={1.2}
                            letterSpacing="-0.02em"
                            flexShrink={0}
                            w={{ base: "full", md: "260px", lg: "320px" }}
                            transition="color 0.2s"
                            _groupHover={{ color: c.crimson }}
                        >
                            {item.title}
                        </Text>

                        {/* Body paragraphs */}
                        <Flex direction="column" gap={4} flex={1}>
                            {item.paragraphs.map((p, i) => (
                                <Text
                                    key={i}
                                    fontSize={{ base: "sm", md: "sm" }}
                                    color={c.muted}
                                    lineHeight={1.8}
                                >
                                    {p}
                                </Text>
                            ))}
                        </Flex>

                        {/* Arrow icon */}
                        <Box
                            className="arrow-box"
                            flexShrink={0}
                            w="36px"
                            h="36px"
                            borderRadius="full"
                            border="1.5px solid"
                            borderColor={c.border}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="all 0.25s"
                            mt={{ base: 0, md: "2px" }}
                            alignSelf={{ base: "flex-end", md: "flex-start" }}
                        >
                            <ArrowUpRight
                                size={16}
                                color={c.crimson}
                                style={{ transition: "color 0.25s" }}
                            />
                        </Box>
                    </Flex>

                    {isLast && <Box h="1px" bg={c.border} />}
                </Box>
            </Link>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OurSpecializationPage() {
    return (
        <Box minH="100vh">
            <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>

                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Flex align="center" gap={1.5} mb={6}>
                        <Link
                            as="a"
                            href="/"
                            color={c.muted}
                        >
                            Home
                        </Link>
                        <Text fontSize="xs" color={c.muted}>/</Text>
                        <Text fontSize="xs" color={c.text} fontWeight="500"  >
                            Our specialization
                        </Text>
                    </Flex>
                </motion.div>

                {/* Page heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Text
                        as="h1"
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                        fontWeight="900"
                        color={c.text}
                        lineHeight={1.05}
                        letterSpacing="-0.03em"
                        mb={5}
                    >
                        Our Specialization
                    </Text>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color={c.muted}
                        lineHeight={1.75}
                        maxW="900px"
                        mb={12}
                    >
                        We bring you real and verified job openings from top companies around the world.
                        Each job is checked by Interpid to make sure it is safe and secure. Browse the
                        list, pick the right fit, and apply easily.
                    </Text>
                </motion.div>

                {/* Specialization list */}
                <Box>
                    {specializations.map((item, i) => (
                        <SpecRow
                            key={item.num}
                            item={item}
                            index={i}
                            isLast={i === specializations.length - 1}
                        />
                    ))}
                </Box>



            </Container>
        </Box>
    );
}