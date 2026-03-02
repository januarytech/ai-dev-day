import { Hero } from "./sections/Hero";
import { TheProblem } from "./sections/TheProblem";
import { WhatIsTDD } from "./sections/WhatIsTDD";
import { WhatIsPICT } from "./sections/WhatIsPICT";
import { PICTDemo } from "./sections/PICTDemo";
import { TheWorkflow } from "./sections/TheWorkflow";
import { AdversarialReview } from "./sections/AdversarialReview";
import { BeforeAfter } from "./sections/BeforeAfter";
import { RealResults } from "./sections/RealResults";
import { CallToAction } from "./sections/CallToAction";
import { NavDots } from "./components/NavDots";

const sections = [
  "hero",
  "problem",
  "tdd",
  "pict",
  "pict-demo",
  "workflow",
  "review",
  "before-after",
  "results",
  "cta",
];

function App() {
  return (
    <div className="relative">
      <NavDots sections={sections} />
      <Hero />
      <TheProblem />
      <WhatIsTDD />
      <WhatIsPICT />
      <PICTDemo />
      <TheWorkflow />
      <AdversarialReview />
      <BeforeAfter />
      <RealResults />
      <CallToAction />
    </div>
  );
}

export default App;
