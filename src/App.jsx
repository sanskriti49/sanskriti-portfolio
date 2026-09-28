import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Critical above-the-fold components (Immediate execution for fastest LCP)
import EditorialNav from "./components/EditorialNav";
import EditorialHero from "./components/EditorialHero";
import CursorGlow from "./ui/CursorGlow";

// Code-split below-the-fold components (Lazy-loaded to minimize initial JS bundle)
const EditorialManifesto = lazy(
	() => import("./components/EditorialManifesto"),
);
const CurvedLoop = lazy(() => import("./components/CurvedLoop"));
const EditorialProjects = lazy(() => import("./components/EditorialProjects"));
const EditorialExperience = lazy(
	() => import("./components/EditorialExperience"),
);
const EditorialWorkbench = lazy(
	() => import("./components/EditorialWorkbench"),
);
const EditorialRecord = lazy(() => import("./components/EditorialRecord"));
const EditorialContact = lazy(() => import("./components/EditorialContact"));
const DevTerminal = lazy(() => import("./components/DevTerminal"));
const ResumeView = lazy(() => import("./ResumeView"));

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left pointer-events-none"
			style={{
				scaleX: scrollYProgress,
				transform: "translateZ(0)",
				willChange: "transform",
				background:
					"linear-gradient(90deg, #e06b75, #f59e0b, #38bdf8, #10b981)",
			}}
		/>
	);
};

const BackToTop = () => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		let isVis = false;
		const onScroll = () => {
			const nextVis = window.scrollY > 800;
			if (nextVis !== isVis) {
				isVis = nextVis;
				setVisible(nextVis);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 16 }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center border border-white/[0.12] bg-[#0c0c14]/90 backdrop-blur-md text-slate-300 hover:text-white hover:border-white/[0.3] transition-all shadow-xl shadow-black/80 cursor-pointer font-sans"
					aria-label="Back to top"
				>
					<span className="text-base leading-none">↑</span>
				</motion.button>
			)}
		</AnimatePresence>
	);
};

// Seamless dark fallback that guarantees ZERO white flash
const SectionFallback = () => (
	<div
		className="w-full py-20 bg-[#07070a] flex items-center justify-center"
		aria-hidden="true"
	/>
);

const PortfolioMain = () => {
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("cover");

	// Global Keyboard Shortcut: Cmd+K / Ctrl+K or backtick to toggle terminal
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setIsTerminalOpen((prev) => !prev);
			} else if (
				e.key === "`" &&
				!["INPUT", "TEXTAREA"].includes(e.target.tagName)
			) {
				e.preventDefault();
				setIsTerminalOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// High-performance IntersectionObserver for Editorial Nav (0 layout thrashing)
	useEffect(() => {
		const sectionIds = [
			"cover",
			"about",
			"projects",
			"experience",
			"toolbox",
			"milestones",
		];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-25% 0px -55% 0px",
				threshold: 0,
			},
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div
			className="min-h-screen text-[#f6f5f0] antialiased selection:bg-[#e06b75]/25 selection:text-white relative bg-[#07070a]"
			style={{ backgroundColor: "#07070a", fontFamily: "'Inter', sans-serif" }}
		>
			<CursorGlow />
			{/* <ScrollProgress /> */}
			<BackToTop />

			{/* Developer Shell Easter Egg: lazy loaded on demand */}
			{isTerminalOpen && (
				<Suspense fallback={null}>
					<DevTerminal
						isOpen={isTerminalOpen}
						onClose={() => setIsTerminalOpen(false)}
					/>
				</Suspense>
			)}

			{/* Minimal Navigation */}
			<EditorialNav
				onOpenTerminal={() => setIsTerminalOpen(true)}
				activeSection={activeSection}
			/>

			{/* Main Editorial Flow */}
			<main>
				{/* 01. Cover: Editorial Hero with Real Portrait & Parallax (Critical LCP) */}
				<EditorialHero onOpenTerminal={() => setIsTerminalOpen(true)} />

				{/* 02. Personal Manifesto: How I Think & Engineering Tenets */}
				<Suspense fallback={<SectionFallback />}>
					<EditorialManifesto />
				</Suspense>

				{/* Editorial Ribbon: Curved Loop text animation */}
				<Suspense fallback={null}>
					<CurvedLoop
						text="BUILD · BREAK · FIX · LEARN · FROM THE INTERFACE TO THE DATABASE · REPEAT · "
						speed={0.45}
						className="opacity-75 -my-4 relative z-20"
					/>
				</Suspense>

				{/* 03. Selected Works: Interactive Case Studies & Under the Hood */}
				<Suspense fallback={<SectionFallback />}>
					<EditorialProjects />
				</Suspense>

				{/* 05. Field Log: Chapters at GeekyAnts and GDG */}
				<Suspense fallback={<SectionFallback />}>
					<EditorialExperience />
				</Suspense>

				{/* 06. The Workbench: Curated Engineering Tooling & Primitives */}
				<Suspense fallback={<SectionFallback />}>
					<EditorialWorkbench />
				</Suspense>

				<Suspense fallback={<SectionFallback />}>
					<EditorialRecord />
				</Suspense>

				{/* 08. Closing Folio: Quiet Personal Contact & Dispatch */}
				<Suspense fallback={<SectionFallback />}>
					<EditorialContact onOpenTerminal={() => setIsTerminalOpen(true)} />
				</Suspense>
			</main>

			{/* Editorial Colophon & Footer */}
			<footer
				className="py-16 border-t border-white/[0.08]"
				style={{ backgroundColor: "#050508" }}
			>
				<div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="space-y-1 text-center sm:text-left">
						<span className="font-mackinac text-xl font-bold text-white block">
							Sanskriti Gupta
						</span>
						<p className="text-sm font-editorial text-slate-400">
							Full-Stack Engineer · Built with <span>{"<3"}</span> · 2026
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-editorial text-slate-300">
						<a
							href="https://leetcode.com/u/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="hover:text-white transition-colors flex items-center gap-1.5"
						>
							<span className="font-mono-code font-bold text-[#f59e0b] text-xs">
								LC
							</span>{" "}
							LeetCode
						</a>
						<a
							href="https://github.com/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="hover:text-white transition-colors flex items-center gap-1.5"
						>
							<FaGithub size={15} /> GitHub
						</a>
						<a
							href="https://linkedin.com/in/sanskriti49"
							target="_blank"
							rel="noreferrer"
							className="hover:text-white transition-colors flex items-center gap-1.5"
						>
							<FaLinkedin size={15} /> LinkedIn
						</a>
						<button
							onClick={() => setIsTerminalOpen(true)}
							className="hover:text-emerald-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
						>
							<span className="font-mono-code text-xs text-emerald-400 font-bold">
								&gt;_
							</span>{" "}
							CLI [⌘K]
						</button>
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
			<Route
				path="/resume"
				element={
					<Suspense fallback={<SectionFallback />}>
						<ResumeView />
					</Suspense>
				}
			/>
		</Routes>
	</BrowserRouter>
);

export default App;
