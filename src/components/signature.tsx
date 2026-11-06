import { useId } from "react";
import paths from "@/lib/signature-paths.json";

/** The poster's exact traced silhouette, revealed by approximate pen gestures. */
export function Signature() {
  const id = useId().replaceAll(":", "");
  return (
    <svg className="signature" viewBox={paths.viewBox} aria-hidden="true" focusable="false">
      <defs>
        <mask id={`signature-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="610" height="360">
          <g className="signature-reveal" fill="none" stroke="white" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round">
            <path className="signature-stroke signature-first" pathLength="1" d="M24 217 C66 155 102 51 52 48 C-10 42 32 190 79 204 L115 121 C170 63 205 216 151 194 C115 178 97 163 132 155 L181 136 L191 201 Q213 235 231 201 L224 127 L278 119 Q240 216 291 214 Q321 208 324 160 Q322 96 357 108 Q396 121 395 173 Q386 204 354 169 Q426 125 441 64 Q443 6 417 17 Q378 34 396 153 Q409 237 432 184 Q437 140 459 116 Q497 99 476 143 L448 149 Q443 195 483 169 Q505 149 511 116 Q538 91 570 116 L531 152 L589 168 Q620 207 545 210 Q495 210 529 187 L594 165" />
            <path className="signature-stroke signature-second" pathLength="1" d="M40 326 Q33 298 77 292 Q107 278 98 239 Q82 285 121 329 Q105 248 136 246 Q160 245 147 310 Q158 232 180 247 Q197 255 188 321 Q201 346 220 288 Q224 249 244 254 Q274 271 249 294 Q209 312 223 265 Q248 239 260 265 L270 316 Q295 358 294 254 L326 251 Q321 331 347 315 Q378 277 368 228 L373 327 Q388 344 401 289 L406 257 Q407 344 431 311 L447 267 L464 321 Q471 265 489 254 Q518 235 518 308 Q515 364 551 331" />
            <path className="signature-stroke signature-details" pathLength="1" d="M288 239 Q315 218 347 237 Q381 249 398 237 M427 235 L444 222" />
          </g>
          <rect className="signature-complete" width="610" height="360" fill="white" />
        </mask>
      </defs>
      <path fill="currentColor" fillRule="evenodd" d={paths.foreground} mask={`url(#signature-${id})`} />
    </svg>
  );
}
