import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Dither from "./Dither";

const EditorialHero = ({ onOpenTerminal }) => {
	const heroRef = useRef(null);
	const photoContainerRef = useRef(null);

	// High-performance GSAP parallax with quickTo (0 React re-renders on mousemove)
	useGSAP(
		() => {
			if (!photoContainerRef.current) return;
			// Only enable mouse parallax on devices with fine pointers (non-touch)
			if (window.matchMedia("(pointer: coarse)").matches) return;

			const xToPhoto = gsap.quickTo(photoContainerRef.current, "x", {
				duration: 0.8,
				ease: "power2.out",
			});
			const yToPhoto = gsap.quickTo(photoContainerRef.current, "y", {
				duration: 0.8,
				ease: "power2.out",
			});

			const handleMouseMove = (e) => {
				const normX = (e.clientX / window.innerWidth - 0.5) * 2;
				const normY = (e.clientY / window.innerHeight - 0.5) * 2;
				xToPhoto(normX * 8);
				yToPhoto(normY * 6);
			};

			window.addEventListener("mousemove", handleMouseMove, { passive: true });
			return () => window.removeEventListener("mousemove", handleMouseMove);
		},
		{ scope: heroRef },
	);

	return (
		<section
			id="cover"
			ref={heroRef}
			className="min-h-screen relative pt-28 pb-16 overflow-hidden flex flex-col justify-between"
			style={{ backgroundColor: "#07070a" }}
		>
			{/* Fully visible Pinterest cute pastel dither background (the aesthetic you loved) */}
			<div
				className="absolute inset-0 z-0 overflow-hidden pointer-events-auto"
				style={{ transform: "translateZ(0)", willChange: "transform" }}
			>
				<Dither
					waveColor={[0.92, 0.62, 0.72]}
					backgroundColor={[0.027, 0.027, 0.039]}
					disableAnimation={false}
					enableMouseInteraction
					mouseRadius={0.35}
					colorNum={4}
					waveAmplitude={0.3}
					waveFrequency={2.8}
					waveSpeed={0.08}
					pixelSize={2.5}
				/>
			</div>

			{/* Soft top and bottom fades so navbar and next sections are 100% legible */}
			<div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#07070a] via-[#07070a]/75 to-transparent pointer-events-none z-[1]" />
			<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07070a] to-transparent pointer-events-none z-[1]" />

			{/* Unified Top Bar */}
			<div className="max-w-7xl mx-auto px-6 w-full relative z-10">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
					{/* Left Pill: Location & Education */}
					<div className="w-full sm:w-auto flex items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-[#0c0c14]/90 border border-white/[0.08] text-sm sm:text-base font-editorial text-slate-300">
						<div className="flex items-center gap-3">
							<span className="text-white font-medium">Bhopal, India</span>
							<span className="text-slate-600">·</span>
							<span className="text-slate-300">CSE '27 @ VIT Bhopal</span>
						</div>
					</div>

					{/* Right Pill: Experience & Status */}
					<div className="w-full sm:w-auto flex items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-[#0c0c14]/90 border border-white/[0.08] text-sm sm:text-base font-editorial text-slate-300">
						<div className="flex items-center gap-4 text-slate-300">
							<span>interned @ GeekyAnts</span>
							<span className="text-slate-600 hidden sm:inline">·</span>
							<span className="text-[#e06b75] hidden sm:inline font-medium">
								open for full-stack & backend roles
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main Editorial Canvas */}
			<div className="max-w-7xl mx-auto px-6 w-full py-8 lg:py-12 my-auto relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
					{/* Left: Conversational, Human Copy wrapped in gentle translucent glass */}
					<div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl bg-[#07070a]/80 border border-white/[0.08] shadow-2xl shadow-black/40">
						<div className="space-y-4">
							<span className="text-sm sm:text-base font-editorial text-[#f59e0b] block uppercase tracking-wider font-semibold">
								Full-Stack Developer & Problem Solver
							</span>

							<h2 className="font-mackinac text-3xl sm:text-4xl lg:text-5xl text-[#f6f5f0] leading-[1.1] tracking-tight font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
								I build things people see, and the{" "}
								<span className="italic font-normal text-[#e06b75]">
									stuff underneath
								</span>{" "}
								them.
							</h2>

							<p className="font-editorial text-xl sm:text-xl text-[#f1f0eb] leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
								I like making the front end pretty. But I also really like
								knowing where that request goes next: the database queries, the
								background jobs, and the edge cases waiting to happen.
							</p>

							<p className="text-base sm:text-lg font-editorial text-slate-200 leading-relaxed max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
								CS student at VIT Bhopal, previously interning at{" "}
								<strong className="text-white font-medium">GeekyAnts</strong>.
								Solved 390+ problems on LeetCode and ranked top 3% in TCS CodeVita worldwide.
								Whether it's an automated scholarship crawler or a local marketplace with spatial queries, I build systems end-to-end.
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-wrap items-center gap-4 pt-4">
							<a
								href="#projects"
								className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#f6f5f0] text-black font-semibold text-sm font-editorial uppercase tracking-wider transition-all duration-200 hover:bg-white hover:scale-[1.02] shadow-xl shadow-black/50"
							>
								<span>See what I've built</span>
								<span className="font-sans text-xs transition-transform group-hover:translate-y-0.5">
									↓
								</span>
							</a>

							<a
								href="#experience"
								className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.14] bg-[#0c0c14]/80 hover:bg-[#12121c] hover:border-white/[0.28] text-sm font-editorial uppercase tracking-wider text-slate-200 hover:text-white transition-all shadow-md"
							>
								<span>Experience & Work</span>
							</a>

							<button
								onClick={onOpenTerminal}
								className="flex items-center gap-2 px-4 py-3.5 rounded-xl border border-white/[0.14] bg-[#0c0c14]/80 hover:bg-[#12121c] hover:border-emerald-500/40 text-sm font-editorial text-slate-200 hover:text-emerald-300 transition-all cursor-pointer shadow-md"
								title="Open developer shell"
							>
								<span className="font-mono-code text-xs text-emerald-400 font-bold">&gt;_</span>
								<span className="hidden sm:inline">Shell</span>
							</button>
						</div>
					</div>

					{/* Right: Real Photograph with Editorial Frame */}
					<div className="lg:col-span-5 relative mt-6 lg:-mt-20 flex justify-center lg:justify-end">
						<div
							ref={photoContainerRef}
							className="relative w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px]"
							style={{ willChange: "transform" }}
						>
							{/* Photo Frame */}
							<div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0e0e16] shadow-2xl shadow-black/80 aspect-[5/5] group">
								<picture>
									<source type="image/webp" srcSet="/images/P3-opt.webp" />
									<img
										src="/images/P3-opt.jpg"
										alt="Sanskriti Gupta"
										width="500"
										height="488"
										fetchPriority="high"
										loading="eager"
										decoding="async"
										className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
									/>
								</picture>

								<div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-50 pointer-events-none" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Subtle Bottom Section Anchor */}
			<div className="max-w-7xl mx-auto px-6 w-full pt-2 relative z-10">
				<div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-sm font-editorial text-slate-400">
					<span>Scroll to explore ↓</span>
					<span className="text-slate-300">VIT Bhopal · 2026</span>
				</div>
			</div>
		</section>
	);
};

export default EditorialHero;
