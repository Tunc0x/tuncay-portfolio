import { useEffect, useRef, useState } from 'react';

const stages = [
  {
    name: 'Verify',
    label: 'FastAPI / HMAC',
    detail:
      'Verify the GitHub signature before accepting the webhook. A unique delivery ID makes retries safe.',
  },
  {
    name: 'Persist',
    label: 'PostgreSQL / outbox',
    detail:
      'Store the delivery and its outbox record together in one database transaction.',
  },
  {
    name: 'Publish',
    label: 'Publisher / SQS',
    detail:
      'A background publisher sends pending outbox records to the SQS queue.',
  },
  {
    name: 'Process',
    label: 'Background worker',
    detail:
      'The worker normalises GitHub push activity into timeline events with source-event provenance.',
  },
  {
    name: 'Commit',
    label: 'Timeline / acknowledge',
    detail:
      'Commit the timeline update before acknowledging the queue message. Repeated deliveries do not create duplicate events.',
  },
];
export function Pipeline() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  function replay() {
    if (timer.current) clearInterval(timer.current);
    setActive(0);
    setRunning(true);
    let index = 0;
    timer.current = setInterval(
      () => {
        index++;
        if (index === stages.length) {
          clearInterval(timer.current!);
          setRunning(false);
          return;
        }
        setActive(index);
      },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 1700
        : 1000,
    );
  }
  function select(index: number) {
    if (timer.current) clearInterval(timer.current);
    setRunning(false);
    setActive(index);
  }
  return (
    <div className="pipeline-lab">
      <div className="lab-heading">
        <span className="mono">GITHUB PUSH → TIMELINE</span>
        <span className="lab-type">Architecture explorer</span>
      </div>
      <div
        className="pipeline-stages"
        role="group"
        aria-label="Inspect an ingestion stage"
      >
        {stages.map((s, i) => (
          <button
            key={s.name}
            className={`pipeline-stage ${active === i ? 'is-active' : ''} ${active > i ? 'is-complete' : ''}`}
            aria-pressed={active === i}
            onClick={() => select(i)}
          >
            <span className="stage-number">0{i + 1}</span>
            <span className="stage-symbol" aria-hidden="true">
              {['◇', '▤', '⇢', '⌘', '✓'][i]}
            </span>
            <strong>{s.name}</strong>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <div className="pipeline-detail">
        <div aria-live="polite" aria-atomic="true">
          <span className="mono">
            0{active + 1} / {stages[active].name.toUpperCase()}
          </span>
          <p>{stages[active].detail}</p>
        </div>
        <button className="small-button" onClick={replay} disabled={running}>
          {running ? 'Replaying…' : 'Replay an event'}
          <span aria-hidden="true">↻</span>
        </button>
      </div>
      <div className="pipeline-note mono">
        IMPLEMENTED FLOW · INSPECT EACH STAGE
      </div>
    </div>
  );
}

const appointments = [
  {
    day: 1,
    hour: 9,
    title: 'Consultation',
    category: 'Consultation',
    time: '09:00–10:00',
  },
  {
    day: 2,
    hour: 10,
    title: 'Follow-up',
    category: 'Follow-up',
    time: '10:00–11:00',
  },
  {
    day: 3,
    hour: 9,
    title: 'Consultation',
    category: 'Consultation',
    time: '09:00–10:00',
  },
  {
    day: 4,
    hour: 11,
    title: 'Follow-up',
    category: 'Follow-up',
    time: '11:00–12:00',
  },
  {
    day: 5,
    hour: 10,
    title: 'Consultation',
    category: 'Consultation',
    time: '10:00–11:00',
  },
];
export function Scheduler() {
  const [view, setView] = useState('Week');
  const [filter, setFilter] = useState('All categories');
  const [selection, setSelection] = useState('');
  const visible = appointments.filter(
    (a) => filter === 'All categories' || a.category === filter,
  );
  return (
    <div className="scheduler-lab">
      <div className="calendar-toolbar">
        <div>
          <span className="mono">APPOINTMENTS</span>
          <strong>One week. In focus.</strong>
        </div>
        <div className="segmented" role="group" aria-label="Calendar view">
          {['Week', 'List'].map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setSelection('');
              }}
              aria-pressed={view === v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <label className="calendar-filter">
        <span>Show</span>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSelection('');
          }}
        >
          <option>All categories</option>
          <option>Consultation</option>
          <option>Follow-up</option>
        </select>
        <span className="sample-label">Illustrative data</span>
      </label>
      {view === 'Week' ? (
        <div className="calendar-grid">
          <div className="calendar-corner" />
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
            <div key={d} className="calendar-day">
              {d}
            </div>
          ))}
          {[9, 10, 11].map((h) => (
            <div className="calendar-time" style={{ gridRow: h - 7 }} key={h}>
              {h}:00
            </div>
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="calendar-cell"
              style={{
                gridColumn: (i % 5) + 2,
                gridRow: Math.floor(i / 5) + 2,
              }}
            />
          ))}
          {visible.map((a) => (
            <button
              key={a.day}
              className={`appointment ${a.category === 'Follow-up' ? 'purple' : ''}`}
              style={{ gridColumn: a.day + 1, gridRow: a.hour - 7 }}
              onClick={() =>
                setSelection(
                  `${a.title} · ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][a.day - 1]} · ${a.time}`,
                )
              }
            >
              <span>{a.time.split('–')[0]}</span>
              {a.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="appointment-list">
          {visible.map((a) => (
            <button
              key={a.day}
              onClick={() => setSelection(`${a.title} · ${a.time}`)}
            >
              <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][a.day - 1]}</span>
              <strong>{a.title}</strong>
              <span>{a.time}</span>
            </button>
          ))}
        </div>
      )}
      <p className="calendar-selection" aria-live="polite">
        {selection ||
          `${visible.length} sample appointments · Select one to inspect`}
      </p>
    </div>
  );
}

