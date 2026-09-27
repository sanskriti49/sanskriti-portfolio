import { useState, useRef } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
	useTransform,
	useReducedMotion,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Data: Tailored framing (aspect & fit) so landscape, portrait, and wide
// screenshots all display with natural elegance and zero cropping or text collision.
// ---------------------------------------------------------------------------

const projects = [
	{
		id: "udaan",
		number: "01",
		label: "Scholarship platform",
		title: "Udaan",
		tagline:
			"A scholarship finder that watches government portals so students don't miss deadlines.",
		quote:
			"Government schemes don't publish APIs, so I built one myself: a crawler that notices the moment a rule changes.",
		image: "/images/udaan.png",
		aspect: "aspect-[16/10]",
		fit: "object-cover object-top",
		accent: "#38bdf8",
		pitch:
			"State and national scholarship portals change their eligibility rules and deadlines without notice. I built a scraper and matching engine that continuously tracks these portals, diffs every update, and alerts students the instant something changes.",
		stack: ["Node.js", "MongoDB", "Redis", "BullMQ", "Playwright"],
		insights: [
			{
				label: "The problem",
				text: "Government portals update schemas with zero API announcements. A Playwright pipeline diffs payload hashes to detect changes automatically.",
			},
			{
				label: "The fix",
				text: "Never let a web server scrape pages synchronously. Pushing scraping and notifications onto BullMQ workers kept the search interface snappy under load.",
			},
			{
				label: "What I'm proud of",
				text: "Sub-50ms search latency using Redis query caching, cutting direct database reads by over 75%.",
			},
		],
		liveUrl: "https://udaan-scholarships.vercel.app/",
		githubUrl: "https://github.com/sanskriti49/udaan-scholarship-finder",
	},
	{
		id: "taskgenie",
		number: "02",
		label: "Local services marketplace",
		title: "TaskGenie",
		tagline:
			"An on-demand marketplace connecting homeowners with local pros in seconds.",
		quote:
			"Ranking thousands of nearby providers can bring a database to its knees, but spatial indexing brought it back.",
		image: "/images/service-app.png",
		aspect: "aspect-[16/10]",
		fit: "object-cover object-top",
		accent: "#10b981",
		pitch:
			"Need a plumber or an electrician? TaskGenie matches you with verified local providers, handles live booking, and processes secure payments with instant reconciliation.",
		stack: ["Node.js", "Express", "PostgreSQL", "PostGIS", "Razorpay"],
		insights: [
			{
				label: "The problem",
				text: "Calculating radius distances across thousands of providers kills a standard SQL query. PostgreSQL GiST spatial indexes cut query latency by 80%.",
			},
			{
				label: "The fix",
				text: "Networks drop mid-checkout. Razorpay's HMAC-signed webhooks guarantee a failed charge always triggers an automatic refund.",
			},
			{
				label: "What I'm proud of",
				text: "Slot reservation locks, so two customers can never accidentally double-book the same provider.",
			},
		],
		liveUrl: "https://taskgenieee.vercel.app/",
		githubUrl: "https://github.com/sanskriti49/service-provider",
	},
	{
		id: "flux",
		number: "03",
		label: "Agile workspace",
		title: "Flux",
		tagline:
			"A sprint planning workspace built to make circular workflow deadlocks impossible.",
		quote:
			"Uploads shouldn't drown the server: presigned URLs move files from browser to cloud directly.",
		image: "/images/flux.png",
		aspect: "aspect-[16/10]",
		fit: "object-contain p-3 sm:p-5",
		accent: "#e06b75",
		pitch:
			"A real-time workspace for sprint planning. Teams map complex task dependencies without circular blocks, and upload large files without ever slowing the server down.",
		stack: ["Node.js", "PostgreSQL", "MongoDB", "AWS S3", "Redis", "Docker"],
		insights: [
			{
				label: "The problem",
				text: "Circular task dependencies (where A needs B and B needs A) can freeze an entire sprint board. A recursive DFS graph-cycle check catches them before they happen.",
			},
			{
				label: "The fix",
				text: "Streaming large attachments through Node eats server RAM. AWS S3 presigned URLs let the browser upload straight to the cloud instead.",
			},
			{
				label: "What I'm proud of",
				text: "Multi-client live sync via clustered Socket.IO and Redis Pub/Sub, so every teammate's board updates instantly.",
			},
		],
		liveUrl: "https://agile-task-manager-alpha.vercel.app",
		githubUrl: "https://github.com/sanskriti49/agile_task_manager",
	},
	{
		id: "companion",
		number: "04",
		label: "Elder-care companion",
		title: "Companion",
		tagline:
			"An AI voice assistant for elder care that keeps working when the internet doesn't.",
		quote:
			"Emergency help can't wait on a signal, so the model that recognizes distress lives on the phone itself.",
		image: "/images/dementia.gif",
		aspect: "aspect-[16/10]",
		fit: "object-cover object-center",
		accent: "#a855f7",
		pitch:
			"Built for senior cognitive support and emergency alerts. Voice-guided memory reminders and on-device intent classification mean critical requests still work offline.",
		stack: ["Flutter", "Dart", "BERT Engine", "Llama 3.1"],
		insights: [
			{
				label: "The problem",
				text: "A dropped cellular connection shouldn't stop emergency assistance. A quantized BERT model runs locally to categorize emergency requests offline.",
			},
			{
				label: "What I'm proud of",
				text: "Gentle conversational cues paired with automatic location dispatch the moment unexpected distress is detected.",
			},
		],
		liveUrl: "https://github.com/sanskriti49/dementia-app",
		githubUrl: "https://github.com/sanskriti49/dementia-app",
	},
];

