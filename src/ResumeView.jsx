import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import resumeFile from "./resume.pdf";

const ResumeView = () => {
	const navigate = useNavigate();
	return (
		<div
			className="min-h-screen text-[#e2e8f0] p-6 flex flex-col"
			style={{ backgroundColor: "#08080C", fontFamily: "'Inter', sans-serif" }}
		>
			<div className="max-w-5xl w-full mx-auto flex flex-col flex-grow space-y-4">
				<div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
					<button
						onClick={() => navigate(-1)}
						className="cursor-pointer flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
					>
						<ArrowLeft size={14} /> Back
					</button>
					<div className="flex items-center gap-4">
						<span className="hidden sm:inline text-[9px] uppercase tracking-widest text-slate-500 font-medium">
							resume.pdf
						</span>
						<a
							href={resumeFile}
							download="Sanskriti_Gupta_Resume.pdf"
							className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg text-xs uppercase font-bold tracking-widest hover:bg-rose-400 hover:text-white transition-all shadow-md"
						>
							<Download size={12} /> Download
						</a>
					</div>
				</div>
				<div className="flex-grow rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950 relative min-h-[75vh] shadow-2xl">
					<object
						data={resumeFile}
						type="application/pdf"
						className="w-full h-full absolute inset-0"
					>
						<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
							<FileText
								size={32}
								className="text-rose-400 mb-4 animate-pulse"
							/>
							<h4 className="text-sm uppercase tracking-widest text-white mb-2">
								Unable to display PDF preview
							</h4>
							<p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
								Your browser doesn't support embedded PDF viewing. Download
								below.
							</p>
							<a
								href={resumeFile}
								target="_blank"
								rel="noreferrer"
								className="border border-white/[0.06] bg-white/[0.01] text-xs uppercase font-bold tracking-widest text-slate-300 px-5 py-3 rounded-lg hover:bg-white/[0.04] hover:text-white transition-colors flex items-center gap-2"
							>
								Open Direct <ExternalLink size={12} />
							</a>
						</div>
					</object>
				</div>
			</div>
		</div>
	);
};

export default ResumeView;
