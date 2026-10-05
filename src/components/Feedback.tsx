import type { Scenario } from "../data/scenarios";

interface Props {
  scenario: Scenario;
  selectedOptionId: string;
  isLast: boolean;
  onContinue: () => void;
}

// Shown only after submission. Separated from ScenarioCard so each
// component has one job: ask the question, or report the result.
export default function Feedback({ scenario, selectedOptionId, isLast, onContinue }: Props) {
  const isCorrect = selectedOptionId === scenario.correctOptionId;

  return (
    <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`} aria-live="polite">
      <p className="feedback-label">{isCorrect ? "Correct" : "Incorrect"}</p>
      <p>{scenario.explanation}</p>
      <button onClick={onContinue} autoFocus>
        {isLast ? "See results" : "Next question"}
      </button>
    </div>
  );
}
