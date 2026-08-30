import type { ContentStatus } from "./types";

interface ProjectCandidate {
  name: string;
  description: string;
  status: ContentStatus;
  functionalStatus: string;
  technologies: string;
  repository: string;
  demo: string;
}

const pendingProjectDetails = {
  functionalStatus: "Pendiente de validación",
  technologies: "Pendientes de validación",
  repository: "No disponible",
  demo: "No disponible",
} as const;

export const projects: readonly ProjectCandidate[] = [
  {
    name: "Industrial Rounds",
    description:
      "Sistema para digitalizar rondas de operadores industriales y mejorar trazabilidad operativa.",
    status: "PROVISIONAL",
    ...pendingProjectDetails,
  },
  {
    name: "La Variete Content Studio",
    description:
      "Aplicación orientada a organizar productos y generar contenido para negocios gastronómicos.",
    status: "PROVISIONAL",
    ...pendingProjectDetails,
  },
  {
    name: "Fitness Coach Platform",
    description:
      "Aplicación para gestionar programación de entrenamientos entre coaches y atletas.",
    status: "PROVISIONAL",
    ...pendingProjectDetails,
  },
];
