import { useEffect, useRef, useState } from "react";

export const useConsoleLogs = () => {
	const [logs, setLogs] = useState<
		{ type: string; message: string; time: string }[]
	>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	// Keep track of original console methods to restore them later
	const originalLog = useRef<typeof console.log | null>(null);
	const originalError = useRef<typeof console.error | null>(null);
	const originalWarn = useRef<typeof console.warn | null>(null);

	useEffect(() => {
		// Capture ref values to local variables for safe cleanup
		// Capture at effect time to ensure we get the current implementation
		originalLog.current = originalLog.current ?? console.log;
		originalError.current = originalError.current ?? console.error;
		originalWarn.current = originalWarn.current ?? console.warn;

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

		// Override console methods with safety checks
		console.log = (...args) => {
			if (typeof originalLogFn === "function") {
				originalLogFn(...args);
			}
			addLog("log", args);
		};

		console.error = (...args) => {
			if (typeof originalErrorFn === "function") {
				originalErrorFn(...args);
			}
			addLog("error", args);
		};

		console.warn = (...args) => {
			if (typeof originalWarnFn === "function") {
				originalWarnFn(...args);
			}
			addLog("warn", args);
		};

		// Global error handler for unhandled promises/exceptions
		const originalOnError = window.onerror;
		window.onerror = (msg, url, line, col, error) => {
			addLog("error", [`Uncaught: ${msg} @ ${url}:${line}`]);
			// Call original handler if it exists and return false to allow error propagation
			if (typeof originalOnError === "function") {
				return originalOnError(msg, url, line, col, error);
			}
			return false; // Allow error to propagate normally
		};

		// Listen for custom open event
		const handleOpenEvent = () => setIsOpen(true);
		window.addEventListener("open-debug-console", handleOpenEvent);

		return () => {
			// Restore console methods on cleanup using captured variables
			if (typeof originalLogFn === "function") {
				console.log = originalLogFn;
			}
			if (typeof originalErrorFn === "function") {
				console.error = originalErrorFn;
			}
			if (typeof originalWarnFn === "function") {
				console.warn = originalWarnFn;
			}
			// Restore original error handler
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
