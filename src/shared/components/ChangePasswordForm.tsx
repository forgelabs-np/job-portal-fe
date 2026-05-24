"use client";

import { ChangePasswordDetails, useChangePasswordMutation } from "@/api/auth";
import {  VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./form";
import { FormProvider } from "./form/provider/FormProvider";
import { changePasswordSchema } from "@/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui";
import { WEBSITE_THEME_COLOR } from "@/constants/color";

export const ChangePasswordForm = ({onClose}: {onClose: () => void}) => {
  const methods = useForm<ChangePasswordDetails>({
    resolver: yupResolver(changePasswordSchema),
  });
  const {mutate:changePasswordMutation,isPending} = useChangePasswordMutation();

  const onSubmit = (data: ChangePasswordDetails) => {
    changePasswordMutation(data, {
      onSuccess: () => {
        methods.reset();
        onClose();
      },
    });
  };

  return (
    <VStack gap={4} align="stretch" maxW="400px">
      
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack gap={4}>
          <PasswordInput
            name="currentPassword"
            label="Current Password"
            type="password"
            required
          />
          <PasswordInput
            name="newPassword"
            label="New Password"
            type="password"
            required
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
          <Button
            type="submit"
            bg={WEBSITE_THEME_COLOR}
            loading={isPending}
          >
            {isPending ? "Changing..." : "Change Password"}
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
