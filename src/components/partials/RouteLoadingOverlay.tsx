"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 300;
const MAX_VISIBLE_MS = 8000;

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTime = useRef<number>(0);

  const showOverlay = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    startTime.current = Date.now();
    setVisible(true);
  };

  useEffect(() => {
    // Tangkap klik Link/A internal, termasuk NavBot, supaya overlay muncul di semua rute
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("#")) return;
      const targetAttr = anchor.getAttribute("target");
      if (targetAttr && targetAttr !== "_self") return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const destination = `${url.pathname}${url.search}`;
      const current = `${window.location.pathname}${window.location.search}`;
      if (destination === current) return;

      showOverlay();
    };

    const handlePopState = () => showOverlay();

    type PushState = History["pushState"];
    const originalPush: PushState = window.history.pushState.bind(window.history);
    const originalReplace: PushState = window.history.replaceState.bind(window.history);

    window.history.pushState = ((...args: Parameters<PushState>) => {
      showOverlay();
      return originalPush(...args);
    }) as PushState;

    window.history.replaceState = ((...args: Parameters<PushState>) => {
      showOverlay();
      return originalReplace(...args);
    }) as PushState;

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, []);

  // Sembunyikan saat rute sudah berubah, dengan durasi minimum supaya tidak "blink"
  useEffect(() => {
    if (!visible) return;
    if (!startTime.current) startTime.current = Date.now();

    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    hideTimeout.current = setTimeout(() => setVisible(false), remaining);
  }, [pathname, visible]);

  // Fallback: jangan biarkan overlay nempel selamanya kalau ada error
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => setVisible(false), MAX_VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div className="bg-white rounded-xl px-6 py-5 shadow-lg flex items-center gap-3 text-zinc-800">
        <span
          className="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-[#FFCA40] border-t-transparent"
          aria-label="Memuat"
          role="status"
        />
        <div>
          <p className="font-semibold leading-tight">Memuat halaman</p>
          <p className="text-sm text-zinc-500 leading-tight">Tunggu sebentar...</p>
        </div>
      </div>
    </div>
  );
}
