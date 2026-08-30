import type { ContentStatus } from "./types";

export const cv = {
  status: "TODO",
  summary:
    "No hay un PDF aprobado disponible. Las acciones para abrir o descargar el CV se habilitarán cuando exista una versión validada.",
} as const satisfies {
  status: ContentStatus;
  summary: string;
};
