import type { ContentStatus } from "./types";

export const education = {
  status: "PROVISIONAL",
  summary:
    "La información concreta sobre institución, carrera, fechas y capacitación técnica está pendiente de validación.",
} as const satisfies {
  status: ContentStatus;
  summary: string;
};
