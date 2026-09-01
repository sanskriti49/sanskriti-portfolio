import { motion } from "framer-motion";
import {
	Award,
	Trophy,
	GraduationCap,
	ExternalLink,
	ShieldCheck,
	Sparkles,
	Code2,
} from "lucide-react";

const achievements = [
	{
		title: "AWS Certified Cloud Practitioner",
		issuer: "Amazon Web Services (AWS)",
		category: "Cloud Certification",
		date: "Verified Credential",
		description:
			"Demonstrated foundational understanding of AWS cloud services, security architectures, compute/storage primitives (EC2, S3), and cost optimization principles.",
		icon: ShieldCheck,
		accent: "from-amber-500/20 to-orange-500/10",
		borderColor: "hover:border-amber-500/40",
		textColor: "text-amber-400",
		badge: "Official AWS Credential",
		metrics: "Cloud Architecture & Security",
	},
	{
		title: "TCS CodeVita — Global Top 3%",
		issuer: "Tata Consultancy Services",
		category: "Competitive Programming",
		date: "Worldwide Contest",
		description:
			"Ranked in the Top 3% globally (Rank 10,298 / 350,000+ registered participants worldwide) in one of the world's largest competitive coding contests.",
		icon: Trophy,
		accent: "from-rose-500/20 to-pink-500/10",
		borderColor: "hover:border-rose-500/40",
		textColor: "text-rose-400",
		badge: "Top 3% Worldwide",
		metrics: "Rank 10,298 / 350,000+",
	},
	{
		title: "VIT Bhopal University CSE",
		issuer: "B.Tech Computer Science & Engineering",
		category: "Academic Excellence",
		date: "2023 – 2027",
		description:
			"Maintaining an 8.54 / 10 CGPA with rigorous coursework in Data Structures & Algorithms, Object-Oriented Programming, DBMS, and Operating Systems.",
		icon: GraduationCap,
		accent: "from-emerald-500/20 to-teal-500/10",
		borderColor: "hover:border-emerald-500/40",
		textColor: "text-emerald-400",
		badge: "CGPA: 8.54 / 10",
		metrics: "Computer Science & Engg",
	},
];

const AchievementsSection = () => {
	return (
		<section
			id="achievements"
			className="py-24 relative"
			style={{ backgroundColor: "#08080C" }}
		>
			<div className="container mx-auto px-6 max-w-6xl">
				{/* Section Header */}
				<div className="mb-12">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5">
							<Sparkles size={12} /> 04 / Honors & Certifications
						</span>
						<h3
							className="text-3xl sm:text-4xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Certifications & Milestones
						</h3>
					</motion.div>
				</div>

				{/* Cards Grid */}
				<div className="grid md:grid-cols-3 gap-6">
					{achievements.map((item, idx) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.12, duration: 0.4 }}
								whileHover={{ y: -4 }}
								className={`relative group rounded-2xl p-7 border border-white/[0.07] bg-gradient-to-b ${item.accent} ${item.borderColor} transition-all duration-300 backdrop-blur-sm flex flex-col justify-between`}
							>
								{/* Top Header */}
								<div>
									<div className="flex items-center justify-between gap-2 mb-4">
										<div
											className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] ${item.textColor}`}
										>
											<Icon size={20} />
										</div>
										<span
											className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/[0.1] bg-black/50 ${item.textColor}`}
										>
											{item.badge}
										</span>
									</div>

									<span className="text-[11px] font-medium uppercase tracking-wider text-slate-300 block mb-1.5">
										{item.category} <span className="text-slate-500">·</span> {item.issuer}
									</span>

									<h4
										className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3"
										style={{ fontFamily: "'P22Mackinac', sans-serif" }}
									>
										{item.title}
									</h4>

									<p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed">
										{item.description}
									</p>
								</div>

								{/* Bottom Tag */}
								<div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
									<span className="text-[11px] font-mono text-slate-300">
										{item.metrics}
									</span>
									<span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
										{item.date}
									</span>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AchievementsSection;
