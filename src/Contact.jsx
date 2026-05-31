import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Send, Sparkles } from "lucide-react";
import {
	FaGithub,
	FaLinkedin,
	FaInstagram,
	FaRegEnvelope,
} from "react-icons/fa";
import GridMotion from "./GridMotion";

const gridKeywords = [
	"PERN",
	"FLUTTER",
	"AWS",
	"AI",
	"REACT",
	"NODE",
	"SQL",
	"DART",
	"REST",
	"BERT",
	"LLAMA",
	"JAVA",
	"NEXT.JS",
	"EXPRESS",
	"PYTHON",
	"ML",
	"API",
	"GSAP",
	"TAILWIND",
	"GIT",
	"FIGMA",
	"VERCEL",
	"SUPABASE",
	"REDIS",
];

const SocialLink = ({ href, icon: Icon, label }) => (
	<motion.a
		whileHover={{ y: -3, scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		href={href}
		target="_blank"
		rel="noreferrer"
		aria-label={label}
		className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/30 hover:bg-rose-500/5 hover:text-rose-300 transition-all text-slate-400"
	>
		<Icon size={15} />
	</motion.a>
);

const Contact = () => {
	const [copied, setCopied] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState("Full-Stack Project");

	const [customMessage, setCustomMessage] = useState(
		"Hi Sanskriti, I came across your portfolio and would love to discuss a project with you!",
	);
	const topicSuggestions = {
		"Full-Stack Project":
			"Hi Sanskriti, I'm looking to build a full-stack platform and want to discuss database architectures and performance setups with you.",
		"Mobile Application":
			"Hi Sanskriti, I'm interested in building a fluid cross-platform app and would love to see how we can utilize Flutter or Dart.",
		"Quick Catchup":
			"Hi Sanskriti, just wanted to reach out, say hello, and talk about software design, web setups, or open engineering roles!",
	};

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("sanskriti0409@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	const selectTopicSetting = (topic) => {
		setSelectedTopic(topic);
		setCustomMessage(topicSuggestions[topic]);
	};

	return (
		<section id="contact" className="py-28 relative">
			<div className="container mx-auto px-6 max-w-5xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<div
						className="relative overflow-hidden p-8 md:p-12 rounded-3xl border border-white/[0.05]"
						style={{
							backgroundColor: "rgba(12,12,20,0.8)",
							backdropFilter: "blur(24px)",
						}}
					>
						<div className="absolute inset-0 z-0 pointer-events-none opacity-40">
							<GridMotion
								items={gridKeywords}
								gradientColor="rgba(12,12,20,1)"
							/>
						</div>

						{/* ── Left: Context & Social ── */}
						{/* z-10 + relative lift this above the GridMotion layer */}
						<div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
							{" "}
							<div className="md:col-span-5 flex flex-col justify-between space-y-8">
								{" "}
								<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px]">
									03 / Connection Hub
								</span>
								<h3
									className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight"
									style={{ fontFamily: "'P22Mackinac', sans-serif" }}
								>
									Let's design <br />
									<span className="text-slate-400 font-light">
										something great.
									</span>
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed max-w-xs pt-1">
									I'm always looking for new project collaborations, full-time
									engineering internships, or just a great technical
									conversation.
								</p>
							</div>
							<div
								className="md:col-span-7 rounded-2xl p-6 flex flex-col justify-between space-y-6 mt-4 md:mt-0"
								style={{
									backgroundColor: "rgba(8,8,12,0.5)",
									border: "1px solid rgba(255,255,255,0.04)",
								}}
							>
								{" "}
								{/* copy email */}
								<motion.div
									whileHover={{ scale: 1.01 }}
									whileTap={{ scale: 0.99 }}
									onClick={handleCopyEmail}
									className="group/copy flex items-center justify-between p-4 rounded-xl bg-[#08080C]/70 border border-white/[0.06] cursor-pointer hover:border-rose-500/25 transition-all"
								>
									<div className="truncate pr-3">
										<span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-0.5 font-semibold">
											Direct Inbox
										</span>
										<span className="text-slate-200 text-sm font-medium">
											sanskriti0409@gmail.com
										</span>
									</div>
									<div className="p-2.5 rounded-lg bg-white/[0.03] group-hover/copy:bg-rose-500/10 transition-colors shrink-0">
										{copied ? (
											<Check size={14} className="text-emerald-400" />
										) : (
											<Copy
												size={14}
												className="text-slate-400 group-hover/copy:text-rose-300 transition-colors"
											/>
										)}
									</div>
								</motion.div>
								{/* social links */}
								<div className="flex gap-2.5">
									<SocialLink
										href="https://github.com/sanskriti49"
										icon={FaGithub}
										label="GitHub"
									/>
									<SocialLink
										href="https://linkedin.com/in/sanskriti-gupta-58a677274/"
										icon={FaLinkedin}
										label="LinkedIn"
									/>

									<SocialLink
										href="mailto:sanskriti0409@gmail.com"
										icon={FaRegEnvelope}
										label="Email"
									/>
								</div>
							</div>
						</div>

						{/* ── Right: Message Composer ── */}
						{/* z-10 + relative lift this above the GridMotion layer */}
						<div
							className="relative z-10 md:col-span-7 rounded-2xl p-6 flex flex-col justify-between space-y-6 mt-4 md:mt-0"
							style={{
								backgroundColor: "rgba(8,8,12,0.5)",
								border: "1px solid rgba(255,255,255,0.04)",
							}}
						>
							<div className="space-y-5">
								<div className="flex items-center gap-2">
									<Sparkles size={12} className="text-rose-400" />
									<span className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest">
										Draft your message
									</span>
								</div>

								{/* topic pills */}
								<div className="flex flex-wrap gap-2">
									{Object.keys(topicSuggestions).map((topic) => (
										<motion.button
											key={topic}
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.97 }}
											onClick={() => selectTopicSetting(topic)}
											className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
												selectedTopic === topic
													? "bg-white text-black font-bold shadow-lg"
													: "bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.07]"
											}`}
										>
											{topic}
										</motion.button>
									))}
								</div>

								{/* textarea */}
								<div className="relative">
									<div className="absolute top-3 left-4 text-[9px] font-bold text-rose-400/50 uppercase tracking-[0.25em] font-mono">
										Draft Note
									</div>
									<textarea
										value={customMessage}
										onChange={(e) => setCustomMessage(e.target.value)}
										className="w-full min-h-[130px] rounded-xl p-4 pt-9 text-sm text-slate-300 focus:outline-none resize-none leading-relaxed font-normal transition-colors"
										style={{
											backgroundColor: "rgba(0,0,0,0.4)",
											border: "1px solid rgba(255,255,255,0.05)",
										}}
										onFocus={(e) =>
											(e.target.style.borderColor = "rgba(244,63,94,0.3)")
										}
										onBlur={(e) =>
											(e.target.style.borderColor = "rgba(255,255,255,0.05)")
										}
									/>
								</div>
							</div>

							{/* CTA */}
							<motion.a
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
								href={`mailto:sanskriti0409@gmail.com?subject=${encodeURIComponent(selectedTopic)}&body=${encodeURIComponent(customMessage)}`}
								className="w-full py-3.5 px-5 bg-white hover:bg-rose-400 text-black hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
							>
								Launch Mail Client <Send size={12} />
							</motion.a>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
