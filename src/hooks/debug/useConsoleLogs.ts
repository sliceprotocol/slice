import { useEffect, useRef, useState } from "react";

export const useConsoleLogs = () => {
  const [logs, setLogs] = useState<
    { type: string; message: string; time: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Keep track of original console methods
  const originalLog = useRef<typeof console.log | null>(null);
  const originalError = useRef<typeof console.error | null>(null);
  const originalWarn = useRef<typeof console.warn | null>(null);

  useEffect(() => {
    // Capture originals once. utilizing the nullish coalescing operator
    // ensures we don't accidentally capture our own wrapper if effect re-runs.
    originalLog.current = originalLog.current ?? console.log;
    originalError.current = originalError.current ?? console.error;
    originalWarn.current = originalWarn.current ?? console.warn;

    const originalLogFn = originalLog.current;
    const originalErrorFn = originalError.current;
    const originalWarnFn = originalWarn.current;

    // 1. Simplified BigInt-safe Formatter
    const formatLog = (args: unknown[]) =>
      args
        .map((arg) =>
          typeof arg === "object" && arg
            ? JSON.stringify(
                arg,
                (_, v) => (typeof v === "bigint" ? v.toString() : v),
                2,
              )
            : String(arg),
        )
        .join(" ");

    const addLog = (type: string, args: unknown[]) => {
      const message = formatLog(args);
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-49), { type, message, time }]);
    };

    // 2. Safe Interceptor Helper
    // This executes the native log immediately, but defers the React state update
    const intercept = (
      type: "log" | "error" | "warn",
      originalFn: Function | null,
      args: any[],
    ) => {
      // Always run the browser's native logger immediately
      if (typeof originalFn === "function") {
        originalFn(...args);
      }

      // Defer the state update to the next tick to prevent
      // "Cannot update component while rendering" errors
      setTimeout(() => {
        addLog(type, args);
      }, 0);
    };

    // Override console methods
    console.log = (...args) => intercept("log", originalLogFn, args);
    console.error = (...args) => intercept("error", originalErrorFn, args);
    console.warn = (...args) => intercept("warn", originalWarnFn, args);

    // Global error handler
    const originalOnError = window.onerror;
    window.onerror = (msg, url, line, col, error) => {
      // Wrap this in setTimeout as well, just in case the error happens during render
      setTimeout(() => {
        addLog("error", [`Uncaught: ${msg} @ ${url}:${line}`]);
      }, 0);

      if (typeof originalOnError === "function") {
        return originalOnError(msg, url, line, col, error);
      }
      return false;
    };

    // Listen for custom open event
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-debug-console", handleOpenEvent);

    return () => {
      // Restore console methods
      if (originalLogFn) console.log = originalLogFn;
      if (originalErrorFn) console.error = originalErrorFn;
      if (originalWarnFn) console.warn = originalWarnFn;

      window.onerror = originalOnError;
      window.removeEventListener("open-debug-console", handleOpenEvent);
    };
  }, []);

  const clearLogs = () => setLogs([]);

  return {
    logs,
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    clearLogs,
  };
};
