"use client";

import { useEffect, useState, useRef } from "react";
import { X, Trash2, Minimize2, Maximize2, Copy } from "lucide-react";

export const ConsoleOverlay = () => {
  const [logs, setLogs] = useState<
    { type: string; message: string; time: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Keep track of original console methods to restore them later
  const originalLog = useRef(console.log);
  const originalError = useRef(console.error);
  const originalWarn = useRef(console.warn);

  useEffect(() => {
    // Capture ref values to local variables for safe cleanup
    const originalLogFn = originalLog.current;
    const originalErrorFn = originalError.current;
    const originalWarnFn = originalWarn.current;

    const formatLog = (args: any[]) => {
      return args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" ");
    };

    const addLog = (type: string, args: any[]) => {
      const message = formatLog(args);
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-49), { type, message, time }]); // Keep last 50
    };

    // Override console methods
    console.log = (...args) => {
      originalLogFn(...args);
      addLog("log", args);
    };

    console.error = (...args) => {
      originalErrorFn(...args);
      addLog("error", args);
    };

    console.warn = (...args) => {
      originalWarnFn(...args);
      addLog("warn", args);
    };

    // Global error handler for unhandled promises/exceptions
    window.onerror = (msg, url, line) => {
      addLog("error", [`Uncaught: ${msg} @ ${url}:${line}`]);
    };

    // Listen for custom open event
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-debug-console", handleOpenEvent);

    return () => {
      // Restore console methods on cleanup using captured variables
      console.log = originalLogFn;
      console.error = originalErrorFn;
      console.warn = originalWarnFn;
      window.removeEventListener("open-debug-console", handleOpenEvent);
    };
  }, []);

  // --- NEW: Handle Copy Logic ---
  const handleCopyLogs = () => {
    if (logs.length === 0) return;

    // Format logs into a readable string
    const logText = logs
      .map((log) => `[${log.time}] [${log.type.toUpperCase()}]: ${log.message}`)
      .join("\n----------------------------------------\n");

    navigator.clipboard
      .writeText(logText)
      .then(() => {
        // You can add a toast notification here if you like
        // toast.success("Logs copied to clipboard");

        // Temporarily log a system message to indicate success
        // (We use originalLog to avoid recursive loop if we were logging directly)
        originalLog.current("✅ System: Logs copied to clipboard");
      })
      .catch((err) => {
        originalError.current("Failed to copy logs:", err);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed z-[9999] bg-black/90 text-green-400 font-mono text-[10px] flex flex-col transition-all duration-200 ${
        isMinimized
          ? "bottom-0 left-0 right-0 h-10"
          : "inset-0 md:inset-x-10 md:inset-y-10 rounded-lg shadow-2xl border border-gray-700"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700 bg-gray-900">
        <span className="font-bold text-white">
          Embedded Debugger ({logs.length})
        </span>
        <div className="flex gap-4">
          {/* --- NEW: Copy Button --- */}
          <button
            onClick={handleCopyLogs}
            title="Copy logs to clipboard"
            className="hover:text-blue-400 transition-colors"
          >
            <Copy size={14} />
          </button>

          <button
            onClick={() => setLogs([])}
            title="Clear logs"
            className="hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>

          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>

          <button onClick={() => setIsOpen(false)}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Logs Area */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`border-b border-gray-800 pb-1 ${
                log.type === "error"
                  ? "text-red-400"
                  : log.type === "warn"
                    ? "text-yellow-400"
                    : "text-green-400"
              }`}
            >
              <span className="opacity-50 mr-2">[{log.time}]</span>
              <span className="whitespace-pre-wrap break-all">
                {log.message}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500 italic">No logs yet...</div>
          )}
        </div>
      )}
    </div>
  );
};
