import { useEffect, useRef, useState } from "react";
import { experience, milestones, profile, projects, toolbox } from "../data";

/* ───────────────────────── commands (unchanged) ───────────────────────── */

const commands = {
	whoami: () =>
		`${profile.name}\nFull-stack engineer, CS at VIT Bhopal (2023 to 2027)\nPreviously: Software Engineer Intern at GeekyAnts\nOpen to full-stack and backend roles`,
	projects: () =>
		projects
			.map(
				(p) =>
					`${p.title.padEnd(11)}${p.tagline}\n${" ".repeat(11)}${p.live || p.source}`,
			)
			.join("\n\n"),
	experience: () =>
		experience.map((e) => `${e.company}, ${e.role}\n${e.period}`).join("\n\n"),
	skills: () =>
		toolbox
			.map((t) => `${t.title}\n  ${t.tools.map((x) => x.name).join(", ")}`)
			.join("\n"),
	awards: () =>
		milestones
			.map(
				(m) =>
					`${m.title}\n  ${m.count ? m.count + m.suffix : m.value}, ${m.detail}`,
			)
			.join("\n"),
	contact: () =>
		`email     ${profile.email}\ngithub    ${profile.links.github}\nlinkedin  ${profile.links.linkedin}\nleetcode  ${profile.links.leetcode}`,
};

// Tab completion still knows the real names. Nothing else lists them.
const names = [...Object.keys(commands), "clear", "exit"];

/* ───────────────────────────── personality ───────────────────────────── */

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

const reduce =
	typeof window !== "undefined" && window.matchMedia
		? window.matchMedia("(prefers-reduced-motion: reduce)")
		: null;

// Ways a curious person might ask for the same things.
const aliases = {
	whoami: [
		"who",
		"who am i",
		"who i am",
		"who are you",
		"who is sanskriti",
		"about",
		"about me",
		"about you",
		"bio",
		"me",
		"you",
	],
	projects: [
		"project",
		"built",
		"builds",
		"made",
		"things",
		"apps",
		"shelf",
		"work",
	],
	experience: ["exp", "job", "jobs", "career", "history", "worked", "where"],
	skills: ["skill", "stack", "tech", "tools", "toolbox"],
	awards: [
		"award",
		"proud",
		"milestone",
		"milestones",
		"medals",
		"wins",
		"achievements",
	],
	contact: [
		"email",
		"mail",
		"reach",
		"hire",
		"hire me",
		"recruit",
		"recruiting",
		"say hello",
	],
};
const lookup = {};
for (const [cmd, list] of Object.entries(aliases))
	for (const a of list) lookup[a] = cmd;

const QUIT = new Set(["exit", "quit", "bye", "q"]);
const HELP = /^(help|\?|man|commands|menu|hint)$/;

const reactions = [
	[
		/^(hi|hello|hey|yo|hola|namaste)( there)?$/,
		() => "hello, stranger. glad you knocked.",
	],
	[/^knock knock$/, () => "who's there?"],
	[/^psst$/, () => "i heard that."],
	[/^sudo\b/, () => "nice try. you already have all the access there is."],
	[
		/^rm\b/,
		() =>
			"this is a portfolio. there's nothing to delete, but i admire the confidence.",
	],
	[/^ls\b/, () => "some things are better found than listed."],
	[/^cd\b/, () => "there's nowhere else to go. that's rather the point."],
	[/^pwd$/, () => "you are here. bhopal, roughly."],
	[/^(coffee|coffee|tea)$/, () => "coffee, actually. extra black."],
	[/^(vim?|nano|emacs)$/, () => "you can leave any time. esc works here."],
	[/^(thanks|thank you|thx)$/, () => "anytime."],
	[
		/^date$/,
		() =>
			new Date().toLocaleString("en-IN", {
				dateStyle: "full",
				timeStyle: "short",
			}),
	],
];

const shrugs = (c) => [
	`hm. "${c}" doesn't ring a bell.`,
	`nothing answers to "${c}". yet.`,
	`"${c}"? interesting guess.`,
	`no luck with "${c}". keep poking.`,
];

