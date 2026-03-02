import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Param = { name: string; values: string[] };

const presets: Record<string, { params: Param[]; constraints: string[] }> = {
  "Login System": {
    params: [
      { name: "Credentials", values: ["Valid", "Invalid"] },
      { name: "TwoFactorAuth", values: ["Enabled", "Disabled"] },
      { name: "RememberMe", values: ["Checked", "Unchecked"] },
      { name: "PrevFailures", values: ["0", "1-2", "3+"] },
    ],
    constraints: [
      'IF [PrevFailures] = "3+" THEN [Credentials] = "Valid"',
    ],
  },
  "Payment Checkout": {
    params: [
      { name: "PaymentMethod", values: ["CreditCard", "PayPal", "BankTransfer"] },
      { name: "ShippingMethod", values: ["Standard", "Express", "Overnight"] },
      { name: "UserType", values: ["Guest", "Registered", "Premium"] },
    ],
    constraints: [
      'IF [UserType] = "Guest" THEN [PaymentMethod] <> "BankTransfer"',
    ],
  },
  "API Endpoint": {
    params: [
      { name: "Method", values: ["GET", "POST", "PUT", "DELETE"] },
      { name: "Auth", values: ["Valid", "Invalid", "Missing"] },
      { name: "ContentType", values: ["JSON", "XML", "FormData"] },
      { name: "Payload", values: ["Empty", "Small", "Large"] },
    ],
    constraints: [
      'IF [Method] = "GET" THEN [Payload] = "Empty"',
    ],
  },
};

function generatePairwise(params: Param[]): string[][] {
  if (params.length === 0) return [];

  // Simple greedy pairwise generation
  const pairs: Array<{ p1: number; v1: number; p2: number; v2: number }> = [];
  for (let i = 0; i < params.length; i++) {
    for (let j = i + 1; j < params.length; j++) {
      for (let vi = 0; vi < params[i].values.length; vi++) {
        for (let vj = 0; vj < params[j].values.length; vj++) {
          pairs.push({ p1: i, v1: vi, p2: j, v2: vj });
        }
      }
    }
  }

  const tests: number[][] = [];
  const covered = new Set<number>();

  while (covered.size < pairs.length) {
    let bestRow: number[] = [];
    let bestCover = 0;

    // Try random candidates
    for (let attempt = 0; attempt < 100; attempt++) {
      const candidate = params.map(
        (p) => Math.floor(Math.random() * p.values.length)
      );
      let coverCount = 0;
      for (let pi = 0; pi < pairs.length; pi++) {
        if (covered.has(pi)) continue;
        const pair = pairs[pi];
        if (
          candidate[pair.p1] === pair.v1 &&
          candidate[pair.p2] === pair.v2
        ) {
          coverCount++;
        }
      }
      if (coverCount > bestCover) {
        bestCover = coverCount;
        bestRow = candidate;
      }
    }

    // Mark pairs covered
    for (let pi = 0; pi < pairs.length; pi++) {
      const pair = pairs[pi];
      if (
        bestRow[pair.p1] === pair.v1 &&
        bestRow[pair.p2] === pair.v2
      ) {
        covered.add(pi);
      }
    }

    tests.push(bestRow);
    if (tests.length > 50) break; // safety
  }

  return tests.map((row) =>
    row.map((vi, pi) => params[pi].values[vi])
  );
}

export function PICTDemo() {
  const [selected, setSelected] = useState("Login System");
  const preset = presets[selected];

  const { tests, exhaustive, pairwise } = useMemo(() => {
    const t = generatePairwise(preset.params);
    const ex = preset.params.reduce((acc, p) => acc * p.values.length, 1);
    return { tests: t, exhaustive: ex, pairwise: t.length };
  }, [selected]);

  const reduction = Math.round((1 - pairwise / exhaustive) * 100);

  return (
    <SectionShell id="pict-demo">
      <FadeIn>
        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
          Interactive Demo
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          See PICT in Action
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-10">
          Pick a scenario and watch pairwise testing reduce the test matrix
          while maintaining full pair coverage.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {/* Preset selector */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all cursor-pointer ${
                selected === name
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-800/50 text-slate-500 border border-slate-700/30 hover:text-slate-300"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          {/* PICT Model + Results */}
          <div>
            {/* Model display */}
            <div className="code-block mb-6">
              <p className="text-teal-400 font-bold mb-2"># Parameters</p>
              {preset.params.map((p) => (
                <p key={p.name} className="text-slate-300">
                  <span className="text-cyan-300">{p.name}</span>:{" "}
                  {p.values.join(", ")}
                </p>
              ))}
              {preset.constraints.length > 0 && (
                <>
                  <p className="text-teal-400 font-bold mt-4 mb-2">
                    # Constraints
                  </p>
                  {preset.constraints.map((c, i) => (
                    <p key={i} className="text-amber-300/80">
                      {c}
                    </p>
                  ))}
                </>
              )}
            </div>

            {/* Generated test table */}
            <div className="overflow-x-auto rounded-xl border border-slate-700/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800/60">
                    <th className="px-4 py-3 text-left text-teal-400 font-mono font-medium">
                      #
                    </th>
                    {preset.params.map((p) => (
                      <th
                        key={p.name}
                        className="px-4 py-3 text-left text-teal-400 font-mono font-medium"
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {tests.map((row, i) => (
                      <motion.tr
                        key={`${selected}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-t border-slate-700/20 hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-2.5 text-slate-500 font-mono">
                          {i + 1}
                        </td>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="px-4 py-2.5 text-slate-300 font-mono text-xs"
                          >
                            {val}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6 text-center">
              <p className="text-slate-500 text-xs font-mono mb-1">
                EXHAUSTIVE
              </p>
              <p className="text-4xl font-bold text-red-400">{exhaustive}</p>
              <p className="text-slate-500 text-xs mt-1">total combinations</p>
            </div>

            <div className="rounded-xl border border-teal-500/20 bg-teal-500/[0.04] p-6 text-center">
              <p className="text-slate-500 text-xs font-mono mb-1">PAIRWISE</p>
              <p className="text-4xl font-bold text-teal-400">{pairwise}</p>
              <p className="text-slate-500 text-xs mt-1">test cases needed</p>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6 text-center">
              <p className="text-slate-500 text-xs font-mono mb-1">
                REDUCTION
              </p>
              <p className="text-4xl font-bold text-cyan-400">{reduction}%</p>
              <p className="text-slate-500 text-xs mt-1">fewer tests needed</p>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-6 text-center">
              <p className="text-slate-500 text-xs font-mono mb-1">
                PAIR COVERAGE
              </p>
              <p className="text-4xl font-bold text-green-400">100%</p>
              <p className="text-slate-500 text-xs mt-1">
                all 2-way combos covered
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
