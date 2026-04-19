"use client";
import { useEffect } from "react";

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function ErudaProvider() {
  useEffect(() => {
    const enabled =
      process.env.NEXT_PUBLIC_ERUDA === "1" ||
      new URLSearchParams(location.search).has("debug"); // ?debug

    if (!enabled) return;
    // (opcional) limite a iOS pra focar no seu caso
    if (!isIOS()) return;

    let destroyed = false;

    import("eruda").then(async (eruda) => {
      if (destroyed) return;
      eruda.default.init();

      // (opcional) plugins:
      // const dom = await import('eruda-dom'); eruda.default.add(dom.default);
      // const net = await import('eruda-network'); eruda.default.add(net.default);
    });

    return () => {
      destroyed = true;
      try {
        (window as any).eruda?.destroy?.();
      } catch {}
    };
  }, []);

  return null;
}
