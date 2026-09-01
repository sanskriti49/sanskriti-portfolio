import { useEffect, useRef } from "react";

const CursorGlow = () => {
	const glowRef = useRef(null);

	useEffect(() => {
		let rafId = null;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;

		const onMouseMove = (e) => {
			targetX = e.clientX;
			targetY = e.clientY;
		};

		const animate = () => {
			currentX += (targetX - currentX) * 0.15;
			currentY += (targetY - currentY) * 0.15;

			if (glowRef.current) {
				glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
			}

			rafId = requestAnimationFrame(animate);
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });
		rafId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div
			ref={glowRef}
			className="fixed top-0 left-0 pointer-events-none z-0 w-[500px] h-[500px] rounded-full will-change-transform"
			style={{
				background:
					"radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 70%)",
			}}
		/>
	);
};

export default CursorGlow;
