import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Send, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import GridMotion from "./GridMotion";

const gridKeywords = [
	"POSTGRESQL",
	"REACT 19",
	"NODE.JS",
	"AWS S3",
	"REDIS",
	"SOCKET.IO",
	"DOCKER",
	"TERRAFORM",
	"EXPRESS",
	"REST APIS",
	"TAILWIND",
	"NEXT.JS",
	"JAVA",
	"SQL",
	"GIT",
	"DSA",
	"OOP",
	"DBMS",
	"RAZORPAY",
	"JWT",
	"VERCEL",
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
		<Icon size={16} />
	</motion.a>
);

const Contact = () => {
	const [emailCopied, setEmailCopied] = useState(false);
	const [phoneCopied, setPhoneCopied] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState("Full-Stack Project / Role");

	const topicSuggestions = {
		"Full-Stack Project / Role":
			"Hi Sanskriti, I came across your portfolio and would love to discuss software engineering opportunities and full-stack projects with you!",
		"Backend & Cloud Architecture":
			"Hi Sanskriti, I'd love to connect regarding backend architecture, AWS cloud setup, and high-throughput systems design.",
		"Quick Catchup":
			"Hi Sanskriti, just wanted to say hello, discuss software engineering, and connect regarding potential collaborations!",
	};

	const [customMessage, setCustomMessage] = useState(
		topicSuggestions["Full-Stack Project / Role"],
	);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("sanskriti0409@gmail.com");
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	const handleCopyPhone = () => {
		navigator.clipboard.writeText("+916306642481");
		setPhoneCopied(true);
		setTimeout(() => setPhoneCopied(false), 2000);
	};

	const selectTopicSetting = (topic) => {
		setSelectedTopic(topic);
		setCustomMessage(topicSuggestions[topic]);
	};

	return (
		<section id="contact" className="py-28 relative" style={{ backgroundColor: "#08080C" }}>
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

						{/* Content Grid */}
						<div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
							{/* Left Column: Contact details & Socials */}
							<div className="md:col-span-5 flex flex-col justify-between space-y-6">
								<div>
									<span className="text-rose-400 font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center gap-1.5 mb-2">
										<Sparkles size={12} /> 06 / Let's Connect
									</span>
									<h3
										className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight"
										style={{ fontFamily: "'P22Mackinac', sans-serif" }}
									>
										Let's build <br />
										<span className="text-slate-400 font-light">
											something great.
										</span>
									</h3>
									<p className="text-slate-400 text-sm leading-relaxed pt-3">
										Open for software engineering opportunities, full-stack
										collaborations, and technical discussions.
									</p>
								</div>

								{/* Direct Contact Cards */}
								<div className="space-y-3 pt-2">
									{/* Email */}
									<motion.div
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.99 }}
										onClick={handleCopyEmail}
										className="group/copy flex items-center justify-between p-3.5 rounded-xl bg-[#08080C]/80 border border-white/[0.06] cursor-pointer hover:border-rose-500/25 transition-all"
									>
										<div className="truncate pr-3 flex items-center gap-3">
											<div className="p-2 rounded-lg bg-white/[0.03] text-rose-400">
												<Mail size={14} />
											</div>
											<div>
												<span className="text-[9px] text-slate-500 uppercase tracking-widest block font-semibold">
													Email Address
												</span>
												<span className="text-slate-200 text-xs sm:text-sm font-medium">
													sanskriti0409@gmail.com
												</span>
											</div>
										</div>
										<div className="p-2 rounded-lg bg-white/[0.03] group-hover/copy:bg-rose-500/10 transition-colors shrink-0">
											{emailCopied ? (
												<Check size={14} className="text-emerald-400" />
											) : (
												<Copy
													size={14}
													className="text-slate-400 group-hover/copy:text-rose-300 transition-colors"
												/>
											)}
										</div>
									</motion.div>

									{/* Phone */}
									<motion.div
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.99 }}
										onClick={handleCopyPhone}
										className="group/copy flex items-center justify-between p-3.5 rounded-xl bg-[#08080C]/80 border border-white/[0.06] cursor-pointer hover:border-emerald-500/25 transition-all"
									>
										<div className="truncate pr-3 flex items-center gap-3">
											<div className="p-2 rounded-lg bg-white/[0.03] text-emerald-400">
												<Phone size={14} />
											</div>
											<div>
												<span className="text-[9px] text-slate-500 uppercase tracking-widest block font-semibold">
													Direct Phone / WhatsApp
												</span>
												<span className="text-slate-200 text-xs sm:text-sm font-medium">
													+91 6306642481
												</span>
											</div>
										</div>
										<div className="p-2 rounded-lg bg-white/[0.03] group-hover/copy:bg-emerald-500/10 transition-colors shrink-0">
											{phoneCopied ? (
												<Check size={14} className="text-emerald-400" />
											) : (
												<Copy
													size={14}
													className="text-slate-400 group-hover/copy:text-emerald-300 transition-colors"
												/>
											)}
										</div>
									</motion.div>
								</div>

								{/* Social Links */}
								<div className="flex gap-2.5 pt-2">
									<SocialLink
										href="https://github.com/sanskriti49"
										icon={FaGithub}
										label="GitHub Profile"
									/>
									<SocialLink
										href="https://linkedin.com/in/sanskriti49"
										icon={FaLinkedin}
										label="LinkedIn Profile"
									/>
									<SocialLink
										href="mailto:sanskriti0409@gmail.com"
										icon={FaEnvelope}
										label="Direct Mail"
									/>
								</div>
							</div>

							{/* Right Column: Interactive Message Composer */}
							<div
								className="md:col-span-7 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
								style={{
									backgroundColor: "rgba(8,8,12,0.6)",
									border: "1px solid rgba(255,255,255,0.05)",
								}}
							>
								<div className="space-y-5">
									<div className="flex items-center gap-2">
										<Sparkles size={12} className="text-rose-400" />
										<span className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest">
											Draft Note or Inquire
										</span>
									</div>

									{/* Topic Pills */}
									<div className="flex flex-wrap gap-2">
										{Object.keys(topicSuggestions).map((topic) => (
											<motion.button
												key={topic}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												onClick={() => selectTopicSetting(topic)}
												className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
													selectedTopic === topic
														? "bg-white text-black font-bold shadow-lg"
														: "bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.07]"
												}`}
											>
												{topic}
											</motion.button>
										))}
									</div>

									{/* Textarea */}
									<div className="relative">
										<div className="absolute top-3 left-4 text-[9px] font-bold text-rose-400/60 uppercase tracking-[0.25em] font-mono">
											Message Preview
										</div>
										<textarea
											value={customMessage}
											onChange={(e) => setCustomMessage(e.target.value)}
											className="w-full min-h-[140px] rounded-xl p-4 pt-9 text-xs sm:text-sm text-slate-200 focus:outline-none resize-none leading-relaxed transition-colors font-normal"
											style={{
												backgroundColor: "rgba(0,0,0,0.4)",
												border: "1px solid rgba(255,255,255,0.06)",
											}}
											onFocus={(e) =>
												(e.target.style.borderColor = "rgba(244,63,94,0.4)")
											}
											onBlur={(e) =>
												(e.target.style.borderColor = "rgba(255,255,255,0.06)")
											}
										/>
									</div>
								</div>

								{/* Launch Mail Client CTA */}
								<motion.a
									whileHover={{ scale: 1.01 }}
									whileTap={{ scale: 0.98 }}
									href={`mailto:sanskriti0409@gmail.com?subject=${encodeURIComponent(
										selectedTopic,
									)}&body=${encodeURIComponent(customMessage)}`}
									className="w-full py-3.5 px-5 bg-white hover:bg-rose-400 text-black hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
								>
									Launch Mail Client <Send size={12} />
								</motion.a>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
