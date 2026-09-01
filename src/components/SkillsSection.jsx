import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Code2,
	Layout,
	Server,
	Database,
	Cloud,
	BookOpen,
	Sparkles,
	Check,
} from "lucide-react";

const skillCategories = [
	{
		id: "all",
		label: "All Tech",
		icon: Sparkles,
	},
	{
		id: "languages",
		label: "Languages",
		icon: Code2,
	},
	{
		id: "frontend",
		label: "Frontend",
		icon: Layout,
	},
	{
		id: "backend",
		label: "Backend & Realtime",
		icon: Server,
	},
	{
		id: "databases",
		label: "Databases & Cache",
		icon: Database,
	},
	{
		id: "cloud",
		label: "Cloud & DevOps",
		icon: Cloud,
	},
	{
		id: "coursework",
		label: "Core CS",
		icon: BookOpen,
	},
];

const allSkills = [
	// Languages
	{
		name: "Java",
		category: "languages",
		level: "Advanced",
		color: "text-amber-400",
		border: "border-amber-500/20",
	},
	{
		name: "JavaScript (ES6+)",
		category: "languages",
		level: "Proficient",
		color: "text-yellow-400",
		border: "border-yellow-500/20",
	},
	{
		name: "SQL",
		category: "languages",
		level: "Advanced",
		color: "text-cyan-400",
		border: "border-cyan-500/20",
	},
	{
		name: "HTML5 & CSS3",
		category: "languages",
		level: "Expert",
		color: "text-orange-400",
		border: "border-orange-500/20",
	},

	// Frontend
	{
		name: "React.js (v19)",
		category: "frontend",
		level: "Advanced",
		color: "text-cyan-400",
		border: "border-cyan-500/20",
	},
	{
		name: "Next.js",
		category: "frontend",
		level: "Proficient",
		color: "text-slate-200",
		border: "border-slate-500/20",
	},
	{
		name: "Redux Toolkit",
		category: "frontend",
		level: "Proficient",
		color: "text-purple-400",
		border: "border-purple-500/20",
	},
	{
		name: "Zustand",
		category: "frontend",
		level: "Proficient",
		color: "text-amber-300",
		border: "border-amber-500/20",
	},
	{
		name: "Tailwind CSS",
		category: "frontend",
		level: "Expert",
		color: "text-sky-400",
		border: "border-sky-500/20",
	},
	{
		name: "Framer Motion",
		category: "frontend",
		level: "Advanced",
		color: "text-pink-400",
		border: "border-pink-500/20",
	},

	// Backend
	{
		name: "Node.js",
		category: "backend",
		level: "Advanced",
		color: "text-emerald-400",
		border: "border-emerald-500/20",
	},
	{
		name: "Express.js",
		category: "backend",
		level: "Advanced",
		color: "text-slate-300",
		border: "border-slate-500/20",
	},
	{
		name: "REST APIs",
		category: "backend",
		level: "Expert",
		color: "text-rose-400",
		border: "border-rose-500/20",
	},
	{
		name: "WebSockets (Socket.IO)",
		category: "backend",
		level: "Advanced",
		color: "text-indigo-400",
		border: "border-indigo-500/20",
	},
	{
		name: "JWT Authentication",
		category: "backend",
		level: "Advanced",
		color: "text-teal-400",
		border: "border-teal-500/20",
	},

	// Databases
	{
		name: "PostgreSQL",
		category: "databases",
		level: "Advanced",
		color: "text-blue-400",
		border: "border-blue-500/20",
	},
	{
		name: "MongoDB",
		category: "databases",
		level: "Proficient",
		color: "text-green-400",
		border: "border-green-500/20",
	},
	{
		name: "Redis & Pub/Sub",
		category: "databases",
		level: "Advanced",
		color: "text-rose-400",
		border: "border-rose-500/20",
	},

	// Cloud & Tools
	{
		name: "AWS (EC2, S3)",
		category: "cloud",
		level: "AWS Certified",
		color: "text-amber-400",
		border: "border-amber-500/20",
	},
	{
		name: "Docker",
		category: "cloud",
		level: "Proficient",
		color: "text-blue-400",
		border: "border-blue-500/20",
	},
	{
		name: "Terraform",
		category: "cloud",
		level: "Working Knowledge",
		color: "text-purple-400",
		border: "border-purple-500/20",
	},
	{
		name: "Git & GitHub",
		category: "cloud",
		level: "Advanced",
		color: "text-slate-200",
		border: "border-slate-500/20",
	},
	{
		name: "GitHub Actions (CI/CD)",
		category: "cloud",
		level: "Proficient",
		color: "text-emerald-400",
		border: "border-emerald-500/20",
	},
	{
		name: "Postman",
		category: "cloud",
		level: "Advanced",
		color: "text-orange-400",
		border: "border-orange-500/20",
	},

	// Core CS
	{
		name: "Data Structures & Algorithms",
		category: "coursework",
		level: "Top 3% CodeVita",
		color: "text-rose-400",
		border: "border-rose-500/20",
	},
	{
		name: "Object-Oriented Programming (OOP)",
		category: "coursework",
		level: "Core Strong",
		color: "text-teal-400",
		border: "border-teal-500/20",
	},
	{
		name: "Database Management Systems (DBMS)",
		category: "coursework",
		level: "Core Strong",
		color: "text-cyan-400",
		border: "border-cyan-500/20",
	},
	{
		name: "Operating Systems",
		category: "coursework",
		level: "Core Strong",
		color: "text-indigo-400",
		border: "border-indigo-500/20",
	},
];

const SkillsSection = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const filteredSkills =
		activeCategory === "all"
			? allSkills
			: allSkills.filter((s) => s.category === activeCategory);

	return (
		<section
			id="skills"
			className="py-24 relative"
			style={{ backgroundColor: "#08080C" }}
		>
			<div className="container mx-auto px-6 max-w-6xl">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<span className="text-cyan-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5">
							<Sparkles size={12} /> 05 / Technical Stack
						</span>
						<h3
							className="text-3xl sm:text-4xl font-normal mt-2 text-white tracking-tight"
							style={{ fontFamily: "'P22Mackinac', sans-serif" }}
						>
							Core Competencies & Stack
						</h3>
					</motion.div>
				</div>

				{/* Filter Tabs */}
				<div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
					{skillCategories.map((cat) => {
						const Icon = cat.icon;
						const isActive = activeCategory === cat.id;
						return (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
									isActive
										? "bg-white text-black border-white shadow-lg"
										: "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white hover:bg-white/[0.05]"
								}`}
							>
								<Icon
									size={13}
									className={isActive ? "text-black" : "text-slate-400"}
								/>
								{cat.label}
							</button>
						);
					})}
				</div>

				{/* Skills Grid */}
				<motion.div
					layout
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
				>
					<AnimatePresence>
						{filteredSkills.map((skill) => (
							<motion.div
								layout
								key={skill.name}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.2 }}
								whileHover={{ y: -3 }}
								className={`p-4 rounded-xl border ${skill.border} bg-white/[0.015] hover:bg-white/[0.03] backdrop-blur-sm transition-all duration-200 flex flex-col justify-between group`}
							>
								<div className="flex items-center justify-between gap-1 mb-2">
									<span
										className={`text-sm font-semibold text-slate-200 group-hover:text-white transition-colors`}
									>
										{skill.name}
									</span>
								</div>
								<span
									className={`text-[10px] uppercase tracking-wider font-mono font-medium ${skill.color}`}
								>
									{skill.level}
								</span>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default SkillsSection;
