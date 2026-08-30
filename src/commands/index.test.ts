import { describe, expect, it } from "vitest";
import { commandRegistry, executeCommand } from ".";

describe("command registry and parser", () => {
  it("exposes the current catalog through help", () => {
    expect(commandRegistry.map(({ name }) => name)).toEqual([
      "help",
      "whoami",
      "about",
      "experience",
      "skills",
      "projects",
      "education",
      "contact",
      "cv",
      "clear",
      "history",
    ]);

    const result = executeCommand("  help  ");
    expect(result.type).toBe("output");
    if (result.type === "output") {
      expect(result.output.sections?.[0]?.items?.map(({ title }) => title)).toEqual(
        commandRegistry.map(({ name }) => name),
      );
    }
  });

  it("returns a useful response for an unknown command", () => {
    const result = executeCommand("missing");
    expect(result.type).toBe("output");
    if (result.type === "output") {
      expect(result.output.title).toBe("Comando no encontrado");
      expect(result.output.paragraphs?.[0]).toContain("missing");
    }
  });

  it("returns the clear result", () => {
    expect(executeCommand("clear")).toEqual({ type: "clear" });
  });

  it("keeps the provisional status in whoami", () => {
    const result = executeCommand("whoami");
    expect(result.type).toBe("output");
    if (result.type === "output") {
      expect(result.output.status).toBe("PROVISIONAL");
    }
  });

  it("history shows only commands before its current invocation", () => {
    const previousCommands = ["about", "missing", "clear"];
    const result = executeCommand("history", { history: previousCommands });

    expect(result.type).toBe("output");
    if (result.type === "output") {
      expect(result.output.sections?.[0]?.list).toEqual(previousCommands);
      expect(result.output.sections?.[0]?.list).not.toContain("history");
    }
  });
});
