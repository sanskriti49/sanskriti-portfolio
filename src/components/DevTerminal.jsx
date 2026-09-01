import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2, Sparkles, CornerDownLeft, Play } from "lucide-react";

const commandOutputs = {
	whoami: `Name: Sanskriti Gupta
Role: Full-Stack Engineer & Cloud Enthusiast
Education: B.Tech CSE @ VIT Bhopal (2023 - 2027) | CGPA: 8.54 / 10
Location: Bhopal / Kanpur, India
Status: Open for Full-Stack & Backend Engineering Roles`,

	"cat skills.json": `{
  "languages": ["Java", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  "frontend": ["React 19", "Next.js", "Redux Toolkit", "Zustand", "Tailwind CSS"],
  "backend": ["Node.js", "Express.js", "REST APIs", "WebSockets (Socket.IO)", "JWT"],
  "databases": ["PostgreSQL", "MongoDB", "Redis Pub/Sub"],
  "cloud_devops": ["AWS (EC2, S3)", "Docker", "Terraform", "Git", "GitHub Actions"]
}`,

	"projects --featured": `1. Flux: Enterprise Agile Workspace & Cloud Engine
   - Stack: React 19, Node.js, PostgreSQL, MongoDB, AWS S3, Redis, Docker
   - High-throughput AWS S3 Presigned URLs pipeline
   - Polyglot persistence + Recursive DFS graph cycle detection
   - DORA flow metrics & predictive sprint rollover analyzer
   - Repo: https://github.com/sanskriti49/agile_task_manager

2. TaskGenie: Service Marketplace
   - Stack: Node.js, Express.js, PostgreSQL, Razorpay
   - Spatial indexing (80% query latency cut)
   - Live: https://taskgenieee.vercel.app/
   - Repo: https://github.com/sanskriti49/service-provider`,

	experience: `[1] GeekyAnts — Software Engineer Intern (Jun 2026 - Aug 2026)
    - Engineered B2B wholesale marketplace with Socket.IO & PostgreSQL REST APIs
    - Automated GST invoicing & live driver tracking workflows

[2] Google Developers Group (GDG) — Core Technical Member (Nov 2024 - Jul 2025)
    - Mentored 50+ undergraduate engineers across 3+ web architecture bootcamps
    - Engineered REST APIs for women's health platform & Agentic AI workflows`,

	certifications: `* AWS Certified Cloud Practitioner — Amazon Web Services
* TCS CodeVita — Top 3% Globally (Rank 10,298 / 350,000+ Worldwide)
* VIT Bhopal CSE Merit — CGPA: 8.54 / 10`,

	contact: `Email: sanskriti0409@gmail.com
Phone: +91 6306642481
LinkedIn: https://linkedin.com/in/sanskriti49
GitHub: https://github.com/sanskriti49`,
};

const quickCommands = [
	"whoami",
	"projects --featured",
	"cat skills.json",
	"experience",
	"certifications",
	"contact",
];

const DevTerminal = ({ isOpen, onClose }) => {
	const [inputVal, setInputVal] = useState("");
	const [history, setHistory] = useState([
		{
			cmd: "whoami",
			out: commandOutputs["whoami"],
		},
		{
			cmd: "certifications",
			out: commandOutputs["certifications"],
		},
	]);
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [history]);

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
					out: `Available commands:\n- ${quickCommands.join("\n- ")}\n- clear\n- help`,
				},
			]);
			setInputVal("");
			return;
		}

		const output =
			commandOutputs[clean] ||
			`Command not found: "${cmdStr}". Type "help" or click one of the quick command buttons above.`;

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
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.25 }}
						className="w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0A0A10] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
					>
						{/* Terminal Title Bar */}
						<div className="flex items-center justify-between px-4 py-3 bg-[#101018] border-b border-white/[0.06]">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
								<div className="w-3 h-3 rounded-full bg-amber-500/80" />
								<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
								<span className="text-xs font-mono text-slate-400 ml-3 flex items-center gap-1.5">
									<Terminal size={13} className="text-emerald-400" />
									sanskriti@devbox:~ (Interactive Terminal)
								</span>
							</div>
							<button
								onClick={onClose}
								className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
								aria-label="Close Terminal"
							>
								<X size={16} />
							</button>
						</div>

						{/* Quick Command Suggestions */}
						<div className="p-3 border-b border-white/[0.04] bg-[#0C0C14] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
							<span className="text-[10px] uppercase font-mono text-slate-500 mr-1 flex items-center gap-1">
								<Sparkles size={11} className="text-rose-400" /> Run:
							</span>
							{quickCommands.map((qc) => (
								<button
									key={qc}
									onClick={() => executeCommand(qc)}
									className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all whitespace-nowrap cursor-pointer"
								>
									{qc}
								</button>
							))}
							<button
								onClick={() => executeCommand("clear")}
								className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-rose-300/80 hover:text-rose-200 hover:bg-rose-500/10 transition-all whitespace-nowrap ml-auto"
							>
								clear
							</button>
						</div>

						{/* Terminal Output Area */}
						<div className="p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-4 flex-grow text-slate-300 leading-relaxed">
							<div className="text-slate-500 pb-2 border-b border-white/[0.04]">
								Welcome to Sanskriti's Developer Shell. Type a command or click any shortcut above.
							</div>

							{history.map((item, idx) => (
								<div key={idx} className="space-y-1.5">
									<div className="flex items-center gap-2 text-emerald-400">
										<span className="text-rose-400">➜</span>
										<span className="text-cyan-400">~</span>
										<span className="text-slate-200 font-semibold">{item.cmd}</span>
									</div>
									<pre className="text-slate-300 whitespace-pre-wrap pl-5 border-l border-white/[0.05] font-mono text-[11px] sm:text-xs">
										{item.out}
									</pre>
								</div>
							))}
							<div ref={bottomRef} />
						</div>

						{/* Command Input Form */}
						<form
							onSubmit={handleSubmit}
							className="p-3 bg-[#0D0D15] border-t border-white/[0.06] flex items-center gap-2"
						>
							<span className="text-emerald-400 font-mono text-sm pl-2">➜</span>
							<span className="text-cyan-400 font-mono text-sm">~</span>
							<input
								type="text"
								value={inputVal}
								onChange={(e) => setInputVal(e.target.value)}
								placeholder="type 'whoami', 'projects --featured', 'experience'..."
								className="flex-grow bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-600"
								autoFocus
							/>
							<button
								type="submit"
								className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono flex items-center gap-1 transition-colors"
							>
								Run <CornerDownLeft size={11} />
							</button>
						</form>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default DevTerminal;
