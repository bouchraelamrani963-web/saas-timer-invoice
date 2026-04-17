"use client";

import { useState, useEffect, useRef } from "react";

interface Entry {
  id: string;
  description: string;
  durationSec: number;
  startedAt: string;
}

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function TimerPage() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed * 1000;
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function handleStart() {
    setElapsed(0);
    setRunning(true);
  }

  function handleStop() {
    setRunning(false);
    if (elapsed > 0) {
      setEntries((prev) => [
        {
          id: crypto.randomUUID(),
          description: description || "Geen omschrijving",
          durationSec: elapsed,
          startedAt: new Date(startRef.current).toISOString(),
        },
        ...prev,
      ]);
      setElapsed(0);
      setDescription("");
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Timer</h1>

      {/* Stopwatch */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
        <div className="text-5xl font-mono font-bold text-gray-900 mb-4 tabular-nums">
          {formatDuration(elapsed)}
        </div>
        <input
          type="text"
          placeholder="Waar werk je aan?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={running}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
        />
        {!running ? (
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="w-full bg-red-500 text-white rounded-xl py-3 font-semibold hover:bg-red-600 transition-colors"
          >
            Stop & Opslaan
          </button>
        )}
      </div>

      {/* History */}
      {entries.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Sessies
          </h2>
          <ul className="space-y-2">
            {entries.map((e) => (
              <li
                key={e.id}
                className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex justify-between items-center"
              >
                <span className="text-sm text-gray-700 truncate max-w-[60%]">{e.description}</span>
                <span className="text-sm font-mono text-blue-600 font-semibold">
                  {formatDuration(e.durationSec)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
