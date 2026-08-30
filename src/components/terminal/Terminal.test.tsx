// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Terminal } from "./Terminal";

afterEach(() => {
  cleanup();
});

function renderTerminal() {
  const user = userEvent.setup();
  render(<Terminal />);
  const input = screen.getByRole("textbox", { name: "Escribe un comando" });

  return { input, user };
}

describe("Terminal", () => {
  it("executes a command with Enter and keeps input focus", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "whoami{Enter}");

    expect(screen.getByRole("heading", { name: "Presentación profesional" })).toBeTruthy();
    expect(screen.getByText("Estado: PROVISIONAL")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "14+ años de experiencia en operaciones industriales",
    );
    expect(document.activeElement).toBe(input);
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("runs quick access through the same history-aware flow", async () => {
    const { input, user } = renderTerminal();

    await user.click(screen.getByRole("button", { name: "skills" }));

    expect(screen.getByRole("heading", { name: "Habilidades" })).toBeTruthy();
    expect(document.activeElement).toBe(input);
    await user.keyboard("{ArrowUp}");
    expect((input as HTMLInputElement).value).toBe("skills");
  });

  it("clear removes the transcript but preserves command history and focus", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "about{Enter}");
    await user.type(input, "clear{Enter}");

    expect(screen.queryByRole("heading", { name: "Perfil profesional" })).toBeNull();
    expect(document.activeElement).toBe(input);
    await user.keyboard("{ArrowUp}");
    expect((input as HTMLInputElement).value).toBe("clear");
    await user.keyboard("{ArrowUp}");
    expect((input as HTMLInputElement).value).toBe("about");
  });

  it("navigates history with stable limits and restores the original draft", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "about{Enter}");
    await user.type(input, "skills{Enter}");
    await user.type(input, "dra");
    await user.keyboard("{ArrowUp}");
    expect((input as HTMLInputElement).value).toBe("skills");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    expect((input as HTMLInputElement).value).toBe("about");
    await user.keyboard("{ArrowDown}");
    expect((input as HTMLInputElement).value).toBe("skills");
    await user.keyboard("{ArrowDown}");
    expect((input as HTMLInputElement).value).toBe("dra");
  });

  it("leaves history navigation when the recalled command is edited", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "about{Enter}");
    await user.type(input, "skills{Enter}");
    await user.keyboard("{ArrowUp}");
    await user.type(input, "x");
    await user.keyboard("{ArrowUp}");

    expect((input as HTMLInputElement).value).toBe("skills");
  });

  it("completes a unique command with Tab without moving focus", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "wh");
    await user.keyboard("{Tab}");

    expect((input as HTMLInputElement).value).toBe("whoami");
    expect(document.activeElement).toBe(input);
    expect(screen.getByRole("status").textContent).toContain(
      "Comando completado: whoami",
    );
  });

  it("keeps normal Tab navigation when there is no completion prefix", async () => {
    const { input, user } = renderTerminal();

    await user.click(input);
    await user.keyboard("{Tab}");

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Ejecutar" }),
    );
  });

  it("keeps normal Tab navigation when the command is already complete", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "help");
    await user.keyboard("{Tab}");

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Ejecutar" }),
    );
  });

  it("does not intercept reverse Tab navigation", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "wh");
    await user.keyboard("{Shift>}{Tab}{/Shift}");

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "help" }),
    );
  });

  it("preserves a multiple-match prefix and announces its matches", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "c");
    await user.keyboard("{Tab}");

    expect((input as HTMLInputElement).value).toBe("c");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Ejecutar" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Coincidencias: contact, cv, clear",
    );
  });

  it("preserves an unmatched prefix and announces that there are no matches", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "zzz");
    await user.keyboard("{Tab}");

    expect((input as HTMLInputElement).value).toBe("zzz");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Ejecutar" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      'No hay coincidencias para "zzz"',
    );
  });

  it("does not add an empty execution to command history", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "   {Enter}");
    await user.type(input, "history{Enter}");

    expect(
      screen.getByText("No hay comandos ejecutados antes de esta invocación."),
    ).toBeTruthy();
  });

  it("renders history without including its current invocation", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "about{Enter}");
    await user.type(input, "history{Enter}");

    const historyResult = screen.getByRole("heading", {
      name: "Historial de comandos",
    }).parentElement;
    expect(historyResult?.textContent).toContain("about");
    expect(historyResult?.textContent).not.toContain("history");
  });

  it("announces structured command results", async () => {
    const { input, user } = renderTerminal();

    await user.type(input, "projects{Enter}");

    const announcement = screen.getByRole("status").textContent;
    expect(announcement).toContain("Proyectos");
    expect(announcement).toContain("Industrial Rounds");
    expect(announcement).toContain("Estado funcional: Pendiente de validación");
    expect(announcement).toContain("Repositorio: No disponible");
  });
});
