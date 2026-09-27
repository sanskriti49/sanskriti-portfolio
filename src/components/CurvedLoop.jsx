import { useEffect, useRef, useState } from "react";

/**
 * CurvedLoop: inspired by React Bits
 * An SVG textPath animation that bends text smoothly along a gentle curve and loops quietly.
 * Optimized with IntersectionObserver so it only runs when in viewport.
 */
const CurvedLoop = ({
	text = "BUILD · BREAK · FIX · LEARN · FROM THE INTERFACE TO THE DATABASE · REPEAT · ",
	speed = 0.5,
	direction = "left",
	className = "",
}) => {
	const containerRef = useRef(null);
	const textPathRef = useRef(null);
	const offsetRef = useRef(0);
	const [isVisible, setIsVisible] = useState(false);

	// Duplicate text so the loop has continuity
	const repeatedText = `${text} ${text} ${text} `;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.05 }
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		let animId;
		const step = () => {
			if (direction === "left") {
				offsetRef.current -= speed;
				if (offsetRef.current <= -1000) {
					offsetRef.current = 0;
				}
			} else {
				offsetRef.current += speed;
				if (offsetRef.current >= 1000) {
					offsetRef.current = 0;
				}
			}

			if (textPathRef.current) {
				textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
			}

			animId = requestAnimationFrame(step);
		};

		animId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animId);
	}, [isVisible, speed, direction]);

	return (
		<div
			ref={containerRef}
			className={`w-full overflow-hidden pointer-events-none select-none py-4 ${className}`}
			style={{ transform: "translateZ(0)", willChange: "transform", contain: "paint" }}
		>
			<svg
				viewBox="0 0 1400 120"
				className="w-full h-16 sm:h-20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Quadratic gentle curve path */}
				<path
					id="curved-path-ribbon"
					d="M -200,60 Q 350,15 700,60 T 1600,60"
					fill="transparent"
					stroke="transparent"
				/>

				<text
					className="fill-white/[0.14] text-[15px] sm:text-[17px] font-editorial tracking-[0.25em] uppercase font-medium"
					style={{ letterSpacing: "0.22em" }}
				>
					<textPath
						ref={textPathRef}
						href="#curved-path-ribbon"
						startOffset="0px"
					>
						{repeatedText}
					</textPath>
				</text>
			</svg>
		</div>
	);
};

export default CurvedLoop;
