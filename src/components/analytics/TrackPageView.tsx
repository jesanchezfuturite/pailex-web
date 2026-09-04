"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/tracking";

/**
 * Dispara un evento de vista una sola vez al montar. Para páginas de
 * servidor (no pueden usar hooks directamente) que necesitan un evento tipo
 * "view_service" al entrar.
 */
export default function TrackPageView({ event, data }: { event: string; data?: Record<string, unknown> }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    pushEvent(event, data);
  }, []);

  return null;
}
