import { useEffect, useRef } from "react";

const CursorGlow = () => {
	const glowRef = useRef(null);

	useEffect(() => {
		// Disable on touch devices
		if (window.matchMedia("(pointer: coarse)").matches) return;

		let rafId = null;
		let targetX = -500;
		let targetY = -500;
		let currentX = -500;
		let currentY = -500;
		let isRunning = false;

		const animate = () => {
			const dx = targetX - currentX;
			const dy = targetY - currentY;

			currentX += dx * 0.15;
			currentY += dy * 0.15;

			if (glowRef.current) {
				glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
			}

			// Stop RAF loop when mouse has rested to save CPU
			if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
				rafId = requestAnimationFrame(animate);
			} else {
				isRunning = false;
			}
		};

		const onMouseMove = (e) => {
			targetX = e.clientX;
			targetY = e.clientY;

			if (!isRunning) {
				isRunning = true;
				rafId = requestAnimationFrame(animate);
			}
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div
			ref={glowRef}
			className="fixed top-0 left-0 pointer-events-none z-0 w-[450px] h-[450px] rounded-full will-change-transform"
			style={{
				background:
					"radial-gradient(circle, rgba(224, 107, 117, 0.04) 0%, transparent 70%)",
				transform: "translate3d(-500px, -500px, 0)",
			}}
			aria-hidden="true"
		/>
	);
};

export default CursorGlow;
