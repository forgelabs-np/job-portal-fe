"use client";

import { useForm } from "react-hook-form";
import { FormProvider } from "@/shared/components/form/provider/FormProvider";
import { TextFieldInput } from "@/shared/components/form/input/TextField";
import { PasswordInput } from "@/shared/components/form";
import { PinInput } from "@/shared/components/form/input/Pin";
import { useResetPasswordMutation, ResetPasswordDetails } from "@/api/auth";
import { Button, VStack, Text, Box, Flex } from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { resetPasswordSchema } from "@/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPasswordPage = () => {
  const methods = useForm<ResetPasswordDetails>({
    defaultValues: {
    token: "",
    newPassword: "",
    confirmPassword: "",
  },
    resolver: yupResolver(resetPasswordSchema),
  });
  const resetPasswordMutation = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = (data: ResetPasswordDetails) => {
        const { confirmPassword, ...rest } = data;
            void confirmPassword;
             const payload = {
                  ...(rest as ResetPasswordDetails),
                };


    resetPasswordMutation.mutate(payload, {
      onSuccess: () => {
        methods.reset();
        router.push("/login");
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
            Reset Password
          </Text>
          <Text
            fontSize="15px"
            color="#6b7280"
            lineHeight="1.65"
            maxW="300px"
            mx="auto"
          >
            Enter the token sent to your email and your new password.
          </Text>
        </Box>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <VStack gap={5}>
            {/* <TextFieldInput
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              required
            /> */}
            <Box w="100%" mx="10">
              <PinInput name="token" />
            </Box>
            <PasswordInput
              name="newPassword"
              label="New Password"
              placeholder="Enter new password"
              required
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm new password"
            />
            <Button
              bg={WEBSITE_THEME_COLOR}
              loading={resetPasswordMutation.isPending}
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
              Reset Password
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

export default ResetPasswordPage;
