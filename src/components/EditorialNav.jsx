import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EditorialNav = ({ onOpenTerminal, activeSection }) => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		let isScrolled = false;
		const handleScroll = () => {
			const nextScrolled = window.scrollY > 30;
			if (nextScrolled !== isScrolled) {
				isScrolled = nextScrolled;
				setScrolled(nextScrolled);
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ label: "About", href: "#about", id: "about" },
		{ label: "Projects", href: "#projects", id: "projects" },
		{ label: "Experience", href: "#experience", id: "experience" },
		{ label: "Toolbox", href: "#toolbox", id: "toolbox" },
		{ label: "Milestones", href: "#milestones", id: "milestones" },
	];

	const handleNavClick = (e, href) => {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<header
				style={{ transform: "translateZ(0)", willChange: "transform" }}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					scrolled
						? "py-3 bg-[#07070a]/95 backdrop-blur-md border-b border-white/[0.1] shadow-2xl shadow-black/70"
						: "py-4 bg-[#07070a]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40"
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
					{/* Brand */}
					<a
						href="#cover"
						onClick={(e) => handleNavClick(e, "#cover")}
						className="group flex items-center gap-2 select-none"
					>
						<span className="font-mackinac text-xl sm:text-2xl font-bold tracking-tight text-[#f5f3ef] group-hover:text-white transition-colors">
							Sanskriti Gupta
						</span>
					</a>

					{/* Desktop nav: links in refined editorial font with animated pill */}
					<nav className="hidden lg:flex items-center gap-1 bg-[#101018]/95 border border-white/[0.12] px-3 py-1.5 rounded-full shadow-lg shadow-black/50">
						{navItems.map((item) => {
							const isActive = activeSection === item.id;
							return (
								<a
									key={item.label}
									href={item.href}
									onClick={(e) => handleNavClick(e, item.href)}
									className="relative px-4 py-1.5 rounded-full transition-colors cursor-pointer"
								>
									{isActive && (
										<motion.span
											layoutId="nav-active-pill"
											className="absolute inset-0 rounded-full bg-white/[0.14]"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 32,
											}}
										/>
									)}
									<span
										className={`relative z-10 font-editorial text-[15px] sm:text-base tracking-wide transition-colors ${
											isActive
												? "text-white font-medium"
												: "text-[#a09eab] hover:text-white"
										}`}
									>
										{item.label}
									</span>
								</a>
							);
						})}
					</nav>

					{/* Actions: High-contrast solid pills, zero washed-out transparencies */}
					<div className="hidden sm:flex items-center gap-2.5">
						<button
							onClick={onOpenTerminal}
							className="px-3.5 py-1.5 rounded-full border border-white/[0.14] bg-[#12121a] hover:bg-[#1a1a26] hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer font-editorial text-sm sm:text-base"
							title="Open Terminal (Press ⌘K or ~)"
						>
							<span className="text-emerald-400 font-mono-code text-xs font-bold">&gt;_</span>
							<span>CLI</span>
							<span className="text-xs px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 font-mono-code">
								⌘K
							</span>
						</button>

						<Link
							to="/resume"
							className="px-4 py-1.5 rounded-full border border-white/[0.14] bg-[#12121a] hover:bg-[#1a1a26] hover:border-white/[0.28] text-slate-200 hover:text-white transition-all shadow-md font-editorial text-sm sm:text-base"
						>
							Resume
						</Link>

						<a
							href="#contact"
							className="px-4 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-white text-black font-semibold font-editorial text-sm sm:text-base flex items-center gap-1.5 transition-all shadow-lg hover:scale-[1.02]"
						>
							<span>Say hi</span>
							<span className="text-sm font-sans">↗</span>
						</a>
					</div>

					{/* Mobile toggle: Sleek architectural lines instead of generic icon */}
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="lg:hidden p-2.5 text-white rounded-xl bg-[#12121a] border border-white/[0.12] flex flex-col justify-center items-center gap-1.5 w-10 h-10"
						aria-label="Toggle menu"
					>
						{mobileOpen ? (
							<span className="text-lg leading-none font-light">✕</span>
						) : (
							<>
								<span className="w-5 h-[1.5px] bg-white block" />
								<span className="w-3.5 h-[1.5px] bg-white block self-start ml-0.5" />
							</>
						)}
					</button>
				</div>
			</header>

			{/* Mobile drawer */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, y: -16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 bg-[#07070a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden"
					>
						<div className="space-y-6">
							<div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
								<span className="w-1.5 h-1.5 rounded-full bg-[#e06b75]" />
								<span className="font-editorial text-base text-[#9694a1]">
									Navigation
								</span>
							</div>

							<div className="flex flex-col gap-4">
								{navItems.map((item, idx) => (
									<a
										key={item.label}
										href={item.href}
										onClick={(e) => {
											handleNavClick(e, item.href);
											setMobileOpen(false);
										}}
										className="font-mackinac text-2xl text-[#c9c7d1] hover:text-white flex items-center justify-between transition-colors"
									>
										<span>{item.label}</span>
										<span className="font-editorial text-sm text-[#7a7888]">
											0{idx + 1}
										</span>
									</a>
								))}
							</div>
						</div>

						<div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
							<button
								onClick={() => {
									setMobileOpen(false);
									onOpenTerminal();
								}}
								className="w-full flex items-center justify-center gap-2.5 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-editorial text-base"
							>
								<span className="font-mono-code text-xs">&gt;_</span>
								<span>Open CLI terminal</span>
								<span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-mono-code">
									⌘K
								</span>
							</button>

							<div className="grid grid-cols-2 gap-3">
								<Link
									to="/resume"
									onClick={() => setMobileOpen(false)}
									className="flex items-center justify-center gap-1.5 py-3 rounded-full border border-white/[0.12] bg-[#12121a] text-slate-200 font-editorial text-base"
								>
									<span>Resume</span>
								</Link>
								<a
									href="#contact"
									onClick={() => setMobileOpen(false)}
									className="flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#f5f3ef] text-black font-semibold font-editorial text-base"
								>
									<span>Say hi</span>
									<span className="text-xs">↗</span>
								</a>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default EditorialNav;
