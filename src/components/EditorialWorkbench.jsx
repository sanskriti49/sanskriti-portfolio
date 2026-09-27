import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FaultyTerminal from "./FaultyTerminal";

const toolCategories = [
	{
		id: "build",
		title: "Build",
		subtitle: "Creating apps & APIs",
		accent: "#38bdf8",
		tools: [
			{
				name: "Node.js & Express",
				note: "My default runtime for building quick, reliable REST services.",
			},
			{
				name: "React",
				note: "Clean, reactive interfaces with optimistic state.",
			},
			{
				name: "Next.js",
				note: "Server-side rendering, SEO, and fast full-stack pages.",
			},
			{
				name: "JavaScript",
				note: "Type safety and modern ES6+ features.",
			},
			{
				name: "Tailwind CSS",
				note: "Fast layout, responsive spacing, consistent design.",
			},
		],
	},
	{
		id: "data",
		title: "Data",
		subtitle: "Storing & finding information",
		accent: "#10b981",
		tools: [
			{
				name: "PostgreSQL",
				note: "My favorite relational database for structured data and complex queries.",
			},
			{
				name: "PostGIS",
				note: "Spatial indexing that makes location and radius queries fast.",
			},
			{
				name: "MongoDB",
				note: "Flexible document store for scrapers and unstructured data.",
			},
			{ name: "Redis", note: "In-memory caching and sub-8ms reads." },
		],
	},
	{
		id: "realtime",
		title: "Realtime",
		subtitle: "Live updates & sockets",
		accent: "#f59e0b",
		tools: [
			{
				name: "Socket.IO",
				note: "Bidirectional events for live chat and notifications.",
			},
			{
				name: "WebSockets",
				note: "Low-latency connections between client and server.",
			},
			{
				name: "Redis Pub/Sub",
				note: "Broadcasting messages across multiple server instances.",
			},
		],
	},
	{
		id: "background",
		title: "Background work",
		subtitle: "Queues & workers",
		accent: "#e06b75",
		tools: [
			{
				name: "BullMQ",
				note: "Background jobs with automatic retries and deduplication.",
			},
			{
				name: "Task scheduling",
				note: "Cron jobs, periodic scrapers, delayed email alerts.",
			},
			{
				name: "Playwright",
				note: "Headless browser automation and change tracking.",
			},
		],
	},
	{
		id: "cloud",
		title: "Cloud",
		subtitle: "Hosting & containers",
		accent: "#a855f7",
		tools: [
			{
				name: "AWS S3",
				note: "File storage with presigned URLs for direct browser uploads.",
			},
			{
				name: "AWS EC2",
				note: "Virtual cloud servers for production workloads.",
			},
			{
				name: "Docker",
				note: "Containerizing apps so they run identically everywhere.",
			},
			{
				name: "GitHub Actions",
				note: "Automated linting, testing, and deployment on every push.",
			},
		],
	},
	{
		id: "core",
		title: "Core CS",
		subtitle: "Computer science fundamentals",
		accent: "#34d399",
		tools: [
			{
				name: "Data structures & algorithms",
				note: "390+ LeetCode problems solved; graph traversal, dynamic programming, sliding windows.",
			},
			{
				name: "DBMS fundamentals",
				note: "ACID transactions, B-tree indexes, normalization.",
			},
			{
				name: "Operating systems",
				note: "Process concurrency, thread scheduling, memory models.",
			},
			{
				name: "Object-oriented design",
				note: "Clean code principles, modular components, testability.",
			},
		],
	},
];

