import { useEffect, useRef } from "react";

const CursorGlow = () => {
	const glowRef = useRef(null);
	useEffect(() => {
		const move = (e) => {
			if (glowRef.current) {
				glowRef.current.style.left = e.clientX + "px";
				glowRef.current.style.top = e.clientY + "px";
			}
		};
		window.addEventListener("mousemove", move);
		return () => window.removeEventListener("mousemove", move);
	}, []);
	return (
		<div
			ref={glowRef}
			className="fixed pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
			style={{
				background:
					"radial-gradient(circle, rgba(244,63,94,0.04) 0%, transparent 70%)",
				transition: "left 0.15s ease, top 0.15s ease",
			}}
		/>
	);
};

export default CursorGlow;
