import { Hero } from "./sections/Hero";
import { StoryOne } from "./sections/StoryOne";
import { WhatIsTDD } from "./sections/WhatIsTDD";
import { StoryTwo } from "./sections/StoryTwo";
import { WhatIsPICT } from "./sections/WhatIsPICT";
import { PICTDemo } from "./sections/PICTDemo";
import { TheWorkflow } from "./sections/TheWorkflow";
import { BeforeAfter } from "./sections/BeforeAfter";
import { RealResults } from "./sections/RealResults";
import { CallToAction } from "./sections/CallToAction";
import { NavDots } from "./components/NavDots";

const sections = [
  "hero",
  "story-one",
  "tdd",
  "story-two",
  "pict",
  "pict-demo",
  "workflow",
  "before-after",
  "results",
  "cta",
];

function App() {
  return (
    <div className="relative">
      <NavDots sections={sections} />
      <Hero />
      <StoryOne />
      <WhatIsTDD />
      <StoryTwo />
      <WhatIsPICT />
      <PICTDemo />
      <TheWorkflow />
      <BeforeAfter />
      <RealResults />
      <CallToAction />
    </div>
  );
}

export default App;
