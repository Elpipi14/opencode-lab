import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { commandRegistry, executeCommand } from "../../commands";
import type { CommandOutput, TerminalEntry } from "../../commands";
import { TerminalOutput } from "./TerminalOutput";

const inputId = "terminal-command-input";
const titleId = "terminal-title";
const primaryShortcuts = [
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
  "cv",
] as const;

interface Announcement {
  id: number;
  message: string;
}

function getOutputAnnouncement(output: CommandOutput) {
  const content = [output.title];

  if (output.status) {
    content.push(`Estado: ${output.status}`);
  }

  content.push(...(output.paragraphs ?? []));

  for (const section of output.sections ?? []) {
    if (section.title) {
      content.push(section.title);
    }
    content.push(...(section.paragraphs ?? []), ...(section.list ?? []));

    for (const item of section.items ?? []) {
      content.push(item.title);
      if (item.status) {
        content.push(`Estado: ${item.status}`);
      }
      content.push(...(item.paragraphs ?? []));
      for (const detail of item.details ?? []) {
        content.push(`${detail.label}: ${detail.value}`);
      }
    }
  }

  return content.join(". ");
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const historyDraft = useRef("");
  const nextEntryId = useRef(0);
  const nextAnnouncementId = useRef(0);

  function focusInput() {
    inputRef.current?.focus();
  }

  function announce(message: string) {
    nextAnnouncementId.current += 1;
    setAnnouncement({ id: nextAnnouncementId.current, message });
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command) {
      setInput("");
      focusInput();
      return;
    }

    const previousCommands = [...commandHistory.current];
    commandHistory.current.push(command);
    const result = executeCommand(command, { history: previousCommands });
    setInput("");
    historyIndex.current = null;
    historyDraft.current = "";

    if (result.type === "clear") {
      setEntries([]);
      announce("Terminal limpia. El prompt continúa disponible.");
      focusInput();
      return;
    }

    nextEntryId.current += 1;
    const entry: TerminalEntry = {
      id: nextEntryId.current,
      command,
      output: result.output,
    };

    setEntries((currentEntries) => [...currentEntries, entry]);
    announce(getOutputAnnouncement(result.output));
    focusInput();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    historyIndex.current = null;
  }

  function handleHistoryNavigation(direction: "up" | "down") {
    const history = commandHistory.current;
    if (history.length === 0) {
      return;
    }

    if (direction === "up") {
      if (historyIndex.current === null) {
        historyDraft.current = input;
        historyIndex.current = history.length - 1;
      } else {
        historyIndex.current = Math.max(0, historyIndex.current - 1);
      }

      setInput(history[historyIndex.current]);
      return;
    }

    if (historyIndex.current === null) {
      return;
    }

    if (historyIndex.current < history.length - 1) {
      historyIndex.current += 1;
      setInput(history[historyIndex.current]);
      return;
    }

    historyIndex.current = null;
    setInput(historyDraft.current);
  }

  function handleTabCompletion() {
    const matches = commandRegistry
      .map(({ name }) => name)
      .filter((name) => name.startsWith(input));

    if (matches.length === 1 && matches[0] !== input) {
      setInput(matches[0]);
      historyIndex.current = null;
      announce(`Comando completado: ${matches[0]}.`);
      return true;
    }

    if (matches.length > 1) {
      announce(`Coincidencias: ${matches.join(", ")}.`);
      return false;
    }

    if (matches.length === 0) {
      announce(`No hay coincidencias para "${input}".`);
    }

    return false;
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      handleHistoryNavigation(event.key === "ArrowUp" ? "up" : "down");
      return;
    }

    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      /^[a-z]+$/.test(input) &&
      handleTabCompletion()
    ) {
      event.preventDefault();
    }
  }

  return (
    <main className="terminal-page">
      <section className="terminal" aria-labelledby={titleId}>
        <header className="terminal-header">
          <div className="terminal-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1 id={titleId}>Terminal CV</h1>
        </header>

        <div className="terminal-body">
          <p className="terminal-intro">
            Escribe <code>help</code> para ver los comandos disponibles.
          </p>

          <nav className="terminal-shortcuts" aria-label="Secciones principales">
            <div className="shortcut-list">
              {primaryShortcuts.map((command) => (
                <button
                  type="button"
                  className="shortcut-button"
                  key={command}
                  onClick={() => runCommand(command)}
                >
                  {command}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="shortcut-button shortcut-button-secondary"
              onClick={() => runCommand("help")}
            >
              help
            </button>
          </nav>

          <TerminalOutput entries={entries} />

          <p
            className="visually-hidden"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {announcement && (
              <span key={announcement.id}>{announcement.message}</span>
            )}
          </p>

          <form className="terminal-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor={inputId}>
              Escribe un comando
            </label>
            <span className="terminal-prompt" aria-hidden="true">
              $
            </span>
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              placeholder="Escribe un comando"
            />
            <button className="execute-button" type="submit">
              Ejecutar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
