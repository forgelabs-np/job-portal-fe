"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { Box, Flex, Text, HStack, Stack } from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, FormProvider, PinInput } from "@/shared";
import { useForm } from "react-hook-form";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useOtpEmailStore } from "@/store";
import { useVerifySignupMutation, VerifySignupDetails } from "@/api/auth";

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

const ShieldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={WEBSITE_THEME_COLOR}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const OTP_LENGTH = 6;

interface OtpPageProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  sentTo?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  onBackToSelection?: () => void;
}

export const OtpPage = ({
  title = "Verify",
  titleAccent = "Identity",
  description = "Enter the 6-digit code sent to your registered email address.",
  sentTo = "admin@nexuflow.com",
  onVerify,
  onResend,
  onBackToSelection,
}: OtpPageProps) => {
  const methods = useForm<VerifySignupDetails>();
  const router = useRouter();
  const { otpEmail } = useOtpEmailStore();

  const { mutate, isPending } = useVerifySignupMutation();

  const onSubmit = (data: VerifySignupDetails) => {
    const payload = {
      ...data,
      email: otpEmail,
    };
    mutate(payload, {
      onSuccess: () => {
        router.push(ROUTES.LOGIN);
      },
    });
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
            <Flex
              w="60px"
              h="60px"
              bg="#f0fdf4"
              borderRadius="2xl"
              align="center"
              justify="center"
              mx="auto"
              mb={5}
              border="1.5px solid"
              borderColor="#bbf7d0"
            >
              <ShieldIcon />
            </Flex>

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
              mb={2}
            >
              {description}
            </Text>

            <Text fontSize="13px" fontWeight="700" color={WEBSITE_THEME_COLOR}>
              {sentTo}
            </Text>
          </Box>

          <Stack gap={6}>
            <Box w={"100%"} mx={"10"}>
              <PinInput name="otp" />
            </Box>

            <Button
              bg={WEBSITE_THEME_COLOR}
              loading={isPending}
              w={"full"}
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
              {" "}
              Verify & Continue
              <ArrowRightIcon />
            </Button>
          </Stack>

          {/* Footer */}
          <Flex direction="column" align="center" gap={2} mt={6}>
            <Text fontSize="13px" color="#9ca3af">
              Didn&apos;t receive the code?{" "}
              <Text
                as="span"
                color={WEBSITE_THEME_COLOR}
                fontWeight="700"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={onResend}
              >
                Resend Code
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
              onClick={() => router.push(ROUTES.LOGIN)}
            >
              Back to Login
            </Text>
          </Flex>
        </Box>
      </Flex>
    </FormProvider>
  );
};
