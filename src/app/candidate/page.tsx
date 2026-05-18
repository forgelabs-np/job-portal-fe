"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

export default function CandidatePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.CANDIDATE_DASHBOARD);
  }, [router]);

  return null;
}
