import { useEffect, useState } from "react";

const labels: Record<string, string> = {
  hero: "Start",
  problem: "Problem",
  tdd: "TDD",
  pict: "PICT",
  "pict-demo": "Demo",
  workflow: "Workflow",
  review: "Review",
  "before-after": "Compare",
  results: "Results",
  cta: "Act",
};

export function NavDots({ sections }: { sections: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-2 justify-end"
        >
          <span
            className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              active === i ? "text-teal-400" : "text-slate-500"
            }`}
          >
            {labels[id]}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === i
                ? "w-3 h-3 bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
