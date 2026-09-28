import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
	motion,
	AnimatePresence,
	useScroll,
	useReducedMotion,
} from "framer-motion";

/*
  Design notes
  - Mark: the slashed "S" (public/images/logo-s.png) is used as a CSS mask, so it
    takes whatever text colour you give it (currentColor).
  - The 4-point sparkle from the logo is the active-section marker. It glides
    between links (shared layoutId) instead of a generic highlight pill.
  - A rose hairline along the bottom edge fills with scroll progress.
  - The bar leaves when you scroll down and returns the moment you scroll up.
  - One solid button ("Say hi"). Everything else is quiet text.
*/

const navItems = [
	{ label: "About", id: "about" },
	{ label: "Projects", id: "projects" },
	{ label: "Experience", id: "experience" },
	{ label: "Toolbox", id: "toolbox" },
	{ label: "Milestones", id: "milestones" },
];

const maskStyle = {
	WebkitMaskImage: "url(/images/logo-s.png)",
	maskImage: "url(/images/logo-s.png)",
	WebkitMaskSize: "contain",
	maskSize: "contain",
	WebkitMaskRepeat: "no-repeat",
	maskRepeat: "no-repeat",
	WebkitMaskPosition: "center",
	maskPosition: "center",
};

const Mark = ({ className = "" }) => (
	<span
		aria-hidden="true"
		className={`block bg-current ${className}`}
		style={maskStyle}
	/>
);

const Sparkle = ({ className = "" }) => (
	<svg
		viewBox="0 0 24 24"
		aria-hidden="true"
		className={`fill-current ${className}`}
	>
		<path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z" />
	</svg>
);

const focusRing =
	"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e06b75]/80 rounded-sm";

