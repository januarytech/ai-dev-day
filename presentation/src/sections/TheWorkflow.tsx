import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Create Stubs",
    description:
      "Define function signatures that raise NotImplementedError. This creates the contract AI must fulfill.",
    who: "You + AI",
    color: "text-slate-400",
    border: "border-slate-500/20",
    icon: "📐",
  },
  {
    number: "02",
    title: "Write Tests (PICT)",
    description:
      "Use PICT to identify parameters, generate pairwise test cases, and write pytest functions. Tests define the spec.",
    who: "You + AI + PICT",
    color: "text-red-400",
    border: "border-red-500/20",
    icon: "🧪",
  },
  {
    number: "03",
    title: "Run Tests (RED)",
    description:
      "Execute tests. Every test must fail with NotImplementedError — confirming tests are real, not vacuous.",
    who: "CI",
    color: "text-red-400",
    border: "border-red-500/20",
    icon: "🔴",
  },
  {
    number: "04",
    title: "Implement",
    description:
      "NOW write the code. AI generates the implementation with tests as the specification. The tests constrain the solution space.",
    who: "AI",
    color: "text-teal-400",
    border: "border-teal-500/20",
    icon: "⚙️",
  },
  {
    number: "05",
    title: "Run Tests (GREEN)",
    description:
      "All tests pass. You have mathematical proof that every pairwise combination works correctly.",
    who: "CI",
    color: "text-green-400",
    border: "border-green-500/20",
    icon: "🟢",
  },
];

export function TheWorkflow() {
  return (
    <SectionShell id="workflow" dark={false}>
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          The System
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          5-Phase TDD + PICT Workflow
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-16">
          A rigorous, repeatable process that turns AI from a code generator
          into a verified implementer.
        </p>
      </FadeIn>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-slate-500/30 via-teal-500/30 to-green-500/30 hidden md:block" />

        <div className="space-y-6">
          {phases.map((phase, i) => (
            <FadeIn key={phase.number} delay={i * 0.1}>
              <motion.div
                className={`relative flex gap-6 items-start p-6 rounded-xl border ${phase.border} bg-slate-800/20 ml-0 md:ml-12`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-7 w-4 h-4 rounded-full bg-[#0d1423] border-2 border-slate-600 hidden md:block" />

                <span className="text-3xl flex-shrink-0">{phase.icon}</span>

                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-slate-600 font-mono text-xs">
                      {phase.number}
                    </span>
                    <h3 className={`text-xl font-bold ${phase.color}`}>
                      {phase.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-600 bg-slate-800/50 px-2 py-0.5 rounded">
                      {phase.who}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={0.7}>
        <div className="mt-12 p-6 rounded-xl border border-teal-500/20 bg-teal-500/[0.04] text-center">
          <p className="text-slate-300">
            <span className="text-teal-400 font-semibold">Notice:</span>{" "}
            Implementation is step 4 of 5 — not step 1. The AI writes code
            to satisfy a verified specification, not to guess at requirements.
          </p>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