// Hints point at whatever hasn't been explored yet, and never name a command.
const HINTS = {
	whoami: "you could start with who i am.",
	projects: "there's a shelf of things i've built.",
	experience: "there's a little about where i've worked.",
	skills: "the toolbox is around here somewhere.",
	awards: "a few things i'm quietly proud of, too.",
	contact: "and if this went well, there's a way to say hello.",
};
const hintFor = (seen) => {
	const next = Object.keys(HINTS).find((k) => !seen.includes(k));
	return next ? HINTS[next] : "that's everything i keep in here. mostly.";
};

const PROMPTS_FIRST = [
	"anyone home?",
	"say something",
	"who goes there?",
	"knock knock",
	"go on…",
];
const PROMPTS_AFTER = [
	"what else?",
	"keep going",
	"there's more",
	"curious?",
	"ask away",
];

const BOOT = [
	{ text: "connection established…", cls: "text-dim", pause: 420 },
	{
		text: "portfolio shell // something is waiting.",
		cls: "text-paper",
		pause: 250,
	},
];

/* ───────────────────────────── pieces ───────────────────────────── */

const LINK_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

function linkify(text) {
	return text.split(LINK_RE).map((part, i) => {
		if (i % 2 === 0) return part;
		const web = part.startsWith("http");
		return (
			<a
				key={i}
				href={web ? part : `mailto:${part}`}
				{...(web ? { target: "_blank", rel: "noreferrer" } : {})}
				tabIndex={-1}
				className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-rose hover:decoration-rose"
			>
				{part}
			</a>
		);
	});
}

// Types text out, then turns URLs into links. The full text is always in the
// DOM for screen readers, so nothing is announced letter by letter.
function Out({ text, instant, speed = 10, onTick, onDone }) {
	const skip = instant || !!reduce?.matches;
	const [n, setN] = useState(skip ? text.length : 0);
	const cb = useRef({});
	cb.current = { onTick, onDone };

	useEffect(() => {
		if (skip && n !== text.length) setN(text.length);
	}, [skip, n, text.length]);

	useEffect(() => {
		cb.current.onTick?.();
		if (n >= text.length) {
			if (!skip) cb.current.onDone?.();
			return;
		}
		if (skip) return;
		const step = Math.max(1, Math.ceil(text.length / 70));
		const t = setTimeout(
			() => setN((v) => Math.min(text.length, v + step)),
			speed + Math.random() * speed * 0.8,
		);
		return () => clearTimeout(t);
	}, [n, skip, text, speed]);

	const typing = n < text.length;
	return (
		<>
			<span aria-hidden="true">
				{typing ? text.slice(0, n) : linkify(text)}
				{typing && (
					<span className="sh-caret ml-px inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-rose" />
				)}
			</span>
			<span className="sr-only">{text}</span>
		</>
	);
}

