import { site } from "@config";

/** Thin ribbon reminding reviewers that the build contains placeholder content. Disable via site.launch. */
export function PlaceholderRibbon() {
  if (!site.launch.showPlaceholderRibbon) return null;
  return (
    <div className="border-b border-accent/40 bg-accent/10 px-4 py-1.5 text-center text-xs text-fg">
      <strong className="font-semibold">Preview build.</strong> This site contains placeholder content, figures and registration
      details marked TODO. Do not rely on them.
    </div>
  );
}
