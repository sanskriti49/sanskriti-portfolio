import { useState, useEffect, useRef } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
	ExternalLink,
	Rocket,
	Server,
	Smartphone,
	Code,
	Brain,
	Database,
	ChevronRight,
	Menu,
	X,
	ArrowUpRight,
	FileText,
	Briefcase,
	ChevronDown,
	ArrowUp,
	Terminal,
	ShieldCheck,
	Trophy,
	Sparkles,
	Layers,
	Cpu,
	Zap,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Contact from "./Contact";
import PixelBlast from "./PixelBlast";
import ResumeView from "./ResumeView";
import ExperienceSection from "./components/ExperienceSection";
import AchievementsSection from "./components/AchievementsSection";
import SkillsSection from "./components/SkillsSection";
import DevTerminal from "./components/DevTerminal";
import CursorGlow from "./ui/CursorGlow";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		title: "Flux: Enterprise Agile Workspace & Cloud Engine",
		shortTitle: "Flux Agile Engine",
		type: "Distributed Cloud Platform",
		category: "cloud",
		featured: true,
		status: "Production Architecture",
		desc: "High-throughput agile project management system engineered with React 19, Node.js, and a polyglot persistence layer. Offloads asset streaming via AWS S3 Presigned URLs, mathematically eliminates dependency deadlocks with DFS cycle traversal, and forecasts sprint slippage via predictive DORA analytics.",
		highlights: [
			"AWS S3 Presigned URLs offloading binary file streaming directly to cloud storage",
			"Polyglot persistence: PostgreSQL ACID task graphs + MongoDB event sourcing",
			"Recursive DFS graph traversal to detect and prevent circular dependency deadlocks",
			"Predictive sprint rollover risk analyzer & real-time DORA flow metrics",
			"Socket.IO + Redis Pub/Sub for distributed clustering & Docker/Terraform deploy",
		],
		tags: [
			"React 19",
			"Node.js",
			"PostgreSQL",
			"MongoDB",
			"AWS S3",
			"Redis Pub/Sub",
			"Docker",
			"Terraform",
		],
		link: "https://agile-task-manager-alpha.vercel.app",
		github: "https://github.com/sanskriti49/agile_task_manager",
		img: "/images/flux.png",
		accent: "from-rose-500/30 to-purple-500/20",
		highlightColor: "rgba(244,63,94,0.12)",
		lineColor: "#f43f5e",
		tagColor: "text-rose-300/80",
	},
	{
		title: "TaskGenie: Service Marketplace",
		shortTitle: "TaskGenie Marketplace",
		type: "Full-Stack Marketplace",
		category: "fullstack",
		featured: true,
		status: "Live Platform",
		desc: "End-to-end service discovery and booking platform with provider scheduling, ratings, and customer reviews. Features PostgreSQL spatial indexing for geospatial provider lookup (cutting query latency by 80%), Razorpay webhooks with signature verification, and stateless OAuth 2.0 sessions.",
		highlights: [
			"Optimized geospatial provider lookup via PostgreSQL spatial indexing (-80% latency)",
			"Secure payment pipeline with Razorpay Webhooks & automated refund reconciliation",
			"Role-based provider & consumer dashboards with OAuth 2.0 authentication",
			"Live appointment scheduling, rating aggregations, and verified reviews",
		],
		tags: [
			"PERN Stack",
			"Node.js",
			"Express.js",
			"PostgreSQL",
			"Razorpay",
			"OAuth 2.0",
		],
		link: "https://taskgenieee.vercel.app/",
		github: "https://github.com/sanskriti49/service-provider",
		img: "/images/service-app.png",
		accent: "from-emerald-500/30 to-cyan-500/20",
		highlightColor: "rgba(16,185,129,0.10)",
		lineColor: "#10b981",
		tagColor: "text-emerald-300/80",
	},
	{
		title: "CineBuzz: Movie & Media Discovery",
		shortTitle: "CineBuzz Platform",
		type: "Web Application",
		category: "frontend",
		featured: false,
		desc: "Dynamic movie discovery and watchlist platform built with React and Tailwind CSS. Features seamless search, multi-criteria filtering, responsive grid layouts, and live TMDB API integrations with cached client-side state.",
		highlights: [
			"Multi-parameter search and dynamic genre filtering engine",
			"Real-time watchlist sync with localStorage persistence",
			"Tailwind CSS responsive design with fluid modal viewports",
		],
		tags: [
			"React.js",
			"TMDB API",
			"Tailwind CSS",
			"REST API",
			"State Management",
		],
		link: "http://cinebuzzzz.netlify.app/",
		github: "https://github.com/sanskriti49",
		img: "/images/cinebuzz.png",
		accent: "from-amber-500/30 to-orange-500/20",
		highlightColor: "rgba(245,158,11,0.12)",
		lineColor: "#f59e0b",
		tagColor: "text-amber-300/80",
	},
	{
		title: "Companion: AI Senior Care Assistant",
		shortTitle: "Companion AI Care",
		type: "Mobile Application & AI",
		category: "ai",
		featured: false,
		status: "AI Research",
		desc: "AI-powered mobile assistant built for senior care, featuring voice-enabled memory aids, emergency notification triggers, and smart offline intent classification powered by BERT and lightweight LLMs.",
		highlights: [
			"Voice-enabled conversational memory aids and reminder engine",
			"Emergency alert routing with automated location triggers",
			"Offline intent classification using BERT neural networks",
		],
		tags: ["Flutter", "Dart", "Llama 3.1", "BERT Engine", "Mobile AI"],
		link: "https://github.com/sanskriti49/dementia-app",
		github: "https://github.com/sanskriti49/dementia-app",
		img: "/images/dementia.gif",
		accent: "from-purple-500/30 to-sky-500/20",
		highlightColor: "rgba(168,85,247,0.10)",
		lineColor: "#a855f7",
		tagColor: "text-purple-300/80",
	},
];

