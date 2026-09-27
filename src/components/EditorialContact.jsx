import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const topics = [
	{
		label: "Full-Stack Role",
		body: "Hi Sanskriti,\n\nI saw your portfolio and projects. I'd love to chat about engineering roles on our team.",
	},
	{
		label: "Project Collaboration",
		body: "Hi Sanskriti,\n\nI'm building something interesting and would love to collaborate or get your thoughts on the backend/full-stack setup.",
	},
	{
		label: "Just saying hello",
		body: "Hi Sanskriti,\n\nJust wanted to say hello, loved your portfolio, and wanted to connect!",
	},
];

const EditorialContact = () => {
	const [copiedField, setCopiedField] = useState(null);
	const [selectedTopic, setSelectedTopic] = useState(topics[0].label);
	const [note, setNote] = useState(topics[0].body);

	const copyText = (val, fieldName) => {
		navigator.clipboard.writeText(val);
		setCopiedField(fieldName);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const handleTopicChange = (t) => {
		setSelectedTopic(t.label);
		setNote(t.body);
	};

	return (
		<section
			id="contact"
			className="py-32 relative overflow-hidden"
			style={{ backgroundColor: "#060609" }}
		>
			<div className="max-w-7xl mx-auto px-6">
				{/* Top Divider */}
				<div className="border-t border-white/[0.08] pt-12 mb-16 flex items-center justify-between text-sm font-editorial text-slate-400">
					<span>Say hello</span>
					<span>Bhopal & Kanpur, India</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					{/* Left: Friendly Closing Copy */}
					<div className="lg:col-span-6 space-y-6">
						<div className="space-y-4">
							<span className="text-sm font-editorial text-[#e06b75] font-semibold block tracking-wider">
								GET IN TOUCH
							</span>

							<h2 className="font-mackinac text-4xl sm:text-5xl lg:text-6xl text-[#f6f5f0] tracking-tight font-medium leading-[1.1]">
								Got something worth <span className="italic font-normal">building</span>?
							</h2>

							<p className="font-editorial text-2xl text-slate-100 leading-relaxed font-light max-w-xl">
								I like building things, solving weird bugs, and talking to people
								who care about good software. My inbox is always open.
							</p>

							<p className="text-base sm:text-lg font-editorial text-slate-300 leading-relaxed max-w-lg font-normal">
								Whether it's a software engineering opportunity, a cool side
								project, or just a chat about code, feel free to drop a line.
							</p>
						</div>

						{/* Direct Contact Cards */}
						<div className="space-y-3 max-w-md pt-2">
							{/* Email Card */}
							<div
								onClick={() => copyText("sanskriti0409@gmail.com", "email")}
								className="group p-4 rounded-xl border border-white/[0.08] bg-[#0c0c14]/80 hover:bg-[#0c0c14] hover:border-white/[0.18] transition-all cursor-pointer flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-lg bg-white/[0.04] text-[#e06b75] flex items-center justify-center font-mono-code text-xs font-bold">
										@
									</div>
									<div>
										<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
											Email
										</span>
										<span className="text-base font-editorial text-white">
											sanskriti0409@gmail.com
										</span>
									</div>
								</div>
								<div className="p-2 rounded-lg text-slate-400 group-hover:text-white transition-colors">
									{copiedField === "email" ? (
										<span className="text-sm font-editorial text-[#10b981] flex items-center gap-1">
											✓ Copied
										</span>
									) : (
										<span className="text-xs font-editorial text-slate-400 group-hover:text-white uppercase tracking-wider">
											Copy
										</span>
									)}
								</div>
							</div>

							{/* Phone Card */}
							<div
								onClick={() => copyText("+916306642481", "phone")}
								className="group p-4 rounded-xl border border-white/[0.08] bg-[#0c0c14]/80 hover:bg-[#0c0c14] hover:border-white/[0.18] transition-all cursor-pointer flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-lg bg-white/[0.04] text-[#10b981] flex items-center justify-center font-mono-code text-xs font-bold">
										#
									</div>
									<div>
										<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
											Phone & WhatsApp
										</span>
										<span className="text-base font-editorial text-white">
											+91 6306642481
										</span>
									</div>
								</div>
								<div className="p-2 rounded-lg text-slate-400 group-hover:text-white transition-colors">
									{copiedField === "phone" ? (
										<span className="text-sm font-editorial text-[#10b981] flex items-center gap-1">
											✓ Copied
										</span>
									) : (
										<span className="text-xs font-editorial text-slate-400 group-hover:text-white uppercase tracking-wider">
											Copy
										</span>
									)}
								</div>
							</div>
						</div>

						{/* Social Profiles */}
						<div className="flex flex-wrap items-center gap-3 pt-2">
							<a
								href="https://leetcode.com/u/sanskriti49"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-sm sm:text-base font-editorial text-slate-200 hover:text-white transition-all"
							>
								<span className="font-mono-code font-bold text-[#f59e0b] text-xs">LC</span>
								<span>LeetCode (390+)</span>
								<span className="text-xs text-slate-500 group-hover:text-white">↗</span>
							</a>

							<a
								href="https://github.com/sanskriti49"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-sm sm:text-base font-editorial text-slate-200 hover:text-white transition-all"
							>
								<FaGithub size={15} />
								<span>GitHub</span>
								<span className="text-xs text-slate-500 group-hover:text-white">↗</span>
							</a>

							<a
								href="https://linkedin.com/in/sanskriti49"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-sm sm:text-base font-editorial text-slate-200 hover:text-white transition-all"
							>
								<FaLinkedin size={15} />
								<span>LinkedIn</span>
								<span className="text-xs text-slate-500 group-hover:text-white">↗</span>
							</a>
						</div>
					</div>

					{/* Right: Quick Note Sender */}
					<div className="lg:col-span-6">
						<div className="p-7 sm:p-8 rounded-3xl border border-white/[0.1] bg-[#0c0c14] space-y-5">
							<div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
								<span className="text-base font-editorial text-slate-200 font-medium">
									Send a quick note
								</span>
								<span className="text-sm font-editorial text-slate-400">
									Choose a topic:
								</span>
							</div>

							{/* Topic buttons */}
							<div className="flex flex-wrap gap-2">
								{topics.map((t) => (
									<button
										key={t.label}
										onClick={() => handleTopicChange(t)}
										className={`px-3.5 py-2 rounded-lg text-sm font-editorial transition-all cursor-pointer ${
											selectedTopic === t.label
												? "bg-white text-black font-semibold shadow-md"
												: "bg-white/[0.03] text-slate-300 hover:text-white border border-white/[0.06]"
										}`}
									>
										{t.label}
									</button>
								))}
							</div>

							{/* Message Preview */}
							<div className="space-y-1.5">
								<span className="text-xs font-editorial uppercase tracking-wider text-slate-400 block">
									Message
								</span>
								<textarea
									rows={5}
									value={note}
									onChange={(e) => setNote(e.target.value)}
									className="w-full p-4 rounded-xl border border-white/[0.08] bg-black/50 text-sm sm:text-base font-editorial text-slate-100 focus:outline-none focus:border-white/30 resize-none leading-relaxed"
								/>
							</div>

							{/* Launch Client */}
							<a
								href={`mailto:sanskriti0409@gmail.com?subject=${encodeURIComponent(
									`Hello from portfolio: ${selectedTopic}`
								)}&body=${encodeURIComponent(note)}`}
								className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#f6f5f0] hover:bg-white text-black text-sm font-editorial font-bold uppercase tracking-wider transition-all shadow-xl hover:scale-[1.01]"
							>
								<span>Launch mail app</span>
								<span className="text-sm">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditorialContact;
