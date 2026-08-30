import type { ContentStatus } from "./types";

export const skills = {
  status: "PROVISIONAL",
  categories: [
    "Lenguajes",
    "Frontend",
    "Backend",
    "Bases de datos",
    "Herramientas",
    "IA y automatización",
  ],
  pending:
    "Las tecnologías concretas y los niveles de conocimiento están pendientes de validación.",
} as const satisfies {
  status: ContentStatus;
  categories: readonly string[];
  pending: string;
};
