"use client";

import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { colors, fonts, radii } from "./theme";
import { useRoleModalStore } from "@/store/roleModalStore";

export function CTASection() {
  const { openLoginModal } = useRoleModalStore();

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 24 }}
      overflow="hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.crimson} 0%, ${colors.crimsonDark} 50%, #4A0E0E 100%)`,
      }}
    >
      {/* Decorative waves */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="200px"
        opacity={0.08}
        style={{
          background: `radial-gradient(ellipse at 20% 100%, rgba(255,255,255,0.4) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        w="400px"
        h="400px"
        borderRadius="full"
        opacity={0.06}
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <Container maxW="1280px" position="relative" zIndex={1}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Text
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="900"
            color="white"
            textAlign="center"
            lineHeight={1.15}
            mb={4}
            maxW={"1000px"}
            mx={"auto"}
          >
            Connecting Talent and Opportunity{" "}
            <Text as="span" display={{ base: "block", md: "inline" }}>
              Worldwide
            </Text>
          </Text>
          <Text
            fontSize="md"
            color="whiteAlpha.800"
            textAlign="center"
            maxW="620px"
            mx="auto"
            lineHeight={1.75}
            mb={10}
          >
            Whether you&apos;re seeking skilled professionals or your next global career,
            we help employers and job seekers connect with confidence and ease.
          </Text>

          <Flex justify="center" gap={4} flexWrap="wrap">
            <Button
              h="48px"
              px={7}
              borderRadius="md"
              border="2px solid"
              borderColor="white"
              bg="transparent"
              color="white"
              fontWeight="700"
              fontSize="sm"
              _hover={{ bg: "white", color: colors.crimson }}
              transition="all 0.25s"
              gap={2}
              onClick={() => openLoginModal()}
            >
              Looking to hire?
              <ArrowRight size={16} />
            </Button>
            <Button
              h="48px"
              px={7}
              borderRadius="md"
              bg={colors.goldLight}
              color="black"
              fontSize="sm"
              _hover={{ bg: colors.goldLight, color: "white" }}
              transition="all 0.25s"
              gap={2}
              onClick={() => openLoginModal()}
            >
              Looking for work?
              <ArrowRight size={16} />
            </Button>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
}