// ---------------------------------------------------------------------------
// TiltPhoto: 3D cursor perspective card with zero text collision.
// Constrained width with height derived from aspect ratio.
// ---------------------------------------------------------------------------

function TiltPhoto({ src, alt, accent, className, badge, fit = "object-cover object-top" }) {
	const reduceMotion = useReducedMotion();
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const rectRef = useRef(null);

	const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), {
		stiffness: 150,
		damping: 18,
	});
	const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
		stiffness: 150,
		damping: 18,
	});
	const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
	const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

	const handleEnter = (e) => {
		if (reduceMotion) return;
		rectRef.current = e.currentTarget.getBoundingClientRect();
	};

	const handleMove = (e) => {
		if (reduceMotion) return;
		if (!rectRef.current) {
			rectRef.current = e.currentTarget.getBoundingClientRect();
		}
		const rect = rectRef.current;
		px.set((e.clientX - rect.left) / rect.width);
		py.set((e.clientY - rect.top) / rect.height);
	};

	const handleLeave = () => {
		rectRef.current = null;
		px.set(0.5);
		py.set(0.5);
	};

	return (
		<div
			onMouseEnter={handleEnter}
			onMouseMove={handleMove}
			onMouseLeave={handleLeave}
			className={`w-full max-w-full ${className}`}
			style={{ perspective: 1400 }}
		>
			<motion.div
				style={{
					rotateX,
					rotateY,
					transformStyle: "preserve-3d",
					willChange: "transform",
					transform: "translateZ(0)",
				}}
				className="relative w-full h-full rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0c0c14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] flex items-center justify-center group"
			>
				{/* Background ambient mesh glow */}
				<div
					className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
					style={{
						background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, transparent 75%)`,
					}}
				/>

				<img
					src={src}
					alt={alt}
					loading="lazy"
					decoding="async"
					className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${fit}`}
				/>

				<motion.div
					className="pointer-events-none absolute inset-0 opacity-60"
					style={{
						background: useTransform(
							[glowX, glowY],
							([gx, gy]) =>
								`radial-gradient(420px circle at ${gx} ${gy}, ${accent}25, transparent 60%)`,
						),
					}}
				/>

				{badge && (
					<span
						className="absolute top-4 left-4 text-xs font-editorial font-medium px-3 py-1.5 rounded-full border shadow-lg z-10"
						style={{
							backgroundColor: "#0c0c14",
							borderColor: `${accent}55`,
							color: accent,
						}}
					>
						{badge}
					</span>
				)}
			</motion.div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// CaseStudy: Balanced split with items-center and min-w-0 to prevent collision.
// ---------------------------------------------------------------------------

function CaseStudy({ project, index, defaultOpen }) {
	const [open, setOpen] = useState(!!defaultOpen);
	const reversed = index % 2 === 1;
	const hasLiveDemo = project.liveUrl !== project.githubUrl;

	return (
		<div
			className="mb-28 last:mb-0"
			style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
		>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
				<div
					className={`lg:col-span-6 w-full min-w-0 ${reversed ? "lg:order-2" : "lg:order-1"}`}
				>
					<TiltPhoto
						src={project.image}
						alt={project.title}
						accent={project.accent}
						className={project.aspect || "aspect-[16/10]"}
						fit={project.fit || "object-cover object-top"}
						badge={index === 0 ? "Latest build" : null}
					/>
				</div>

				<div
					className={`lg:col-span-6 w-full min-w-0 flex flex-col justify-center space-y-5 relative ${
						reversed ? "lg:order-1" : "lg:order-2"
					}`}
				>
					<span
						aria-hidden
						className="font-mackinac absolute -top-8 -left-1 text-7xl text-white/[0.05] select-none pointer-events-none"
					>
						{project.number}
					</span>

					<div className="relative space-y-3">
						<span
							className="text-base sm:text-lg font-medium font-editorial"
							style={{ color: project.accent }}
						>
							{project.label}
						</span>
						<h3 className="font-mackinac text-3xl sm:text-4xl text-white font-medium tracking-tight">
							{project.title}
						</h3>
						<p className="font-editorial text-xl sm:text-2xl text-[#f1f0eb] leading-relaxed font-light">
							{project.tagline}
						</p>
						<p className="font-editorial text-base sm:text-lg text-[#cbc8d6] leading-relaxed">
							{project.pitch}
						</p>
						<blockquote
							className="border-l-2 pl-4 font-editorial text-base sm:text-lg italic text-[#e4e2eb] font-light"
							style={{ borderColor: project.accent }}
						>
							{project.quote}
						</blockquote>
					</div>

					<div className="flex flex-wrap gap-2">
						{project.stack.map((t) => (
							<span
								key={t}
								className="text-sm font-editorial px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#d5d3db]"
							>
								{t}
							</span>
						))}
					</div>

					<div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0c0c14]/50">
						<button
							onClick={() => setOpen((v) => !v)}
							className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left cursor-pointer"
						>
							<span className="text-base font-medium text-white flex items-center gap-2.5 font-editorial">
								<span
									className="text-xs uppercase tracking-wider px-2 py-0.5 rounded font-mono-code font-bold"
									style={{ backgroundColor: `${project.accent}15`, color: project.accent }}
								>
									&lt;/&gt;
								</span>
								<span>Behind the build</span>
							</span>
							<span className="text-base text-slate-400 font-mono-code select-none w-5 text-center">
								{open ? "−" : "+"}
							</span>
						</button>

						<AnimatePresence initial={false}>
							{open && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: "easeInOut" }}
								>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-5 pt-1">
										{project.insights.map((item, i) => (
											<div
												key={i}
												className="rounded-xl bg-white/[0.025] border border-white/[0.05] p-4 flex flex-col justify-between"
											>
												<p
													className="font-editorial text-sm font-semibold mb-1.5 uppercase tracking-wider"
													style={{ color: project.accent }}
												>
													{item.label}
												</p>
												<p className="text-sm sm:text-base leading-relaxed text-[#cbc8d6] font-light font-editorial">
													{item.text}
												</p>
											</div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<div className="flex items-center gap-3 pt-1">
						{hasLiveDemo ? (
							<>
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noreferrer"
									className="group/btn flex items-center gap-2 px-5 py-3 rounded-full bg-[#f5f3ef] text-black text-sm font-editorial font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-black/40"
								>
									<span>View live</span>
									<span className="font-sans text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
										↗
									</span>
								</a>
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.12] text-sm font-editorial font-medium uppercase tracking-wider text-[#c9c7d1] hover:text-white hover:border-white/[0.25] transition-colors"
								>
									<FaGithub size={15} />
									<span>Source</span>
								</a>
							</>
						) : (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noreferrer"
								className="group/btn flex items-center gap-2 px-5 py-3 rounded-full bg-[#f5f3ef] text-black text-sm font-editorial font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-black/40"
							>
								<FaGithub size={15} />
								<span>View on GitHub</span>
								<span className="font-sans text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
									↗
								</span>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------

const EditorialProjects = () => {
	const sectionRef = useRef(null);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="py-32 relative overflow-hidden"
			style={{ backgroundColor: "#0a0a0e" }}
		>
			<div className="max-w-7xl mx-auto px-6">
				{/* Section header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/[0.08] pb-8">
					<div className="space-y-4 max-w-2xl">
						<div className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#e06b75]" />
							<span className="text-base font-medium font-editorial text-[#e06b75]">
								Case studies
							</span>
						</div>
						<h2 className="font-mackinac text-4xl sm:text-5xl lg:text-6xl text-[#f5f3ef] tracking-tight font-medium">
							Things I've built.
						</h2>
						<p className="font-editorial text-xl sm:text-2xl text-[#d5d3db] leading-relaxed font-light">
							Four products, end to end, from first commit to production traffic.
							Open "behind the build" on any of them for the engineering
							decisions that made them work.
						</p>
					</div>
					<div className="text-sm font-editorial text-[#8f8d9c] hidden md:block">
						4 shipped products
					</div>
				</div>

				{projects.map((p, i) => (
					<CaseStudy key={p.id} project={p} index={i} defaultOpen={i === 0} />
				))}
			</div>
		</section>
	);
};

export default EditorialProjects;
