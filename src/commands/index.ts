import { contact } from "../data/contact";
import { cv } from "../data/cv";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import type {
  CommandContext,
  CommandDefinition,
  CommandResult,
} from "./types";

function getHelpResult(): CommandResult {
  return {
    type: "output",
    output: {
      title: "Comandos disponibles",
      sections: [
        {
          items: commandRegistry.map(({ name, description }) => ({
            title: name,
            paragraphs: [description],
          })),
        },
      ],
    },
  };
}

export const commandRegistry: readonly CommandDefinition[] = [
  {
    name: "help",
    description: "Muestra los comandos disponibles.",
    execute: getHelpResult,
  },
  {
    name: "whoami",
    description: "Muestra una presentación profesional corta.",
    execute: () => ({
      type: "output",
      output: {
        title: "Presentación profesional",
        status: profile.status,
        paragraphs: profile.presentation,
      },
    }),
  },
  {
    name: "about",
    description: "Muestra un resumen del perfil profesional.",
    execute: () => ({
      type: "output",
      output: {
        title: "Perfil profesional",
        status: profile.status,
        paragraphs: profile.about,
      },
    }),
  },
  {
    name: "experience",
    description: "Muestra la experiencia profesional.",
    execute: () => ({
      type: "output",
      output: {
        title: "Experiencia",
        status: experience.status,
        sections: [
          {
            title: experience.area,
            paragraphs: [
              `Experiencia: ${experience.years}`,
              experience.pending,
            ],
            list: experience.areas,
          },
        ],
      },
    }),
  },
  {
    name: "skills",
    description: "Muestra las habilidades por categoría.",
    execute: () => ({
      type: "output",
      output: {
        title: "Habilidades",
        status: skills.status,
        paragraphs: [skills.pending],
        sections: [{ title: "Categorías", list: skills.categories }],
      },
    }),
  },
  {
    name: "projects",
    description: "Muestra los proyectos de software.",
    execute: () => ({
      type: "output",
      output: {
        title: "Proyectos",
        status: "PROVISIONAL",
        sections: [
          {
            items: projects.map((project) => ({
              title: project.name,
              status: project.status,
              paragraphs: [project.description],
              details: [
                {
                  label: "Estado funcional",
                  value: project.functionalStatus,
                },
                { label: "Tecnologías", value: project.technologies },
                { label: "Repositorio", value: project.repository },
                { label: "Demo", value: project.demo },
              ],
            })),
          },
        ],
      },
    }),
  },
  {
    name: "education",
    description: "Muestra la formación académica y técnica.",
    execute: () => ({
      type: "output",
      output: {
        title: "Formación",
        status: education.status,
        paragraphs: [education.summary],
      },
    }),
  },
  {
    name: "contact",
    description: "Muestra la información pública de contacto.",
    execute: () => ({
      type: "output",
      output: {
        title: "Contacto",
        status: contact.status,
        paragraphs: [contact.summary],
      },
    }),
  },
  {
    name: "cv",
    description: "Muestra el acceso al CV vigente.",
    execute: () => ({
      type: "output",
      output: {
        title: "CV",
        status: cv.status,
        paragraphs: [cv.summary],
      },
    }),
  },
  {
    name: "clear",
    description: "Limpia el contenido visible de la terminal.",
    execute: () => ({ type: "clear" }),
  },
  {
    name: "history",
    description: "Muestra los comandos ejecutados antes de esta invocación.",
    execute: ({ history }) => ({
      type: "output",
      output: {
        title: "Historial de comandos",
        paragraphs:
          history.length === 0
            ? ["No hay comandos ejecutados antes de esta invocación."]
            : undefined,
        sections:
          history.length > 0
            ? [{ title: "Comandos anteriores", list: history }]
            : undefined,
      },
    }),
  },
];

export function executeCommand(
  input: string,
  context: CommandContext = { history: [] },
): CommandResult {
  const command = input.trim();
  const definition = commandRegistry.find(({ name }) => name === command);

  if (definition) {
    return definition.execute(context);
  }

  return {
    type: "output",
    output: {
      title: "Comando no encontrado",
      paragraphs: [
        `No existe el comando "${command}". Escribe "help" para ver los comandos disponibles.`,
      ],
    },
  };
}

export type {
  CommandContext,
  CommandDefinition,
  CommandOutput,
  CommandResult,
  TerminalEntry,
} from "./types";
