import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commandOutputs = {
	whoami: `Name: Sanskriti Gupta
Role: Full-Stack Engineer & Problem Solver
College: VIT Bhopal (CSE, 2023 - 2027) | CGPA: 8.54 / 10
LeetCode: 390+ problems solved
Location: Bhopal / Kanpur, India
Status: Open for software engineering and full-stack roles!`,

	leetcode: `LeetCode Profile:
* 390+ problems solved across arrays, strings, trees, graphs, dynamic programming, and binary search
* Strong foundation in time & space complexity analysis and competitive algorithmic patterns
* Link: https://leetcode.com/u/sanskriti49`,

	skills: `Things I like reaching for:
- Build: Node.js, Express, React 19, Next.js, TypeScript, Tailwind
- Data: PostgreSQL, PostGIS, MongoDB, Redis
- Realtime: Socket.IO, WebSockets, Redis Pub/Sub
- Background: BullMQ, Playwright, Task queues
- Cloud: AWS (S3, EC2), Docker, GitHub Actions
- Core CS: Data Structures & Algorithms (390+ LeetCode solved, CodeVita Top 2%), OS, DBMS`,

	projects: `1. Udaan: Scholarship finder that scans state portals so students don't miss deadlines
   Stack: Node.js, MongoDB, Redis, BullMQ, Playwright
   Live: https://udaan-scholarships.vercel.app/

2. TaskGenie: On-demand marketplace matching homeowners with verified local pros
   Stack: Node.js, Express, PostgreSQL, PostGIS, Razorpay
   Live: https://taskgenieee.vercel.app/

3. Flux: Agile workspace that prevents circular task dependencies
   Stack: Node.js, PostgreSQL, MongoDB, AWS S3, Redis, Docker
   Live: https://agile-task-manager-alpha.vercel.app`,

	experience: `* GeekyAnts: Software Engineer Intern (Jun 2026 - Aug 2026)
  Built real-time chat between buyers and suppliers, wrote REST APIs in Node & Postgres,
  and automated GST invoicing.

* Google Developers Group (GDG): Core Technical Member (Nov 2024 - Jul 2025)
  Mentored 50+ students in web bootcamps, built APIs for women's health platform.`,

	proud: `A few things I'm proud of:
* LeetCode: 390+ problems solved across DP, graphs, trees, and core algorithms
* TCS CodeVita World Season: Placed in the Global Top 2% (#10,298 out of 350,000+ worldwide)
* AWS Certified Cloud Practitioner: Score 827 / 1000
* Academic Merit: 8.54 / 10 CGPA at VIT Bhopal CSE`,

	contact: `Email: sanskriti0409@gmail.com
Phone: +91 6306642481
LinkedIn: https://linkedin.com/in/sanskriti49
GitHub: https://github.com/sanskriti49
LeetCode: https://leetcode.com/u/sanskriti49`,
};

const quickCommands = [
	"whoami",
	"leetcode",
	"projects",
	"skills",
	"experience",
	"proud",
	"contact",
];

