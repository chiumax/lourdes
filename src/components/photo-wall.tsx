"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Photo } from "@/lib/photos";
import frame from "@/designs/estrella.module.css";
import s from "./photo-wall.module.css";

type Drag = { x: number; y: number; baseX: number; baseY: number; moved: boolean };

/** Prints on a table: drag them around with the mouse, or tap one to see it full screen. */
export function PhotoWall({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const offsets = useRef(new Map<string, { x: number; y: number }>());
  const drag = useRef<Drag | null>(null);
  const top = useRef(3);

  const start = (event: PointerEvent<HTMLElement>, photo: Photo) => {
    const at = offsets.current.get(photo.src) ?? { x: 0, y: 0 };
    drag.current = { x: event.clientX, y: event.clientY, baseX: at.x, baseY: at.y, moved: false };
    if (event.pointerType !== "mouse") return; // on touch, dragging would fight with scrolling
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.zIndex = String(++top.current);
  };
  const move = (event: PointerEvent<HTMLElement>, photo: Photo) => {
    const held = drag.current;
    if (!held || event.pointerType !== "mouse" || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = held.baseX + event.clientX - held.x, y = held.baseY + event.clientY - held.y;
    if (Math.abs(x - held.baseX) + Math.abs(y - held.baseY) > 6) held.moved = true;
    offsets.current.set(photo.src, { x, y });
    event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  };
  const show = (photo: Photo) => {
    if (drag.current?.moved) return;
    setOpen(photo);
    dialog.current?.showModal();
  };

  return <>
    <div className={s.wall}>
      {photos.map(photo => <figure key={photo.src} className={`${frame.framed} ${frame[photo.frame]} ${s.print}`} style={{ "--tilt": `${photo.tilt}deg` } as CSSProperties}
        onPointerDown={event => start(event, photo)} onPointerMove={event => move(event, photo)}>
        <button type="button" onClick={() => show(photo)} aria-label={`Ampliar foto: ${photo.alt}`}>
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 800px) 46vw, 23vw" draggable={false} />
        </button>
        {photo.note && <figcaption>{photo.note}</figcaption>}
      </figure>)}
    </div>
    <dialog ref={dialog} className={s.lightbox} onClose={() => setOpen(null)} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }} aria-label="Foto ampliada">
      {open && <figure className={`${frame[open.frame]} ${s.big}`}>
        <Image src={open.src} alt={open.alt} width={open.width} height={open.height} sizes="92vw" />
        <form method="dialog"><button className={s.close} aria-label="Cerrar">×</button></form>
      </figure>}
    </dialog>
  </>;
}
