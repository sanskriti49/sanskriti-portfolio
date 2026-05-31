import { useState, useEffect, useRef } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from "framer-motion";

import resumeFile from "./resume.pdf";
import {
	ExternalLink,
	Download,
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
	ArrowLeft,
	Briefcase,
} from "lucide-react";

import { Typewriter } from "react-simple-typewriter";
import Contact from "./Contact";
import PixelBlast from "./PixelBlast";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
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
		title: "CineBuzz",
		type: "Web Application",
		desc: "A dynamic movie discovery platform built with React, featuring seamless search, multi-criteria filtering, and live watchlist management using the TMDB API.",
		tags: ["React", "TMDB API", "Tailwind CSS"],
		link: "http://cinebuzzzz.netlify.app/",
		img: "/images/cinebuzz.png",
		accent: "from-rose-500/20 to-amber-500/10",
	},
	{
		title: "TaskGenie",
		type: "Full-Stack Project",
		status: "In Progress",
		desc: "A hyper-local service marketplace designed to connect users with trusted local experts, built with a PostgreSQL backend and secure payment integrations.",
		tags: ["PERN Stack", "PostgreSQL", "REST APIs"],
		link: "https://taskgenieee.vercel.app/",
		img: "/images/service-app.png",
		accent: "from-emerald-500/20 to-cyan-500/10",
	},
	{
		title: "Companion",
		type: "Mobile Application",
		status: "In Progress",
		desc: "An AI-powered mobile assistant built for senior care, featuring voice-enabled memory aids, emergency alerts, and smart offline intent classification.",
		tags: ["Flutter", "Llama 3.1", "BERT Engine"],
		link: "https://github.com/sanskriti49/dementia-app",
		img: "/images/dementia.gif",
		accent: "from-purple-500/20 to-sky-500/10",
	},
];

/* ─────────────────────────────────────────
   NUMBER COUNTER
───────────────────────────────────────── */
const StatBadge = ({ value, label }) => (
	<div className="flex flex-col items-center px-6 py-3 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
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

/* ─────────────────────────────────────────
   SCROLL INDICATOR
───────────────────────────────────────── */
const ScrollIndicator = () => (
	<motion.div
		className="flex flex-col items-center gap-2 text-slate-600"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 1.5 }}
	>
		<span className="text-[9px] uppercase tracking-[0.3em] font-medium">
			scroll
		</span>
		<motion.div
			className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"
			animate={{ scaleY: [0.3, 1, 0.3] }}
			transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
		/>
	</motion.div>
);

