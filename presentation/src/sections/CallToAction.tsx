import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";

const skills = [
  {
    name: "designing-pict-tests",
    desc: "Analyzes inputs, generates PICT models with parameters, values, and constraints. Outputs the model, test case table, and expected results.",
    trigger: "When designing test cases for any feature with multiple inputs",
  },
  {
    name: "planning-python-tests",
    desc: "Produces a structured test plan: PICT analysis, parametrize vs isolated decisions, fixture strategy, TDD phases, and a pairwise coverage proof.",
    trigger: "When planning the test strategy for any implementation",
  },
  {
    name: "writing-python-tests",
    desc: "Enforces pytest conventions during the RED phase: function-based tests, constructors over mutation, inline test data, pytest.param with ids.",
    trigger: "When writing test code",
  },
  {
    name: "reviewing-python-tests",
    desc: "Fresh-eyes review against a checklist: convention violations, PICT completeness gaps, vacuous assertions, and false confidence.",
    trigger: "After tests are written and failing, before implementation",
  },
  {
    name: "writing-python",
    desc: "Covers production code conventions: Literal type reuse, naming, and patterns. Ensures implementation satisfies the test spec.",
    trigger: "When writing or modifying source code (not tests)",
  },
];

export function CallToAction() {
  return (
    <SectionShell id="cta" dark={false}>
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          We Built This
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Skills That Enforce the Workflow
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          These aren't guidelines in a wiki. They're Claude Code skills — the
          AI follows the process automatically, every time.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="space-y-4 mb-16">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 grid md:grid-cols-[220px_1fr_280px] gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{
                borderColor: "rgba(20,184,166,0.3)",
                backgroundColor: "rgba(20,184,166,0.03)",
              }}
            >
              <div>
                <p className="text-teal-400 font-mono text-sm font-semibold">
                  {skill.name}
                </p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {skill.desc}
              </p>
              <p className="text-slate-600 text-xs font-mono leading-relaxed">
                {skill.trigger}
              </p>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="text-center">
          <div className="inline-block rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.08] to-cyan-500/[0.04] p-12 max-w-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              AI writes code fast.
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Skills make it correct.
              </span>
            </h3>
            <p className="text-slate-400 mb-8">
              Encode your team's engineering discipline as skills.
              <br />
              The AI follows the process. Every time. No drift.
            </p>
            <div className="code-block inline-block text-left text-sm">
              <p className="text-slate-500">
                <span className="text-teal-400">$</span> claude{" "}
                <span className="text-slate-300">
                  "add a discount calculator"
                </span>
              </p>
              <p className="text-slate-600 mt-1">
                # Claude auto-invokes: designing-pict-tests
              </p>
              <p className="text-slate-600">
                # → planning-python-tests → writing-python-tests
              </p>
              <p className="text-slate-600">
                # → reviewing-python-tests → writing-python
              </p>
              <p className="text-green-400 mt-1">
                # All tests pass. Ship with proof.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.7}>
        <p className="text-center text-slate-600 text-sm font-mono mt-16">
          github.com/azhadsyed/azhads-claude-code-marketplace
        </p>
      </FadeIn>
    </SectionShell>
  );
}
