import type { PreviewState } from "./fixtures";

const previewStates: PreviewState[] = [
  "populated",
  "empty",
  "loading",
  "error",
];

/**
 * Development-only `?preview=` override for reviewing fixture states. Outside
 * development every workspace renders its real (currently empty) state.
 */
export const parsePreview = (value: unknown): PreviewState | undefined =>
  import.meta.env.DEV && previewStates.includes(value as PreviewState)
    ? (value as PreviewState)
    : undefined;
