import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";

export function BeforeAfter() {
  return (
    <SectionShell id="before-after" dark={false}>
      <FadeIn>
        <span className="text-teal-400 font-mono text-sm tracking-widest uppercase">
          The Transformation
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-12 text-white">
          Before vs After
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8">
        {/* BEFORE */}
        <FadeIn delay={0.1} direction="left">
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-8 h-full">
            <h3 className="text-red-400 font-mono font-bold text-lg mb-6">
              Without TDD + PICT
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-slate-500 text-xs font-mono mb-2">
                  WORKFLOW
                </p>
                <div className="code-block text-sm">
                  <p className="text-slate-500">1. Describe feature to AI</p>
                  <p className="text-slate-500">2. AI generates code</p>
                  <p className="text-slate-500">3. Manually eyeball it</p>
                  <p className="text-slate-500">4. Write a few happy-path tests</p>
                  <p className="text-red-400">5. Ship and pray</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-mono mb-2">
                  WHAT YOU GET
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    Tests only cover cases you thought of
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    Edge cases discovered in production
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    No proof of combinatorial coverage
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    Vacuous tests that pass before implementation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    "It works on my machine" confidence
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-300 text-sm font-mono text-center">
                  Bug found at 2 AM on Saturday
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* AFTER */}
        <FadeIn delay={0.2} direction="right">
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/[0.04] p-8 h-full">
            <h3 className="text-teal-400 font-mono font-bold text-lg mb-6">
              With TDD + PICT
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-slate-500 text-xs font-mono mb-2">
                  WORKFLOW
                </p>
                <div className="code-block text-sm">
                  <p className="text-slate-400">1. Define stubs</p>
                  <p className="text-slate-400">2. PICT → pairwise test cases</p>
                  <p className="text-slate-400">3. Write tests, verify RED</p>
                  <p className="text-slate-400">4. AI implements to pass tests</p>
                  <p className="text-teal-400">5. All GREEN. Ship with proof.</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-mono mb-2">
                  WHAT YOU GET
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    Systematic coverage of all parameter pairs
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    Edge cases caught before merge
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    Mathematical pairwise coverage proof
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    Tests verified non-vacuous (RED phase)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    "The tests prove it works" confidence
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <p className="text-teal-300 text-sm font-mono text-center">
                  Bug caught at step 4, before code exists
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
