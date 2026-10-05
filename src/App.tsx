import { useState } from "react";
import CompletionScreen from "./components/CompletionScreen";
import Feedback from "./components/Feedback";
import ScenarioCard from "./components/ScenarioCard";
import { scenarios } from "./data/scenarios";
import type { AnswerRecord } from "./types";

// All activity state lives here, in one place, because the activity is
// small and linear — one scenario at a time, one direction through it.
// A context or reducer would be overhead this doesn't need yet; if the
// activity grew branching paths or a save/resume requirement, that's
// the point I'd reach for one.
export default function App() {
  const [index, setIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  // One record per answered question — this is what powers both the score
  // and the per-question review on the completion screen. correctCount is
  // derived from it rather than tracked separately, so there's only one
  // source of truth for "how did they do."
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const isComplete = index >= scenarios.length;
  const current = !isComplete ? scenarios[index] : null;
  const correctCount = answers.filter((a) => a.correct).length;

  function handleSelect(optionId: string) {
    if (submitted) return; // locked — no changing an answer after submit
    setSelectedOptionId(optionId);
  }

  function handleSubmit() {
    if (!current || !selectedOptionId) return;
    setSubmitted(true);
    setAnswers((prev) => [
      ...prev,
      {
        scenarioId: current.id,
        selectedOptionId,
        correct: selectedOptionId === current.correctOptionId,
      },
    ]);
  }

  function handleContinue() {
    setIndex((i) => i + 1);
    setSelectedOptionId(null);
    setSubmitted(false);
  }

  function handleRestart() {
    setIndex(0);
    setSelectedOptionId(null);
    setSubmitted(false);
    setAnswers([]);
  }

  return (
    <main className="app">
      <h1 className="app-title">Software Learning Quiz</h1>

      {isComplete ? (
        <CompletionScreen
          scenarios={scenarios}
          answers={answers}
          correctCount={correctCount}
          onRestart={handleRestart}
        />
      ) : (
        <>
          <ScenarioCard
            scenario={current!}
            index={index}
            total={scenarios.length}
            selectedOptionId={selectedOptionId}
            submitted={submitted}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
          />
          {submitted && selectedOptionId && (
            <Feedback
              scenario={current!}
              selectedOptionId={selectedOptionId}
              isLast={index === scenarios.length - 1}
              onContinue={handleContinue}
            />
          )}
        </>
      )}
    </main>
  );
}
