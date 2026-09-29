// Everything the site says lives here, so edits never need to touch layout code.

export const profile = {
	name: "Sanskriti Gupta",
	email: "sanskriti0409@gmail.com",
	phone: "+91 63066 42481",
	phoneHref: "+916306642481",
	location: "Bhopal, India",
	resume: "/resume.pdf",
	links: {
		github: "https://github.com/sanskriti49",
		linkedin: "https://linkedin.com/in/sanskriti49",
		leetcode: "https://leetcode.com/u/sanskriti49",
	},
};

export const milestones = [
	{
		id: "codevita",
		title: "TCS CodeVita",
		value: "Top 2%",
		detail: "Ranked 10,298 out of 669,000+ programmers worldwide.",
		meta: "Global coding contest, 2025",
	},
	{
		id: "leetcode",
		title: "LeetCode",
		count: 390,
		suffix: "+",
		detail: "Data structures and algorithms problems solved in Java.",
		meta: "Graphs, DP, trees, sliding windows",
		href: "https://leetcode.com/u/sanskriti49",
	},
	{
		id: "aws",
		title: "AWS Certified Cloud Practitioner",
		count: 827,
		suffix: "/1000",
		detail: "EC2, S3, IAM and keeping cloud costs in check.",
		meta: "Amazon Web Services, 2026",
	},
];

export const projects = [
	{
		id: "udaan",
		title: "Udaan",
		tagline: "Scholarship tracker for Indian students",
		summary:
			"Scholarship tracker for Indian students. It watches government portals and tells students the moment a rule or deadline changes.",
		points: [
			"Playwright crawlers hash every portal page and diff it, because none of these sites publish an API.",
			"Scraping and reminders run on BullMQ workers, so search stays fast while jobs pile up.",
			"A Redis cache keyed on query hashes cut database reads by over 75%.",
		],
		stack: ["Node.js", "MongoDB", "Redis", "BullMQ", "Playwright"],
		image: "/images/work-udaan-hero.webp",
		width: 903,
		height: 555,
		live: "https://udaan-scholarships.vercel.app/",
		source: "https://github.com/sanskriti49/udaan-scholarship-finder",
	},
	{
		id: "taskgenie",
		title: "TaskGenie",
		tagline: "Marketplace for booking local pros",
		summary:
			"A marketplace for booking verified local pros, from plumbers to hair stylists, with live slots and payments.",
		points: [
			"PostGIS spatial indexes find nearby providers about 80% faster than plain distance queries.",
			"Row-level locks and atomic transactions make double booking impossible.",
			"Razorpay webhooks are signature checked and idempotent, so a dropped checkout refunds itself.",
		],
		stack: ["Node.js", "PostgreSQL", "PostGIS", "Redis", "AWS", "Razorpay"],
		image: "/images/work-taskgenie.webp",
		width: 1400,
		height: 682,
		live: "https://taskgenieee.vercel.app/",
		source: "https://github.com/sanskriti49/service-provider",
	},
	{
		id: "flux",
		title: "Flux",
		tagline: "Real-time sprint board",
		summary:
			"A real-time sprint board. A cycle check stops circular task dependencies before they are saved.",
		stack: ["Node.js", "PostgreSQL", "Socket.IO", "Redis", "AWS S3"],
		image: "/images/work-flux.webp",
		width: 736,
		height: 918,
		fit: "contain",
		live: "https://agile-task-manager-alpha.vercel.app",
		source: "https://github.com/sanskriti49/agile_task_manager",
	},
	{
		id: "companion",
		title: "Companion",
		tagline: "Offline voice assistant for elder care",
		summary:
			"A voice assistant for elders with memory loss. Emergency requests are classified on the phone, so it works without signal.",
		stack: ["Flutter", "Dart", "BERT", "Llama 3.1"],
		image: "/images/work-companion.webp",
		poster: "/images/work-companion-poster.webp",
		width: 640,
		height: 480,
		source: "https://github.com/sanskriti49/dementia-app",
	},
];

