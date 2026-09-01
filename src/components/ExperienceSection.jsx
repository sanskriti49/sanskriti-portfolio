import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Calendar,
	MapPin,
	ChevronDown,
	Building2,
	Users,
	Sparkles,
	CheckCircle2,
} from "lucide-react";

const experiences = [
	{
		role: "Software Engineer Intern",
		company: "GeekyAnts",
		period: "Jun. 2026 – Aug. 2026",
		location: "Remote",
		type: "Engineering Internship",
		badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
		lineAccent: "#10b981",
		icon: Building2,
		summary:
			"Engineered scalable core services for a high-volume B2B wholesale marketplace, delivering real-time buyer-supplier communication and automated GST invoicing.",
		bullets: [
			"Engineered a B2B wholesale marketplace with product discovery, bulk pricing tiers, inventory tracking, order lifecycles, UPI payments, and GST invoicing.",
			"Built real-time buyer–supplier messaging using Socket.IO and architected secure role-based REST APIs with Node.js, Express.js, JWT, and PostgreSQL.",
			"Implemented end-to-end order management, real-time inventory synchronization, dynamic PDF invoice generation, and live driver tracking for delivery logistics.",
		],
		technologies: [
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
		role: "Core Technical Member",
		company: "Google Developers Group (GDG)",
		period: "Nov. 2024 – Jul. 2025",
		location: "Bhopal, India",
		type: "Technical Leadership",
		badgeColor: "text-rose-400 border-rose-500/20 bg-rose-500/10",
		lineAccent: "#f43f5e",
		icon: Users,
		summary:
			"Spearheaded technical bootcamps, mentored 50+ undergraduate engineers, and engineered full-stack healthcare platforms while exploring agentic AI workflows.",
		bullets: [
			"Conducted 3+ hands-on web development & API architecture bootcamps, mentoring 50+ engineering undergraduates on modern full-stack workflows.",
			"Collaborated on full-stack REST API development for a women's health platform and authored comprehensive technical articles on Agentic AI workflows.",
			"Organized developer workshops on system design fundamentals, database modeling, and open-source contribution best practices.",
		],
		technologies: [
			"Full-Stack Architecture",
			"API Design",
			"Agentic AI",
			"Developer Mentorship",
			"Community Leadership",
		],
	},
];

const ExperienceSection = () => {
	const [expandedIdx, setExpandedIdx] = useState(0);

	return (
		<section
			id="experience"
			className="py-24 relative"
			style={{ backgroundColor: "#08080C" }}
		>
			<div className="container mx-auto px-6 max-w-6xl">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5">
							<Sparkles size={12} /> 02 / Experience & Leadership
						</span>
						<h3
							className="text-3xl sm:text-4xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Where I've Built & Led
						</h3>
					</motion.div>
					<p className="text-slate-400 text-sm max-w-md">
						Hands-on industry engineering internship experience paired with
						developer community mentorship and production system architectures.
					</p>
				</div>

				{/* Timeline Container */}
				<div className="relative border-l border-white/[0.06] ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
					{experiences.map((exp, idx) => {
						const isExpanded = expandedIdx === idx;
						const IconComponent = exp.icon;

						return (
							<motion.div
								key={exp.company}
								initial={{ opacity: 0, x: -16 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1, duration: 0.4 }}
								className="relative group"
							>
								{/* Node marker */}
								<div
									className="absolute -left-[31px] md:-left-[47px] top-6 w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-[#0C0C14] transition-all duration-300 group-hover:scale-110 shadow-lg"
									style={{
										borderColor: isExpanded ? exp.lineAccent : "rgba(255,255,255,0.1)",
									}}
								>
									<IconComponent
										size={13}
										style={{
											color: isExpanded ? exp.lineAccent : "#94a3b8",
										}}
									/>
								</div>

								{/* Main Card */}
								<div
									onClick={() => setExpandedIdx(isExpanded ? null : idx)}
									className="p-6 sm:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300 cursor-pointer backdrop-blur-sm"
								>
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
										<div>
											<div className="flex items-center gap-3 flex-wrap">
												<h4
													className="text-xl sm:text-2xl font-bold text-white tracking-tight"
													style={{ fontFamily: "'P22Mackinac', sans-serif" }}
												>
													{exp.role}
												</h4>
												<span
													className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${exp.badgeColor}`}
												>
													{exp.company}
												</span>
											</div>
											<p className="text-xs text-slate-400 mt-1 flex items-center gap-4 flex-wrap">
												<span className="flex items-center gap-1.5 text-slate-300">
													<Calendar size={12} className="text-slate-500" />
													{exp.period}
												</span>
												<span className="flex items-center gap-1.5 text-slate-400">
													<MapPin size={12} className="text-slate-500" />
													{exp.location}
												</span>
												<span className="text-[10px] uppercase tracking-widest text-slate-500">
													{exp.type}
												</span>
											</p>
										</div>

										<motion.button
											animate={{ rotate: isExpanded ? 180 : 0 }}
											transition={{ duration: 0.2 }}
											className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white shrink-0 self-end sm:self-center"
											aria-label="Toggle details"
										>
											<ChevronDown size={14} />
										</motion.button>
									</div>

									<p className="text-slate-300 text-sm leading-relaxed mb-4">
										{exp.summary}
									</p>

									{/* Expandable Bullet Points */}
									<AnimatePresence initial={false}>
										{isExpanded && (
											<motion.div
												key="content"
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
												className="overflow-hidden"
											>
												<ul className="space-y-3 pt-2 pb-4 border-t border-white/[0.04]">
													{exp.bullets.map((bullet, bIdx) => (
														<li
															key={bIdx}
															className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed"
														>
															<CheckCircle2
																size={14}
																className="shrink-0 mt-0.5"
																style={{ color: exp.lineAccent }}
															/>
															<span>{bullet}</span>
														</li>
													))}
												</ul>
											</motion.div>
										)}
									</AnimatePresence>

									{/* Tech Pills */}
									<div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.03]">
										{exp.technologies.map((tech) => (
											<span
												key={tech}
												className="text-[10px] px-2.5 py-1 rounded-md border border-white/[0.04] bg-white/[0.02] text-slate-400 font-medium hover:text-slate-200 hover:border-white/[0.08] transition-colors"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ExperienceSection;