const EditorialWorkbench = () => {
	const [activeId, setActiveId] = useState("build");
	const currentCategory =
		toolCategories.find((c) => c.id === activeId) || toolCategories[0];

	return (
		<section
			id="toolbox"
			className="py-32 relative overflow-hidden"
			style={{
				backgroundColor: "#060609",
				contentVisibility: "auto",
				containIntrinsicSize: "1px 900px",
			}}
		>
			{/* Faulty Terminal from React Bits: vibrant visibility, tinted dynamically per active category */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-[0.62] transition-opacity duration-500">
				<FaultyTerminal
					scale={1.5}
					gridMul={[2, 1]}
					digitSize={1.2}
					timeScale={0.35}
					pause={false}
					scanlineIntensity={0.35}
					glitchAmount={0.5}
					flickerAmount={0.25}
					noiseAmp={0.6}
					chromaticAberration={0}
					dither={0}
					curvature={0.1}
					tint={currentCategory.accent}
					mouseReact={false}
					mouseStrength={0.2}
					pageLoadAnimation={false}
					brightness={1.0}
					dpr={0.75}
				/>
				{/* Top and bottom gradient masks for a smooth handoff into the
				    sections above and below */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(180deg, #060609 0%, transparent 20%, transparent 80%, #060609 100%)",
					}}
				/>
			</div>

			{/* Localized vignette keeps the header legible over the effect */}
			<div
				className="absolute inset-0 pointer-events-none z-[1]"
				style={{
					background:
						"radial-gradient(ellipse 70% 60% at 30% 25%, rgba(6, 6, 9, 0.72) 0%, transparent 100%)",
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				{/* Section header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
					<div className="space-y-4 max-w-2xl">
						<div className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
							<span className="text-base font-medium text-[#38bdf8]">
								The toolbox
							</span>
						</div>
						<h2 className="font-mackinac text-4xl sm:text-5xl lg:text-6xl text-[#f5f3ef] tracking-tight font-medium">
							Things I like reaching for.
						</h2>
						<p className="font-editorial text-xl sm:text-2xl text-[#d5d3db] leading-relaxed font-light">
							Not a decorative buzzword list: this is what I actually reach for
							on a daily basis to build and ship software.
						</p>
					</div>
					<div className="text-base text-[#8f8d9c] hidden md:block font-editorial">
						Organized by purpose
					</div>
				</div>

				{/* Tabs with a sliding pill indicator */}
				<div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-10 scrollbar-none">
					{toolCategories.map((cat) => {
						const isSelected = activeId === cat.id;
						return (
							<button
								key={cat.id}
								onClick={() => setActiveId(cat.id)}
								className="relative px-4 py-2.5 rounded-full text-base whitespace-nowrap transition-colors cursor-pointer"
							>
								{isSelected && (
									<motion.span
										layoutId="active-tab-pill"
										className="absolute inset-0 rounded-full bg-[#f5f3ef]"
										transition={{ type: "spring", stiffness: 350, damping: 32 }}
									/>
								)}
								<span
									className="relative z-10 flex items-center gap-2 font-medium"
									style={{ color: isSelected ? "#0a0a0e" : "#9694a1" }}
								>
									<span
										className="w-1.5 h-1.5 rounded-full"
										style={{
											backgroundColor: isSelected ? "#0a0a0e" : cat.accent,
										}}
									/>
									{cat.title}
								</span>
							</button>
						);
					})}
				</div>

				{/* Content panel: crossfades when the category changes */}
				<div className="relative rounded-3xl border border-white/[0.09] bg-[#0a0a0e]/92 p-8 sm:p-10 overflow-hidden">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeId}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
						>
							<div className="border-b border-white/[0.07] pb-4 mb-6">
								<span
									className="text-base font-medium block mb-1 font-editorial"
									style={{ color: currentCategory.accent }}
								>
									{currentCategory.title}
								</span>
								<h3 className="font-mackinac text-2xl sm:text-3xl text-white font-medium">
									{currentCategory.subtitle}
								</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{currentCategory.tools.map((tool) => (
									<div
										key={tool.name}
										className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition-colors"
									>
										<div className="flex items-center justify-between mb-2">
											<span className="font-editorial text-lg sm:text-xl font-medium text-white">
												{tool.name}
											</span>
											<span
												className="w-1.5 h-1.5 rounded-full shrink-0"
												style={{ backgroundColor: currentCategory.accent }}
											/>
										</div>
										<p className="text-base text-[#a8a6b5] leading-relaxed font-light">
											{tool.note}
										</p>
									</div>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
};

export default EditorialWorkbench;
