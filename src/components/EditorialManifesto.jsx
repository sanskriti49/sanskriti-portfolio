import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
	{ tag: "01", label: "LeetCode: 390+ solved" },
	{ tag: "02", label: "CodeVita: top 3% worldwide" },
	{ tag: "03", label: "AWS Certified Cloud Practitioner" },
	{ tag: "04", label: "Intern @ GeekyAnts" },
];

const EditorialManifesto = () => {
	const sectionRef = useRef(null);
	const quoteRef = useRef(null);

	useGSAP(
		() => {
			if (!quoteRef.current) return;

			gsap.from(quoteRef.current, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
					once: true,
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="py-28 relative overflow-hidden"
			style={{
				backgroundColor: "#08080c",
				contentVisibility: "auto",
				containIntrinsicSize: "1px 600px",
			}}
		>
			<div className="max-w-6xl mx-auto px-6">
				{/* Top divider */}
				<div className="border-t border-white/[0.08] pt-12 mb-16 flex items-center justify-between text-sm font-editorial text-slate-400">
					<span>A quick hello</span>
					<span>VIT Bhopal · CSE '27</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12 lg:gap-16 items-start">
					{/* Left: the actual words */}
					<div className="relative space-y-5">
						{/* decorative oversized quote mark, purely texture */}
						<span
							aria-hidden="true"
							className="absolute -top-14 -left-3 text-[9rem] leading-none font-mackinac text-white/[0.04] select-none pointer-events-none"
						>
							"
						</span>

						<span className="relative inline-flex items-center gap-2 text-sm font-editorial text-[#e06b75] font-semibold">
							<span className="w-1.5 h-1.5 rounded-full bg-[#e06b75]" />
							A few things about me
						</span>

						<div ref={quoteRef} className="relative space-y-4">
							<h2 className="font-mackinac text-3xl sm:text-4xl lg:text-5xl text-[#f6f5f0] leading-[1.15] font-medium tracking-tight">
								I like when buttons look pretty. I like it even more when they{" "}
								<span className="relative inline-block">
									don't fall over
									<svg
										className="absolute left-0 -bottom-1 w-full"
										height="8"
										viewBox="0 0 120 8"
										preserveAspectRatio="none"
										aria-hidden="true"
									>
										<path
											d="M2 5 Q 15 0, 30 5 T 60 5 T 90 5 T 118 5"
											fill="none"
											stroke="#e06b75"
											strokeWidth="3"
											strokeLinecap="round"
										/>
									</svg>
								</span>{" "}
								the moment real people start clicking them.
							</h2>

							<p className="font-editorial text-2xl text-slate-100 leading-relaxed font-light">
								I got into coding for the simplest reason: turning a blank
								screen into something clickable felt like a magic trick. Then I
								got nosy about what happens the split second after someone hits
								that button, and honestly, I never really left.
							</p>

							<p className="text-base sm:text-lg font-editorial text-slate-300 leading-relaxed font-normal">
								These days I build full-stack apps top to bottom. I'll happily
								tweak a hover animation until it feels just right, but I get
								just as much of a kick out of fixing a slow query, tightening up
								an API, or setting up a background worker so the app doesn't
								wheeze the moment it gets real traffic.
							</p>
						</div>
					</div>

					{/* Right: credentials, styled like a little sidebar of stickers */}
					<div className="space-y-4">
						<div
							className="rounded-2xl border-2 border-dashed border-[#10b981]/40 bg-[#0c0c14] p-6 text-center"
							style={{ transform: "rotate(-2.5deg)" }}
						>
							<div className="text-xs sm:text-sm font-editorial text-slate-300 mb-1">
								grade, for the record
							</div>
							<div className="text-4xl font-mackinac text-[#10b981] font-semibold">
								8.54
							</div>
							<div className="text-sm font-editorial text-slate-400">
								out of 10 · VIT Bhopal
							</div>
						</div>

						<div className="space-y-2">
							{credentials.map(({ tag, label }) => (
								<div
									key={label}
									className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
								>
									<span className="font-mono-code text-xs font-semibold text-[#e06b75] px-1.5 py-0.5 rounded bg-[#e06b75]/10">
										{tag}
									</span>
									<span className="text-sm sm:text-base font-editorial text-slate-200">
										{label}
									</span>
								</div>
							))}
						</div>

						<p className="text-sm font-editorial text-slate-400 leading-relaxed px-1">
							B.Tech Computer Science at VIT Bhopal (2023 - 2027), still deep in
							data structures, algorithms, and operating systems.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditorialManifesto;
