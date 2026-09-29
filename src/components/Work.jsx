import { useRef } from "react";
import { projects } from "../data";
import { ArrowUpRight, Sparkle } from "./Icons";
import Tilt from "./Tilt";
import { Magnetic, canMove, useInView } from "./Fx";

const css = `
@keyframes wk-load{0%{transform:scaleX(0);opacity:1}55%{transform:scaleX(.85);opacity:1}80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes wk-resolve{from{opacity:.15}45%{opacity:1;color:var(--color-rose,#e06b75)}}
.wk-load{animation:wk-load 1100ms cubic-bezier(.3,.7,.3,1) both}
.wk-tok{animation:wk-resolve 700ms ease-out both;animation-delay:calc(var(--i) * 70ms)}
@media (prefers-reduced-motion:reduce){.wk-load{display:none}.wk-tok{animation:none}}
`;

function Links({ project }) {
	return (
		<div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
			{project.live && (
				<Magnetic>
					<a
						href={project.live}
						target="_blank"
						rel="noreferrer"
						className="link-line group inline-flex items-center gap-1.5 text-paper"
					>
						Visit site
						<span className="inline-flex transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
							<ArrowUpRight />
						</span>
					</a>
				</Magnetic>
			)}
			<Magnetic>
				<a
					href={project.source}
					target="_blank"
					rel="noreferrer"
					className="link-line group inline-flex items-center gap-1.5 text-mist hover:text-paper"
				>
					Source
					<span className="inline-flex transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
						<ArrowUpRight />
					</span>
				</a>
			</Magnetic>
		</div>
	);
}