/* ─────────────────────────────────────────
   MAIN PORTFOLIO
───────────────────────────────────────── */
const PortfolioMain = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const heroRef = useRef(null);
	const { scrollY } = useScroll();
	const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
	const heroY = useTransform(scrollY, [0, 400], [0, 60]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Home", href: "#home", type: "anchor" },
		{ name: "About", href: "#about", type: "anchor" },
		{ name: "Projects", href: "#projects", type: "anchor" },
		{ name: "Resume", href: "/resume", type: "route" },
		{ name: "Contact", href: "#contact", type: "anchor" },
	];

	/* stagger children animation helper */
	const stagger = {
		hidden: {},
		show: { transition: { staggerChildren: 0.08 } },
	};
	const fadeUp = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
		},
	};

	return (
		<div
			className="min-h-screen text-[#f1f5f9] antialiased selection:bg-rose-500/20 selection:text-rose-200 scroll-smooth leading-relaxed"
			style={{ backgroundColor: "#08080C", fontFamily: "'Inter', sans-serif" }}
		>
			{/* ── Background Ambience ── */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-rose-950/30 to-amber-950/10 blur-[160px]" />
				<div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-indigo-950/20 to-transparent blur-[140px]" />
				<div className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-emerald-950/10 to-transparent blur-[120px]" />
				{/* fine dot grid */}
				<div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
			</div>

			{/* ── Navbar ── */}
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-500 ${
					scrolled ? "py-3" : "py-6 bg-transparent"
				}`}
				style={{
					backgroundColor: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
					backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
					borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
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
						className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl border border-white/[0.05] bg-white/[0.015]"
						style={{ backdropFilter: "blur(12px)" }}
					>
						{navLinks.map((link) =>
							link.type === "route" ? (
								<Link
									key={link.name}
									to={link.href}
									className="text-[11px] uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-all hover:bg-white/[0.04]"
								>
									{link.name}
								</Link>
							) : (
								<a
									key={link.name}
									href={link.href}
									className="text-[11px] uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-all hover:bg-white/[0.04]"
								>
									{link.name}
								</a>
							),
						)}
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
						className="md:hidden text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{/* ── Mobile Menu ── */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
						style={{ backgroundColor: "rgba(8,8,12,0.97)" }}
					>
						{navLinks.map((link, i) =>
							link.type === "route" ? (
								<motion.div
									key={link.name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
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
					</motion.div>
				)}
			</AnimatePresence>

			{/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
			<section
				id="home"
				className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
			>
				{/* bg pixel blast*/}
				<div className="absolute inset-0 z-0 pointer-events-none opacity-20">
					<div style={{ width: "100%", position: "relative" }}>
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
				</div>

				{/* decorative corner text */}
				<div className="absolute top-32 right-8 hidden lg:flex flex-col items-center gap-3 text-slate-700">
					<span className="text-[9px] uppercase tracking-[0.4em] rotate-90 origin-center whitespace-nowrap">
						Full-Stack Developer
					</span>
				</div>

				<div className="container mx-auto px-6 max-w-6xl relative z-10">
					{" "}
					<motion.div style={{ opacity: heroOpacity, y: heroY }} ref={heroRef}>
						<motion.div
							className="grid md:grid-cols-12 gap-12 items-center"
							variants={stagger}
							initial="hidden"
							animate="show"
						>
							{/* left */}
							<motion.div
								style={{ opacity: heroOpacity, y: heroY }}
								className="md:col-span-7 space-y-7"
							>
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
										{/* underline accent */}
										<motion.span
											className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-rose-500/60 to-transparent"
											initial={{ width: 0 }}
											animate={{ width: "100%" }}
											transition={{ delay: 0.8, duration: 0.8 }}
										/>
									</span>
									<br />
									<span className="text-slate-500 font-normal">
										experiences.
									</span>
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
										whileHover={{ scale: 1.02, y: -1 }}
										whileTap={{ scale: 0.98 }}
										href="#projects"
										className="bg-white text-black px-7 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider hover:bg-rose-400 hover:text-white transition-all shadow-lg shadow-black/20"
									>
										View My Work
									</motion.a>
									<motion.button
										whileHover={{ scale: 1.02, y: -1 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => navigate("/resume")}
										className="cursor-pointer border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 rounded-xl text-[11px] uppercase font-bold tracking-wider text-slate-300 hover:bg-white/[0.05] hover:text-white transition-all flex items-center gap-2"
									>
										<FileText size={13} className="text-slate-400" /> View
										Resume
									</motion.button>
								</motion.div>

								{/* stat badges */}
								<motion.div
									variants={fadeUp}
									className="flex flex-wrap gap-3 pt-2"
								>
									<StatBadge value="3+" label="Projects Shipped" />
									<StatBadge value="6+" label="Technologies" />
									<StatBadge value="∞" label="Curiosity" />
								</motion.div>
							</motion.div>

							{/* right — photo */}
							<motion.div
								variants={fadeUp}
								className="md:col-span-5 flex justify-center relative"
							>
								{/* outer glow ring */}
								<div className="absolute inset-0 bg-gradient-to-tr from-rose-500/15 to-amber-500/10 rounded-[2rem] blur-2xl opacity-60" />

								<div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[1.75rem] overflow-hidden border border-white/[0.07] bg-[#10101A] group shadow-2xl">
									{/* subtle shimmer on hover */}
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

									{/* floating label */}
									<div className="absolute bottom-4 left-4 right-4 py-2.5 px-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.06] flex items-center gap-2.5">
										<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
										<span className="text-xs text-slate-300 font-medium">
											Available for hire
										</span>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				{/* scroll indicator */}
				{/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
					<ScrollIndicator />
				</div> */}
			</section>

			{/* ══════════════════════════════════
          ABOUT & SKILLS
      ══════════════════════════════════ */}
			<section
				id="about"
				className="py-28 relative"
				style={{
					borderTop: "1px solid rgba(255,255,255,0.03)",
					borderBottom: "1px solid rgba(255,255,255,0.03)",
				}}
			>
				<div className="container mx-auto px-6 max-w-6xl">
					{/* section label */}
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
						{/* about card */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="md:col-span-7 p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm flex flex-col justify-between space-y-8"
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
										className="text-[10px] bg-white/[0.02] px-3 py-1 rounded-full text-slate-400 border border-white/[0.04] uppercase tracking-wider font-medium"
									>
										{tag}
									</span>
								))}
								<div className="ml-auto text-[10px] text-slate-500 uppercase tracking-wider font-medium self-center">
									VIT Bhopal · Kanpur, India
								</div>
							</div>
						</motion.div>

						{/* skills card */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="md:col-span-5 p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm"
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
										whileHover={{ x: 3 }}
										className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] text-sm font-medium hover:border-white/[0.08] transition-all group cursor-default"
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

			{/* ══════════════════════════════════
          PROJECTS
      ══════════════════════════════════ */}
			<section id="projects" className="py-28">
				<div className="container mx-auto px-6 max-w-6xl">
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

					<div className="grid md:grid-cols-3 gap-6">
						{projects.map((project, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								whileHover={{ y: -6 }}
								className="group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-[#0C0C14]/70 backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-white/[0.08]"
							>
								{/* image */}
								<div className="aspect-[16/10] overflow-hidden bg-[#10101A] relative border-b border-white/[0.03]">
									<div
										className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
									/>
									<img
										src={project.img}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
										onError={(e) => {
											e.target.style.display = "none";
											e.target.nextSibling.style.display = "flex";
										}}
									/>
									<div className="hidden absolute inset-0 bg-[#10101A] flex-col justify-center items-center p-6 text-center">
										<Briefcase size={18} className="text-zinc-600 mb-2" />
										<span className="text-sm font-bold text-slate-400 block">
											{project.title}
										</span>
										<span className="text-xs text-zinc-500 uppercase mt-0.5 tracking-wide">
											{project.type}
										</span>
									</div>
									{project.status && (
										<span className="absolute top-3 right-3 text-[9px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-widest z-20">
											{project.status}
										</span>
									)}
								</div>

								{/* content */}
								<div className="p-6 flex flex-col flex-grow justify-between space-y-5">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
												{project.type}
											</span>
										</div>
										<h4
											className="text-lg font-bold text-white tracking-tight"
											style={{ fontFamily: "'P22Mackinac', sans-serif" }}
										>
											{project.title}
										</h4>
										<p className="text-slate-400 text-sm leading-relaxed">
											{project.desc}
										</p>
									</div>
									<div className="space-y-4">
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-md text-slate-400 border border-white/[0.04] font-medium tracking-wide"
												>
													{tag}
												</span>
											))}
										</div>
										<a
											href={project.link}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group/link hover:text-rose-300 transition-colors"
										>
											View Project{" "}
											<ExternalLink
												size={11}
												className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
											/>
										</a>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════
          CONTACT  ← GridMotion Fixed Here
      ══════════════════════════════════ */}
			<Contact />

			{/* ── Footer ── */}
			<footer className="py-12 text-center border-t border-white/[0.02]">
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

/* ─────────────────────────────────────────
   RESUME VIEW
───────────────────────────────────────── */
const ResumeView = () => {
	const navigate = useNavigate();
	return (
		<div
			className="min-h-screen text-[#e2e8f0] p-6 flex flex-col"
			style={{ backgroundColor: "#08080C", fontFamily: "'Inter', sans-serif" }}
		>
			<div className="max-w-5xl w-full mx-auto flex flex-col flex-grow space-y-4">
				<div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
					<button
						onClick={() => navigate(-1)}
						className="cursor-pointer flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
					>
						<ArrowLeft size={14} /> Back
					</button>
					<div className="flex items-center gap-4">
						<span className="hidden sm:inline text-[9px] uppercase tracking-widest text-slate-500 font-medium">
							resume.pdf
						</span>
						<a
							href={resumeFile}
							download="Sanskriti_Gupta_Resume.pdf"
							className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg text-xs uppercase font-bold tracking-widest hover:bg-rose-400 hover:text-white transition-all shadow-md"
						>
							<Download size={12} /> Download
						</a>
					</div>
				</div>
				<div className="flex-grow rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950 relative min-h-[75vh] shadow-2xl">
					<object
						data={resumeFile}
						type="application/pdf"
						className="w-full h-full absolute inset-0"
					>
						<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
							<FileText
								size={32}
								className="text-rose-400 mb-4 animate-pulse"
							/>
							<h4 className="text-sm uppercase tracking-widest text-white mb-2">
								Unable to display PDF preview
							</h4>
							<p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
								Your browser doesn't support embedded PDF viewing. Download
								below.
							</p>
							<a
								href={resumeFile}
								target="_blank"
								rel="noreferrer"
								className="border border-white/[0.06] bg-white/[0.01] text-xs uppercase font-bold tracking-widest text-slate-300 px-5 py-3 rounded-lg hover:bg-white/[0.04] hover:text-white transition-colors flex items-center gap-2"
							>
								Open Direct <ExternalLink size={12} />
							</a>
						</div>
					</object>
				</div>
			</div>
		</div>
	);
};

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PortfolioMain />} />
			<Route path="/resume" element={<ResumeView />} />
		</Routes>
	</BrowserRouter>
);

export default App;
