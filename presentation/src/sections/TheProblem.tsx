import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";

const problems = [
  {
    icon: "⚡",
    title: "AI generates code in seconds",
    detail:
      "LLMs produce syntactically correct, plausible-looking code at incredible speed.",
  },
  {
    icon: "🎲",
    title: "But correctness is probabilistic",
    detail:
      "Generated code often handles the happy path while silently missing edge cases, boundary conditions, and error states.",
  },
  {
    icon: "🕳️",
    title: "Manual review can't catch what you don't think to check",
    detail:
      'Humans naturally test the cases they imagined. The bugs live in the combinations they didn\'t — the "impossible" states that aren\'t.',
  },
];

export function TheProblem() {
  return (
    <SectionShell id="problem" dark={false}>
      <FadeIn>
        <span className="text-red-400 font-mono text-sm tracking-widest uppercase">
          The Problem
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
          Fast code ≠ Correct code
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-16">
          AI-assisted development has changed how fast we ship. But it hasn't
          changed how bugs are born. If anything, it's made them harder to catch.
        </p>
      </FadeIn>

      <div className="space-y-8">
        {problems.map((p, i) => (
          <FadeIn key={i} delay={i * 0.15}>
            <motion.div
              className="flex gap-6 items-start p-6 rounded-xl border border-red-500/10 bg-red-500/[0.03] glow-red"
              whileHover={{ borderColor: "rgba(239,68,68,0.25)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-3xl flex-shrink-0 mt-1">{p.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{p.detail}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <div className="mt-16 p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 text-center">
          <p className="text-2xl font-semibold text-white mb-2">
            The question isn't{" "}
            <span className="text-red-400">"can AI write the code?"</span>
          </p>
          <p className="text-2xl font-semibold text-white">
            It's{" "}
            <span className="text-teal-400">
              "how do you know the code is right?"
            </span>
          </p>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
