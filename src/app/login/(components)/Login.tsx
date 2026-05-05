"use client";

import { useState } from "react";
import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, FormProvider, PasswordInput, TextFieldInput } from "@/shared";
import { useForm } from "react-hook-form";
import { OtpPage } from "./OTP";
import { LoginDetails, LoginType, useLoginMutation } from "@/api/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface LoginPageProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  emailPlaceholder?: string;
  onSignIn?: (email: string, password: string) => void;
  onRegister?: () => void;
  onBackToSelection?: () => void;
  userType: LoginType;
}

export const LoginPage = ({
  title = "Admin",
  titleAccent = "Access",
  description = "Manage the global manpower distribution network.",
  emailPlaceholder = "admin@nexuflow.com",
  userType = "agency",
  onBackToSelection,
}: LoginPageProps) => {
  const methods = useForm<LoginDetails>();

  const { mutate, isPending } = useLoginMutation(userType);
  const router = useRouter();

  const onSubmit = (data: LoginDetails) => {
    console.log(data, "data");
    mutate(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex minH="90vh" align="center" justify="center" px={4}>
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="0 4px 40px rgba(0,0,0,0.08)"
          p={{ base: 8, md: 12 }}
          w="full"
          maxW="480px"
        >
          <Box textAlign="center" mb={8}>
            <Text
              fontSize={{ base: "28px", md: "34px" }}
              letterSpacing="-0.02em"
              lineHeight="1.15"
              mb={3}
            >
              <Text as="span" fontWeight="800" color="#0f1f17">
                {title}{" "}
              </Text>
              <Text
                as="span"
                fontWeight="400"
                fontStyle="italic"
                color={WEBSITE_THEME_COLOR}
              >
                {titleAccent}
              </Text>
            </Text>
            <Text
              fontSize="15px"
              color="#6b7280"
              lineHeight="1.65"
              maxW="300px"
              mx="auto"
            >
              {description}
            </Text>
          </Box>

          <Flex direction="column" gap={5}>
            <TextFieldInput
              name="email"
              placeholder={emailPlaceholder}
              borderColor="#e5e7eb"
              borderRadius="lg"
              label="Email Address"
            />

            <PasswordInput
              name="password"
              borderColor="#e5e7eb"
              borderRadius="lg"
              label="Password"
            />
            <Button
              bg={WEBSITE_THEME_COLOR}
              loading={isPending}
              type="submit"
              p={6}
              borderRadius="full"
              boxShadow={`0 4px 16px rgba(13,105,68,0.28)`}
              _hover={{
                bg: "#0a5535",
                transform: "translateY(-1px)",
                boxShadow: `0 8px 24px rgba(13,105,68,0.35)`,
              }}
              transition="all 0.2s ease"
            >
              Sign In to Dashboard
              <ArrowRightIcon />{" "}
            </Button>
          </Flex>

          {/* Footer */}
          <Flex direction="column" align="center" gap={2} mt={6}>
            <Text fontSize="13px" color="#9ca3af">
              New administrator?{" "}
              <Text
                as="span"
                color={WEBSITE_THEME_COLOR}
                fontWeight="700"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => router.push(ROUTES.SIGNUP)}
              >
                Register
              </Text>
            </Text>
            <Text
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="#9ca3af"
              cursor="pointer"
              _hover={{ color: WEBSITE_THEME_COLOR }}
              transition="color 0.15s ease"
              onClick={onBackToSelection}
            >
              Back to Selection
            </Text>
          </Flex>
        </Box>
      </Flex>
    </FormProvider>
  );
};
