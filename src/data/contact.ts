import type { ContentStatus } from "./types";

export const contact = {
  status: "TODO",
  summary:
    "No hay datos públicos confirmados de email, GitHub, LinkedIn o ubicación.",
} as const satisfies {
  status: ContentStatus;
  summary: string;
};