const StatBadge = ({
	value,
	label,
	subtext,
	icon: Icon,
	color = "text-white",
}) => (
	<motion.div
		whileHover={{ y: -2, scale: 1.02 }}
		className="flex flex-col px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm shadow-md"
	>
		<div className="flex items-center gap-2">
			{Icon && <Icon size={14} className={color} />}
			<span
				className={`text-xl sm:text-2xl font-bold ${color}`}
				style={{ fontFamily: "'P22Mackinac', sans-serif" }}
			>
				{value}
			</span>
		</div>
		<span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
			{label}
		</span>
		{subtext && (
			<span className="text-[9px] text-slate-500 tracking-normal mt-0.5">
				{subtext}
			</span>
		)}
	</motion.div>
);

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
			style={{
				scaleX,
				background: "linear-gradient(90deg, #f43f5e, #fb923c, #10b981)",
			}}
		/>
	);
};

const BackToTop = () => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, y: 16, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 16, scale: 0.9 }}
					transition={{ duration: 0.25 }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08] bg-[#0C0C14]/90 backdrop-blur-md text-slate-400 hover:text-white hover:border-white/[0.2] transition-all shadow-xl shadow-black/60 cursor-pointer"
					aria-label="Back to top"
				>
					<ArrowUp size={16} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

/* ─────────────────────────────────────────────────────────
   PROJECTS SECTION WITH CATEGORY FILTER & DETAILED PREVIEW
───────────────────────────────────────────────────────── */
const ProjectsSection = () => {
	const [filter, setFilter] = useState("all");
	const [activeIdx, setActiveIdx] = useState(0);

	const filteredProjects =
		filter === "all" ? projects : projects.filter((p) => p.category === filter);

	// Ensure active index is within bounds of filtered list
	const safeIdx = activeIdx < filteredProjects.length ? activeIdx : 0;
	const active = filteredProjects[safeIdx] || filteredProjects[0];

	return (
		<section
			id="projects"
			className="py-28 relative"
			style={{ backgroundColor: "#08080C" }}
		>
			<div className="container mx-auto px-6 max-w-6xl">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5">
							<Sparkles size={12} /> 03 / Projects
						</span>
						<h3
							className="text-3xl sm:text-4xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Featured Systems & Projects
						</h3>
					</motion.div>

					<div className="flex items-center gap-2 flex-wrap">
						{[
							{ id: "all", label: "All Work" },
							{ id: "cloud", label: "Cloud & Distributed" },
							{ id: "fullstack", label: "Full Stack" },
							{ id: "ai", label: "AI & Mobile" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => {
									setFilter(tab.id);
									setActiveIdx(0);
								}}
								className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
									filter === tab.id
										? "bg-white text-black border-white shadow-md font-semibold"
										: "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white hover:bg-white/[0.05]"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				<div className="grid md:grid-cols-12 gap-8 items-start">
					{/* ── Left: Project index list ── */}
					<div className="md:col-span-6 lg:col-span-7">
						{filteredProjects.map((project, idx) => {
							const isActive = idx === safeIdx;
							return (
								<motion.div
									key={project.title}
									initial={{ opacity: 0, x: -16 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.08 }}
									className="relative cursor-pointer"
									onMouseEnter={() => setActiveIdx(idx)}
									onClick={() => setActiveIdx(idx)}
								>
									{/* Active edge highlight line */}
									<motion.div
										className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
										style={{ backgroundColor: project.lineColor }}
										initial={false}
										animate={{
											opacity: isActive ? 1 : 0,
											scaleY: isActive ? 1 : 0.3,
										}}
										transition={{ duration: 0.3 }}
									/>

									<div
										className="pl-6 pr-4 py-6 rounded-r-2xl transition-all duration-300"
										style={{
											backgroundColor: isActive
												? project.highlightColor
												: "transparent",
										}}
									>
										<div className="flex items-start gap-4">
											<span
												className="font-mono text-[11px] mt-1 shrink-0 transition-colors duration-300"
												style={{
													color: isActive ? project.lineColor : "#475569",
												}}
											>
												0{idx + 1}
											</span>

											<div className="flex-1 min-w-0 space-y-2">
												<div className="flex items-center gap-2.5 flex-wrap">
													<h4
														className="text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300"
														style={{
															fontFamily: "'P22Mackinac', sans-serif",
															color: isActive ? "#ffffff" : "#cbd5e1",
														}}
													>
														{project.shortTitle || project.title}
													</h4>
													{project.status && (
														<span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase tracking-widest">
															{project.status}
														</span>
													)}
												</div>

												<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-medium">
													{project.type}
												</p>

												<div className="flex flex-wrap gap-1.5 pt-1">
													{project.tags.slice(0, 5).map((tag) => (
														<span
															key={tag}
															className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md border font-medium tracking-wide transition-all duration-300 ${
																isActive
																	? `${project.tagColor} border-white/[0.08] bg-white/[0.04]`
																	: "text-slate-500 border-white/[0.03] bg-transparent"
															}`}
														>
															{tag}
														</span>
													))}
													{project.tags.length > 5 && (
														<span className="text-[9px] px-2 py-0.5 text-slate-500">
															+{project.tags.length - 5}
														</span>
													)}
												</div>

												<AnimatePresence initial={false}>
													{isActive && (
														<motion.div
															key="expand"
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: "auto", opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{
																duration: 0.3,
																ease: [0.22, 1, 0.36, 1],
															}}
															className="overflow-hidden"
														>
															<div className="pt-3 space-y-3">
																<p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
																	{project.desc}
																</p>

																{/* Bullet achievements */}
																{project.highlights && (
																	<ul className="space-y-1.5 pt-1">
																		{project.highlights.map((h, hIdx) => (
																			<li
																				key={hIdx}
																				className="text-xs text-slate-400 flex items-start gap-2"
																			>
																				<span
																					className="text-xs mt-0.5"
																					style={{ color: project.lineColor }}
																				>
																					•
																				</span>
																				<span>{h}</span>
																			</li>
																		))}
																	</ul>
																)}

																<div className="flex items-center gap-3 pt-2">
																	{project.link && (
																		<a
																			href={project.link}
																			target="_blank"
																			rel="noreferrer"
																			className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:underline"
																			style={{ color: project.lineColor }}
																			onClick={(e) => e.stopPropagation()}
																		>
																			Open Demo <ExternalLink size={11} />
																		</a>
																	)}
																	{project.github && (
																		<a
																			href={project.github}
																			target="_blank"
																			rel="noreferrer"
																			className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white uppercase tracking-wider transition-colors"
																			onClick={(e) => e.stopPropagation()}
																		>
																			<FaGithub size={12} /> Source Code
																		</a>
																	)}
																</div>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</div>

											<motion.div
												className="shrink-0 mt-1"
												animate={{
													x: isActive ? 2 : 0,
													color: isActive ? project.lineColor : "#475569",
												}}
												transition={{ duration: 0.2 }}
											>
												<ArrowUpRight size={16} />
											</motion.div>
										</div>
									</div>

									{idx < filteredProjects.length - 1 && (
										<div className="ml-6 h-px bg-white/[0.04]" />
									)}
								</motion.div>
							);
						})}

						{/* Mobile Image Preview */}
						<div className="mt-8 md:hidden">
							<MobileImagePreview active={active} />
						</div>
					</div>

					{/* ── Right: Sticky desktop preview ── */}
					<div className="hidden md:block md:col-span-6 lg:col-span-5">
						<div className="sticky top-28 space-y-4">
							<div className="flex items-center justify-between mb-1">
								<motion.span
									key={safeIdx + "-label"}
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold"
								>
									{active.type}
								</motion.span>
								<span className="font-mono text-[11px] text-slate-500">
									0{safeIdx + 1}&nbsp;/&nbsp;0{filteredProjects.length}
								</span>
							</div>

							<div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0C0C14] aspect-[4/3] shadow-2xl shadow-black/50">
								<AnimatePresence mode="wait">
									<motion.div
										key={active.title}
										className="absolute inset-0"
										initial={{ opacity: 0, scale: 1.03 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.97 }}
										transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									>
										<img
											src={active.img}
											alt={active.title}
											className="w-full h-full object-cover"
											onError={(e) => {
												e.target.style.display = "none";
												e.target.nextSibling.style.display = "flex";
											}}
										/>
										<div className="hidden absolute inset-0 bg-[#10101A] flex-col justify-center items-center p-6 text-center">
											<Briefcase size={24} className="text-slate-600 mb-2" />
											<span className="text-sm font-bold text-slate-400">
												{active.title}
											</span>
										</div>

										<div
											className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-60`}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

										<div className="absolute bottom-5 left-5 right-5">
											<p
												className="text-white text-xl font-bold tracking-tight"
												style={{ fontFamily: "'P22Mackinac', sans-serif" }}
											>
												{active.title}
											</p>
										</div>
									</motion.div>
								</AnimatePresence>

								{active.status && (
									<div className="absolute top-4 right-4 z-10">
										<span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest backdrop-blur-md">
											{active.status}
										</span>
									</div>
								)}
							</div>

							{/* Dot navigation */}
							<div className="flex items-center justify-center gap-2 pt-1">
								{filteredProjects.map((p, i) => (
									<button
										key={i}
										onClick={() => setActiveIdx(i)}
										className="rounded-full transition-all duration-300 cursor-pointer"
										style={{
											width: i === safeIdx ? "20px" : "6px",
											height: "6px",
											backgroundColor:
												i === safeIdx ? p.lineColor : "rgba(255,255,255,0.15)",
										}}
										aria-label={`View ${p.title}`}
									/>
								))}
							</div>

							{/* Action Links */}
							<div className="grid grid-cols-2 gap-2 pt-1">
								<a
									href={active.link}
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.06] shadow-sm"
									style={{
										borderColor: "rgba(255,255,255,0.08)",
										color: active.lineColor,
									}}
								>
									Launch Live <ExternalLink size={12} />
								</a>
								<a
									href={active.github}
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.08] text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all"
								>
									GitHub <FaGithub size={12} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const MobileImagePreview = ({ active }) => (
	<motion.div
		key={active.title}
		initial={{ opacity: 0, y: 12 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
		className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0C0C14] aspect-video relative shadow-xl"
	>
		<img
			src={active.img}
			alt={active.title}
			className="w-full h-full object-cover"
			onError={(e) => {
				e.target.style.display = "none";
			}}
		/>
		<div
			className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-60`}
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
		<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
			<p
				className="text-white text-base sm:text-lg font-bold"
				style={{ fontFamily: "'P22Mackinac', sans-serif" }}
			>
				{active.title}
			</p>
		</div>
		<a
			href={active.link}
			target="_blank"
			rel="noreferrer"
			className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.1] text-[10px] font-bold text-white uppercase tracking-wider"
		>
			View <ExternalLink size={10} />
		</a>
	</motion.div>
);

const PortfolioMain = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const containerRef = useRef(null);
	const heroContentRef = useRef(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const [activeSection, setActiveSection] = useState(() => {
		const hash = window.location.hash.replace("#", "");
		const valid = [
			"home",
			"about",
			"experience",
			"projects",
			"achievements",
			"skills",
			"contact",
		];
		return valid.includes(hash) ? hash : "home";
	});

	// Hash change sync
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			const valid = [
				"home",
				"about",
				"experience",
				"projects",
				"achievements",
				"skills",
				"contact",
			];
			if (valid.includes(hash)) setActiveSection(hash);
		};
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	// Scroll spy
	useEffect(() => {
		const sectionIds = [
			"home",
			"about",
			"experience",
			"projects",
			"achievements",
			"skills",
			"contact",
		];

		const onScroll = () => {
			const trigger = window.innerHeight * 0.35;
			let closest = sectionIds[0];
			let closestDist = Infinity;

			sectionIds.forEach((id) => {
				const el = document.getElementById(id);
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const dist = Math.abs(rect.top - trigger);

				if (rect.top <= trigger && dist < closestDist) {
					closestDist = dist;
					closest = id;
				}
			});

			setActiveSection(closest);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useGSAP(
		() => {
			if (!heroContentRef.current) return;
			gsap.to(heroContentRef.current, {
				opacity: 0,
				y: 50,
				ease: "power1.in",
				scrollTrigger: {
					trigger: "#home",
					start: "center center",
					end: "bottom top",
					scrub: 1,
				},
			});
		},
		{ scope: containerRef },
	);

	const navLinks = [
		{ name: "About", href: "#about", sectionId: "about", type: "anchor" },
		{
			name: "Experience",
			href: "#experience",
			sectionId: "experience",
			type: "anchor",
		},
		{
			name: "Projects",
			href: "#projects",
			sectionId: "projects",
			type: "anchor",
		},
		{ name: "Skills", href: "#skills", sectionId: "skills", type: "anchor" },
		{ name: "Resume", href: "/resume", type: "route" },
	];

	const stagger = {
		hidden: {},
		show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
	};
	const fadeUp = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<div
			ref={containerRef}
			className="min-h-screen text-[#f1f5f9] antialiased selection:bg-rose-500/20 selection:text-rose-200 scroll-smooth leading-relaxed"
			style={{ backgroundColor: "#08080C", fontFamily: "'Inter', sans-serif" }}
		>
			<CursorGlow />
			<ScrollProgress />
			<BackToTop />
			<DevTerminal
				isOpen={isTerminalOpen}
				onClose={() => setIsTerminalOpen(false)}
			/>

			{/* Background ambient lighting */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-rose-950/25 to-amber-950/10 blur-[160px]" />
				<div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-indigo-950/20 to-transparent blur-[140px]" />
				<div className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-emerald-950/15 to-transparent blur-[120px]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
			</div>

			{/* Navbar */}
			<nav
				className="fixed top-0 w-full z-50 transition-all duration-500"
				style={{
					padding: scrolled ? "10px 0" : "18px 0",
					backgroundColor: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
					backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
					WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
					boxShadow: scrolled
						? "0 1px 0 0 rgba(241,245,249,0.04), 0 4px 24px 0 rgba(0,0,0,0.4)"
						: "none",
				}}
			>
				<div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
					<a
						href="#"
						className="group flex items-center gap-1.5"
						style={{ fontFamily: "'P22Mackinac', sans-serif" }}
					>
						<span className="text-xl text-white tracking-wide font-semibold">
							Sanskriti
						</span>
						<motion.span
							className="text-rose-400 text-2xl leading-none"
							animate={{ rotate: [0, 15, 0] }}
							transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
						>
							·
						</motion.span>
					</a>

					<div
						className="hidden lg:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border border-white/[0.05] bg-white/[0.015]"
						style={{ backdropFilter: "blur(12px)" }}
					>
						{navLinks.map((link) => {
							const isActive =
								link.type === "route"
									? location.pathname === link.href
									: activeSection === link.sectionId &&
										location.pathname === "/";

							const baseStyles = `text-[11px] uppercase tracking-[0.14em] font-semibold px-3.5 py-2 rounded-xl transition-all ${
								isActive
									? "text-white bg-white/[0.08]"
									: "text-slate-400 hover:text-white hover:bg-white/[0.04]"
							}`;

							return link.type === "route" ? (
								<Link key={link.name} to={link.href} className={baseStyles}>
									{link.name}
								</Link>
							) : (
								<a key={link.name} href={link.href} className={baseStyles}>
									{link.name}
								</a>
							);
						})}
					</div>

					<div className="hidden md:flex items-center gap-2.5">
						<button
							onClick={() => setIsTerminalOpen(true)}
							className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono transition-all cursor-pointer"
							title="Open Developer Shell"
						>
							<Terminal size={13} />
							<span>Shell</span>
						</button>

						<motion.a
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							href="#contact"
							className="relative overflow-hidden group flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-xl text-[11px] uppercase font-bold tracking-widest"
						>
							<span className="relative z-10 flex items-center gap-1.5">
								Let's Talk <ArrowUpRight size={13} />
							</span>
							<span className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</motion.a>
					</div>

					<button
						className="lg:hidden text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 lg:hidden"
						style={{
							backgroundColor: "rgba(8,8,12,0.98)",
							backdropFilter: "blur(40px)",
						}}
					>
						<button
							onClick={() => setIsMenuOpen(false)}
							className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.06]"
						>
							<X size={22} />
						</button>
						{navLinks.map((link, i) =>
							link.type === "route" ? (
								<motion.div
									key={link.name}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ delay: i * 0.05 }}
								>
									<Link
										to={link.href}
										onClick={() => setIsMenuOpen(false)}
										className="text-2xl font-light text-slate-300 hover:text-white transition-colors"
										style={{ fontFamily: "'P22Mackinac', sans-serif" }}
									>
										{link.name}
									</Link>
								</motion.div>
							) : (
								<motion.a
									key={link.name}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ delay: i * 0.05 }}
									href={link.href}
									onClick={() => setIsMenuOpen(false)}
									className="text-2xl font-light text-slate-300 hover:text-white transition-colors"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									{link.name}
								</motion.a>
							),
						)}
						<div className="flex flex-col gap-3 pt-2 items-center">
							<button
								onClick={() => {
									setIsMenuOpen(false);
									setIsTerminalOpen(true);
								}}
								className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono"
							>
								<Terminal size={14} /> Open Developer Shell
							</button>
							<motion.a
								href="#contact"
								onClick={() => setIsMenuOpen(false)}
								className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl text-[11px] uppercase font-bold tracking-widest"
							>
								Let's Talk <ArrowUpRight size={13} />
							</motion.a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Hero Section */}
			<section
				id="home"
				className="min-h-screen flex items-center pt-28 pb-16 relative"
				style={{ backgroundColor: "#08080C" }}
			>
				<div
					className="absolute inset-0 z-0 pointer-events-none opacity-25"
					style={{
						backgroundImage:
							"radial-gradient(circle at 50% 30%, rgba(244,63,94,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.08) 0%, transparent 50%)",
					}}
				/>

				<div
					className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
					style={{
						background:
							"linear-gradient(to bottom, transparent 0%, #08080C 100%)",
					}}
				/>

				<div
					className="container mx-auto px-6 max-w-6xl relative z-10"
					ref={heroContentRef}
				>
					<motion.div
						className="grid md:grid-cols-12 gap-12 items-center"
						variants={stagger}
						initial="hidden"
						animate="show"
					>
						{/* Hero Left Content */}
						<div className="md:col-span-7 space-y-6">
							<motion.div
								variants={fadeUp}
								className="flex items-center gap-2 flex-wrap"
							>
								<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
									Open to Work
								</span>
							</motion.div>

							<motion.h1
								variants={fadeUp}
								className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.06] tracking-tight"
								style={{ fontFamily: "'P22Mackinac', sans-serif" }}
							>
								Building scalable,
								<br />
								<span className="relative">
									<span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
										resilient
									</span>
									<motion.span
										className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-rose-500/70 to-transparent"
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{
											delay: 0.8,
											duration: 0.9,
											ease: [0.22, 1, 0.36, 1],
										}}
									/>
								</span>
								<br />
								<span className="text-slate-500 font-normal">systems.</span>
							</motion.h1>

							<motion.p
								variants={fadeUp}
								className=" text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed"
							>
								Hi, I'm{" "}
								<span className="text-white font-semibold">
									Sanskriti Gupta
								</span>
								. Software engineer specializing in{" "}
								<span className="text-rose-400 font-semibold border-b border-rose-500/25 pb-0.5">
									<Typewriter
										words={[
											"Distributed Systems",
											"React",
											"Node.js & Express APIs",
											"AWS Cloud Architecture",
											"PostgreSQL & Redis Pub/Sub",
										]}
										loop={0}
										cursor
										cursorStyle="|"
									/>
								</span>
								.
							</motion.p>

							{/* Call to actions */}
							<motion.div
								variants={fadeUp}
								className="flex flex-wrap gap-3.5 pt-2"
							>
								<motion.a
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.97 }}
									href="#projects"
									className="bg-white text-black px-7 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider hover:bg-rose-400 hover:text-white transition-all shadow-lg shadow-black/30 flex items-center gap-2"
								>
									Explore Projects <ArrowUpRight size={14} />
								</motion.a>
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => navigate("/resume")}
									className="cursor-pointer border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all flex items-center gap-2"
								>
									<FileText size={13} className="text-slate-400" /> View Resume
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => setIsTerminalOpen(true)}
									className="cursor-pointer border border-emerald-500/25 bg-emerald-500/5 px-5 py-3.5 rounded-xl text-[11px] font-mono text-emerald-300 hover:bg-emerald-500/15 transition-all flex items-center gap-2"
								>
									<Terminal size={13} /> Interactive CLI
								</motion.button>
							</motion.div>
						</div>

						{/* Hero Right Avatar Card */}
						<motion.div
							variants={fadeUp}
							className="md:col-span-5 flex justify-center relative"
						>
							<div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-purple-500/10 to-amber-500/15 rounded-[2.5rem] blur-2xl opacity-60" />
							<div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#10101A] group shadow-2xl">
								<div className="absolute inset-0 bg-gradient-to-tr from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 group-hover:to-transparent transition-all duration-700 z-10 pointer-events-none" />
								<img
									src="/images/P3.jpeg"
									alt="Sanskriti Gupta"
									className="w-full h-full object-cover grayscale-[10%] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
									onError={(e) => {
										e.target.style.display = "none";
										e.target.nextSibling.style.display = "flex";
									}}
								/>
								<div className="hidden absolute inset-0 bg-[#10101A] flex-col items-center justify-center p-6 text-center">
									<Briefcase
										size={26}
										className="text-rose-400 mb-2 animate-pulse"
									/>
									<span className="text-base font-bold text-slate-200 block">
										Sanskriti Gupta
									</span>
									<span className="text-xs text-slate-500 uppercase mt-1 tracking-wider">
										Software Developer
									</span>
								</div>
								{/* <div className="absolute bottom-4 left-4 right-4 py-2.5 px-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/[0.08] flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
										<span className="text-xs text-slate-200 font-medium">
											Full-Stack & Cloud
										</span>
									</div>
									<span className="text-[10px] font-mono text-slate-400">
										Bhopal / Remote
									</span>
								</div> */}
							</div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 cursor-pointer"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2, duration: 0.5 }}
					onClick={() =>
						document
							.getElementById("about")
							?.scrollIntoView({ behavior: "smooth" })
					}
				>
					<motion.div
						animate={{ y: [0, 5, 0] }}
						transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
					>
						<ChevronDown size={14} className="text-slate-500" />
					</motion.div>
				</motion.div>
			</section>

			{/* About Section */}
			<section
				id="about"
				className="py-24 relative"
				style={{ backgroundColor: "#08080C" }}
			>
				<div
					className="absolute top-0 left-0 right-0 h-px pointer-events-none"
					style={{
						background:
							"linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
					}}
				/>
				<div className="container mx-auto px-6 max-w-4xl">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-8"
					>
						<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5">
							<Sparkles size={12} /> 01 / Bio
						</span>
						<h3
							className="text-3xl sm:text-4xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							About Me
						</h3>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="p-8 sm:p-10 rounded-2xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-sm space-y-6 hover:border-white/[0.1] transition-colors duration-300"
					>
						<div className="space-y-4">
							<h4
								className="text-2xl font-bold text-white tracking-tight"
								style={{ fontFamily: "'P22Mackinac', sans-serif" }}
							>
								Hey there, I’m Sanskriti!
							</h4>
							<p className="scoutie text-slate-300 sm:text-lg leading-relaxed">
								I’m a Computer Science student who enjoys turning ideas into
								things people can actually use. I love building full-stack apps,
								solving tricky problems, and exploring AI & cloud technologies
								along the way.
							</p>
							<p className="text-slate-400 text-base sm:text-lg leading-relaxed">
								Most of the time, you’ll find me coding, debugging something
								that “should’ve worked,” or building a new project just because
								I had an idea.
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.04]">
							{[
								"Full-Stack Development",
								"Problem Solving",
								"Cloud & AI",
								"Continuous Learning",
							].map((tag) => (
								<span
									key={tag}
									className="text-[10px] bg-white/[0.02] px-3 py-1 rounded-full text-slate-300 border border-white/[0.05] uppercase tracking-wider font-medium hover:border-white/[0.1] hover:text-white transition-all cursor-default"
								>
									{tag}
								</span>
							))}
							<div className="ml-auto text-[11px] text-slate-500 uppercase tracking-wider font-mono">
								VIT Bhopal · 2023–2027
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Experience Section */}
			<ExperienceSection />

			{/* Featured Projects Section */}
			<ProjectsSection />

			{/* Certifications & Achievements */}
			<AchievementsSection />

			{/* Technical Stack Matrix */}
			<SkillsSection />

			{/* Contact Section */}
			<Contact />

			{/* Footer */}
			<footer
				className="py-14 text-center border-t border-white/[0.04]"
				style={{ backgroundColor: "#08080C" }}
			>
				<div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<span
							className="text-slate-400 text-lg font-semibold"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Sanskriti Gupta
						</span>
						<span className="text-rose-500">·</span>
						<span className="text-slate-600 text-xs font-mono">
							Software Developer
						</span>
					</div>

					<p className="text-slate-600 text-[11px] tracking-wider uppercase font-medium">
						&copy; {new Date().getFullYear()} Sanskriti Gupta · Crafted with ❤️
					</p>

					<div className="flex items-center gap-3">
						<a
							href="https://github.com/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="text-slate-500 hover:text-white transition-colors"
							aria-label="GitHub"
						>
							<FaGithub size={16} />
						</a>
						<a
							href="https://linkedin.com/in/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="text-slate-500 hover:text-white transition-colors"
							aria-label="LinkedIn"
						>
							<FaLinkedin size={16} />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PortfolioMain />} />
			<Route path="/resume" element={<ResumeView />} />
		</Routes>
	</BrowserRouter>
);

export default App;
