import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const end = start + duration * 1000;

    function tick() {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (now < end) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 90,
    suffix: "%",
    label: "Fewer tests than exhaustive",
    detail: "PICT reduces test matrices by 80-90% while maintaining full pairwise coverage",
    color: "text-teal-400",
    border: "border-teal-500/20",
    bg: "bg-teal-500/[0.04]",
  },
  {
    value: 100,
    suffix: "%",
    label: "Pairwise coverage guaranteed",
    detail: "Every pair of parameter values appears together in at least one test case",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
  },
  {
    value: 13,
    suffix: "",
    label: "Point adversarial checklist",
    detail: "Convention violations, PICT gaps, vacuous assertions, and false confidence — all caught before implementation",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.04]",
  },
  {
    value: 6,
    suffix: "",
    label: "Phase verified workflow",
    detail: "Stubs → Tests → RED → Review → Implement → GREEN — implementation is always the second-to-last step",
    color: "text-green-400",
    border: "border-green-500/20",
    bg: "bg-green-500/[0.04]",
  },
];

export function RealResults() {
  return (
    <SectionShell id="results">
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          Why It Works
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          The Numbers
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-16">
          This isn't theory. These are the measurable guarantees you get from
          applying TDD + PICT systematically.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.15}>
            <motion.div
              className={`rounded-xl border ${stat.border} ${stat.bg} p-8`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-5xl font-bold ${stat.color} mb-2`}>
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1.5}
                />
              </p>
              <p className="text-white font-semibold text-lg mb-2">
                {stat.label}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.7}>
        <div className="mt-12 rounded-xl border border-slate-700/30 bg-slate-800/20 p-8">
          <h3 className="text-white font-bold text-xl mb-4">
            The Compound Effect
          </h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            Each layer adds confidence that multiplies with the others:
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {[
              { label: "Stubs", desc: "Contract defined" },
              { label: "×", desc: "" },
              { label: "PICT", desc: "Systematic cases" },
              { label: "×", desc: "" },
              { label: "RED phase", desc: "Tests are real" },
              { label: "×", desc: "" },
              { label: "Review", desc: "Gaps caught" },
              { label: "=", desc: "" },
              { label: "Confidence", desc: "Compounded" },
            ].map((item, i) =>
              item.desc === "" ? (
                <span key={i} className="text-teal-400 text-xl font-bold">
                  {item.label}
                </span>
              ) : (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-lg border ${
                    item.label === "Confidence"
                      ? "border-teal-500/30 bg-teal-500/10"
                      : "border-slate-700/30 bg-slate-800/30"
                  } text-center`}
                >
                  <p
                    className={`text-sm font-bold ${
                      item.label === "Confidence"
                        ? "text-teal-400"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
