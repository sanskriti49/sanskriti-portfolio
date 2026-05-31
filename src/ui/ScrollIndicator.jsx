import { motion } from "framer-motion";

const ScrollIndicator = () => (
	<motion.div
		className="flex flex-col items-center gap-2 text-slate-600"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 1.5 }}
	>
		<span className="text-[9px] uppercase tracking-[0.3em] font-medium">
			scroll
		</span>
		<motion.div
			className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"
			animate={{ scaleY: [0.3, 1, 0.3] }}
			transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
		/>
	</motion.div>
);
export default ScrollIndicator;
