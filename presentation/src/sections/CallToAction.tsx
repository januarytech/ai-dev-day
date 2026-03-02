import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Encode the workflow as skills",
    desc: "Create Claude Code skills for PICT design, test planning, test writing, and adversarial review. The AI follows the process every time.",
  },
  {
    num: "2",
    title: "Never implement first",
    desc: "Stubs → Tests → RED → Review → Implement → GREEN. If implementation comes before tests, the process is broken.",
  },
  {
    num: "3",
    title: "Challenge 'impossible' states",
    desc: "Before excluding a combination, trace whether it's actually unreachable. Legacy data, skip_validation flags, and manual DB edits create 'impossible' states that are very real.",
  },
  {
    num: "4",
    title: "Prove coverage mathematically",
    desc: "Every plan includes a pairwise coverage proof — enumerate all parameter pairs, verify each combination has a covering test case.",
  },
];

export function CallToAction() {
  return (
    <SectionShell id="cta" dark={false}>
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          Get Started
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Start Tomorrow
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-16">
          You don't need to adopt everything at once. Start with one change
          to your AI workflow and build from there.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.12}>
            <motion.div
              className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-8 h-full"
              whileHover={{
                borderColor: "rgba(20,184,166,0.3)",
                backgroundColor: "rgba(20,184,166,0.03)",
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold font-mono text-sm flex items-center justify-center mb-4">
                {step.num}
              </span>
              <h3 className="text-white font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.6}>
        <div className="text-center">
          <div className="inline-block rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.08] to-cyan-500/[0.04] p-12 max-w-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              AI writes code fast.
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                TDD + PICT makes it correct.
              </span>
            </h3>
            <p className="text-slate-400 mb-8">
              Speed without confidence is just velocity toward bugs.
              <br />
              Build the safety net. Ship with proof.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="text-slate-500 font-mono">
                <span className="text-teal-400">$</span> claude /plan
              </div>
              <span className="text-slate-600">→</span>
              <div className="text-slate-500 font-mono">
                <span className="text-teal-400">$</span> claude /test
              </div>
              <span className="text-slate-600">→</span>
              <div className="text-slate-500 font-mono">
                <span className="text-teal-400">$</span> claude /review
              </div>
              <span className="text-slate-600">→</span>
              <div className="text-teal-400 font-mono font-bold">ship</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.8}>
        <p className="text-center text-slate-600 text-sm font-mono mt-16">
          AI Dev Day 2026
        </p>
      </FadeIn>
    </SectionShell>
  );
}
