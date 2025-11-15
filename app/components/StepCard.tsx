import Image from "next/image";
import { ReactNode } from "react";
import clsx from "clsx";

type StepCardProps = {
  number: number;
  title: string;
  summary: string;
  children: ReactNode;
  image?: string;
};

export function StepCard({ number, title, summary, children, image }: StepCardProps) {
  return (
    <article
      className={clsx(
        "bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden",
        "shadow-2xl shadow-black/40"
      )}
    >
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-500/30 flex items-center justify-center text-brand-100 font-semibold">
            {number}
          </div>
          <div>
            <h2 className="text-xl">{title}</h2>
            <p className="text-slate-300 text-sm mt-1 leading-relaxed">{summary}</p>
          </div>
        </div>
        <div className="mt-4 text-slate-100 leading-relaxed space-y-4 text-base">
          {children}
        </div>
      </div>
      {image ? (
        <div className="relative aspect-[3/2]">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}
    </article>
  );
}
