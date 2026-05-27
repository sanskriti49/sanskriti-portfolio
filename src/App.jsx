import React, { useState, useEffect } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Resume Single Static Resolution (Kept in public root or public assets)
import resumeFile from "./resume.pdf";

// Icons
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
	Copy,
	Check,
	Send,
} from "lucide-react";

import {
	FaGithub,
	FaLinkedin,
	FaInstagram,
	FaRegEnvelope,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const skills = [
	{ name: "React.js / Next.js", icon: Code, color: "text-blue-400" },
	{ name: "Node.js / Express", icon: Server, color: "text-emerald-400" },
	{ name: "PostgreSQL", icon: Database, color: "text-cyan-400" },
	{ name: "Flutter & Dart", icon: Smartphone, color: "text-sky-400" },
	{ name: "Python", icon: Brain, color: "text-amber-400" },
	{ name: "Machine Learning", icon: Rocket, color: "text-purple-400" },
];

// Clean configurations referencing strings served out of /public/images/
const projects = [
	{
		title: "CineBuzz",
		type: "Web Application",
		desc: "A dynamic movie discovery platform built with React, featuring seamless search, multi-criteria filtering, and live watchlist management using the TMDB API.",
		tags: ["React", "TMDB API", "Tailwind CSS"],
		link: "http://cinebuzzzz.netlify.app/",
		img: "/images/cinebuzz.png",
	},
	{
		title: "TaskGenie",
		type: "Full-Stack Project",
		status: "In Progress",
		desc: "A hyper-local service marketplace designed to connect users with trusted local experts, built with a PostgreSQL backend and secure payment integrations.",
		tags: ["PERN Stack", "PostgreSQL", "REST APIs"],
		link: "https://github.com/sanskriti49/service-provider",
		img: "/images/service-app.png",
	},
	{
		title: "Companion",
		type: "Mobile Application",
		status: "In Progress",
		desc: "An AI-powered mobile assistant built for senior care, featuring voice-enabled memory aids, emergency alerts, and smart offline intent classification.",
		tags: ["Flutter", "Llama 3.1", "BERT Engine"],
		link: "https://github.com/sanskriti49/dementia-app",
		img: "/images/dementia.gif", // Fixed: Re-mapped directly to exactly match your filename
	},
];

// --- MAIN PORTFOLIO ---
const PortfolioMain = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Interaction States for Contact Section
	const [copied, setCopied] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState("Full-Stack Project");
	const [customMessage, setCustomMessage] = useState(
		"Hi Sanskriti, I came across your portfolio and would love to discuss a project with you!",
	);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("sanskriti0409@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const topicSuggestions = {
		"Full-Stack Project":
			"Hi Sanskriti, I'm looking to build a full-stack platform and want to discuss database architectures and performance setups with you.",
		"Mobile Application":
			"Hi Sanskriti, I'm interested in building a fluid cross-platform app and would love to see how we can utilize Flutter or Dart.",
		"Quick Catchup":
			"Hi Sanskriti, just wanted to reach out, say hello, and talk about software design, web setups, or open engineering roles!",
	};

	const selectTopicSetting = (topic) => {
		setSelectedTopic(topic);
		setCustomMessage(topicSuggestions[topic]);
	};

	const navLinks = [
		{ name: "Home", href: "#home", type: "anchor" },
		{ name: "About", href: "#about", type: "anchor" },
		{ name: "Projects", href: "#projects", type: "anchor" },
		{ name: "Resume", href: "/resume", type: "route" },
		{ name: "Contact", href: "#contact", type: "anchor" },
	];

	return (
		<div
			className="min-h-screen text-[#f1f5f9] antialiased selection:bg-rose-500/20 selection:text-rose-200 scroll-smooth leading-relaxed"
			style={{ backgroundColor: "#09090D", fontFamily: "'Inter', sans-serif" }}
		>
			{/* Background Ambience Layer */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-rose-950/25 to-amber-950/10 blur-[140px]" />
				<div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-zinc-900/40 to-transparent blur-[140px]" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:44px_44px]" />
			</div>

			{/* Navbar */}
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 border-b border-white/[0.04]" : "py-6 bg-transparent"}`}
				style={{
					backgroundColor: scrolled ? "#09090DDF" : "transparent",
					backdropFilter: scrolled ? "blur(24px)" : "none",
				}}
			>
				<div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
					<a
						href="#"
						className="text-xl tracking-wide text-white group flex items-center"
						style={{ fontFamily: "'P22Mackinac', sans-serif" }}
					>
						Sanskriti
						<span className="text-rose-400 group-hover:translate-x-1 transition-transform ml-0.5">
							&middot;
						</span>
					</a>

					<div className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] p-1 rounded-xl">
						{navLinks.map((link) =>
							link.type === "route" ? (
								<Link
									key={link.name}
									to={link.href}
									className="text-xs uppercase tracking-widest font-semibold px-5 py-2 rounded-lg text-slate-400 hover:text-white transition-all hover:bg-white/[0.03]"
								>
									{link.name}
								</Link>
							) : (
								<a
									key={link.name}
									href={link.href}
									className="text-xs uppercase tracking-widest font-semibold px-5 py-2 rounded-lg text-slate-400 hover:text-white transition-all hover:bg-white/[0.03]"
								>
									{link.name}
								</a>
							),
						)}
					</div>

					<div className="hidden md:flex items-center">
						<a
							href="#contact"
							className="relative overflow-hidden group bg-white text-black px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest transition-all"
						>
							<span className="relative z-10 flex items-center gap-1.5">
								Let's Talk <ArrowUpRight size={15} />
							</span>
							<span className="absolute inset-0 bg-gradient-to-r from-rose-300 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
						</a>
					</div>

					<button
						className="md:hidden text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						className="fixed inset-0 z-40 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
						style={{ backgroundColor: "#09090DFA" }}
					>
						{navLinks.map((link) =>
							link.type === "route" ? (
								<Link
									key={link.name}
									to={link.href}
									onClick={() => setIsMenuOpen(false)}
									className="text-xl font-medium text-slate-400 hover:text-white transition-colors"
								>
									{link.name}
								</Link>
							) : (
								<a
									key={link.name}
									href={link.href}
									onClick={() => setIsMenuOpen(false)}
									className="text-xl font-medium text-slate-400 hover:text-white transition-colors"
								>
									{link.name}
								</a>
							),
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Hero */}
			<section id="home" className="min-h-screen flex items-center pt-24 pb-12">
				<div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-12 gap-12 items-center">
					<motion.div
						className="md:col-span-7 space-y-6"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-300 text-xs font-semibold uppercase tracking-wider">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
							Open for roles
						</div>
						<h1
							className="text-4xl sm:text-5xl Becker md:text-7xl text-white leading-[1.1] tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Building web and <br />
							<span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-medium">
								mobile experiences.
							</span>
						</h1>
						<p className="text-slate-400 font-normal max-w-xl text-base sm:text-lg leading-relaxed">
							Hi, I'm <span className="text-white font-medium">Sanskriti</span>.
							I am a full-stack developer focused on creating clean software
							across{" "}
							<span className="text-rose-300 font-medium border-b border-rose-500/20 pb-0.5">
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
						</p>
						<div className="flex flex-wrap gap-4 pt-4">
							<a
								href="#projects"
								className="bg-white text-black px-6 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-rose-500 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-md"
							>
								View My Work
							</a>
							<button
								onClick={() => navigate("/resume")}
								className="cursor-pointer border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm px-6 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider text-slate-300 hover:bg-white/[0.05] hover:text-white transition-all flex items-center gap-2"
							>
								<FileText size={14} className="text-slate-400" /> View Resume
							</button>
						</div>
					</motion.div>

					<motion.div
						className="md:col-span-5 relative flex justify-center"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#12121A] group shadow-2xl">
							<img
								src="/images/me.jpg" // Referenced completely via public root string path mapping
								alt="Sanskriti Gupta"
								className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-[1.01] transition-all duration-500 ease-out"
								onError={(e) => {
									e.target.style.display = "none";
									e.target.nextSibling.style.display = "flex";
								}}
							/>
							<div className="hidden absolute inset-0 bg-[#12121A] flex-col items-center justify-center p-6 text-center border border-white/[0.05]">
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
						</div>
						<div className="absolute inset-0 -z-10 bg-gradient-to-tr from-rose-500/10 to-amber-500/10 rounded-2xl blur-xl opacity-40" />
					</motion.div>
				</div>
			</section>

			{/* About & Skills */}
			<section
				id="about"
				className="py-24 border-y border-white/[0.03] bg-gradient-to-b from-transparent via-white/[0.002] to-transparent"
			>
				<div className="container mx-auto px-6 max-w-6xl">
					<div className="grid md:grid-cols-12 gap-6">
						<div className="md:col-span-7 p-8 sm:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm flex flex-col justify-between space-y-6">
							<div>
								<span className="text-rose-400 font-semibold uppercase tracking-wider text-xs">
									01 / My Background
								</span>
								<h3
									className="text-3xl font-normal mt-3 mb-4 text-white tracking-tight"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									What I Do
								</h3>
								<p className="text-slate-400 text-base leading-relaxed font-normal">
									I specialize in developing responsive web interfaces, robust
									backend APIs, and fluid cross-platform mobile apps. I enjoy
									breaking down complex problems into clean, practical, and
									highly functional digital products.
								</p>
							</div>
							<div className="text-xs text-slate-500 border-t border-white/[0.04] pt-4 uppercase tracking-widest font-medium">
								B.Tech CS Student at VIT Bhopal &bull; Based in Kanpur, India
							</div>
						</div>

						<div className="md:col-span-5 p-8 sm:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
							<h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-6">
								Technical Skills
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{skills.map((skill) => (
									<div
										key={skill.name}
										className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] text-sm font-medium hover:border-rose-500/20 hover:bg-white/[0.02] transition-all group"
									>
										<skill.icon
											size={14}
											className={`${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`}
										/>
										<span className="text-slate-300 font-normal">
											{skill.name}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Projects */}
			<section id="projects" className="py-24">
				<div className="container mx-auto px-6 max-w-6xl">
					<div className="flex justify-between items-end mb-16">
						<div>
							<span className="text-teal-400 font-semibold uppercase tracking-wider text-xs">
								02 / Portfolio
							</span>
							<h3
								className="text-3xl font-normal mt-1 text-white tracking-tight"
								style={{ fontFamily: "'P22Mackinac', sans-serif" }}
							>
								Featured Projects
							</h3>
						</div>
						<a
							href="https://github.com/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1.5 text-sm font-medium tracking-wider text-rose-300 hover:text-rose-200 transition-colors"
						>
							View GitHub Profile <ChevronRight size={14} />
						</a>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{projects.map((project, idx) => (
							<motion.div
								key={idx}
								whileHover={{ y: -4 }}
								className="group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-[#0E0E14]/50 backdrop-blur-sm flex flex-col h-full transition-colors hover:bg-[#0E0E14]/80"
							>
								<div className="aspect-[16/10] overflow-hidden bg-[#12121A] relative border-b border-white/[0.03]">
									<img
										src={project.img}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103 opacity-90 group-hover:opacity-100"
										onError={(e) => {
											e.target.style.display = "none";
											e.target.nextSibling.style.display = "flex";
										}}
									/>
									<div className="hidden absolute inset-0 bg-[#12121A] flex-col justify-center items-center p-6 text-center">
										<Briefcase size={18} className="text-zinc-600 mb-2" />
										<span className="text-sm font-bold text-slate-400 block">
											{project.title}
										</span>
										<span className="text-xs text-zinc-500 uppercase mt-0.5 tracking-wide">
											{project.type}
										</span>
									</div>
									{project.status && (
										<span className="absolute top-3 right-3 text-[9px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-widest">
											{project.status}
										</span>
									)}
								</div>

								<div className="p-6 flex flex-col flex-grow justify-between space-y-6">
									<div className="space-y-2">
										<h4
											className="text-lg font-bold text-white tracking-tight"
											style={{ fontFamily: "'P22Mackinac', sans-serif" }}
										>
											{project.title}
										</h4>
										<p className="text-slate-400 text-sm leading-relaxed font-normal">
											{project.desc}
										</p>
									</div>
									<div className="space-y-4">
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="text-[10px] bg-white/[0.03] px-2.5 py-0.5 rounded text-slate-400 border border-white/[0.04] font-medium tracking-wide"
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
												size={12}
												className="group-hover/link:translate-x-0.5 transition-transform"
											/>
										</a>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Innovative Contact Gateway */}
			<section id="contact" className="py-24 relative">
				<div className="container mx-auto px-6 max-w-5xl">
					<div className="grid md:grid-cols-12 gap-8 bg-white/[0.01] p-8 md:p-12 rounded-3xl border border-white/[0.04] backdrop-blur-xl items-stretch">
						{/* Left Side: Context & Copy triggers */}
						<div className="md:col-span-5 flex flex-col justify-between space-y-8">
							<div className="space-y-3">
								<span className="text-rose-400 font-semibold uppercase tracking-wider text-xs">
									03 / Connection Hub
								</span>
								<h3
									className="text-3xl md:text-4xl font-normal text-white tracking-tight"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									Let's design <br />
									something great.
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
									I'm always looking for new project collaborations, full-time
									engineering internships, or technical conversations. Let's
									make it happen.
								</p>
							</div>

							{/* Functional Interactive Copy Box */}
							<div className="space-y-4">
								<div
									onClick={handleCopyEmail}
									className="group/copy flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] cursor-pointer hover:bg-white/[0.04] hover:border-rose-500/20 transition-all"
								>
									<div className="truncate pr-3">
										<span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-0.5 font-medium">
											Direct Inbox
										</span>
										<span className="text-slate-200 text-sm font-medium tracking-wide">
											sanskriti0409@gmail.com
										</span>
									</div>
									<div className="p-2.5 rounded-lg bg-white/5 group-hover/copy:bg-rose-500/10 transition-colors shrink-0">
										{copied ? (
											<Check size={14} className="text-emerald-400" />
										) : (
											<Copy
												size={14}
												className="text-slate-400 group-hover/copy:text-rose-300"
											/>
										)}
									</div>
								</div>

								<div className="flex gap-3">
									<SocialLink
										href="https://github.com/sanskriti49"
										icon={FaGithub}
									/>
									<SocialLink
										href="https://linkedin.com/in/sanskriti-gupta-58a677274/"
										icon={FaLinkedin}
									/>
									<SocialLink
										href="https://www.instagram.com/sanskriti._4/"
										icon={FaInstagram}
									/>
									<SocialLink
										href="mailto:sanskriti0409@gmail.com"
										icon={FaRegEnvelope}
									/>
								</div>
							</div>
						</div>

						{/* Right Side: Message Simulation Workspace */}
						<div className="md:col-span-7 bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 flex flex-col justify-between space-y-6 mt-4 md:mt-0">
							<div className="space-y-4">
								<span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider block">
									Select an integration path:
								</span>

								{/* Micro-Pill choice buttons */}
								<div className="flex flex-wrap gap-2">
									{Object.keys(topicSuggestions).map((topic) => (
										<button
											key={topic}
											onClick={() => selectTopicSetting(topic)}
											className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
												selectedTopic === topic
													? "bg-white text-black font-semibold shadow-md"
													: "bg-white/5 border border-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
											}`}
										>
											{topic}
										</button>
									))}
								</div>

								{/* Simulated Notepad View area */}
								<div className="relative mt-4">
									<div className="absolute top-3 left-4 text-[10px] font-bold text-rose-400/40 uppercase tracking-widest font-mono">
										Draft Note
									</div>
									<textarea
										value={customMessage}
										onChange={(e) => setCustomMessage(e.target.value)}
										className="w-full min-h-[120px] bg-black/20 border border-white/[0.04] rounded-xl p-4 pt-8 text-sm text-slate-300 focus:outline-none focus:border-rose-500/30 resize-none leading-relaxed font-normal"
									/>
								</div>
							</div>

							{/* Live dynamic link generator dispatch */}
							<a
								href={`mailto:sanskriti0409@gmail.com?subject=${encodeURIComponent(selectedTopic)}&body=${encodeURIComponent(customMessage)}`}
								className="w-full py-3 px-5 bg-white hover:bg-rose-500 hover:text-white text-black rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md transform active:scale-[0.99]"
							>
								Launch Mail Client <Send size={12} />
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 text-center text-slate-600 text-[10px] tracking-widest uppercase border-t border-white/[0.02]">
				<p>
					&copy; {new Date().getFullYear()} Sanskriti Gupta. All Rights
					Reserved.
				</p>
			</footer>
		</div>
	);
};

// --- ROUTED VIEW: RESUME ---
const ResumeView = () => {
	const navigate = useNavigate();

	return (
		<div
			className="min-h-screen text-[#e2e8f0] p-6 flex flex-col"
			style={{ backgroundColor: "#09090D", fontFamily: "'Inter', sans-serif" }}
		>
			<div className="max-w-5xl w-full mx-auto flex flex-col flex-grow space-y-4">
				<div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
					<button
						onClick={() => navigate(-1)}
						className="cursor-pointer flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
					>
						<ArrowLeft size={14} /> Back to Portfolio
					</button>

					<div className="flex items-center gap-4">
						<span className="hidden sm:inline text-[9px] uppercase tracking-widest text-slate-500 font-medium">
							resume.pdf
						</span>
						<a
							href={resumeFile}
							download="Sanskriti_Gupta_Resume.pdf"
							className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg text-xs uppercase font-bold tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-md"
						>
							<Download size={12} /> Download PDF
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
								Your mobile browser or device doesn't support viewing embedded
								PDFs. You can easily download or view the file directly below.
							</p>
							<a
								href={resumeFile}
								target="_blank"
								rel="noreferrer"
								className="border border-white/[0.06] bg-white/[0.01] text-xs uppercase font-bold tracking-widest text-slate-300 px-5 py-3 rounded-lg hover:bg-white/[0.04] hover:text-white transition-colors flex items-center gap-2"
							>
								Open File Direct <ExternalLink size={12} />
							</a>
						</div>
					</object>
				</div>
			</div>
		</div>
	);
};

// --- APP ROUTER ---
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PortfolioMain />} />
				<Route path="/resume" element={<ResumeView />} />
			</Routes>
		</BrowserRouter>
	);
};

const SocialLink = ({ href, icon: Icon }) => (
	<motion.a
		whileHover={{ y: -2 }}
		href={href}
		target="_blank"
		rel="noreferrer"
		className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.01] border border-white/[0.04] hover:border-rose-500/20 hover:bg-white/[0.02] hover:text-rose-300 transition-all text-slate-400"
	>
		<Icon size={15} />
	</motion.a>
);

export default App;
