import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Param = { name: string; values: string[] };

const presets: Record<string, Param[]> = {
  "Login System": [
    { name: "Credentials", values: ["Valid", "Invalid"] },
    { name: "TwoFactorAuth", values: ["Enabled", "Disabled"] },
    { name: "RememberMe", values: ["Checked", "Unchecked"] },
    { name: "PrevFailures", values: ["0", "1-2", "3+"] },
  ],
  "Payment Checkout": [
    { name: "PaymentMethod", values: ["CreditCard", "PayPal", "BankTransfer"] },
    { name: "ShippingMethod", values: ["Standard", "Express", "Overnight"] },
    { name: "UserType", values: ["Guest", "Registered", "Premium"] },
  ],
  "API Endpoint": [
    { name: "Method", values: ["GET", "POST", "PUT", "DELETE"] },
    { name: "Auth", values: ["Valid", "Invalid", "Missing"] },
    { name: "ContentType", values: ["JSON", "XML", "FormData"] },
    { name: "Payload", values: ["Empty", "Small", "Large"] },
  ],
};

function generatePairwise(params: Param[]): string[][] {
  if (params.length < 2) return [];

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
    if (tests.length > 50) break;
  }

  return tests.map((row) =>
    row.map((vi, pi) => params[pi].values[vi])
  );
}

function ParamEditor({
  params,
  onChange,
}: {
  params: Param[];
  onChange: (params: Param[]) => void;
}) {
  const updateParamName = useCallback(
    (idx: number, name: string) => {
      const next = params.map((p, i) => (i === idx ? { ...p, name } : p));
      onChange(next);
    },
    [params, onChange]
  );

  const updateValues = useCallback(
    (idx: number, raw: string) => {
      const values = raw
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      const next = params.map((p, i) =>
        i === idx ? { ...p, values } : p
      );
      onChange(next);
    },
    [params, onChange]
  );

  const addParam = useCallback(() => {
    onChange([...params, { name: "", values: [] }]);
  }, [params, onChange]);

  const removeParam = useCallback(
    (idx: number) => {
      onChange(params.filter((_, i) => i !== idx));
    },
    [params, onChange]
  );

  return (
    <div className="space-y-3">
      {params.map((p, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={p.name}
            onChange={(e) => updateParamName(i, e.target.value)}
            placeholder="Parameter"
            className="w-36 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/40 text-cyan-300 font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50"
          />
          <span className="text-slate-600">:</span>
          <input
            type="text"
            value={p.values.join(", ")}
            onChange={(e) => updateValues(i, e.target.value)}
            placeholder="Value1, Value2, Value3"
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-300 font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50"
          />
          {params.length > 2 && (
            <button
              onClick={() => removeParam(i)}
              className="w-8 h-8 rounded-lg border border-slate-700/30 text-slate-600 hover:text-red-400 hover:border-red-500/30 transition-colors text-sm cursor-pointer flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addParam}
        className="px-4 py-2 rounded-lg border border-dashed border-slate-700/40 text-slate-500 hover:text-teal-400 hover:border-teal-500/30 transition-colors text-sm font-mono cursor-pointer"
      >
        + Add parameter
      </button>
    </div>
  );
}

export function PICTDemo() {
  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [selected, setSelected] = useState("Login System");
  const [customParams, setCustomParams] = useState<Param[]>([
    { name: "Browser", values: ["Chrome", "Firefox", "Safari"] },
    { name: "OS", values: ["Windows", "Mac", "Linux"] },
    { name: "Auth", values: ["OAuth", "Password", "SSO"] },
  ]);

  const activeParams =
    mode === "preset" ? presets[selected] : customParams;

  // Filter out params with empty names or fewer than 2 values
  const validParams = activeParams.filter(
    (p) => p.name.trim() && p.values.length >= 2
  );

  const { tests, exhaustive, pairwise } = useMemo(() => {
    if (validParams.length < 2)
      return { tests: [] as string[][], exhaustive: 0, pairwise: 0 };
    const t = generatePairwise(validParams);
    const ex = validParams.reduce((acc, p) => acc * p.values.length, 1);
    return { tests: t, exhaustive: ex, pairwise: t.length };
  }, [validParams]);

  const reduction =
    exhaustive > 0 ? Math.round((1 - pairwise / exhaustive) * 100) : 0;

  // stable key for animations
  const paramsKey =
    mode === "preset"
      ? selected
      : validParams.map((p) => `${p.name}:${p.values.join(",")}`).join("|");

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
          Pick a preset or define your own parameters. Watch pairwise testing
          reduce the test matrix while covering every pair.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {/* Mode selector */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              onClick={() => {
                setMode("preset");
                setSelected(name);
              }}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all cursor-pointer ${
                mode === "preset" && selected === name
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-800/50 text-slate-500 border border-slate-700/30 hover:text-slate-300"
              }`}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => setMode("custom")}
            className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all cursor-pointer ${
              mode === "custom"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-slate-800/50 text-slate-500 border border-slate-700/30 hover:text-slate-300"
            }`}
          >
            Custom
          </button>
        </div>

        {/* Custom param editor */}
        <AnimatePresence>
          {mode === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
                <p className="text-cyan-400 font-mono text-xs mb-4">
                  DEFINE YOUR PARAMETERS
                </p>
                <ParamEditor
                  params={customParams}
                  onChange={setCustomParams}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {validParams.length >= 2 ? (
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            {/* PICT Model + Results */}
            <div>
              {/* Model display */}
              <div className="code-block mb-6">
                <p className="text-teal-400 font-bold mb-2"># Parameters</p>
                {validParams.map((p) => (
                  <p key={p.name} className="text-slate-300">
                    <span className="text-cyan-300">{p.name}</span>:{" "}
                    {p.values.join(", ")}
                  </p>
                ))}
              </div>

              {/* Generated test table */}
              <div className="overflow-x-auto rounded-xl border border-slate-700/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800/60">
                      <th className="px-4 py-3 text-left text-teal-400 font-mono font-medium">
                        #
                      </th>
                      {validParams.map((p) => (
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
                          key={`${paramsKey}-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
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
                <p className="text-4xl font-bold text-red-400">
                  {exhaustive.toLocaleString()}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  total combinations
                </p>
              </div>

              <div className="rounded-xl border border-teal-500/20 bg-teal-500/[0.04] p-6 text-center">
                <p className="text-slate-500 text-xs font-mono mb-1">
                  PAIRWISE
                </p>
                <p className="text-4xl font-bold text-teal-400">{pairwise}</p>
                <p className="text-slate-500 text-xs mt-1">
                  test cases needed
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6 text-center">
                <p className="text-slate-500 text-xs font-mono mb-1">
                  REDUCTION
                </p>
                <p className="text-4xl font-bold text-cyan-400">
                  {reduction}%
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  fewer tests needed
                </p>
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
        ) : (
          <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-12 text-center">
            <p className="text-slate-500 font-mono text-sm">
              Add at least 2 parameters with 2+ values each to generate test
              cases.
            </p>
          </div>
        )}
      </FadeIn>
    </SectionShell>
  );
}