// Loads like a page: a thin progress line runs across the top and the
// screenshot fades in from grey. A small label trails the cursor.
function Shot({ project, aspect }) {
	const contain = project.fit === "contain";
	const [ref, loaded] = useInView(0.35);
	const labelRef = useRef(null);

	const move = (e) => {
		if (!canMove(e) || !labelRef.current) return;
		const r = e.currentTarget.getBoundingClientRect();
		const s = labelRef.current.style;
		s.transform = `translate3d(${(e.clientX - r.left + 14).toFixed(0)}px, ${(e.clientY - r.top + 14).toFixed(0)}px, 0)`;
		s.opacity = 1;
		s.scale = "1";
	};
	const leave = () => {
		const s = labelRef.current?.style;
		if (!s) return;
		s.opacity = 0;
		s.scale = ".6";
	};

	return (
		<a
			ref={ref}
			href={project.live || project.source}
			target="_blank"
			rel="noreferrer"
			tabIndex={-1}
			aria-hidden="true"
			onPointerMove={move}
			onPointerLeave={leave}
			className={`group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 ${
				contain ? "bg-black" : "bg-ink-3"
			}`}
		>
			<span
				aria-hidden="true"
				className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-rose ${
					loaded ? "wk-load" : "scale-x-0"
				}`}
			/>
			<picture>
				{project.poster && (
					<source
						media="(prefers-reduced-motion: reduce)"
						srcSet={project.poster}
					/>
				)}
				<img
					src={project.image}
					alt=""
					width={project.width}
					height={project.height}
					loading="lazy"
					decoding="async"
					className={`${aspect} w-full transition-[scale,filter] duration-700 ease-out group-hover:scale-[1.03] motion-reduce:brightness-100 motion-reduce:saturate-100 ${
						loaded ? "" : "brightness-75 saturate-0"
					} ${contain ? "object-contain p-6" : "object-cover object-top"}`}
				/>
			</picture>
			<span
				ref={labelRef}
				className="pointer-events-none absolute left-0 top-0 z-10 grid size-14 place-items-center rounded-full bg-paper text-[13px] font-medium text-ink opacity-0 transition-[opacity,scale,transform] duration-150 ease-out [scale:.6]"
			>
				{project.live ? "Visit" : "Source"}
			</span>
		</a>
	);
}

// Reads like a dependency install: packages resolve left to right.
function Stack({ items }) {
	const [ref, on] = useInView(0.6);
	return (
		<p
			ref={ref}
			className="mt-6 flex flex-wrap gap-x-2 font-mono text-[13px] text-dim"
		>
			{items.map((s, i) => (
				<span key={s} className="inline-flex gap-2">
					<span
						className={`transition-colors duration-200 hover:text-rose motion-reduce:opacity-100 ${on ? "wk-tok" : "opacity-15"}`}
						style={{ "--i": i }}
					>
						{s}
					</span>
					{i < items.length - 1 && (
						<span aria-hidden="true" className="text-dim/40">
							/
						</span>
					)}
				</span>
			))}
		</p>
	);
}

// Bullets tick in one at a time as you read down.
function Point({ text }) {
	const [ref, lit] = useInView(0, true, "0px 0px -15% 0px");
	return (
		<li
			ref={ref}
			className={`flex gap-3.5 transition-opacity duration-700 motion-reduce:opacity-100 ${lit ? "opacity-100" : "opacity-25"}`}
		>
			<Sparkle
				className={`mt-[0.45em] h-2.5 w-2.5 shrink-0 text-rose transition-transform duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] motion-reduce:rotate-0 motion-reduce:scale-100 ${
					lit ? "rotate-0 scale-100" : "-rotate-90 scale-50"
				}`}
			/>
			<span>{text}</span>
		</li>
	);
}

function Featured({ project, flip }) {
	return (
		<article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
			<div className={`reveal lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
				<Tilt>
					<Shot project={project} aspect="aspect-[16/10]" />
				</Tilt>
			</div>
			<div
				className={`reveal lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
				style={{ "--delay": "120ms" }}
			>
				<h3 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
					{project.title}
				</h3>
				<p className="mt-4 text-lg leading-relaxed text-mist">
					{project.summary}
				</p>
				<ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-mist/90">
					{project.points.map((p) => (
						<Point key={p} text={p} />
					))}
				</ul>
				<Stack items={project.stack} />
				<Links project={project} />
			</div>
		</article>
	);
}

function Small({ project, delay }) {
	return (
		<article className="reveal" style={{ "--delay": delay }}>
			<Tilt>
				<Shot project={project} aspect="aspect-[4/3]" />
			</Tilt>
			<h3 className="font-display mt-7 text-3xl font-normal tracking-tight sm:text-4xl">
				{project.title}
			</h3>
			<p className="mt-3 max-w-md leading-relaxed text-mist">
				{project.summary}
			</p>
			<Stack items={project.stack} />
			<Links project={project} />
		</article>
	);
}

// first commit ---------- real users, drawn once as the header arrives
function Journey() {
	const [ref, on] = useInView(0.8);
	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="mt-8 flex max-w-md items-center gap-3 text-sm text-dim"
		>
			<span>first commit</span>
			<span
				className={`h-px flex-1 origin-left bg-line transition-transform duration-[1400ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:scale-x-100 motion-reduce:transition-none ${
					on ? "scale-x-100" : "scale-x-0"
				}`}
			/>
			<span
				className={`transition-colors duration-500 motion-reduce:text-rose motion-reduce:delay-0 ${
					on ? "text-rose delay-[1400ms]" : ""
				}`}
			>
				real users
			</span>
		</div>
	);
}

export default function Work() {
	const featured = projects.filter((p) => p.points);
	const rest = projects.filter((p) => !p.points);

	return (
		<section
			id="work"
			className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36"
		>
			<style>{css}</style>
			<div className="reveal mb-16 max-w-2xl sm:mb-20">
				<h2 className="font-display text-5xl font-light tracking-tight sm:text-6xl">
					Things I've built
				</h2>
				<p className="mt-5 text-lg text-mist">
					Four products, end to end, from the first commit to real users.
				</p>
				<Journey />
			</div>

			<div className="space-y-24 sm:space-y-32">
				{featured.map((p, i) => (
					<Featured key={p.id} project={p} flip={i % 2 === 1} />
				))}
				<div className="grid gap-16 md:grid-cols-2 md:gap-10">
					{rest.map((p, i) => (
						<Small key={p.id} project={p} delay={`${i * 120}ms`} />
					))}
				</div>
			</div>
		</section>
	);
}
