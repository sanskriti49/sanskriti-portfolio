import { useRef } from "react";

const chapters = [
	{
		chapter: "RECENT WORK",
		company: "GeekyAnts",
		role: "Software Engineer Intern",
		period: "Jun. 2026 - Aug. 2026",
		location: "Remote / Bengaluru",
		type: "Internship",
		accentColor: "#10b981",
		narrative:
			"Worked on the core backend services for a wholesale B2B marketplace. I focused on building reliable checkout flows, real-time messaging, and making sure orders never fell into an ambiguous state.",
		milestones: [
			"Built real-time chat between buyers and suppliers using Socket.IO and Node.js.",
			"Wrote secure REST APIs in Express and PostgreSQL to handle product catalogs, bulk pricing, and UPI payments.",
			"Automated dynamic PDF invoice generation and built live order delivery tracking.",
		],
		techBehindIt: [
			"Node.js",
			"Express.js",
			"PostgreSQL",
			"Socket.IO",
			"JWT Auth",
			"REST APIs",
			"UPI & Payments",
			"PDF Invoicing",
		],
	},
	{
		chapter: "COMMUNITY & LEADERSHIP",
		company: "Google Developers Group (GDG)",
		role: "Core Technical Member & Mentor",
		period: "Nov. 2024 - Jul. 2025",
		location: "Bhopal, India",
		type: "Leadership",
		accentColor: "#e06b75",
		narrative:
			"Before building production backends, I spent time teaching and mentoring fellow students, running hands-on bootcamps and demystifying how full-stack apps work.",
		milestones: [
			"Mentored 50+ undergraduate engineering students across 3+ web development & API design bootcamps.",
			"Collaborated on full-stack REST APIs for a women's health platform.",
			"Organized technical workshops on database design, Git best practices, and writing clean code.",
		],
		techBehindIt: [
			"API Architecture",
			"System Design",
			"Technical Mentorship",
			"Community Leadership",
		],
	},
];

const EditorialExperience = () => {
	const sectionRef = useRef(null);

	return (
		<section
			id="experience"
			ref={sectionRef}
			className="py-32 relative overflow-hidden"
			style={{ backgroundColor: "#08080c" }}
		>
			<div className="max-w-7xl mx-auto px-6">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/[0.08] pb-8">
					<div className="space-y-3">
						<span className="text-sm font-editorial text-[#10b981] font-semibold block tracking-wider">
							EXPERIENCE & TEAMS
						</span>
						<h2 className="font-mackinac text-4xl sm:text-5xl lg:text-6xl text-[#f6f5f0] tracking-tight font-medium">
							Where I've been building things.
						</h2>
						<p className="font-editorial text-xl sm:text-2xl text-slate-100 max-w-2xl leading-relaxed font-light">
							The teams, projects, and people I've collaborated with. Here is what
							I actually worked on and shipped.
						</p>
					</div>

					<div className="text-sm font-editorial text-slate-300 hidden md:block">
						<span>2024 - PRESENT</span>
					</div>
				</div>

				{/* Chapters Flow */}
				<div className="space-y-20">
					{chapters.map((ch) => (
						<div
							key={ch.company}
							className="relative border-t border-white/[0.08] pt-10"
						>
							<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
								{/* Left: Role and company info */}
								<div className="lg:col-span-4 space-y-3">
									<div className="flex items-center gap-2 text-sm font-editorial">
										<span
											className="font-bold uppercase tracking-wider"
											style={{ color: ch.accentColor }}
										>
											{ch.chapter}
										</span>
										<span className="text-slate-600">·</span>
										<span className="text-slate-400 uppercase tracking-wider">
											{ch.type}
										</span>
									</div>

									<h3 className="font-mackinac text-3xl sm:text-4xl text-white font-bold tracking-tight">
										{ch.company}
									</h3>

									<p className="text-base sm:text-lg font-editorial text-slate-200">
										{ch.role}
									</p>

									<div className="space-y-1.5 text-sm font-editorial text-slate-300 pt-2 border-t border-white/[0.06]">
										<div className="flex items-center gap-2">
											<span className="text-slate-500 uppercase tracking-wider text-xs">Timeline:</span>
											<span className="text-slate-200">{ch.period}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-slate-500 uppercase tracking-wider text-xs">Based:</span>
											<span className="text-slate-200">{ch.location}</span>
										</div>
									</div>
								</div>

								{/* Right: Narrative & Milestones */}
								<div className="lg:col-span-8 space-y-5">
									<p className="font-editorial text-xl text-slate-100 leading-relaxed font-light">
										{ch.narrative}
									</p>

									{/* Milestones */}
									<div className="space-y-2.5">
										<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
											WHAT I SHIPPED & LEARNED
										</span>

										<div className="space-y-2.5">
											{ch.milestones.map((m, mIdx) => (
												<div
													key={mIdx}
													className="p-4 rounded-xl border border-white/[0.06] bg-[#0c0c14]/70 flex items-start gap-3.5 text-sm sm:text-base font-editorial text-slate-200 leading-relaxed group"
												>
													<span
														className="font-mono-code text-xs font-semibold shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.04]"
														style={{ color: ch.accentColor }}
													>
														0{mIdx + 1}
													</span>
													<span>{m}</span>
												</div>
											))}
										</div>
									</div>

									{/* Tech Behind It */}
									<div className="pt-2">
										<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block mb-2">
											Tech behind it
										</span>
										<div className="flex flex-wrap gap-2">
											{ch.techBehindIt.map((t) => (
												<span
													key={t}
													className="text-sm font-editorial px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-slate-200"
												>
													{t}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EditorialExperience;
