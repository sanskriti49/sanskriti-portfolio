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
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Contact from "./Contact";
import PixelBlast from "./PixelBlast";
import ResumeView from "./ResumeView";

gsap.registerPlugin(ScrollTrigger);

const skills = [
	{ name: "React.js / Next.js", icon: Code, color: "text-rose-400" },
	{ name: "Node.js / Express", icon: Server, color: "text-emerald-400" },
	{ name: "PostgreSQL", icon: Database, color: "text-cyan-400" },
	{ name: "Flutter & Dart", icon: Smartphone, color: "text-sky-400" },
	{ name: "Python", icon: Brain, color: "text-amber-400" },
	{ name: "Machine Learning", icon: Rocket, color: "text-purple-400" },
];

const projects = [
	{
		title: "TaskGenie",
		type: "Full-Stack Project",
		status: "In Progress",
		desc: "A hyper-local service marketplace designed to connect users with trusted local experts, built with a PostgreSQL backend and secure payment integrations.",
		tags: ["PERN Stack", "PostgreSQL", "REST APIs"],
		link: "https://taskgenieee.vercel.app/",
		img: "/images/service-app.png",
		accent: "from-emerald-500/30 to-cyan-500/20",
		highlightColor: "rgba(16,185,129,0.10)",
		lineColor: "#10b981",
		tagColor: "text-emerald-300/70",
	},
	{
		title: "CineBuzz",
		type: "Web Application",
		desc: "A dynamic movie discovery platform built with React, featuring seamless search, multi-criteria filtering, and live watchlist management using the TMDB API.",
		tags: ["React", "TMDB API", "Tailwind CSS"],
		link: "http://cinebuzzzz.netlify.app/",
		img: "/images/cinebuzz.png",
		accent: "from-rose-500/30 to-amber-500/20",
		highlightColor: "rgba(244,63,94,0.12)",
		lineColor: "#f43f5e",
		tagColor: "text-rose-300/70",
	},

	{
		title: "Companion",
		type: "Mobile Application",
		status: "In Progress",
		desc: "An AI-powered mobile assistant built for senior care, featuring voice-enabled memory aids, emergency alerts, and smart offline intent classification.",
		tags: ["Flutter", "Llama 3.1", "BERT Engine"],
		link: "https://github.com/sanskriti49/dementia-app",
		img: "/images/dementia.gif",
		accent: "from-purple-500/30 to-sky-500/20",
		highlightColor: "rgba(168,85,247,0.10)",
		lineColor: "#a855f7",
		tagColor: "text-purple-300/70",
	},
];

