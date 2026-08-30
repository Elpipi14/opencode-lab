import type {
  CommandOutput,
  OutputItem,
  OutputSection,
  TerminalEntry,
} from "../../commands/types";

interface TerminalOutputProps {
  entries: readonly TerminalEntry[];
}

export function TerminalOutput({ entries }: TerminalOutputProps) {
  return (
    <section className="terminal-output" aria-label="Transcripción de la terminal">
      {entries.map((entry) => (
        <article className="terminal-entry" key={entry.id}>
          <div className="terminal-command">
            <span className="terminal-prompt" aria-hidden="true">
              $
            </span>
            <span>{entry.command}</span>
          </div>
          <ResultContent output={entry.output} entryId={entry.id} />
        </article>
      ))}
    </section>
  );
}

interface ResultContentProps {
  output: CommandOutput;
  entryId: number;
}

function ResultContent({ output, entryId }: ResultContentProps) {
  const titleId = `terminal-result-${entryId}`;

  return (
    <div className="terminal-result" aria-labelledby={titleId}>
      <h2 id={titleId}>{output.title}</h2>
      {output.status && <Status value={output.status} />}
      {output.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {output.sections?.map((section, index) => (
        <ResultSection
          key={`${section.title ?? "section"}-${index}`}
          section={section}
        />
      ))}
    </div>
  );
}

function ResultSection({ section }: { section: OutputSection }) {
  return (
    <section className="result-section">
      {section.title && <h3>{section.title}</h3>}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.list && (
        <ul>
          {section.list.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      )}
      {section.items && (
        <div className="result-items">
          {section.items.map((item) => (
            <ResultItem key={item.title} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function ResultItem({ item }: { item: OutputItem }) {
  return (
    <section className="result-item">
      <h3>{item.title}</h3>
      {item.status && <Status value={item.status} />}
      {item.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {item.details && (
        <dl>
          {item.details.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

function Status({ value }: { value: string }) {
  return <p className="content-status">Estado: {value}</p>;
}
