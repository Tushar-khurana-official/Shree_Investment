"use client";

import { LazyMotion, domAnimation, m, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

const MAX_TILT = 4; // degrees

/** Spring-eased tilt toward the cursor, easing back to rest when the pointer leaves. */
export function TiltMotion({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * MAX_TILT);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * MAX_TILT);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={box} onPointerMove={onMove} onPointerLeave={onLeave} style={{ perspective: 1000 }}>
        <m.div style={{ rotateX, rotateY }} className="relative">
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
}