export const experience = [
	{
		company: "GeekyAnts",
		role: "Software Engineer Intern",
		period: "Jun 2026 to Aug 2026",
		place: "Remote",
		points: [
			"Built REST APIs and PostgreSQL schemas in Node.js and Express for a wholesale B2B marketplace, tuned for search and filtering.",
			"Added real-time buyer and supplier chat and live order updates with Socket.IO.",
			"Wrote webhook handlers for payment events and automated PDF invoicing.",
		],
		stack: ["Node.js", "Express", "PostgreSQL", "Socket.IO", "JWT", "Webhooks"],
	},
	{
		company: "Google Developer Groups",
		role: "Core Technical Member",
		period: "Nov 2024 to Jul 2025",
		place: "Bhopal",
		points: [
			"Mentored 50+ students across web development and API design bootcamps.",
			"Worked on the REST API for a women's health platform.",
			"Ran workshops on database design, Git and writing clean code.",
		],
		stack: ["REST APIs", "System design", "Mentoring"],
	},
];

export const toolbox = [
	{
		id: "build",
		title: "Build",
		subtitle: "Apps and APIs",
		tint: "#7cc7ff",
		tools: [
			{ name: "Node.js and Express", note: "My default for quick, reliable REST services." },
			{ name: "React", note: "Interfaces with optimistic, snappy state." },
			{ name: "Next.js", note: "Server rendering and SEO for full-stack pages." },
			{ name: "Java", note: "Where I practise DSA, and my go-to for OOP." },
			{ name: "Tailwind CSS", note: "Fast, consistent, responsive layouts." },
		],
	},
	{
		id: "data",
		title: "Data",
		subtitle: "Storing and finding things",
		tint: "#5fe3b0",
		tools: [
			{ name: "PostgreSQL", note: "My favourite for structured data and hard queries." },
			{ name: "PostGIS", note: "Spatial indexes that make radius searches fast." },
			{ name: "MongoDB", note: "Flexible documents for scraped, messy data." },
			{ name: "Redis", note: "Caching with single-digit millisecond reads." },
		],
	},
	{
		id: "realtime",
		title: "Realtime",
		subtitle: "Live updates",
		tint: "#ffc46b",
		tools: [
			{ name: "Socket.IO", note: "Live chat, notifications and order tracking." },
			{ name: "WebSockets", note: "Low-latency links between client and server." },
			{ name: "Redis Pub/Sub", note: "Broadcasting events across server instances." },
		],
	},
	{
		id: "background",
		title: "Background work",
		subtitle: "Queues and workers",
		tint: "#ec8ca0",
		tools: [
			{ name: "BullMQ", note: "Jobs with retries, backoff and deduplication." },
			{ name: "Scheduling", note: "Cron jobs, periodic scrapers, delayed alerts." },
			{ name: "Playwright", note: "Headless browsers for scraping and change tracking." },
		],
	},
	{
		id: "cloud",
		title: "Cloud",
		subtitle: "Hosting and shipping",
		tint: "#c09bff",
		tools: [
			{ name: "AWS S3", note: "Presigned URLs so browsers upload straight to storage." },
			{ name: "AWS EC2", note: "Servers for production workloads." },
			{ name: "Docker", note: "The same app, behaving the same everywhere." },
			{ name: "Terraform", note: "Infrastructure written down as code." },
			{ name: "GitHub Actions", note: "Lint, test and deploy on every push." },
		],
	},
	{
		id: "core",
		title: "Core CS",
		subtitle: "The fundamentals",
		tint: "#9ee6ff",
		tools: [
			{ name: "Data structures and algorithms", note: "390+ LeetCode problems across graphs, DP and trees." },
			{ name: "Databases", note: "Transactions, B-tree indexes, normalization." },
			{ name: "Operating systems", note: "Concurrency, scheduling and memory." },
			{ name: "Object-oriented design", note: "Modular code that is easy to test." },
		],
	},
];
