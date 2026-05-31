import { useCallback, useState } from "react";

export const useEventLog = () => {
  const [log, setLog] = useState<string[]>([]);

  const addLog = useCallback(
    (msg: string) =>
      setLog((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${msg}`]),
    []
  );

  const clearLog = useCallback(() => setLog([]), []);

  return { log, addLog, clearLog };
};

interface EventLogProps {
  readonly entries: readonly string[];
}

export const EventLog = ({ entries }: EventLogProps) => {
  if (entries.length === 0) return null;

  return (
    <div style={{ marginTop: 16, padding: 14, background: "#1a1a2e", borderRadius: 8 }}>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>Event Log</div>
      {entries.map((entry, i) => (
        <div key={i} style={{ fontSize: 13, color: "#58d499", fontFamily: "monospace" }}>
          {entry}
        </div>
      ))}
    </div>
  );
};
