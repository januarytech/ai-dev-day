import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    label: "The prompt",
    content: (
      <>
        <div className="code-block mb-4">
          <p className="text-slate-500 italic mb-2"># The developer's prompt</p>
          <p className="text-slate-300">
            "Build a discount calculator for checkout.{" "}
            <span className="text-teal-300">
              Support percentage discounts, flat dollar discounts, and stacking
              both together.
            </span>
            "
          </p>
        </div>
        <p className="text-slate-400">
          Simple enough. The AI gets to work.
        </p>
      </>
    ),
  },
  {
    label: "The code",
    content: (
      <>
        <div className="code-block mb-4">
          <pre className="text-slate-300 text-sm whitespace-pre-wrap">{`def calc(price: float, pct: float = 0, flat: float = 0) -> float:
    """Apply percentage and/or flat discount to a price."""
    discounted = price * (1 - pct / 100)
    discounted -= flat
    return round(discounted, 2)`}</pre>
        </div>
        <p className="text-slate-400">
          Clean, readable, well-structured. Handles percentages, flat amounts,
          stacking order. The developer reads it, nods.{" "}
          <span className="text-white font-medium">Looks correct.</span>
        </p>
      </>
    ),
  },
  {
    label: "The tests (after)",
    content: (
      <>
        <div className="code-block mb-4">
          <pre className="text-slate-300 text-sm whitespace-pre-wrap">{`# Tests written AFTER the code
def test_percentage_discount():
    assert calc(100, pct=10) == 90.0     # ✓

def test_flat_discount():
    assert calc(100, flat=5) == 95.0     # ✓

def test_stacked_discounts():
    assert calc(100, pct=10, flat=5) == 85.0  # ✓`}</pre>
        </div>
        <p className="text-slate-400">
          Three tests, three passes. The developer confirms the code does what
          it already does. Feels good.{" "}
          <span className="text-slate-500">Ships it.</span>
        </p>
      </>
    ),
  },
  {
    label: "Two weeks later",
    content: (
      <>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-6 mb-4">
          <p className="text-red-400 font-mono text-sm mb-2">
            INCIDENT — Production
          </p>
          <p className="text-white text-lg font-semibold mb-2">
            Customer applies 100% coupon + $50 flat discount to a $30 item.
          </p>
          <div className="code-block mt-3">
            <pre className="text-slate-300 text-sm whitespace-pre-wrap">{`calc(30, pct=100, flat=50)
>>> -20.0   # We owe the customer $20`}</pre>
          </div>
        </div>
        <p className="text-slate-400">
          The system processes a{" "}
          <span className="text-red-400 font-semibold">negative charge</span>.
          The company pays the customer $20 to buy a product.
        </p>
      </>
    ),
  },
  {
    label: "The root cause",
    content: (
      <>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          The tests were written to{" "}
          <span className="text-red-400 font-semibold">
            confirm what the code already did
          </span>
          , not to{" "}
          <span className="text-teal-400 font-semibold">
            define what it should do
          </span>
          .
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/[0.03]">
            <p className="text-red-400 font-mono text-xs mb-1">
              TESTS SECOND
            </p>
            <p className="text-slate-400 text-sm">
              Tests verify the implementation. If the code has a bug, the tests
              encode the bug as correct behavior.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-teal-500/20 bg-teal-500/[0.03]">
            <p className="text-teal-400 font-mono text-xs mb-1">TESTS FIRST</p>
            <p className="text-slate-400 text-sm">
              Tests define the spec. The implementation must satisfy constraints
              the developer chose deliberately — including "total must never go
              below zero."
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export function StoryOne() {
  const [step, setStep] = useState(0);

  return (
    <SectionShell id="story-one" dark={false}>
      <FadeIn>
        <span className="text-red-400 font-mono text-sm tracking-widest uppercase">
          A True Story
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          "The AI wrote it, the tests passed."
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          A developer used AI to build a discount calculator. They wrote tests
          after. Everything looked right.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {/* Step navigation */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setStep(i)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                step === i
                  ? i === 3
                    ? "bg-red-500/15 text-red-300 border border-red-500/30"
                    : i === 4
                      ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                      : "bg-slate-700/40 text-white border border-slate-600/30"
                  : "bg-slate-800/30 text-slate-500 border border-slate-700/20 hover:text-slate-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[280px]"
          >
            {steps[step].content}
          </motion.div>
        </AnimatePresence>

        {/* Forward button */}
        {step < steps.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="mt-6 px-5 py-2.5 rounded-lg text-sm font-mono text-slate-400 border border-slate-700/30 hover:text-white hover:border-slate-500/50 transition-all cursor-pointer"
          >
            {step === 2 ? "What happened next →" : "Continue →"}
          </button>
        )}
      </FadeIn>
    </SectionShell>
  );
}
