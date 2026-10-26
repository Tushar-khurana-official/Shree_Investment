import { site } from "@config";
import { Constellation } from "./Constellation";

/**
 * Fixed page background behind all content: Warm Ivory base, two slowly drifting radial glows
 * (Emerald top-left, Vermilion bottom-right), a faint 1px grid rule layer, and the constellation canvas.
 * Turn the animation off site-wide with site.motion.animatedBackground = false.
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-glow ambient-glow-emerald" />
      <div className="ambient-glow ambient-glow-vermilion" />
      <div className="ambient-grid" />
      {site.motion.animatedBackground && <Constellation />}
    </div>
  );
}
