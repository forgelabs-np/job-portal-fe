"use client";

import { Box, Flex, Text, Input, Button, Container, SimpleGrid } from "@chakra-ui/react";
import { Phone, PhoneCall, Mail, MapPin } from "lucide-react";
import { colors, fonts, radii } from "./theme";

const quickLinks = ["Home", "Job listing", "Hiring companies", "Our specialization", "Recruitment process", "Contact us"];
const countries = ["Saudi Arabia", "UAE (Dubai)", "Kuwait", "Oman", "Qatar", "Romania", "Malaysia"];
const services = [
  "Construction Recruitment",
  "Oil & Gas Recruitment",
  "Hospitality Staffing",
  "Agricultural Recruitment",
  "Recruitment for Health Sector",
  "Recruiting Aviation staffs",
];

const certifications = ["ISO", "ESG", "CE", "ISO 9001"];

export function Footer() {
  return (
    <Box as="footer" bg={colors.white} borderTop="1px solid" borderColor={colors.border}>
      {/* Newsletter bar */}
      <Box borderBottom="1px solid" borderColor={colors.border} py={10}>
        <Container maxW="1280px">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={6}
          >
            <Box>
              <Text
                fontFamily={fonts.heading}
                fontWeight="700"
                fontSize="xl"
                color={colors.text}
                mb={1}
              >
                Join our Newsletter
              </Text>
              <Text fontSize="sm" color={colors.textMuted} fontFamily={fonts.body}>
                We will send you updates about new job opportunities abroad directly to your email.
              </Text>
            </Box>
            <Box minW={{ md: "360px" }}>
              <Text
                fontSize="2xs"
                fontWeight="700"
                color={colors.textMuted}
                fontFamily={fonts.body}
                letterSpacing="widest"
                textTransform="uppercase"
                mb={2}
              >
                Subscribe to Newsletter
              </Text>
              <Flex gap={2}>
                <Input
                  placeholder="Your Email Address"
                  fontSize="sm"
                  fontFamily={fonts.body}
                  borderColor={colors.border}
                  borderRadius="md"
                  h="40px"
                  flex={1}
                  _placeholder={{ color: colors.textLight }}
                  _focus={{ borderColor: colors.crimson, boxShadow: `0 0 0 1px ${colors.crimson}` }}
                />
                <Button
                  bg={colors.gold}
                  color="white"
                  fontFamily={fonts.body}
                  fontWeight="700"
                  fontSize="sm"
                  h="40px"
                  px={5}
                  borderRadius="md"
                  _hover={{ bg: colors.goldLight }}
                  flexShrink={0}
                >
                  Subscribe
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main footer */}
      <Container maxW="1280px" py={12}>
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1.5fr 1fr 1fr 1.2fr 1.3fr" }}
          gap={8}
        >
          {/* Brand */}
          <Box>
            <Flex align="center" gap={2} mb={3}>
              <Box
                w="36px"
                h="36px"
                borderRadius="md"
                bg={colors.crimson}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="xs" fontWeight="900" color="white" fontFamily={fonts.heading}>
                  IP
                </Text>
              </Box>
              <Text fontFamily={fonts.heading} fontWeight="700" fontSize="lg" color={colors.text}>
                INTERPID
              </Text>
            </Flex>
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body} lineHeight={1.7} mb={4}>
              © 2016–2025, Interpid Recruitment Services.
            </Text>
            {/* Cert badges */}
            <Flex gap={2} flexWrap="wrap">
              {certifications.map((cert) => (
                <Box
                  key={cert}
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  border="1.5px solid"
                  borderColor={colors.border}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={colors.bgWarm}
                >
                  <Text fontSize="2xs" fontWeight="700" color={colors.textMuted} textAlign="center">
                    {cert}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Quick Links */}
          <Box>
            <Text fontSize="2xs" fontWeight="800" fontFamily={fonts.body} color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Quick Link
            </Text>
            <Flex direction="column" gap={2}>
              {quickLinks.map((link) => (
                <Box
                  key={link}
                  as="a"
                  href="#"
                  fontSize="sm"
                  color={colors.textMuted}
                  fontFamily={fonts.body}
                  _hover={{ color: colors.crimson }}
                  transition="color 0.2s"
                  textDecoration="none"
                >
                  {link}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Countries */}
          <Box>
            <Text fontSize="2xs" fontWeight="800" fontFamily={fonts.body} color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Countries
            </Text>
            <Flex direction="column" gap={2}>
              {countries.map((c) => (
                <Box
                  key={c}
                  as="a"
                  href="#"
                  fontSize="sm"
                  color={colors.textMuted}
                  fontFamily={fonts.body}
                  _hover={{ color: colors.crimson }}
                  transition="color 0.2s"
                  textDecoration="none"
                >
                  {c}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Services */}
          <Box>
            <Text fontSize="2xs" fontWeight="800" fontFamily={fonts.body} color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Services
            </Text>
            <Flex direction="column" gap={2}>
              {services.map((s) => (
                <Box
                  key={s}
                  as="a"
                  href="#"
                  fontSize="sm"
                  color={colors.textMuted}
                  fontFamily={fonts.body}
                  _hover={{ color: colors.crimson }}
                  transition="color 0.2s"
                  textDecoration="none"
                >
                  {s}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Contact */}
          <Box>
            <Text fontSize="2xs" fontWeight="800" fontFamily={fonts.body} color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Contact
            </Text>
            <Flex direction="column" gap={3}>
              {[
                { icon: Phone, text: "+977-14560530 / 4560531" },
                { icon: PhoneCall, text: "+977-9851194513 / 4560531" },
                { icon: Mail, text: "info@interpidhr.com" },
                { icon: MapPin, text: "Sinamangal 9, Kathmandu, Nepal" },
              ].map(({ icon: Icon, text }) => (
                <Flex key={text} align="flex-start" gap={2}>
                  <Box mt={0.5} flexShrink={0}>
                    <Icon size={14} color={colors.crimson} />
                  </Box>
                  <Text fontSize="sm" color={colors.textMuted} fontFamily={fonts.body} lineHeight={1.5}>
                    {text}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>
      </Container>

      {/* Bottom bar */}
      <Box borderTop="1px solid" borderColor={colors.border} py={4}>
        <Container maxW="1280px">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
            <Flex gap={4}>
              {["Privacy policy", "Terms & Conditions"].map((item) => (
                <Box
                  key={item}
                  as="a"
                  href="#"
                  fontSize="xs"
                  color={colors.textMuted}
                  fontFamily={fonts.body}
                  _hover={{ color: colors.crimson }}
                  textDecoration="none"
                >
                  {item}
                </Box>
              ))}
            </Flex>
            <Text fontSize="xs" color={colors.textLight} fontFamily={fonts.body}>
              Designed & Developed by Makura Creatives
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}