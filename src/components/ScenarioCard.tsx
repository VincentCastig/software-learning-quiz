import type { Scenario } from "../data/scenarios";

interface Props {
  scenario: Scenario;
  index: number;
  total: number;
  selectedOptionId: string | null;
  submitted: boolean;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
}

// Pure presentational component: it only knows how to render one scenario
// and report events back up. App owns the actual state.
export default function ScenarioCard({
  scenario,
  index,
  total,
  selectedOptionId,
  submitted,
  onSelect,
  onSubmit,
}: Props) {
  return (
    <div className="card">
      <p className="progress-label">
        Question {index + 1} of {total}
      </p>
      <fieldset className="scenario-fieldset">
        <legend className="prompt">{scenario.prompt}</legend>
        <div className="options">
          {scenario.options.map((opt) => (
            <label key={opt.id} className="option">
              <input
                type="radio"
                name={scenario.id}
                value={opt.id}
                checked={selectedOptionId === opt.id}
                disabled={submitted}
                onChange={() => onSelect(opt.id)}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {!submitted && (
        <button onClick={onSubmit} disabled={!selectedOptionId}>
          Submit answer
        </button>
      )}
    </div>
  );
}
