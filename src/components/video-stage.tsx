"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { videoPoster, videoUrl, type Video } from "@/lib/videos";
import s from "./video-stage.module.css";

/**
 * One large player and a row of other videos. Nothing from YouTube loads until the visitor
 * presses play; choosing another video swaps it into the large player and starts it.
 */
export function VideoStage({ featured, groups }: { featured: Video; groups: { label: string; videos: Video[] }[] }) {
  const [current, setCurrent] = useState(featured);
  const [playing, setPlaying] = useState(false);
  const choose = (video: Video) => { setCurrent(video); setPlaying(true); screen.current?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  const screen = useRef<HTMLDivElement>(null);

  return <div className={s.stage}>
    <div className={s.screen} ref={screen}>
      {playing
        ? <iframe key={current.id} title={current.title} src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&hl=es`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
        : <button type="button" className={s.poster} onClick={() => setPlaying(true)} aria-label={`Reproducir: ${current.title}`}>
            <Image src={videoPoster(current.id, "large")} alt="" width={1280} height={720} sizes="(max-width: 800px) 92vw, 1100px" />
            <span className={s.play} aria-hidden="true">▶</span>
          </button>}
      <p className={s.now}><span>{playing ? "sonando" : "videoclip"}</span>{current.title}</p>
    </div>
    {groups.filter(group => group.videos.length > 0).map((group, index) => <div key={group.label}>
      <h3 className={s.groupTitle}>{group.label}</h3>
      <ul className={s.more}>
        {(index === 0 ? [featured, ...group.videos] : group.videos).filter(video => video.id !== current.id).slice(0, 4).map(video => <li key={video.id}>
          <a href={videoUrl(video.id)} onClick={event => { event.preventDefault(); choose(video); }}>
            <span className={s.thumb}><Image src={videoPoster(video.id)} alt="" width={480} height={360} sizes="(max-width: 800px) 45vw, 260px" /><span className={s.playSmall} aria-hidden="true">▶</span></span>
            <span className={s.caption}>{video.title}</span>
          </a>
        </li>)}
      </ul>
    </div>)}
  </div>;
}
