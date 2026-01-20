"use client";

import { Maximize2, Minimize2, Trash2, X } from "lucide-react";
import { useConsoleLogs } from "@/hooks/debug/useConsoleLogs";

export const ConsoleOverlay = () => {
	const { logs, isOpen, setIsOpen, isMinimized, setIsMinimized, clearLogs } =
		useConsoleLogs();

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
					<button type="button" onClick={clearLogs}>
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