const StatBadge = ({ value, label }) => (
	<div className="flex flex-col items-center px-6 py-3 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
		<span
			className="text-2xl font-bold text-white"
			style={{ fontFamily: "'P22Mackinac', sans-serif" }}
		>
			{value}
		</span>
		<span className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">
			{label}
		</span>
	</div>
);

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
			style={{
				scaleX,
				background: "linear-gradient(90deg, #f43f5e, #fb923c, #f43f5e)",
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
					className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.08] bg-[#0C0C14]/90 backdrop-blur-md text-slate-400 hover:text-white hover:border-white/[0.15] transition-all shadow-lg shadow-black/40"
					aria-label="Back to top"
				>
					<ArrowUp size={15} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

/* ─────────────────────────────────────────────────────────
   INNOVATIVE PROJECTS SECTION — editorial index layout
───────────────────────────────────────────────────────── */
const ProjectsSection = () => {
	const [activeIdx, setActiveIdx] = useState(0);
	const active = projects[activeIdx];

	return (
		<section
			id="projects"
			className="py-28 relative"
			style={{ backgroundColor: "#08080C" }}
		>
			<div className="container mx-auto px-6 max-w-6xl">
				{/* Header */}
				<div className="flex justify-between items-end mb-16">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<span className="text-teal-400 font-semibold uppercase tracking-[0.2em] text-[10px]">
							02 / Portfolio
						</span>
						<h3
							className="text-3xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Featured Projects
						</h3>
					</motion.div>
					<motion.a
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						whileHover={{ x: 3 }}
						href="https://github.com/sanskriti49"
						target="_blank"
						rel="noreferrer"
						className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-rose-300/80 hover:text-rose-300 transition-colors"
					>
						GitHub Profile <ChevronRight size={14} />
					</motion.a>
				</div>

				<div className="grid md:grid-cols-12 gap-8 items-start">
					{/* ── Left: project index list ── */}
					<div className="md:col-span-6 lg:col-span-7">
						{projects.map((project, idx) => {
							const isActive = idx === activeIdx;
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -16 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.08 }}
									className="relative cursor-pointer"
									onMouseEnter={() => setActiveIdx(idx)}
									onClick={() => setActiveIdx(idx)}
								>
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
										className="pl-6 pr-4 py-7 rounded-r-xl transition-all duration-300"
										style={{
											backgroundColor: isActive
												? project.highlightColor
												: "transparent",
										}}
									>
										<div className="flex items-start gap-5">
											<span
												className="font-mono text-[11px] mt-1 shrink-0 transition-colors duration-300"
												style={{
													color: isActive ? project.lineColor : "#475569",
												}}
											>
												0{idx + 1}
											</span>

											<div className="flex-1 min-w-0 space-y-2.5">
												<div className="flex items-center gap-3 flex-wrap">
													<h4
														className="text-xl font-bold tracking-tight transition-colors duration-300"
														style={{
															fontFamily: "'P22Mackinac', sans-serif",
															color: isActive ? "#ffffff" : "#94a3b8",
														}}
													>
														{project.title}
													</h4>
													{project.status && (
														<span className="text-[8px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-widest">
															{project.status}
														</span>
													)}
												</div>

												<p className="text-[10px] uppercase tracking-[0.18em] text-slate-600 font-medium">
													{project.type}
												</p>

												<div className="flex flex-wrap gap-1.5">
													{project.tags.map((tag) => (
														<span
															key={tag}
															className={`text-[10px] px-2.5 py-1 rounded-md border font-medium tracking-wide transition-all duration-300 ${
																isActive
																	? `${project.tagColor} border-white/[0.07] bg-white/[0.03]`
																	: "text-slate-600 border-white/[0.03] bg-transparent"
															}`}
														>
															{tag}
														</span>
													))}
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
															style={{ overflow: "hidden" }}
														>
															<div className="pt-2 space-y-3">
																<p className="text-slate-400 text-sm leading-relaxed">
																	{project.desc}
																</p>
																<a
																	href={project.link}
																	target="_blank"
																	rel="noreferrer"
																	className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
																	style={{ color: project.lineColor }}
																	onClick={(e) => e.stopPropagation()}
																>
																	View Project <ExternalLink size={11} />
																</a>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</div>

											<motion.div
												className="shrink-0 mt-0.5"
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

									{/* Row divider */}
									{idx < projects.length - 1 && (
										<div className="ml-6 h-px bg-white/[0.04]" />
									)}
								</motion.div>
							);
						})}

						{/* Mobile: image shown below the list on small screens */}
						<div className="mt-8 md:hidden">
							<MobileImagePreview active={active} />
						</div>
					</div>

					{/* ── Right: sticky preview (desktop only) ── */}
					<div className="hidden md:block md:col-span-6 lg:col-span-5">
						<div className="sticky top-28 space-y-4">
							<div className="flex items-center justify-between mb-1">
								<motion.span
									key={activeIdx + "-label"}
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold"
								>
									{active.type}
								</motion.span>
								<span className="font-mono text-[11px] text-slate-700">
									0{activeIdx + 1}&nbsp;/&nbsp;0{projects.length}
								</span>
							</div>

							<div className="relative rounded-2xl overflow-hidden border border-white/[0.05] bg-[#0C0C14] aspect-[4/3] shadow-2xl shadow-black/40">
								<AnimatePresence mode="wait">
									<motion.div
										key={activeIdx}
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
										<div className="hidden absolute inset-0 bg-[#10101A] flex-col justify-center items-center">
											<Briefcase size={20} className="text-slate-700 mb-2" />
											<span className="text-sm font-bold text-slate-500">
												{active.title}
											</span>
										</div>

										<div
											className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-60`}
										/>
										{/* Bottom fade for readability */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

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
										<span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 uppercase tracking-widest backdrop-blur-sm">
											{active.status}
										</span>
									</div>
								)}
							</div>

							<div className="flex items-center justify-center gap-2 pt-1">
								{projects.map((p, i) => (
									<button
										key={i}
										onClick={() => setActiveIdx(i)}
										className="rounded-full transition-all duration-300"
										style={{
											width: i === activeIdx ? "20px" : "6px",
											height: "6px",
											backgroundColor:
												i === activeIdx
													? p.lineColor
													: "rgba(255,255,255,0.12)",
										}}
										aria-label={`View ${p.title}`}
									/>
								))}
							</div>

							<AnimatePresence mode="wait">
								<motion.a
									key={activeIdx + "-btn"}
									href={active.link}
									target="_blank"
									rel="noreferrer"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: 0.25 }}
									className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.04]"
									style={{
										borderColor: "rgba(255,255,255,0.07)",
										color: active.lineColor,
									}}
								>
									Open {active.title} <ExternalLink size={12} />
								</motion.a>
							</AnimatePresence>
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
		className="rounded-2xl overflow-hidden border border-white/[0.05] bg-[#0C0C14] aspect-video relative"
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
		<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
		<div className="absolute bottom-4 left-4">
			<p
				className="text-white text-lg font-bold"
				style={{ fontFamily: "'P22Mackinac', sans-serif" }}
			>
				{active.title}
			</p>
		</div>
		<a
			href={active.link}
			target="_blank"
			rel="noreferrer"
			className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.08] text-[10px] font-semibold text-white uppercase tracking-wider"
		>
			Visit <ExternalLink size={10} />
		</a>
	</motion.div>
);

const PortfolioMain = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const containerRef = useRef(null);
	const heroContentRef = useRef(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const [activeSection, setActiveSection] = useState(() => {
		const hash = window.location.hash.replace("#", "");
		const valid = ["home", "about", "projects", "contact"];
		return valid.includes(hash) ? hash : "home";
	});

	// sync on hash change (nav clicks)
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			const valid = ["home", "about", "projects", "contact"];
			if (valid.includes(hash)) setActiveSection(hash);
		};
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	// scroll-based tracking — finds whichever section's top is closest
	useEffect(() => {
		const sectionIds = ["home", "about", "projects", "contact"];

		const onScroll = () => {
			const trigger = window.innerHeight * 0.3;

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
		{ name: "Home", href: "#home", sectionId: "home", type: "anchor" },
		{ name: "About", href: "#about", sectionId: "about", type: "anchor" },
		{
			name: "Projects",
			href: "#projects",
			sectionId: "projects",
			type: "anchor",
		},
		{ name: "Resume", href: "/resume", type: "route" },
		{ name: "Contact", href: "#contact", sectionId: "contact", type: "anchor" },
	];

	const stagger = {
		hidden: {},
		show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
	};
	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<div
			ref={containerRef}
			className="min-h-screen text-[#f1f5f9] antialiased selection:bg-rose-500/20 selection:text-rose-200 scroll-smooth leading-relaxed"
			style={{ backgroundColor: "#08080C", fontFamily: "'Inter', sans-serif" }}
		>
			<ScrollProgress />
			<BackToTop />

			{/* Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-rose-950/30 to-amber-950/10 blur-[160px]" />
				<div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-indigo-950/20 to-transparent blur-[140px]" />
				<div className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-emerald-950/10 to-transparent blur-[120px]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
			</div>

			{/* Navbar */}
			<nav
				className="fixed top-0 w-full z-50 transition-all duration-500"
				style={{
					padding: scrolled ? "10px 0" : "20px 0",
					backgroundColor: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
					backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
					WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
					boxShadow: scrolled
						? "0 1px 0 0 rgba(241,245,249,0.04), 0 4px 24px 0 rgba(0,0,0,0.3)"
						: "none",
				}}
			>
				<div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
					<a
						href="#"
						className="group flex items-center gap-1"
						style={{ fontFamily: "'P22Mackinac', sans-serif" }}
					>
						<span className="text-xl text-white tracking-wide">Sanskriti</span>
						<motion.span
							className="text-rose-400 text-2xl leading-none"
							animate={{ rotate: [0, 15, 0] }}
							transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
						>
							·
						</motion.span>
					</a>
					<div
						className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border border-white/[0.05] bg-white/[0.015]"
						style={{ backdropFilter: "blur(12px)" }}
					>
						{navLinks.map((link) => {
							// tells if this item is currently selected
							const isActive =
								link.type === "route"
									? location.pathname === link.href
									: activeSection === link.sectionId &&
										location.pathname === "/";

							const baseStyles = `text-[11px] uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-xl transition-all ${
								isActive
									? "text-white bg-white/[0.06]"
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
					<motion.a
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
						href="#contact"
						className="hidden md:flex relative overflow-hidden group items-center gap-1.5 bg-white text-black px-5 py-2.5 rounded-xl text-[11px] uppercase font-bold tracking-widest"
					>
						<span className="relative z-10 flex items-center gap-1.5">
							Let's Talk <ArrowUpRight size={13} />
						</span>
						<span className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</motion.a>
					<button
						className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
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
						className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
						style={{
							backgroundColor: "rgba(8,8,12,0.97)",
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
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ delay: i * 0.06 }}
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
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ delay: i * 0.06 }}
									href={link.href}
									onClick={() => setIsMenuOpen(false)}
									className="text-2xl font-light text-slate-300 hover:text-white transition-colors"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									{link.name}
								</motion.a>
							),
						)}
						<motion.a
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: navLinks.length * 0.06 + 0.05 }}
							href="#contact"
							onClick={() => setIsMenuOpen(false)}
							className="mt-4 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl text-[11px] uppercase font-bold tracking-widest"
						>
							Let's Talk <ArrowUpRight size={13} />
						</motion.a>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Hero */}
			<section
				id="home"
				className="min-h-screen flex items-center pt-24 pb-16 relative"
				style={{ backgroundColor: "#08080C" }}
			>
				<div
					className="absolute inset-0 z-0 pointer-events-none opacity-20"
					style={{ overflow: "hidden" }}
				>
					<PixelBlast
						variant="square"
						pixelSize={4}
						color="#B497CF"
						patternScale={2}
						patternDensity={1}
						pixelSizeJitter={0}
						enableRipples
						rippleSpeed={0.4}
						rippleThickness={0.12}
						rippleIntensityScale={1.5}
						liquid={false}
						liquidStrength={0.12}
						liquidRadius={1.2}
						liquidWobbleSpeed={5}
						speed={0.5}
						edgeFade={0.25}
						transparent
					/>
				</div>
				<div
					className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
					style={{
						background:
							"linear-gradient(to bottom, transparent 0%, #08080C 100%)",
					}}
				/>
				<div className="absolute top-32 right-8 hidden lg:flex flex-col items-center gap-3 text-slate-700 z-10">
					<span className="text-[9px] uppercase tracking-[0.4em] rotate-90 origin-center whitespace-nowrap">
						Full-Stack Developer
					</span>
				</div>

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
						<div className="md:col-span-7 space-y-7">
							<motion.div variants={fadeUp}>
								<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
									Open for roles
								</span>
							</motion.div>
							<motion.h1
								variants={fadeUp}
								className="text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight"
								style={{ fontFamily: "'P22Mackinac', sans-serif" }}
							>
								Building web
								<br />
								<span className="relative">
									<span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
										and mobile
									</span>
									<motion.span
										className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-rose-500/60 to-transparent"
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{
											delay: 0.9,
											duration: 0.9,
											ease: [0.22, 1, 0.36, 1],
										}}
									/>
								</span>
								<br />
								<span className="text-slate-500 font-normal">experiences.</span>
							</motion.h1>
							<motion.p
								variants={fadeUp}
								className="text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed"
							>
								Hi, I'm{" "}
								<span className="text-white font-medium">Sanskriti</span>. A
								full-stack developer focused on creating clean software across{" "}
								<span className="text-rose-400 font-medium border-b border-rose-500/20 pb-px">
									<Typewriter
										words={[
											"Web Frameworks",
											"Mobile Apps",
											"Database Design",
											"Smart Solutions",
										]}
										loop={0}
										cursor
										cursorStyle="|"
									/>
								</span>
							</motion.p>
							<motion.div
								variants={fadeUp}
								className="flex flex-wrap gap-4 pt-2"
							>
								<motion.a
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.97 }}
									href="#projects"
									className="bg-white text-black px-7 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider hover:bg-rose-400 hover:text-white transition-all shadow-lg shadow-black/20"
								>
									View My Work
								</motion.a>
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => navigate("/resume")}
									className="cursor-pointer border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider text-slate-300 hover:bg-white/[0.05] hover:text-white transition-all flex items-center gap-2"
								>
									<FileText size={13} className="text-slate-400" /> View Resume
								</motion.button>
							</motion.div>
							<motion.div
								variants={fadeUp}
								className="flex flex-wrap gap-3 pt-2"
							>
								<StatBadge value="5+" label="Projects Shipped" />
								<StatBadge value="8+" label="Technologies" />
								<StatBadge value="∞" label="Curiosity" />
							</motion.div>
						</div>

						<motion.div
							variants={fadeUp}
							className="md:col-span-5 flex justify-center relative"
						>
							<div className="absolute inset-0 bg-gradient-to-tr from-rose-500/15 to-amber-500/10 rounded-[2rem] blur-2xl opacity-60" />
							<div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[1.75rem] overflow-hidden border border-white/[0.07] bg-[#10101A] group shadow-2xl">
								<div className="absolute inset-0 bg-gradient-to-tr from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:to-transparent transition-all duration-700 z-10 pointer-events-none" />
								<img
									src="/images/P3.jpeg"
									alt="Sanskriti Gupta"
									className="w-full h-full object-cover grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
									onError={(e) => {
										e.target.style.display = "none";
										e.target.nextSibling.style.display = "flex";
									}}
								/>
								<div className="hidden absolute inset-0 bg-[#10101A] flex-col items-center justify-center p-6 text-center">
									<Briefcase
										size={24}
										className="text-rose-400 mb-2 animate-pulse"
									/>
									<span className="text-sm font-bold text-slate-300 block">
										Sanskriti Gupta
									</span>
									<span className="text-xs text-slate-500 uppercase mt-1 tracking-wider">
										Full-Stack Developer
									</span>
								</div>
								<div className="absolute bottom-4 left-4 right-4 py-2.5 px-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.06] flex items-center gap-2.5">
									<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
									<span className="text-xs text-slate-300 font-medium">
										Let's build together :)
									</span>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 cursor-pointer"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.5, duration: 0.5 }}
					onClick={() =>
						document
							.getElementById("about")
							?.scrollIntoView({ behavior: "smooth" })
					}
				>
					<span className="text-[9px] uppercase tracking-[0.35em] text-slate-600">
						Scroll
					</span>
					<motion.div
						animate={{ y: [0, 5, 0] }}
						transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
					>
						<ChevronDown size={14} className="text-slate-600" />
					</motion.div>
				</motion.div>
			</section>

			{/* About */}
			<section
				id="about"
				className="py-28 relative"
				style={{ backgroundColor: "#08080C" }}
			>
				<div
					className="absolute top-0 left-0 right-0 h-px pointer-events-none"
					style={{
						background:
							"linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent)",
					}}
				/>
				<div className="container mx-auto px-6 max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12"
					>
						<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px]">
							01 / My Background
						</span>
					</motion.div>
					<div className="grid md:grid-cols-12 gap-6">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="md:col-span-7 p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm flex flex-col justify-between space-y-8 hover:border-white/[0.07] transition-colors duration-300"
						>
							<div className="space-y-4">
								<h3
									className="text-3xl font-normal text-white tracking-tight"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									What I Do
								</h3>
								<p className="text-slate-400 text-base leading-relaxed">
									I specialize in developing responsive web interfaces, robust
									backend APIs, and fluid cross-platform mobile apps. I enjoy
									breaking down complex problems into clean, practical, and
									highly functional digital products.
								</p>
								<p className="text-slate-500 text-sm leading-relaxed">
									Currently pursuing B.Tech in Computer Science at VIT Bhopal,
									I'm constantly learning and experimenting with new
									technologies to build meaningful things.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
								{[
									"Open Source",
									"Product Thinking",
									"Clean Code",
									"User-first",
								].map((tag) => (
									<span
										key={tag}
										className="text-[10px] bg-white/[0.02] px-3 py-1 rounded-full text-slate-400 border border-white/[0.04] uppercase tracking-wider font-medium hover:border-white/[0.08] hover:text-slate-300 transition-all cursor-default"
									>
										{tag}
									</span>
								))}
								<div className="ml-auto text-[10px] text-slate-500 uppercase tracking-wider font-medium self-center">
									VIT Bhopal · Kanpur, India
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="md:col-span-5 p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm hover:border-white/[0.07] transition-colors duration-300"
						>
							<h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-6">
								Technical Stack
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{skills.map((skill, i) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.05 }}
										whileHover={{ x: 4 }}
										className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] text-sm font-medium hover:border-white/[0.08] hover:bg-white/[0.02] transition-all group cursor-default"
									>
										<div
											className={`p-1.5 rounded-lg bg-white/[0.03] ${skill.color}`}
										>
											<skill.icon size={12} />
										</div>
										<span className="text-slate-300 font-normal text-sm">
											{skill.name}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<ProjectsSection />

			<Contact />

			<footer
				className="py-12 text-center border-t border-white/[0.02]"
				style={{ backgroundColor: "#08080C" }}
			>
				<div className="flex flex-col items-center gap-3">
					<span
						className="text-slate-600 text-lg"
						style={{ fontFamily: "'P22Mackinac', sans-serif" }}
					>
						Sanskriti<span className="text-rose-500/50">·</span>
					</span>
					<p className="text-slate-700 text-[10px] tracking-widest uppercase">
						&copy; {new Date().getFullYear()} Sanskriti Gupta · Built with care.
					</p>
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
