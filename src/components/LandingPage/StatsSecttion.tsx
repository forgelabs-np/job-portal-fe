"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { colors, fonts } from "./theme";

const MotionBox = motion(Box);

const stats = [
  {
    value: 5866,
    suffix: "+",
    label: "Success Workers",
    sublabel: "Nepali workers placed safely abroad",
    color: colors.text,
  },
  {
    value: 55,
    suffix: "%",
    label: "Visa Success Rate",
    sublabel: "Most workers get approved easily",
    color: colors.crimson,
  },
  {
    value: 2,
    fraction: "/5",
    suffix: "+",
    label: "Satisfaction Rating",
    sublabel: "Trusted by workers and employers",
    color: colors.text,
  },
];

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{current.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <Box
      as="section"
      bg={colors.white}
      py={{ base: 16, md: 20 }}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor={colors.border}
    >
      <Container maxW="1280px">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 12, md: 4 }}
          justify="space-around"
          align="center"
        >
          {stats.map((stat, i) => (
            <MotionBox
              key={stat.label}
              textAlign="center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              flex={1}
              px={8}
              borderRight={i < stats.length - 1 ? { base: "none", md: "1px solid" } : "none"}
              borderBottom={i < stats.length - 1 ? { base: "1px solid", md: "none" } : "none"}
              borderColor={colors.border}
              pb={{ base: i < stats.length - 1 ? 12 : 0, md: 0 }}
            >
              <Text
                fontFamily={fonts.heading}
                fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
                fontWeight="800"
                lineHeight={1}
                mb={3}
                color={colors.text}
                letterSpacing="-0.03em"
              >
                <AnimatedNumber target={stat.value} />
                {stat.fraction && (
                  <Text as="span" color={colors.crimson}>{stat.fraction}</Text>
                )}
                <Text as="span" color={stat.color === colors.text ? colors.crimson : stat.color}>
                  {stat.suffix}
                </Text>
              </Text>
              <Text
                fontFamily={fonts.heading}
                fontWeight="700"
                fontSize="lg"
                color={colors.text}
                mb={1.5}
              >
                {stat.label}
              </Text>
              <Text
                fontSize="sm"
                color={colors.textMuted}
                fontFamily={fonts.body}
                lineHeight={1.6}
              >
                {stat.sublabel}
              </Text>
            </MotionBox>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}