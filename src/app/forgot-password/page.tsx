"use client";

import { useForm } from "react-hook-form";
import { FormProvider } from "@/shared/components/form/provider/FormProvider";
import { TextFieldInput } from "@/shared/components/form/input/TextField";
import { useForgotPasswordMutation, ForgotPasswordDetails } from "@/api/auth";
import { Button, VStack, Text, Box, Flex } from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const methods = useForm<ForgotPasswordDetails>();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit = (data: ForgotPasswordDetails) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        methods.reset();
        router.push("/reset-password");
      },
    });
  };

  return (
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
            fontWeight="800"
            color="#0f1f17"
          >
            Forgot Password
          </Text>
          <Text
            fontSize="15px"
            color="#6b7280"
            lineHeight="1.65"
            maxW="300px"
            mx="auto"
          >
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </Box>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <VStack gap={5}>
            <TextFieldInput
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              required
            />
            <Button
              bg={WEBSITE_THEME_COLOR}
              loading={forgotPasswordMutation.isPending}
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
              w="full"
            >
              Send Reset Link
            </Button>
          </VStack>
        </FormProvider>

        <Flex justify="center" mt={6}>
          <Text
            fontSize="13px"
            color="#6b7280"
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap={2}
            _hover={{ color: WEBSITE_THEME_COLOR }}
            onClick={() => router.push("/login")}
          >
            <ArrowLeft size={14} />
            Back to Login
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordPage;
