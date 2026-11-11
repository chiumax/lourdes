import { useId, type CSSProperties } from "react";
import paths from "@/lib/signature-paths.json";
import motion from "@/lib/signature-motion.json";

// The trace has two outer contours and their counters. Separate the words by
// contour, not by height: the t ascender overlaps the first word's vertical bounds.
const contours = paths.foreground.match(/M[^M]*/g)!;
let elapsed = motion.initialDelay;
const words = motion.words.map(word => {
  const strokes = word.strokes.map(stroke => {
    const delay = elapsed;
    elapsed += stroke.duration;
    return { ...stroke, delay };
  });
  elapsed += motion.wordGap;
  return { ...word, outline: contours.slice(word.contours[0], word.contours[1]).join(" "), strokes };
});

/** The poster's exact silhouette, revealed by closely traced pen gestures. */
export function Signature({ animated = false }: { animated?: boolean }) {
  const id = useId().replaceAll(":", "");
  if (!animated) return <svg className="signature" viewBox={paths.viewBox} aria-hidden="true" focusable="false"><path fill="currentColor" fillRule="evenodd" d={paths.foreground} /></svg>;

  return (
    <svg className="signature signature-animated" viewBox={paths.viewBox} aria-hidden="true" focusable="false">
      <defs>
        {words.map(word => <mask key={word.name} id={`signature-${id}-${word.name}`} maskUnits="userSpaceOnUse" x="0" y="0" width="610" height="360">
          <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
            {word.strokes.map((stroke, index) => <path
              key={index}
              className="signature-stroke"
              d={stroke.d}
              pathLength="1"
              strokeWidth={stroke.width}
              style={{ "--stroke-duration": `${stroke.duration}s`, "--stroke-delay": `${stroke.delay}s` } as CSSProperties}
            />)}
          </g>
        </mask>)}
      </defs>
      {words.map(word => <path key={word.name} fill="currentColor" fillRule="evenodd" d={word.outline} mask={`url(#signature-${id}-${word.name})`} />)}
    </svg>
  );
}
