"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { track } from "./track";

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /* O snippet j.js do Hub já registra o pageview do CARREGAMENTO; este ref
     evita contar a mesma entrada duas vezes — daqui saem só as navegações
     internas do App Router, que o snippet sozinho não enxerga. */
  const primeiraRota = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    track("ViewContent", {
      content_name: pathname,
      page_path: url,
    });
    if (primeiraRota.current) {
      primeiraRota.current = false;
    } else {
      try {
        window.jlp?.("pageview", { path: url });
      } catch {}
    }
  }, [pathname, searchParams]);

  return null;
}

export function RouteViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
