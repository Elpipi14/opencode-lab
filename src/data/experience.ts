import type { ContentStatus } from "./types";

export const experience = {
  status: "PROVISIONAL",
  years: "14+ años",
  area: "Operaciones industriales",
  areas: [
    "Generación eléctrica",
    "Ciclo combinado",
    "Monitoreo de procesos",
    "Operación de equipos",
    "Rondas de planta",
    "Maniobras operativas",
    "Detección de desvíos",
    "Coordinación con mantenimiento",
  ],
  pending: "Empresa, cargo y fechas pendientes de validación.",
} as const satisfies {
  status: ContentStatus;
  years: string;
  area: string;
  areas: readonly string[];
  pending: string;
};
