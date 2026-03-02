import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Conventions",
    color: "text-teal-400",
    bg: "bg-teal-500/[0.06]",
    border: "border-teal-500/20",
    checks: [
      {
        title: "Constructors over mutation",
        desc: "Objects created with kwargs, not post-construction assignment",
      },
      {
        title: "Inline test data",
        desc: "No module-level constants in parametrize tables",
      },
      {
        title: "pytest.param with id=",
        desc: "Descriptive IDs, not bare tuples or inline comments",
      },
      {
        title: "does_not_raise() pattern",
        desc: "Mixed success/error parametrize uses does_not_raise(), not nullcontext",
      },
      {
        title: "Single comprehensive assertions",
        desc: 'One assert "complete phrase", not three assert "word" checks',
      },
      {
        title: "Factory pattern",
        desc: "DB tests use f.spec()/f.bp(), not manual object creation",
      },
    ],
  },
  {
    name: "PICT Completeness",
    color: "text-cyan-400",
    bg: "bg-cyan-500/[0.06]",
    border: "border-cyan-500/20",
    checks: [
      {
        title: "Parameter coverage",
        desc: "All branching paths represented by at least one test case",
      },
      {
        title: '"Impossible" state analysis',
        desc: "Trace whether excluded combinations are actually unreachable — check skip_validation, legacy data, manual DB edits",
      },
      {
        title: "Expected value verification",
        desc: "Each expected output traced through the actual code path for that input combination",
      },
    ],
  },
  {
    name: "Test Quality",
    color: "text-amber-400",
    bg: "bg-amber-500/[0.06]",
    border: "border-amber-500/20",
    checks: [
      {
        title: "Vacuous test detection",
        desc: "Could any assertion pass regardless of implementation?",
      },
      {
        title: "Distinct code paths",
        desc: "Each parametrized case exercises a different branch — no redundant cases",
      },
      {
        title: "Error specificity",
        desc: "Error cases verify both exception type AND message content with match=",
      },
      {
        title: "False confidence",
        desc: "Tests verify business logic, not just framework passthrough",
      },
    ],
  },
];

export function AdversarialReview() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = categories[activeCategory];

  return (
    <SectionShell id="review">
      <FadeIn>
        <span className="text-amber-400 font-mono text-sm tracking-widest uppercase">
          The Secret Weapon
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Adversarial Test Review
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          Before implementation, a fresh-eyes AI reviewer audits every test
          against a 13-point checklist. It catches what you're blind to.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {/* Category tabs */}
        <div className="flex gap-3 mb-8">
          {categories.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all cursor-pointer ${
                activeCategory === i
                  ? `${c.bg} ${c.color} border ${c.border}`
                  : "bg-slate-800/30 text-slate-500 border border-slate-700/20 hover:text-slate-300"
              }`}
            >
              {c.name}
              <span className="ml-2 text-xs opacity-60">
                ({c.checks.length})
              </span>
            </button>
          ))}
        </div>

        {/* Checklist */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl border ${cat.border} ${cat.bg} p-8`}
          >
            <div className="space-y-4">
              {cat.checks.map((check, i) => (
                <motion.div
                  key={check.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  <span
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded border ${cat.border} flex items-center justify-center`}
                  >
                    <span className={`text-xs ${cat.color}`}>✓</span>
                  </span>
                  <div>
                    <h4 className="text-white font-medium">{check.title}</h4>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {check.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="code-block">
            <p className="text-amber-400 font-bold mb-2">
              # Example finding
            </p>
            <p className="text-slate-300">
              <span className="text-red-400 font-bold">PICT Completeness</span>{" "}
              — test_payment.py:42
            </p>
            <p className="text-slate-400 mt-1">
              Both checkout_transaction_id and nuvei_system_transaction_id set
              simultaneously is excluded as "impossible", but the data property
              reads with skip_validation=True — this state IS reachable and must
              be tested.
            </p>
          </div>
          <div className="flex items-center p-6 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]">
            <p className="text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-semibold">
                This is the step most teams skip.
              </span>{" "}
              The test writer has blind spots — they test what they imagined,
              not what they missed. A separate reviewer with fresh context and a
              rigorous checklist catches the gaps.
            </p>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
