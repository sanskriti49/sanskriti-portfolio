import { useLayoutEffect, useRef, useState } from "react";
import FaultyTerminal from "./FaultyTerminal";
import { toolbox } from "../data";
import { spotlight } from "../lib/pointer";

export default function Toolbox() {
	const [activeId, setActiveId] = useState(toolbox[0].id);
	const [bar, setBar] = useState({ x: 0, w: 0 });
	const tabsRef = useRef(null);
	const active = toolbox.find((c) => c.id === activeId);

	useLayoutEffect(() => {
		const measure = () => {
			const el = tabsRef.current?.querySelector(`[data-id="${activeId}"]`);
			if (el) setBar({ x: el.offsetLeft, w: el.offsetWidth });
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [activeId]);

	const select = (id, el) => {
		setActiveId(id);
		el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
	};

	const onKeyDown = (e) => {
		const i = toolbox.findIndex((c) => c.id === activeId);
		const next =
			e.key === "ArrowRight" ? (i + 1) % toolbox.length
			: e.key === "ArrowLeft" ? (i - 1 + toolbox.length) % toolbox.length
			: -1;
		if (next < 0) return;
		e.preventDefault();
		const el = tabsRef.current?.querySelector(`[data-id="${toolbox[next].id}"]`);
		el?.focus();
		select(toolbox[next].id, el);
	};

	return (
		<section id="toolbox" className="relative isolate overflow-hidden bg-black">
			<div className="absolute inset-0 -z-10">
				<FaultyTerminal tint={active.tint} />
				<div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0b0e_0%,transparent_16%,transparent_84%,#0b0b0e_100%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_25%_20%,rgb(11_11_14/0.45),transparent)]" />
			</div>

			<div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
				<div className="reveal max-w-2xl">
					<h2 className="font-display text-5xl font-light tracking-tight sm:text-6xl">
						Things I like reaching for
					</h2>
					<p className="mt-5 text-lg text-mist">
						Not a buzzword list. This is what I actually use to build and ship.
					</p>
				</div>

				<div
					ref={tabsRef}
					role="tablist"
					aria-label="Tool categories"
					onKeyDown={onKeyDown}
					className="reveal relative -mx-5 mt-12 flex gap-7 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
				>
					{toolbox.map((c) => {
						const selected = c.id === activeId;
						return (
							<button
								key={c.id}
								type="button"
								role="tab"
								data-id={c.id}
								id={`tab-${c.id}`}
								aria-selected={selected}
								aria-controls="toolbox-panel"
								tabIndex={selected ? 0 : -1}
								onClick={(e) => select(c.id, e.currentTarget)}
								className={`shrink-0 cursor-pointer whitespace-nowrap py-2 text-[17px] transition-colors ${
									selected ? "text-paper" : "text-dim hover:text-mist"
								}`}
							>
								{c.title}
							</button>
						);
					})}
					<span
						aria-hidden="true"
						className="absolute bottom-3 left-0 h-[2px] rounded-full transition-[transform,width,background-color] duration-500 ease-[cubic-bezier(0.3,1.2,0.4,1)]"
						style={{
							width: bar.w,
							transform: `translateX(${bar.x}px)`,
							backgroundColor: active.tint,
						}}
					/>
				</div>

				<div
					id="toolbox-panel"
					role="tabpanel"
					aria-labelledby={`tab-${active.id}`}
					className="reveal rounded-3xl border border-white/10 bg-ink/75 backdrop-blur-md p-6 sm:p-10"
				>
					<div key={active.id} className="panel-in">
						<h3 className="font-display text-3xl font-light tracking-tight sm:text-4xl">
							{active.subtitle}
						</h3>
						<ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{active.tools.map((tool) => (
								<li
									key={tool.name}
									onPointerMove={spotlight}
									className="spotlight rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/15"
								>
									<p className="flex items-center gap-2.5 text-[17px] font-medium text-paper">
										<span
											aria-hidden="true"
											className="h-3 w-[3px] rounded-full"
											style={{ backgroundColor: active.tint }}
										/>
										{tool.name}
									</p>
									<p className="mt-2 text-[15px] leading-relaxed text-mist">{tool.note}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
