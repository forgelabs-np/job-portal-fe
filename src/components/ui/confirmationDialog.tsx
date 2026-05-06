import {
  Button,
  ConditionalValue,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogPositioner,
  DialogRoot,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

interface ConformationDialogProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  handleSubmit?: (rejectedReason?: string) => void;
  borderRadius?: ConditionalValue<string | number>;
  submitActionPending?: boolean;
  action: string;
  showRejectReason?: boolean; // pass true when action is Reject
}

export const ConfirmationDialog = ({
  title,
  action,
  open,
  onClose,
  handleSubmit,
  borderRadius = "3xl",
  submitActionPending = false,
  showRejectReason = false,
}: ConformationDialogProps) => {
  const [rejectedReason, setRejectedReason] = useState("");

  const handleClose = () => {
    setRejectedReason("");
    onClose();
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (handleSubmit) {
      handleSubmit(showRejectReason ? rejectedReason : undefined);
    }
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleClose}
      closeOnInteractOutside={false}
      placement="center"
    >
      <DialogBackdrop />
      <DialogPositioner
        display="flex"
        alignItems="center"
        justifyContent="center"
        top="0"
        left="0"
        width="100%"
        height="100%"
        position="fixed"
      >
        <DialogContent
          borderRadius={borderRadius}
          border="4px solid rgba(255, 255, 255, 0.20)"
          boxShadow="0px 0px 48px 0px rgba(0, 0, 0, 0.08)"
          minWidth="500px"
          p={0}
        >
          <DialogCloseTrigger color={"error.300"} />

          <DialogBody px={8} pt={10} pb={4} mb={0}>
            <Stack alignItems={"center"} gap={3}>
              <Text
                textStyle={"heading_6"}
                fontWeight={"600"}
                color={"gray.700"}
              >
                {title}
              </Text>
              <Text
                color={"gray.500"}
                textStyle={"paragraph_large"}
                textAlign={"center"}
              >
                You&apos;re going to {action}. Are you sure?
              </Text>

              {showRejectReason && (
                <Textarea
                  placeholder="Enter rejection reason..."
                  value={rejectedReason}
                  onChange={(e) => setRejectedReason(e.target.value)}
                  width="100%"
                  minH="100px"
                  borderRadius="lg"
                  resize="none"
                />
              )}
            </Stack>
          </DialogBody>

          <DialogFooter
            mt={4}
            px={8}
            pb={8}
            pt={0}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <Button
              onClick={handleConfirm}
              minW={"112px"}
              textStyle={"subtitle_small"}
              type="button"
              borderRadius={"xl"}
              loading={submitActionPending}
              disabled={showRejectReason && !rejectedReason.trim()}
              backgroundColor={"error.700"}
              _hover={{ backgroundColor: "error.800" }}
            >
              Yes, {action}!
            </Button>
            <Button
              variant="surface"
              minW={"112px"}
              textStyle={"subtitle_small"}
              h={"44px"}
              onClick={handleClose}
              borderRadius={"xl"}
            >
              No, keep it
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};
