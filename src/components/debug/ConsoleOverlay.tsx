"use client";

import { Maximize2, Minimize2, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ConsoleOverlay = () => {
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
					<button type="button" onClick={() => setLogs([])}>
						<Trash2 size={14} />
					</button>
					<button type="button" onClick={() => setIsMinimized(!isMinimized)}>
						{isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
					</button>
					<button type="button" onClick={() => setIsOpen(false)}>
						<X size={14} />
					</button>
				</div>
			</div>

			{/* Logs Area */}
			{!isMinimized && (
				<div className="flex-1 overflow-auto p-4 space-y-2">
					{logs.map((log) => (
						<div
							key={`${log.time}-${log.type}-${log.message}`}
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
