"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

type MotionSectionProps = BoxProps & {
  children: React.ReactNode;
  delay?: number;
};

export function MotionSection({
  children,
  delay = 0,
  ...boxProps
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box {...boxProps}>{children}</Box>
    </motion.div>
  );
}