function Boot({ instant, onReady, onTick }) {
	const [step, setStep] = useState(
		instant || reduce?.matches ? BOOT.length : 0,
	);
	const timer = useRef(0);
	useEffect(() => () => clearTimeout(timer.current), []);
	useEffect(() => {
		if (instant) setStep(BOOT.length);
	}, [instant]);
	useEffect(() => {
		if (step >= BOOT.length) onReady();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	const after = (i, pause) => {
		timer.current = setTimeout(() => setStep((s) => Math.max(s, i + 1)), pause);
	};

	return BOOT.slice(0, step + 1).map((line, i) => (
		<p key={i} className={line.cls}>
			<Out
				text={line.text}
				speed={18}
				instant={instant || i < step}
				onTick={onTick}
				onDone={() => after(i, line.pause)}
			/>
		</p>
	));
}

const css = `
@keyframes sh-in{from{opacity:0;transform:translateY(10px) scale(.985)}}
@keyframes sh-bd{from{opacity:0}}
@keyframes sh-fade{from{opacity:0}}
@keyframes sh-sweep{0%{transform:scaleX(0);opacity:1}70%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes sh-blink{50%{opacity:0}}
.sh-bd{animation:sh-bd 200ms ease both}
.sh-in{animation:sh-in 320ms cubic-bezier(.2,.8,.2,1) both}
.sh-fade{animation:sh-fade 500ms ease both}
.sh-sweep{animation:sh-sweep 1800ms cubic-bezier(.65,0,.35,1) both}
.sh-caret{animation:sh-blink 1s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.sh-bd,.sh-in,.sh-fade,.sh-caret{animation:none}.sh-sweep{display:none}}
`;

/* ───────────────────────────── shell ───────────────────────────── */

export default function Shell({ open, onClose }) {
	const [log, setLog] = useState([]);
	const [typing, setTyping] = useState(0);
	const [seen, setSeen] = useState([]);
	const [ready, setReady] = useState(false);
	const [bootShown, setBootShown] = useState(true);
	const [value, setValue] = useState("");
	const [cursor, setCursor] = useState(-1);
	const [idle, setIdle] = useState(0);
	const [beat, setBeat] = useState(0);
	const [pi, setPi] = useState(0);
	const inputRef = useRef(null);
	const boxRef = useRef(null);
	const idRef = useRef(0);
	const missRef = useRef(0);
	const closeRef = useRef(0);
	const readyRef = useRef(false);
	readyRef.current = ready;
	const past = log.map((l) => l.cmd).filter(Boolean);

	const scroll = () => {
		const el = boxRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	};
	const say = (entry) => {
		const id = ++idRef.current;
		setLog((l) => [...l, { id, ...entry }]);
		setTyping(id);
	};
	const poke = () => {
		setIdle(0);
		setBeat((b) => b + 1);
	};

	// focus, Escape, scroll lock
	useEffect(() => {
		if (!open) return;
		inputRef.current?.focus();
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	// a farewell timer must never outlive the shell being open
	useEffect(() => {
		if (!open) clearTimeout(closeRef.current);
	}, [open]);
	useEffect(() => () => clearTimeout(closeRef.current), []);

	// coming back after the first boot
	useEffect(() => {
		if (open && readyRef.current) say({ out: "welcome back." });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	useEffect(scroll, [log]);

	// placeholder drifts while it waits
	useEffect(() => {
		if (!open || !ready) return;
		const t = setInterval(() => setPi((i) => i + 1), 4200);
		return () => clearInterval(t);
	}, [open, ready]);

	// after a quiet spell, nudge toward something unexplored. Then give up gracefully.
	useEffect(() => {
		if (!open || !ready || idle >= 3) return;
		const t = setTimeout(
			() => {
				say({
					out: idle === 2 ? "i'll be here." : hintFor(seen),
					tone: "hint",
				});
				setIdle((i) => i + 1);
			},
			idle === 0 ? 9000 : 14000,
		);
		return () => clearTimeout(t);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, ready, idle, beat, seen]);

	const answer = (cmd) => {
		const direct = has(commands, cmd)
			? cmd
			: has(lookup, cmd)
				? lookup[cmd]
				: null;
		if (direct) return { key: direct };
		if (HELP.test(cmd))
			return { out: `no manual. that's half the fun.\n${hintFor(seen)}` };
		const hit = reactions.find(([re]) => re.test(cmd));
		if (hit) return { out: hit[1](cmd) };
		const token = cmd
			.split(" ")
			.map((t) => (has(commands, t) ? t : has(lookup, t) ? lookup[t] : null))
			.find(Boolean);
		return token ? { key: token } : {};
	};

	const run = (raw) => {
		const clean = raw.trim().toLowerCase().replace(/\s+/g, " ");
		const cmd = clean.replace(/[?!.,]+$/, "") || clean;
		setValue("");
		setCursor(-1);
		poke();
		if (!cmd) return;
		if (cmd === "clear") {
			setLog([]);
			setBootShown(false);
			return;
		}
		if (QUIT.has(cmd)) {
			say({ cmd, out: "connection closed. come back anytime." });
			closeRef.current = setTimeout(onClose, reduce?.matches ? 400 : 900);
			return;
		}
		const a = answer(cmd);
		if (a.key) {
			missRef.current = 0;
			setSeen((s) => (s.includes(a.key) ? s : [...s, a.key]));
			return say({ cmd, out: commands[a.key]() });
		}
		if (a.out) {
			missRef.current = 0;
			return say({ cmd, out: a.out });
		}
		const n = missRef.current++;
		const line = shrugs(cmd)[n % 4];
		say({ cmd, out: n % 3 === 2 ? `${line}\n${hintFor(seen)}` : line });
	};

	const onKeyDown = (e) => {
		if (!ready) setReady(true); // any key skips the intro
		if (e.key === "ArrowUp" && past.length) {
			e.preventDefault();
			const next = cursor < 0 ? past.length - 1 : Math.max(0, cursor - 1);
			setCursor(next);
			setValue(past[next]);
		} else if (e.key === "ArrowDown" && cursor >= 0) {
			e.preventDefault();
			const next = cursor + 1;
			if (next >= past.length) {
				setCursor(-1);
				setValue("");
			} else {
				setCursor(next);
				setValue(past[next]);
			}
		} else if (e.key === "Tab") {
			e.preventDefault();
			const match = names.find((n) => n.startsWith(value.trim().toLowerCase()));
			if (match && value.trim()) setValue(match);
		}
	};

	if (!open) return null;

	const prompts = seen.length ? PROMPTS_AFTER : PROMPTS_FIRST;
	const placeholder = prompts[pi % prompts.length];

	return (
		<div
			className="sh-bd fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
			onMouseDown={onClose}
		>
			<style>{css}</style>
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Portfolio shell"
				onMouseDown={(e) => e.stopPropagation()}
				onClick={() => {
					if (!window.getSelection()?.toString()) inputRef.current?.focus();
				}}
				className="sh-in relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e12] font-mono text-[13px] shadow-2xl shadow-black"
			>
				<span
					aria-hidden="true"
					className="sh-sweep pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-rose/70"
				/>

				<div className="flex items-center justify-between border-b border-line px-4 py-3 text-dim">
					<span>{ready ? "portfolio shell" : "connecting…"}</span>
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer px-1 transition-colors hover:text-paper"
						aria-label="Close shell"
					>
						esc
					</button>
				</div>

				<div
					ref={boxRef}
					role="log"
					aria-relevant="additions"
					className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 leading-relaxed"
				>
					{bootShown && (
						<div className="space-y-1">
							<Boot
								instant={ready}
								onReady={() => setReady(true)}
								onTick={scroll}
							/>
						</div>
					)}
					{log.map((l) => (
						<div key={l.id}>
							{l.cmd && (
								<p>
									<span className="text-rose">›</span>{" "}
									<span className="text-paper">{l.cmd}</span>
								</p>
							)}
							<pre
								className={`whitespace-pre-wrap font-mono ${l.cmd ? "mt-1" : ""} ${l.tone === "hint" || !l.cmd ? "text-dim" : "text-mist"}`}
							>
								<Out text={l.out} instant={l.id !== typing} onTick={scroll} />
							</pre>
						</div>
					))}
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						run(value);
					}}
					className={`flex items-center gap-2 border-t border-line px-4 py-3 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
				>
					<span className="text-rose">›</span>
					<div className="relative min-w-0 flex-1">
						<input
							ref={inputRef}
							value={value}
							onChange={(e) => {
								setValue(e.target.value);
								poke();
							}}
							onKeyDown={onKeyDown}
							aria-label="Command"
							autoComplete="off"
							autoCapitalize="off"
							spellCheck="false"
							className="w-full bg-transparent text-paper caret-rose outline-none focus-visible:outline-none"
						/>
						{!value && ready && (
							<span
								key={placeholder}
								aria-hidden="true"
								className="sh-fade pointer-events-none absolute inset-y-0 left-0 flex items-center text-dim/60"
							>
								{placeholder}
							</span>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
