"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: "emerald" | "mocha" | "vermilion"; alpha: number };

const LINK_DISTANCE = 140;
const FRAME_MS = 1000 / 30; // throttle to 30fps

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Constellation layer: small Emerald / Mocha dots (about one in ten Vermilion) drifting slowly, joined by
 * hairlines when close. Runs only while the page's hero ([data-hero]) is on screen and the tab is visible.
 * With prefers-reduced-motion, a single still frame is drawn.
 */
export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = { emerald: "", mocha: "", vermilion: "" };
    const readColors = () => {
      colors.emerald = readToken("--primary");
      colors.mocha = readToken("--mocha");
      colors.vermilion = readToken("--accent");
    };
    readColors();
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let heroVisible = true;
    let running = false;
    let started = false;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const setup = () => {
      // Pixel ratio capped at 2, and at 1 on small screens where the extra pixels cost more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 768 ? 20 : 55;
      nodes = Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(0.1, 0.3);
        const color: Node["color"] = i % 10 === 0 ? "vermilion" : i % 2 ? "emerald" : "mocha";
        return { x: rand(0, width), y: rand(0, height), vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: rand(1.2, 2.2), color, alpha: rand(0.25, 0.4) };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.emerald;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
            ctx.globalAlpha = 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.globalAlpha = n.alpha;
        ctx.fillStyle = colors[n.color];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -4) n.x = width + 4;
        else if (n.x > width + 4) n.x = -4;
        if (n.y < -4) n.y = height + 4;
        else if (n.y > height + 4) n.y = -4;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      step();
      draw();
    };

    const update = () => {
      const shouldRun = started && !reduced && heroVisible && document.visibilityState === "visible";
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    // Pause when the hero (or, on pages without one, the top of the page) leaves the screen.
    const hero = document.querySelector("[data-hero]");
    let observer: IntersectionObserver | null = null;
    const onScroll = () => {
      heroVisible = window.scrollY < window.innerHeight;
      update();
    };
    if (hero) {
      observer = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      });
      observer.observe(hero);
    } else {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        draw();
      }, 200);
    };

    // Start once the page has loaded, the hero has finished its entrance and the main thread is idle,
    // so the canvas never competes with first paint. Until then the canvas is blank (the glows and grid show).
    const start = () => {
      setup();
      draw();
      started = true;
      update();
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = (cb: () => void) => (hasIdle ? window.requestIdleCallback(cb, { timeout: 2500 }) : window.setTimeout(cb, 1200));
    let idleId: number | undefined;
    let delayId = 0;
    const kickOff = () => {
      // Begin drifting after the hero entrance (about 2.5s) and once the main thread is idle.
      delayId = window.setTimeout(() => {
        idleId = idle(start) as number;
      }, 2500);
    };
    // Reduced motion: one still frame, drawn straight away (nothing animates, so there is nothing to defer).
    if (reduced) start();
    else if (document.readyState === "complete") kickOff();
    else window.addEventListener("load", kickOff, { once: true });

    document.addEventListener("visibilitychange", update);
    // Re-read colours when the theme changes (light / dark), and redraw if paused.
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (started) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      observer?.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", kickOff);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", update);
      clearTimeout(resizeTimer);
      clearTimeout(delayId);
      if (idleId !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      }
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="ambient-canvas" />;
}
