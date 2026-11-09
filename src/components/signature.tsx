import paths from "@/lib/signature-paths.json";

// Preserve the actual traced mark. The old broad-mask animation revealed adjacent
// letters and did not resemble a real pen stroke; the static asset is more faithful.
export function Signature() {
  return <svg className="signature" viewBox={paths.viewBox} aria-hidden="true" focusable="false"><path fill="currentColor" fillRule="evenodd" d={paths.foreground} /></svg>;
}
