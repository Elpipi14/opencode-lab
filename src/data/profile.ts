import type { ContentStatus } from "./types";

export const profile = {
  status: "PROVISIONAL",
  presentation: [
    "Andrés Piuzzi Rissone",
    "Industrial Operations -> Software Development",
    "14+ años de experiencia en operaciones industriales.",
    "Actualmente ampliando mi perfil hacia desarrollo, automatización e inteligencia artificial.",
  ],
  about: [
    "14+ años de experiencia en operaciones industriales.",
    "Actualmente ampliando mi perfil hacia desarrollo, automatización e inteligencia artificial.",
  ],
} as const satisfies {
  status: ContentStatus;
  presentation: readonly string[];
  about: readonly string[];
};
