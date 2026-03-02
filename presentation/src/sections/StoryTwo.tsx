import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Cell = { value: string; tested: boolean; bug?: boolean };

const grid: Cell[][] = [
  // weight  ×  destination  ×  speed
  // The grid shows which combinations were tested
  // Bug: international + express + heavy returns wrong rate
];

const steps = [
  {
    label: "The approach",
    content: (
      <>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          After the discount calculator incident, the developer gets more
          careful. This time they're building a{" "}
          <span className="text-white font-semibold">
            shipping rate calculator
          </span>{" "}
          with three inputs.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg border border-slate-700/30 bg-slate-800/30 text-center">
            <p className="text-cyan-400 font-mono text-xs mb-2">WEIGHT</p>
            <p className="text-white text-sm">Light</p>
            <p className="text-white text-sm">Heavy</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-700/30 bg-slate-800/30 text-center">
            <p className="text-cyan-400 font-mono text-xs mb-2">DESTINATION</p>
            <p className="text-white text-sm">Domestic</p>
            <p className="text-white text-sm">International</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-700/30 bg-slate-800/30 text-center">
            <p className="text-cyan-400 font-mono text-xs mb-2">SPEED</p>
            <p className="text-white text-sm">Standard</p>
            <p className="text-white text-sm">Express</p>
          </div>
        </div>
        <p className="text-slate-400">
          They write tests this time — one for each value, making sure every
          input is covered.
        </p>
      </>
    ),
  },
  {
    label: "The tests",
    content: (
      <>
        <div className="code-block mb-4">
          <pre className="text-slate-300 text-sm whitespace-pre-wrap">{`# "I tested every value"
def test_light_package():
    assert rate(weight="light", dest="domestic", speed="standard") == 5.99   # ✓

def test_heavy_package():
    assert rate(weight="heavy", dest="domestic", speed="standard") == 12.99  # ✓

def test_international():
    assert rate(weight="light", dest="intl", speed="standard") == 15.99     # ✓

def test_express():
    assert rate(weight="light", dest="domestic", speed="express") == 9.99   # ✓`}</pre>
        </div>
        <p className="text-slate-400">
          Every value appears in at least one test. Light, heavy, domestic,
          international, standard, express — all covered.{" "}
          <span className="text-green-400">4 tests, 4 passes.</span>
        </p>
      </>
    ),
  },
  {
    label: "The gap",
    content: (
      <>
        <p className="text-slate-300 text-lg mb-6">
          Which combinations were actually tested?
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-700/30 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60">
                <th className="px-4 py-3 text-left text-slate-500 font-mono">
                  Weight
                </th>
                <th className="px-4 py-3 text-left text-slate-500 font-mono">
                  Dest
                </th>
                <th className="px-4 py-3 text-left text-slate-500 font-mono">
                  Speed
                </th>
                <th className="px-4 py-3 text-left text-slate-500 font-mono">
                  Tested?
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Light", "Domestic", "Standard", true],
                ["Light", "Domestic", "Express", true],
                ["Light", "Intl", "Standard", true],
                ["Light", "Intl", "Express", false],
                ["Heavy", "Domestic", "Standard", true],
                ["Heavy", "Domestic", "Express", false],
                ["Heavy", "Intl", "Standard", false],
                ["Heavy", "Intl", "Express", false],
              ].map(([w, d, s, tested], i) => (
                <tr
                  key={i}
                  className={`border-t border-slate-700/20 ${
                    !tested ? "bg-red-500/[0.04]" : ""
                  }`}
                >
                  <td className="px-4 py-2 text-slate-300 font-mono text-xs">
                    {w as string}
                  </td>
                  <td className="px-4 py-2 text-slate-300 font-mono text-xs">
                    {d as string}
                  </td>
                  <td className="px-4 py-2 text-slate-300 font-mono text-xs">
                    {s as string}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">
                    {tested ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-red-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-400">
          <span className="text-red-400 font-semibold">
            4 out of 8 combinations untested.
          </span>{" "}
          Every individual value was covered. But half the{" "}
          <span className="text-white">pairs</span> were never seen together.
        </p>
      </>
    ),
  },
  {
    label: "The bug",
    content: (
      <>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-6 mb-6">
          <p className="text-red-400 font-mono text-sm mb-2">
            BUG — Found by a customer
          </p>
          <div className="code-block mt-3">
            <pre className="text-slate-300 text-sm whitespace-pre-wrap">{`rate(weight="heavy", dest="intl", speed="express")
>>> 5.99   # Should be 45.99
           # Returns the base domestic rate instead`}</pre>
          </div>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed mb-4">
          The bug lived in the{" "}
          <span className="text-red-400 font-semibold">interaction</span>{" "}
          between two inputs — not in any single value. The code applied the
          international surcharge OR the express surcharge, but not both. A
          classic interaction fault.
        </p>
        <div className="p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04]">
          <p className="text-slate-300">
            <span className="text-cyan-400 font-semibold">
              This is exactly what pairwise testing catches.
            </span>{" "}
            PICT guarantees every pair of values appears together in at least
            one test — so the{" "}
            <span className="text-white font-mono text-sm">
              (intl, express)
            </span>{" "}
            combination would have been tested automatically.
          </p>
        </div>
      </>
    ),
  },
];

export function StoryTwo() {
  const [step, setStep] = useState(0);

  return (
    <SectionShell id="story-two">
      <FadeIn>
        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
          Another Story
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          "I tested every value."
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          A developer tested each input. Every value appeared in at least one
          test. It still wasn't enough.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {/* Step navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {steps.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setStep(i)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                step === i
                  ? i === 3
                    ? "bg-red-500/15 text-red-300 border border-red-500/30"
                    : i === 2
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
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
            className="min-h-[320px]"
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
            {step === 1 ? "So what's missing? →" : "Continue →"}
          </button>
        )}
      </FadeIn>
    </SectionShell>
  );
}