const DevTerminal = ({ isOpen, onClose }) => {
	const [inputVal, setInputVal] = useState("");
	const [history, setHistory] = useState([
		{
			cmd: "whoami",
			out: commandOutputs["whoami"],
		},
	]);
	const bottomRef = useRef(null);

	// ESC keypress to close
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [history, isOpen]);

	const executeCommand = (cmdStr) => {
		const clean = cmdStr.trim().toLowerCase();
		if (!clean) return;

		if (clean === "clear") {
			setHistory([]);
			setInputVal("");
			return;
		}

		if (clean === "help") {
			setHistory((prev) => [
				...prev,
				{
					cmd: clean,
					out: `Available commands:\n- ${quickCommands.join(
						"\n- ",
					)}\n- clear\n- help`,
				},
			]);
			setInputVal("");
			return;
		}

		const output =
			commandOutputs[clean] ||
			`Command not found: "${cmdStr}". Type "help" or click one of the quick shortcuts above!`;

		setHistory((prev) => [...prev, { cmd: cmdStr, out: output }]);
		setInputVal("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		executeCommand(inputVal);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={onClose}
					className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 16 }}
						transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
						onClick={(e) => e.stopPropagation()}
						className="w-full max-w-3xl rounded-2xl border border-white/[0.12] bg-[#08080d] shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[85vh] cursor-default relative"
					>
						{/* Title bar */}
						<div className="flex items-center justify-between px-4 py-3 bg-[#0e0e15] border-b border-white/[0.08] shrink-0 select-none">
							<div className="flex items-center gap-2">
								<button
									onClick={onClose}
									className="w-3.5 h-3.5 rounded-full bg-[#e06b75] hover:opacity-80 transition-opacity cursor-pointer"
									title="Close Shell (Esc)"
									aria-label="Close Shell"
								/>
								<div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b]" />
								<div className="w-3.5 h-3.5 rounded-full bg-[#10b981]" />
								<span className="text-sm sm:text-base font-editorial text-slate-300 ml-3 flex items-center gap-2">
									<span className="font-mono-code font-bold text-[#38bdf8] text-xs">
										&gt;_
									</span>
									sanskriti@dev:~ [little easter egg]
								</span>
							</div>

							<div className="flex items-center gap-2 text-xs font-editorial text-slate-400">
								<span>ESC to close</span>
								<button
									onClick={onClose}
									className="text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/[0.08] transition-colors cursor-pointer text-sm font-semibold"
									aria-label="Close"
								>
									✕
								</button>
							</div>
						</div>

						{/* Quick command buttons */}
						<div className="p-3 border-b border-white/[0.06] bg-[#0a0a10] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
							<span className="text-xs font-editorial text-slate-400 uppercase tracking-wider mr-1">
								RUN:
							</span>
							{quickCommands.map((qc) => (
								<button
									key={qc}
									onClick={() => executeCommand(qc)}
									className="text-xs font-mono-code px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.07] text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 transition-all whitespace-nowrap cursor-pointer"
								>
									{qc}
								</button>
							))}
							<button
								onClick={() => executeCommand("clear")}
								className="text-xs font-editorial px-2.5 py-1.5 rounded text-[#e06b75] hover:bg-[#e06b75]/10 border border-transparent hover:border-[#e06b75]/30 transition-all ml-auto cursor-pointer"
							>
								clear
							</button>
						</div>

						{/* Output Area */}
						<div className="p-5 overflow-y-auto font-mono-code text-xs sm:text-sm text-slate-300 space-y-4 flex-grow leading-relaxed">
							<div className="text-slate-400 pb-2 border-b border-white/[0.04] text-xs">
								Okay, you found the terminal! Click any button above or type a
								command.
							</div>

							{history.map((item, idx) => (
								<div key={idx} className="space-y-1.5">
									<div className="flex items-center gap-2 text-xs sm:text-sm">
										<span className="text-[#e06b75]">➜</span>
										<span className="text-[#38bdf8]">~</span>
										<span className="text-white font-semibold">{item.cmd}</span>
									</div>
									<pre className="text-slate-300 whitespace-pre-wrap pl-4 border-l border-white/[0.08] font-mono-code text-xs sm:text-sm">
										{item.out}
									</pre>
								</div>
							))}
							<div ref={bottomRef} />
						</div>

						{/* Input field */}
						<form
							onSubmit={handleSubmit}
							className="p-3 bg-[#0a0a10] border-t border-white/[0.08] flex items-center gap-2 shrink-0"
						>
							<span className="text-[#e06b75] font-mono-code text-base pl-2">
								➜
							</span>
							<span className="text-[#38bdf8] font-mono-code text-base">~</span>
							<input
								type="text"
								value={inputVal}
								onChange={(e) => setInputVal(e.target.value)}
								placeholder="type 'whoami', 'leetcode', 'projects', 'skills'..."
								className="flex-grow bg-transparent text-white font-mono-code text-xs sm:text-sm focus:outline-none placeholder-slate-600"
								autoFocus
							/>
							<button
								type="submit"
								className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-200 hover:text-white hover:bg-white/[0.1] text-sm font-editorial flex items-center gap-1.5 transition-colors cursor-pointer"
							>
								Run ↵
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DevTerminal;
