"use client";

import { useForm } from "react-hook-form";
import { FormProvider } from "@/shared/components/form/provider/FormProvider";
import { TextFieldInput } from "@/shared/components/form/input/TextField";
import { Textarea } from "@/shared/components/form";
import { SelectFieldInput } from "@/shared/ui/Select";
import { FileDropzone } from "@/shared/components/form/dropzone/FileDropzone";
import { useUpdateAnnouncementMutation, useAdminAnnouncementById, UpdateAnnouncementDetails, AnnouncementType, TargetAudience } from "@/api/announcements";
import { Button, VStack, Text, Box, Flex } from "@chakra-ui/react";
import { BRAND_COLORS } from "@/constants/color";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateAnnouncementSchema } from "@/schema/announcement";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const targetAudienceOptions = [
  { value: TargetAudience.ALL, label: "All Users" },
  { value: TargetAudience.AGENCY_ONLY, label: "Agency Only" },
  { value: TargetAudience.CANDIDATE_ONLY, label: "Candidate Only" },
];

const announcementTypeOptions = [
  { value: AnnouncementType.GENERAL, label: "General" },
  { value: AnnouncementType.JOB_ALERT, label: "Job Alert" },
  { value: AnnouncementType.SYSTEM_UPDATE, label: "System Update" },
  { value: AnnouncementType.POLICY_CHANGE, label: "Policy Change" },
  { value: AnnouncementType.EVENT, label: "Event" },
];

const EditAnnouncementPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string);
  const methods = useForm<UpdateAnnouncementDetails>();
  const updateMutation = useUpdateAnnouncementMutation();
  const router = useRouter();
  const { data: announcementResponse, isLoading } = useAdminAnnouncementById(id);
  const announcement = announcementResponse?.data?.data;

  useEffect(() => {
    if (announcement) {
      methods.reset({
        title: announcement.title,
        content: announcement.content,
        targetAudience: announcement.targetAudience,
        announcementType: announcement.announcementType,
        publishedAt: announcement.publishedAt,
      });
    }
  }, [announcement, methods]);

  const onSubmit = (data: UpdateAnnouncementDetails) => {
    updateMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          router.push("/announcements");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Flex align="center" gap={4} mb={8}>
        <Button
          variant="ghost"
          onClick={() => router.push("/announcements")}
          px={4}
        >
          <ArrowLeft size={18} />
        </Button>
        <Box>
          <Text fontSize="2xl" fontWeight="800" color="gray.800">
            Edit Announcement
          </Text>
          <Text fontSize="sm" color="gray.600" mt={1}>
            Update announcement details
          </Text>
        </Box>
      </Flex>

      <Box
        bg="white"
        borderRadius="2xl"
        p={8}
        border="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
        maxW="800px"
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <VStack gap={6} align="stretch">
            <TextFieldInput
              name="title"
              label="Title"
              placeholder="Enter announcement title"
              required
            />

            <Textarea
              name="content"
              label="Content"
              placeholder="Enter announcement content"
              required
              rows={6}
            />

            <SelectFieldInput
              name="targetAudience"
              label="Target Audience"
              options={targetAudienceOptions}
              placeholder="Select target audience"
              required
            />

            <SelectFieldInput
              name="announcementType"
              label="Announcement Type"
              options={announcementTypeOptions}
              placeholder="Select announcement type"
              required
            />

            <TextFieldInput
              name="publishedAt"
              label="Publish Date (Optional)"
              type="datetime-local"
              placeholder="Leave empty to publish immediately"
            />

            <Box>
              <Text fontSize="sm" fontWeight="600" color="gray.700" mb={2}>
                Image (Optional)
              </Text>
              <FileDropzone
                value={methods.watch("imageFile") || undefined}
                onChange={(file) => methods.setValue("imageFile", file || undefined)}
                label="Upload Image"
                accept={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"] }}
              />
              {announcement?.imageUrl && (
                <Box mt={2}>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Current image:
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {announcement.imageUrl}
                  </Text>
                </Box>
              )}
            </Box>

            <Flex justify="flex-end" gap={4} pt={4}>
              <Button
                variant="outline"
                borderColor="gray.300"
                onClick={() => router.push("/announcements")}
                px={8}
                borderRadius="xl"
              >
                Cancel
              </Button>
              <Button
                bg={BRAND_COLORS[600]}
                color="white"
                loading={updateMutation.isPending}
                type="submit"
                px={8}
                borderRadius="xl"
                _hover={{ bg: BRAND_COLORS[700] }}
              >
                Update Announcement
              </Button>
            </Flex>
          </VStack>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default EditAnnouncementPage;
