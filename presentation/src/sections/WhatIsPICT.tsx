import { SectionShell } from "../components/SectionShell";
import { FadeIn } from "../components/FadeIn";

export function WhatIsPICT() {
  return (
    <SectionShell id="pict" dark={false}>
      <FadeIn>
        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
          The Multiplier
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          PICT: Pairwise Testing
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mb-16">
          You can't test every combination. But you can guarantee that every
          pair of parameter values appears together in at least one test.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <FadeIn delay={0.1} direction="left">
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-8 h-full">
            <h3 className="text-red-400 font-mono font-bold mb-3">
              Without PICT
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  3 parameters × 3 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  27{" "}
                  <span className="text-lg font-normal text-slate-500">
                    exhaustive tests
                  </span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  5 parameters × 4 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  1,024{" "}
                  <span className="text-lg font-normal text-slate-500">
                    exhaustive tests
                  </span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  10 parameters × 3 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  59,049{" "}
                  <span className="text-lg font-normal text-slate-500">
                    exhaustive tests
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="right">
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/[0.04] p-8 h-full">
            <h3 className="text-teal-400 font-mono font-bold mb-3">
              With PICT
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  3 parameters × 3 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  9{" "}
                  <span className="text-lg font-normal text-teal-400">
                    pairwise tests
                  </span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  5 parameters × 4 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  16{" "}
                  <span className="text-lg font-normal text-teal-400">
                    pairwise tests
                  </span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">
                  10 parameters × 3 values each:
                </p>
                <p className="text-4xl font-bold text-white">
                  15{" "}
                  <span className="text-lg font-normal text-teal-400">
                    pairwise tests
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-8">
          <h3 className="text-cyan-400 font-mono font-bold mb-4">
            The Math Behind It
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Research shows that{" "}
            <span className="text-white font-semibold">
              most software defects are caused by interactions between 2
              parameters
            </span>
            , not complex multi-way interactions. PICT exploits this by
            guaranteeing all pairwise combinations are covered — catching the
            vast majority of bugs with a fraction of the tests.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-3xl font-bold text-cyan-400">~70%</p>
              <p className="text-xs text-slate-500 mt-1">
                of bugs caused by single parameters
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-3xl font-bold text-cyan-400">~20%</p>
              <p className="text-xs text-slate-500 mt-1">
                caused by 2-way interactions
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-3xl font-bold text-cyan-400">~10%</p>
              <p className="text-xs text-slate-500 mt-1">
                caused by 3+ interactions
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
