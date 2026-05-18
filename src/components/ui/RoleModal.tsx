"use client";

import { useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Dialog } from "@/shared";
import Link from "next/link";
import { generateNextPath } from "@/utils/router";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

// Icons
const AgencyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CandidateIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

type AccentType = "green" | "dark";

interface PortalOption {
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  href?: string;
  accent: AccentType;
}

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  mode?: "login" | "register";
}

const hoverTokens: Record<
  AccentType,
  {
    bg: string;
    iconBg: string;
    iconColor: string;
    text: string;
    desc: string;
    link: string;
    border: string;
  }
> = {
  green: {
    bg: "#166534",
    iconBg: "rgba(255,255,255,0.18)",
    iconColor: "white",
    text: "white",
    desc: "rgba(255,255,255,0.72)",
    link: "white",
    border: "#166534",
  },
  dark: {
    bg: "#0f1f17",
    iconBg: "rgba(255,255,255,0.12)",
    iconColor: "white",
    text: "white",
    desc: "rgba(255,255,255,0.62)",
    link: "white",
    border: "#0f1f17",
  },
};

const defaultTokens: Record<
  AccentType,
  {
    bg: string;
    iconBg: string;
    iconColor: string;
    text: string;
    desc: string;
    link: string;
    border: string;
  }
> = {
  green: {
    bg: "#f0fdf4",
    iconBg: "white",
    iconColor: "#166534",
    text: "#0f1f17",
    desc: "#6b7280",
    link: "#166534",
    border: "#bbf7d0",
  },
  dark: {
    bg: "#f9fafb",
    iconBg: "white",
    iconColor: "#374151",
    text: "#0f1f17",
    desc: "#6b7280",
    link: "#0f1f17",
    border: "#e5e7eb",
  },
};

const PortalCard = ({
  portal,
  onClose,
}: {
  portal: PortalOption;
  onClose?: () => void;
}) => {
  const router = useRouter();

  const [hovered, setHovered] = useState(false);
  const t = hovered ? hoverTokens[portal.accent] : defaultTokens[portal.accent];

  return (
    // <Link href={portal.href ?? "#"}>
    <Box
      as="a"
      // href={portal.href ?? "#"}
      bg={t.bg}
      border="1.5px solid"
      borderColor={t.border}
      borderRadius="2xl"
      p={7}
      display="flex"
      flexDirection="column"
      gap={10}
      cursor="pointer"
      textDecoration="none"
      transition="all 0.22s ease"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? "translateY(-2px)" : "translateY(0)" }}
      boxShadow={hovered ? "0 8px 28px rgba(0,0,0,0.14)" : "none"}
      onClick={() => {
        if (portal.href) {
          router.push(portal.href);
        }
        onClose?.();
      }}
    >
      <Box
        w="52px"
        h="52px"
        bg={t.iconBg}
        borderRadius="xl"
        border="1.5px solid"
        borderColor={
          hovered ? "transparent" : defaultTokens[portal.accent].border
        }
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={t.iconColor}
        boxShadow={hovered ? "none" : "0 1px 4px rgba(0,0,0,0.06)"}
        transition="all 0.22s ease"
      >
        {portal.icon}
      </Box>

      <Box flex={1}>
        <Text
          fontWeight="800"
          fontSize="20px"
          color={t.text}
          letterSpacing="-0.02em"
          mb={2}
          transition="color 0.22s ease"
        >
          {portal.title}
        </Text>
        <Text
          fontSize="14px"
          color={t.desc}
          lineHeight="1.65"
          transition="color 0.22s ease"
        >
          {portal.description}
        </Text>
      </Box>

      <Flex
        align="center"
        gap={1.5}
        color={t.link}
        fontWeight="700"
        fontSize="14px"
        transition="color 0.22s ease"
      >
        {portal.linkLabel}
        <ArrowRightIcon />
      </Flex>
    </Box>
    // </Link>
  );
};

export const RoleModal = ({
  open,
  onClose,
  title,
  subtitle,
  mode = "login",
}: LoginModalProps) => {
  const isRegister = mode === "register";

  const defaultTitle = isRegister ? "Create Account" : "Welcome Back";
  const defaultSubtitle = isRegister
    ? "Select your registration portal to continue."
    : "Select your destination portal to continue.";

  const portals: PortalOption[] = [
    {
      name: "agency",
      icon: <AgencyIcon />,
      title: "Agency Portal",
      description:
        "For agency owners and managers overseeing global distribution.",
      linkLabel: isRegister ? "Register Agency" : "Enter Console",
      href: isRegister ? ROUTES.SIGNUP : ROUTES.LOGIN,
      accent: "green",
    },
    {
      name: "candidate",
      icon: <CandidateIcon />,
      title: "Candidate Portal",
      description:
        "For job seekers and professionals looking for global opportunities.",
      linkLabel: isRegister ? "Register Candidate" : "Enter Portal",
      href: isRegister ? ROUTES.CANDIDATE_SIGNUP : ROUTES.CANDIDATE_LOGIN,
      accent: "dark",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      hasCloseTrigger
      contentMinWidth="680px"
    >
      <Box p={10}>
        <Box mb={8}>
          <Text
            fontWeight="800"
            fontSize="32px"
            color="#0f1f17"
            letterSpacing="m-0.02em"
            lineHeight="1.1"
            mb={2}
          >
            {title ?? defaultTitle}
          </Text>
          <Text
            fontSize="11px"
            fontWeight="600"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="#9ca3af"
          >
            {subtitle ?? defaultSubtitle}
          </Text>
        </Box>

        <Grid templateColumns="1fr 1fr" gap={4}>
          {portals.map((portal) => (
            <PortalCard key={portal.title} portal={portal} onClose={onClose} />
          ))}
        </Grid>
      </Box>
    </Dialog>
  );
};