export function ConceptMap() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="concept-lab">
      <div className="lab-heading">
        <span className="mono">PROGRESSIVE DISCLOSURE</span>
        <button
          className="text-button"
          aria-pressed={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Focus the map' : 'Reveal connections'}{' '}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
      </div>
      <svg
        viewBox="0 0 580 290"
        className={expanded ? 'concept-map expanded' : 'concept-map'}
        role="img"
        aria-label={
          expanded
            ? 'Expanded concept map: learning section connects to conversational guidance, visual cues, concept mapping, evaluation and telemetry.'
            : 'Focused concept map: learning section connects to conversational guidance and visual cues.'
        }
      >
        <g className="map-lines" fill="none" stroke="#6b665a">
          <path d="M290 75L145 142M290 75L435 142" />
          <g className="map-extra">
            <path d="M145 142L92 234M145 142L270 234M435 142L487 234M270 234h217" />
          </g>
        </g>
        <g className="map-node">
          <rect x="208" y="45" width="164" height="48" rx="5" />
          <text x="290" y="74">
            Learning section
          </text>
        </g>
        <g className="map-node secondary">
          <rect x="56" y="120" width="178" height="45" rx="5" />
          <text x="145" y="148">
            Conversational guidance
          </text>
          <rect x="365" y="120" width="140" height="45" rx="5" />
          <text x="435" y="148">
            Visual cues
          </text>
        </g>
        <g className="map-node map-extra secondary">
          <rect x="24" y="212" width="136" height="45" rx="5" />
          <text x="92" y="240">
            Concept mapping
          </text>
          <rect x="205" y="212" width="130" height="45" rx="5" />
          <text x="270" y="240">
            Evaluation
          </text>
          <rect x="420" y="212" width="134" height="45" rx="5" />
          <text x="487" y="240">
            Telemetry
          </text>
        </g>
        {!expanded && (
          <text className="map-hint" x="290" y="250">
            A little less at once. More when it’s needed.
          </text>
        )}
      </svg>
      <div className="mono lab-footnote">
        ILLUSTRATION OF THE INTERACTION PRINCIPLE
      </div>
    </div>
  );
}
