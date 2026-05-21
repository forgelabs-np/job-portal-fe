"use client";

import { Box, Flex, Text, Input, Button, Container, SimpleGrid, Link } from "@chakra-ui/react";
import { Phone, PhoneCall, Mail, MapPin } from "lucide-react";
import { colors, fonts, radii } from "./theme";
import { CeImage, IecImage, InterpidLogo, Iso1Image, IsoImage } from "@/assets/images/landing";
import { LogoIcon } from "@/assets/svg/landing";
import Image from "next/image";

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

const certifications = [IsoImage, IecImage, CeImage, Iso1Image];

export function Footer() {
  return (
    <Box as="footer" bg={colors.white} borderTop="1px solid" borderColor={colors.border}>
      {/* Newsletter bar */}
      <Box borderBottom="1px solid" borderColor={colors.border} py={10}>
        <Container maxW="1300px">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={6}
          >
            <Box>
              <Text
                fontWeight="700"
                fontSize="xl"
                color={colors.text}
                mb={1}
              >
                Join our Newsletter
              </Text>
              <Text fontSize="sm" color={colors.textMuted}>
                We will send you updates about new job opportunities abroad directly to your email.
              </Text>
            </Box>
            <Box minW={{ md: "360px" }}>
              <Text
                fontSize="2xs"
                fontWeight="700"
                color={colors.textMuted}
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
              
                
              <LogoIcon/>
              </Flex>
            <Text fontSize="xs" color={colors.textMuted}  lineHeight={1.7} mb={4}>
              © 2016–2025, Interpid Recruitment Services.
            </Text>
            {/* Cert badges */}
            <Flex gap={2} flexWrap="wrap">
              {certifications.map((cert) => (
                <Box
                  key={cert}
                  w="60px"
                  h="60px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={colors.bgWarm}
                >
                 <Image src={cert} alt="Certification" />
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Quick Links */}
          <Box>
            <Text fontSize="2xs" fontWeight="800" color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Quick Link
            </Text>
            <Flex direction="column" gap={2}>
              {quickLinks.map((link) => (
                <Link
                  key={link}
                  as="a"
                  href="#"
                  fontSize="sm"
                  color={colors.textMuted}
                  _hover={{ color: colors.crimson }}
                  transition="color 0.2s"
                  textDecoration="none"
                >
                  {link}
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Countries */}
          <Box>
            <Text fontSize="2xs" fontWeight="800"  color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Countries
            </Text>
            <Flex direction="column" gap={2}>
              {countries.map((c) => (
                <Link
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
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Services */}
          <Box>
            <Text fontSize="2xs" fontWeight="800"  color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
              Services
            </Text>
            <Flex direction="column" gap={2}>
              {services.map((s) => (
                <Link
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
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Contact */}
          <Box>
            <Text fontSize="2xs" fontWeight="800"  color={colors.textMuted} letterSpacing="widest" textTransform="uppercase" mb={4}>
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
               <Link
  key={item}
  href="#"
  fontSize="xs"
  color={colors.textMuted}
  _hover={{ color: colors.crimson }}
  textDecoration="none"
>
  {item}
</Link>
              ))}
            </Flex>
          
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}