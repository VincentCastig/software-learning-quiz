import type { Scenario } from "../data/scenarios";
import type { AnswerRecord } from "../types";

interface Props {
  scenarios: Scenario[];
  answers: AnswerRecord[];
  correctCount: number;
  onRestart: () => void;
}

function bandMessage(percent: number): string {
  if (percent === 100) return "Perfect score.";
  if (percent >= 80) return "Strong result — most of these were solid judgment calls.";
  if (percent >= 50) return "Decent start. Worth reviewing the ones you missed below.";
  return "Worth a second pass — review the explanations below before retaking.";
}

// Shown once the activity is done. Takes the full answer log (not just
// the count) so it can render a per-question review — the thing a
// learner actually wants after a quiz: not just "you got 3/5" but
// "here's what you missed and why."
export default function CompletionScreen({ scenarios, answers, correctCount, onRestart }: Props) {
  const total = scenarios.length;
  const percent = Math.round((correctCount / total) * 100);

  return (
    <div className="card completion">
      <h1>Quiz complete</h1>

      <div className="score-summary">
        <p className="score">
          {correctCount} / {total}
          <span className="score-percent"> ({percent}%)</span>
        </p>
        <div className="score-bar-track" aria-hidden="true">
          <div className="score-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <p className="score-message">{bandMessage(percent)}</p>
      </div>

      <button onClick={onRestart}>Restart</button>

      <div className="review">
        <h2>Review</h2>
        <ul className="review-list">
          {scenarios.map((scenario) => {
            const answer = answers.find((a) => a.scenarioId === scenario.id);
            const isCorrect = !!answer?.correct;
            const chosen = scenario.options.find((o) => o.id === answer?.selectedOptionId);
            const correctOption = scenario.options.find((o) => o.id === scenario.correctOptionId);

            return (
              <li key={scenario.id} className={`review-item ${isCorrect ? "correct" : "incorrect"}`}>
                <p className="review-status">{isCorrect ? "Correct" : "Incorrect"}</p>
                <p className="review-prompt">{scenario.prompt}</p>
                <p className="review-line">
                  <strong>Your answer:</strong> {chosen?.text}
                </p>
                {!isCorrect && (
                  <p className="review-line">
                    <strong>Correct answer:</strong> {correctOption?.text}
                  </p>
                )}
                <p className="review-explanation">{scenario.explanation}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
