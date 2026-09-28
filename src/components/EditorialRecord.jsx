const EditorialRecord = () => {
	return (
		<section
			id="milestones"
			className="py-32 relative overflow-hidden"
			style={{ backgroundColor: "#07070a" }}
		>
			<div className="max-w-7xl mx-auto px-6">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
					<div className="space-y-3">
						<span className="text-sm font-editorial text-[#f59e0b] font-semibold block tracking-wider">
							ACHIEVEMENTS & MILESTONES
						</span>
						<h2 className="font-mackinac text-4xl sm:text-5xl lg:text-6xl text-[#f6f5f0] tracking-tight font-medium">
							Problem solving & milestones.
						</h2>
						<p className="font-editorial text-xl sm:text-2xl text-slate-100 max-w-2xl leading-relaxed font-light">
							Competitive programming rankings, LeetCode problem solving, cloud
							certifications, and academic track record.
						</p>
					</div>

					<div className="text-sm font-editorial text-slate-300 hidden md:block">
						<span>4 KEY MILESTONES</span>
					</div>
				</div>

				{/* ── Two Featured Highlights: TCS CodeVita & LeetCode ── */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					{/* 1. TCS CodeVita */}
					<div className="p-8 sm:p-10 rounded-3xl border border-[#e06b75]/30 bg-gradient-to-br from-[#160d12]/90 via-[#0d0910] to-[#08080c] relative overflow-hidden shadow-2xl flex flex-col justify-between">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<span className="text-sm font-editorial uppercase font-bold text-[#e06b75] flex items-center gap-1.5">
									<span className="font-mono-code text-xs px-2 py-0.5 rounded bg-[#e06b75]/15 border border-[#e06b75]/30">
										TOP 2%
									</span>
									Worldwide
								</span>
								<span className="text-slate-600">·</span>
								<span className="text-sm font-editorial text-slate-300">
									TCS CodeVita · 2025
								</span>
							</div>

							<h3 className="font-mackinac text-3xl sm:text-4xl text-white font-bold tracking-tight">
								TCS CodeVita: Rank #10,298
							</h3>

							<p className="font-editorial text-lg sm:text-xl text-slate-100 leading-relaxed font-light">
								Placed in the{" "}
								<strong className="text-white font-semibold underline decoration-[#e06b75]/60 underline-offset-4">
									Top 2% globally out of 350,000+ registered competitive
									programmers
								</strong>{" "}
								worldwide.
							</p>

							<p className="text-sm sm:text-lg font-sans text-slate-300 leading-relaxed">
								Solved algorithmic problems under strict time limits, focusing
								on graph traversal, dynamic programming, and optimal space/time
								complexity.
							</p>
						</div>

						<div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
							<div>
								<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
									GLOBAL RANK
								</span>
								<div className="text-2xl sm:text-3xl font-editorial font-bold text-[#e06b75]">
									#10,298
								</div>
							</div>
							<div className="text-right">
								<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
									CANDIDATE POOL
								</span>
								<div className="text-sm font-editorial text-slate-300 font-medium">
									350,000+ engineers
								</div>
							</div>
						</div>
					</div>

					{/* 2. LeetCode: 390+ Solved */}
					<div className="p-8 sm:p-10 rounded-3xl border border-[#f59e0b]/30 bg-gradient-to-br from-[#181309]/90 via-[#0f0e0a] to-[#08080c] relative overflow-hidden shadow-2xl flex flex-col justify-between">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="text-sm font-editorial uppercase font-bold text-[#f59e0b] flex items-center gap-1.5">
										<span className="font-mono-code text-xs px-2 py-0.5 rounded bg-[#f59e0b]/15 border border-[#f59e0b]/30">
											390+ SOLVED
										</span>
										Algorithms
									</span>
									<span className="text-slate-600">·</span>
									<span className="text-sm font-editorial text-slate-300">
										LeetCode
									</span>
								</div>
								<a
									href="https://leetcode.com/u/sanskriti49"
									target="_blank"
									rel="noreferrer"
									className="text-xs font-editorial text-amber-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/25"
								>
									Profile ↗
								</a>
							</div>

							<h3 className="font-mackinac text-3xl sm:text-4xl text-white font-bold tracking-tight">
								LeetCode: 390+ Questions Solved
							</h3>

							<p className="font-editorial text-lg sm:text-xl text-slate-100 leading-relaxed font-light">
								Solved over{" "}
								<strong className="text-white font-semibold underline decoration-[#f59e0b]/60 underline-offset-4">
									390+ data structures & algorithms problems
								</strong>{" "}
								with a focus on clean implementation and optimal complexity.
							</p>

							<p className="text-sm sm:text-lg font-sans text-slate-300 leading-relaxed">
								Core practice across dynamic programming, trees, graphs, sliding
								window, two pointers, heaps, and binary search patterns.
							</p>
						</div>

						<div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
							<div>
								<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
									PROBLEMS SOLVED
								</span>
								<div className="text-2xl sm:text-3xl font-editorial font-bold text-[#f59e0b]">
									390+
								</div>
							</div>
							<div className="text-right">
								<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
									FOCUS
								</span>
								<div className="text-sm font-editorial text-slate-300 font-medium">
									DSA & Algorithms
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ── Two Supporting Cards: AWS & VIT CSE ── */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* AWS Certification */}
					<div className="p-7 rounded-2xl border border-white/[0.08] bg-[#0c0c14] space-y-4 hover:border-amber-500/30 transition-colors">
						<div className="flex items-center justify-between">
							<div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[#f59e0b] font-mono-code text-xs font-bold tracking-wider">
								AWS-CCP
							</div>
							<span className="text-sm font-editorial text-[#f59e0b] uppercase font-semibold">
								AWS Certified
							</span>
						</div>

						<div className="space-y-1.5">
							<span className="text-sm font-editorial text-slate-400">
								Amazon Web Services · 2026
							</span>
							<h4 className="font-mackinac text-2xl text-white font-bold">
								Cloud Practitioner
							</h4>
							<p className="text-sm sm:text-lg font-sans text-slate-200 leading-relaxed">
								Official certification in AWS cloud services: EC2 virtual
								servers, S3 file storage, IAM security permissions, and cloud
								cost management.
							</p>
						</div>

						<div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-sm font-editorial text-slate-300">
							<span>Score: 827 / 1000</span>
							<span className="text-[#f59e0b]">Cloud Architecture</span>
						</div>
					</div>

					{/* Academic Record */}
					<div className="p-7 rounded-2xl border border-white/[0.08] bg-[#0c0c14] space-y-4 hover:border-emerald-500/30 transition-colors">
						<div className="flex items-center justify-between">
							<div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[#10b981] font-mono-code text-xs font-bold tracking-wider">
								VIT-CSE
							</div>
							<span className="text-sm font-editorial text-[#10b981] uppercase font-semibold">
								CGPA 8.54 / 10
							</span>
						</div>

						<div className="space-y-1.5">
							<span className="text-sm font-editorial text-slate-400">
								VIT Bhopal University · 2023 - 2027
							</span>
							<h4 className="font-mackinac text-2xl text-white font-bold">
								Computer Science & Engineering
							</h4>
							<p className="text-sm sm:text-lg font-sans text-slate-200 leading-relaxed">
								Coursework in Data Structures & Algorithms, Database Management
								Systems, Operating Systems, and Object-Oriented Software Design.
							</p>
						</div>

						<div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-sm font-editorial text-slate-300">
							<span>Class of 2027</span>
							<span className="text-[#10b981]">Consistent Academic Merit</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditorialRecord;
