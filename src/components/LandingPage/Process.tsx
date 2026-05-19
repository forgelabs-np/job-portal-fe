"use client";

import { Box, Flex, Text, Button, Input, Textarea, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { colors, fonts, radii } from "./theme";

const MotionBox = motion(Box);

const steps = [
  {
    number: 1,
    title: "Apply Today",
    description: "Fill the form or contact us",
    active: true,
  },
  {
    number: 2,
    title: "Get Selected",
    description: "We help with interview, documents, and visa.",
  },
  {
    number: 3,
    title: "Fly & Start Work",
    description: "Travel safe and begin your new job abroad.",
  },
];

const contactMethods = [
  { icon: MessageSquare, label: "Whatsapp us", value: "+977-9851194513" },
  { icon: Phone, label: "Call us", value: "+977-9851194513" },
  { icon: Mail, label: "Mail us", value: "info@interpidhr.com" },
];

export function ProcessSection() {
  return (
    <Box
      as="section"
      id="process"
      bg={colors.bgSection}
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="1280px">
        {/* Badge */}
        <Flex justify="center" mb={6}>
          <Flex display="inline-flex" align="center" bg={colors.gold} px={4} py={1.5} borderRadius={radii.full}>
            <Text fontSize="2xs" fontWeight="800" color="white" fontFamily={fonts.body} letterSpacing="widest" textTransform="uppercase">
              Start Journey
            </Text>
          </Flex>
        </Flex>

        <Text
          fontFamily={fonts.heading}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="800"
          color={colors.text}
          textAlign="center"
          lineHeight={1.2}
          mb={3}
        >
          Start Your Journey to Work Abroad
        </Text>
        <Text
          fontSize="sm"
          color={colors.textMuted}
          fontFamily={fonts.body}
          lineHeight={1.7}
          textAlign="center"
          maxW="520px"
          mx="auto"
          mb={14}
        >
          Follow the steps and apply today – we will guide you from start to finish.
        </Text>

        {/* Two-column: steps + form */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 10, md: 8 }}
          align="stretch"
        >
          {/* Left — how to go abroad steps */}
          <MotionBox
            flex={1}
            bg={colors.white}
            borderRadius={radii.xl}
            p={8}
            border="1px solid"
            borderColor={colors.border}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text
              fontFamily={fonts.heading}
              fontWeight="700"
              fontSize="xl"
              color={colors.text}
              mb={2}
            >
              How to Go Abroad for Work
            </Text>
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body} mb={8}>
              Follow 3 easy steps and start your dream job safely
            </Text>

            {/* You are here badge */}
            <Flex
              display="inline-flex"
              align="center"
              bg={colors.bgWarm}
              px={3}
              py={1}
              borderRadius={radii.sm}
              mb={6}
              border="1px solid"
              borderColor={colors.border}
            >
              <Text fontSize="2xs" fontWeight="600" color={colors.textMuted} fontFamily={fonts.body}>
                you are here
              </Text>
            </Flex>

            <Flex direction="column" gap={0}>
              {steps.map((step, i) => (
                <Flex key={step.number} gap={4} align="flex-start">
                  {/* Step indicator + line */}
                  <Flex direction="column" align="center">
                    <Flex
                      w="32px"
                      h="32px"
                      borderRadius="full"
                      bg={step.active ? colors.crimson : colors.bgWarm}
                      align="center"
                      justify="center"
                      flexShrink={0}
                      border="2px solid"
                      borderColor={step.active ? colors.crimson : colors.border}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="800"
                        color={step.active ? "white" : colors.textMuted}
                        fontFamily={fonts.body}
                      >
                        {step.number}
                      </Text>
                    </Flex>
                    {i < steps.length - 1 && (
                      <Box w="2px" h="40px" bg={colors.border} mt={1} />
                    )}
                  </Flex>

                  {/* Content */}
                  <Box pb={i < steps.length - 1 ? 6 : 0}>
                    <Text
                      fontFamily={fonts.heading}
                      fontWeight="700"
                      fontSize="md"
                      color={colors.text}
                      mb={0.5}
                    >
                      {step.title}
                    </Text>
                    <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body} lineHeight={1.6}>
                      {step.description}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </MotionBox>

          {/* Right — application form */}
          <MotionBox
            flex={1.5}
            bg={colors.white}
            borderRadius={radii.xl}
            p={8}
            border="1px solid"
            borderColor={colors.border}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text fontFamily={fonts.heading} fontWeight="700" fontSize="xl" color={colors.text} mb={2}>
              Apply Now – Start Your Job Journey
            </Text>
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body} mb={8}>
              Fill the form and our team will guide you step by step.
            </Text>

            <Flex direction="column" gap={4}>
              <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                <Input
                  placeholder="Full Name"
                  fontSize="sm"
                  fontFamily={fonts.body}
                  borderColor={colors.border}
                  borderRadius="md"
                  h="44px"
                  _placeholder={{ color: colors.textLight }}
                  _focus={{ borderColor: colors.crimson, boxShadow: `0 0 0 1px ${colors.crimson}` }}
                />
                <Input
                  placeholder="Phone Number"
                  fontSize="sm"
                  fontFamily={fonts.body}
                  borderColor={colors.border}
                  borderRadius="md"
                  h="44px"
                  _placeholder={{ color: colors.textLight }}
                  _focus={{ borderColor: colors.crimson, boxShadow: `0 0 0 1px ${colors.crimson}` }}
                />
              </Flex>
              <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                <Box flex={1} position="relative">
                  <Box
                    as="select"
                    w="full"
                    h="44px"
                    px={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={colors.border}
                    fontSize="sm"
                    fontFamily={fonts.body}
                    color={colors.textMuted}
                    bg={colors.white}
                    cursor="pointer"
                    style={{ outline: "none" }}
                  >
                    <option value="">Country you want to work</option>
                    <option>Malaysia</option>
                    <option>Qatar</option>
                    <option>Saudi Arabia</option>
                    <option>UAE</option>
                    <option>Kuwait</option>
                    <option>Oman</option>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Box
                    as="select"
                    w="full"
                    h="44px"
                    px={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={colors.border}
                    fontSize="sm"
                    fontFamily={fonts.body}
                    color={colors.textMuted}
                    bg={colors.white}
                    cursor="pointer"
                    style={{ outline: "none" }}
                  >
                    <option value="">Select Job Type</option>
                    <option>Healthcare</option>
                    <option>Caregiving</option>
                    <option>Construction</option>
                    <option>Security</option>
                    <option>Hospitality</option>
                    <option>Manufacturing & Factory</option>
                  </Box>
                </Box>
              </Flex>
              <Textarea
                placeholder="Your Message"
                fontSize="sm"
                fontFamily={fonts.body}
                borderColor={colors.border}
                borderRadius="md"
                rows={4}
                _placeholder={{ color: colors.textLight }}
                _focus={{ borderColor: colors.crimson, boxShadow: `0 0 0 1px ${colors.crimson}` }}
                resize="none"
              />
              <Button
                bg={colors.gold}
                color="white"
                fontFamily={fonts.body}
                fontWeight="700"
                fontSize="sm"
                h="44px"
                borderRadius="md"
                _hover={{ bg: colors.goldLight }}
                transition="all 0.2s"
                w="fit-content"
              >
                Submit now
              </Button>
            </Flex>

            {/* Alternative contact */}
            <Box mt={6} pt={6} borderTop="1px solid" borderColor={colors.border}>
              <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body} mb={4}>
                Think filling out forms takes too long?
              </Text>
              <Flex gap={3} flexWrap="wrap">
                {contactMethods.map((method) => (
                  <Flex
                    key={method.label}
                    align="center"
                    gap={2}
                    bg={colors.bgWarm}
                    borderRadius={radii.md}
                    px={3}
                    py={2.5}
                    flex={1}
                    minW="140px"
                    border="1px solid"
                    borderColor={colors.border}
                    cursor="pointer"
                    _hover={{ borderColor: colors.crimson }}
                    transition="all 0.2s"
                  >
                    <method.icon size={15} color={colors.crimson} />
                    <Box>
                      <Text fontSize="2xs" color={colors.textMuted} fontFamily={fonts.body}>
                        {method.label}
                      </Text>
                      <Text fontSize="xs" fontWeight="700" color={colors.text} fontFamily={fonts.body}>
                        {method.value}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}