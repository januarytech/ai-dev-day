import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";
import { useState } from "react";

const phases = [
  {
    name: "RED",
    color: "red",
    label: "Write failing tests first",
    detail:
      "Define what correct behavior looks like BEFORE any implementation exists. Tests must fail with NotImplementedError — not silently pass.",
    code: `def test_divide_by_zero_raises_error():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

# Run → NotImplementedError ✓ (test is real)`,
    bg: "bg-red-500/[0.06]",
    border: "border-red-500/20",
    glow: "glow-red",
    dot: "bg-red-500",
  },
  {
    name: "GREEN",
    color: "green",
    label: "Write minimum code to pass",
    detail:
      "Implement just enough to make the tests pass. No more. The tests are your specification — satisfy them exactly.",
    code: `def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Run → All tests pass ✓`,
    bg: "bg-green-500/[0.06]",
    border: "border-green-500/20",
    glow: "glow-green",
    dot: "bg-green-500",
  },
  {
    name: "REFACTOR",
    color: "amber",
    label: "Clean up with confidence",
    detail:
      "Now you can restructure, optimize, and beautify. The tests guarantee you haven't broken anything.",
    code: `# Refactor with confidence — tests catch regressions
def divide(a: float, b: float) -> float:
    """Divide a by b, raising ValueError for zero divisor."""
    if not b:
        raise ValueError("Cannot divide by zero")
    return a / b`,
    bg: "bg-amber-500/[0.06]",
    border: "border-amber-500/20",
    glow: "glow-amber",
    dot: "bg-amber-500",
  },
];

export function WhatIsTDD() {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <SectionShell id="tdd">
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          Foundation
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Test-Driven Development
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          Write the test before the code. It sounds backwards until you realize:
          the test is the specification. The code is just the implementation.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Phase selector */}
          <div className="flex md:flex-col gap-3">
            {phases.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex-1 md:flex-none ${
                  active === i
                    ? `${p.bg} ${p.border} ${p.glow}`
                    : "border-slate-700/30 bg-slate-800/20 hover:border-slate-600/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      active === i ? p.dot : "bg-slate-600"
                    }`}
                  />
                  <span
                    className={`font-mono font-bold text-sm ${
                      active === i ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
                <p
                  className={`text-sm ml-6 ${
                    active === i ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {p.label}
                </p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-xl border p-8 ${phase.bg} ${phase.border} ${phase.glow}`}
          >
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              {phase.detail}
            </p>
            <div className="code-block">
              <pre className="text-slate-300 whitespace-pre-wrap">
                {phase.code}
              </pre>
            </div>
          </motion.div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="mt-12 p-6 rounded-xl border border-teal-500/20 bg-teal-500/[0.04]">
          <p className="text-slate-300 text-center">
            <span className="text-teal-400 font-semibold">Key insight:</span>{" "}
            With AI writing implementation, TDD becomes even more valuable —
            the tests verify the AI's output, not your assumptions.
          </p>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
