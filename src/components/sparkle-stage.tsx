"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import s from "./sparkle-stage.module.css";

type Burst = { id: number; x: number; y: number };
const particles = Array.from({ length: 10 }, (_, index) => index);

/**
 * Page wrapper for the two pointer effects: it publishes the pointer position as
 * `--mx` / `--my` (-1 to 1) for parallax, and throws a burst of stars wherever the visitor taps.
 */
export function SparkleStage({ className, children }: { className?: string; children: ReactNode }) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    event.currentTarget.style.setProperty("--mx", ((event.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    event.currentTarget.style.setProperty("--my", ((event.clientY / window.innerHeight) * 2 - 1).toFixed(3));
  };
  const burst = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setBursts(current => [...current.slice(-4), { id, x: event.clientX - box.left, y: event.clientY - box.top }]);
  };

  return <div className={`${s.stage} ${className ?? ""}`} data-design="estrella" onPointerMove={follow} onPointerDown={burst}>
    {children}
    {bursts.map(({ id, x, y }) => <span key={id} className={s.burst} style={{ left: x, top: y }} aria-hidden="true"
      onAnimationEnd={event => { if (event.target === event.currentTarget.lastElementChild) setBursts(current => current.filter(item => item.id !== id)); }}>
      {particles.map(index => <i key={index} style={{ "--angle": `${index * 36 + (id % 3) * 12}deg`, "--reach": `${70 + ((index * 37 + id * 13) % 60)}px` } as React.CSSProperties} />)}
    </span>)}
  </div>;
}
