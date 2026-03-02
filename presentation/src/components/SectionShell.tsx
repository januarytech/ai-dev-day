import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionShell({
  id,
  children,
  className = "",
  dark = true,
}: Props) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center px-6 py-24 ${
        dark ? "bg-[#0a0f1a]" : "bg-[#0d1423]"
      } ${className}`}
    >
      <div className="max-w-5xl w-full">{children}</div>
    </section>
  );
}