const EditorialNav = ({ onOpenTerminal, activeSection }) => {
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [modKey, setModKey] = useState("⌘K");
	const lastY = useRef(0);
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll();

	// Show Ctrl K on Windows/Linux, ⌘K on Apple devices
	useEffect(() => {
		const ua = navigator.userAgent || "";
		if (!/Mac|iPhone|iPad/i.test(ua)) setModKey("Ctrl K");
	}, []);

	// Scrolled state + hide on scroll down / show on scroll up
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 30);
			if (y > lastY.current + 4 && y > 400) setHidden(true);
			else if (y < lastY.current - 4 || y <= 400) setHidden(false);
			lastY.current = y;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Mobile menu: lock scroll, close on Escape, close when resized to desktop
	useEffect(() => {
		if (!mobileOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
		const mq = window.matchMedia("(min-width: 1024px)");
		const onMq = () => mq.matches && setMobileOpen(false);
		window.addEventListener("keydown", onKey);
		mq.addEventListener("change", onMq);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
			mq.removeEventListener("change", onMq);
		};
	}, [mobileOpen]);

	const goTo = (e, id) => {
		e.preventDefault();
		document
			.getElementById(id)
			?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
	};

	const sparkTransition = reduceMotion
		? { duration: 0 }
		: { type: "spring", stiffness: 420, damping: 30 };

	const visible = !hidden || mobileOpen;

	return (
		<>
			<header
				onFocusCapture={() => setHidden(false)}
				className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
					visible ? "translate-y-0" : "-translate-y-full"
				} ${
					scrolled && !mobileOpen
						? "bg-[#07070a]/80 backdrop-blur-xl border-b border-white/[0.06]"
						: "bg-transparent border-b border-transparent"
				}`}
			>
				<div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-6 lg:grid-cols-[1fr_auto_1fr]">
					{/* Brand: mark always, name folds away once you're into the page */}
					<a
						href="#cover"
						onClick={(e) => {
							goTo(e, "cover");
							setMobileOpen(false);
						}}
						aria-label="Sanskriti Gupta, back to top"
						className={`group flex w-fit items-center gap-3 text-[#f5f3ef] ${focusRing}`}
					>
						<Mark className="h-9 w-9 transition-colors duration-300 group-hover:text-[#e06b75]" />
						<motion.span
							initial={false}
							animate={{
								width: scrolled ? 0 : "auto",
								opacity: scrolled ? 0 : 1,
							}}
							transition={{
								duration: reduceMotion ? 0 : 0.35,
								ease: [0.4, 0, 0.2, 1],
							}}
							className="hidden overflow-hidden whitespace-nowrap pr-1 font-editorial text-[1.7rem] font-semibold italic leading-none tracking-normal sm:block"
						>
							Sanskriti
						</motion.span>
					</a>

					{/* Desktop links: plain text, the sparkle marks where you are */}
					<nav
						aria-label="Sections"
						className="hidden items-center gap-9 lg:flex "
					>
						{navItems.map((item) => {
							const isActive = activeSection === item.id;
							return (
								<a
									key={item.id}
									href={`#${item.id}`}
									onClick={(e) => goTo(e, item.id)}
									aria-current={isActive ? "true" : undefined}
									className={`group relative py-2 font-serif  font-editorial text-[17px] transition-colors ${focusRing} ${
										isActive
											? "text-[#f5f3ef]"
											: "text-[#a09eab] hover:text-[#f5f3ef]"
									}`}
								>
									{item.label}
									{!isActive && (
										<span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-300 group-hover:scale-x-100" />
									)}
									{isActive && (
										<motion.span
											layoutId="nav-sparkle"
											transition={sparkTransition}
											className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[#e06b75]"
										>
											<Sparkle className="h-2.5 w-2.5" />
										</motion.span>
									)}
								</a>
							);
						})}
					</nav>

					{/* Actions */}
					<div className="hidden items-center gap-6 justify-self-end lg:flex">
						<button
							onClick={onOpenTerminal}
							title={`Open shell (${modKey} or ~)`}
							className={`group flex cursor-pointer items-center gap-2.5 border-b border-white/[0.16] pb-1 text-slate-300 transition-colors hover:border-emerald-400/60 hover:text-white ${focusRing}`}
						>
							<span className="font-mono-code text-xs font-bold text-emerald-400">
								&gt;_
							</span>
							<span className="font-editorial text-base">Shell</span>
							<kbd className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono-code text-[11px] text-slate-300">
								{modKey}
							</kbd>
						</button>

						<Link
							to="/resume"
							className={`font-editorial text-base text-slate-300 underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-white hover:decoration-white/60 ${focusRing}`}
						>
							Resume
						</Link>

						<a
							href="#contact"
							onClick={(e) => goTo(e, "contact")}
							className="rounded-full bg-[#f5f3ef] px-5 py-2 font-editorial text-base font-semibold text-black transition-colors hover:bg-[#e06b75] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e06b75]"
						>
							Say hi
						</a>
					</div>

					{/* Mobile toggle: two lines that fold into a cross */}
					<button
						onClick={() => setMobileOpen((o) => !o)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
						aria-controls="mobile-menu"
						className={`relative h-11 w-11 justify-self-end text-[#f5f3ef] lg:hidden ${focusRing}`}
					>
						<span
							className={`absolute left-1/2 top-1/2 h-[1.5px] -translate-x-1/2 bg-current transition-all duration-300 ${
								mobileOpen
									? "w-6 translate-y-0 rotate-45"
									: "w-6 -translate-y-[5px]"
							}`}
						/>
						<span
							className={`absolute left-1/2 top-1/2 h-[1.5px] -translate-x-1/2 bg-current transition-all duration-300 ${
								mobileOpen
									? "w-6 translate-y-0 -rotate-45"
									: "w-3.5 translate-x-[-3px] translate-y-[4px]"
							}`}
						/>
					</button>
				</div>

				{/* Scroll thread */}
				<motion.div
					aria-hidden="true"
					style={{ scaleX: scrollYProgress }}
					className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#e06b75]"
				/>
			</header>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						id="mobile-menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-[#07070a] px-8 pb-8 pt-28 lg:hidden"
					>
						{/* The mark, oversized and barely there */}
						<Mark className="pointer-events-none absolute -bottom-16 -right-20 h-[26rem] w-[26rem] text-[#e06b75] opacity-[0.07]" />

						<nav aria-label="Sections" className="relative flex flex-col gap-1">
							{navItems.map((item, i) => {
								const isActive = activeSection === item.id;
								return (
									<motion.a
										key={item.id}
										href={`#${item.id}`}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: reduceMotion ? 0 : 0.05 + i * 0.05,
											duration: reduceMotion ? 0 : 0.35,
											ease: "easeOut",
										}}
										onClick={(e) => {
											goTo(e, item.id);
											setMobileOpen(false);
										}}
										aria-current={isActive ? "true" : undefined}
										className={`flex items-center gap-3 py-2.5 font-mackinac text-4xl tracking-tight ${focusRing} ${
											isActive ? "text-[#f5f3ef]" : "text-[#8f8d9b]"
										}`}
									>
										<span className="flex h-4 w-4 shrink-0 items-center justify-center text-[#e06b75]">
											{isActive && <Sparkle className="h-3.5 w-3.5" />}
										</span>
										{item.label}
									</motion.a>
								);
							})}
						</nav>

						<div className="relative flex flex-col gap-3">
							<button
								onClick={() => {
									setMobileOpen(false);
									onOpenTerminal();
								}}
								className="flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-500/30 py-3 font-editorial text-lg text-emerald-300"
							>
								<span className="font-mono-code text-xs font-bold">&gt;_</span>
								Open shell
							</button>
							<div className="grid grid-cols-2 gap-3">
								<Link
									to="/resume"
									onClick={() => setMobileOpen(false)}
									className="flex items-center justify-center rounded-full border border-white/[0.14] py-3 font-editorial text-lg text-slate-200"
								>
									Resume
								</Link>
								<a
									href="#contact"
									onClick={(e) => {
										goTo(e, "contact");
										setMobileOpen(false);
									}}
									className="flex items-center justify-center rounded-full bg-[#f5f3ef] py-3 font-editorial text-lg font-semibold text-black"
								>
									Say hi
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
