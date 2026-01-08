export interface Deity {
  id: string;
  name: string;
  pantheon: string;
  vibe_keywords: string[];
  summary: string;
  strengths: string[];
  pitfalls: string[];
  alignment_tips: string[];
  share_text: string;
}

export interface Option {
  label: string;
  scores: Partial<Record<string, number>>;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

/**
 * Computes the result deity based on the answers selected.
 * @param answers Array of selected option indices for each question
 * @param questions The list of questions
 * @param deities The list of deities
 * @returns The deity with the highest score
 */
export function computeResult(
  answers: number[],
  questions: Question[],
  deities: Deity[]
): Deity {
  const totalScores: Record<string, number> = {};

  // Initialize scores
  deities.forEach((d) => {
    totalScores[d.id] = 0;
  });

  // Aggregate scores
  answers.forEach((optionIndex, qIndex) => {
    const question = questions[qIndex];
    if (question && question.options[optionIndex]) {
      const optionScores = question.options[optionIndex].scores;
      Object.entries(optionScores).forEach(([deityId, score]) => {
        if (totalScores[deityId] !== undefined && score !== undefined) {
          totalScores[deityId] += score;
        }
      });
    }
  });

  // Find the deity with the maximum score
  let maxScore = -1;
  let winnerId = deities[0].id;

  // Manual tie-break: The order in deities.json serves as the priority
  // To make it slightly more deterministic/robust, we can use a stable sort
  deities.forEach((d) => {
    if (totalScores[d.id] > maxScore) {
      maxScore = totalScores[d.id];
      winnerId = d.id;
    }
  });

  return deities.find((d) => d.id === winnerId) || deities[0];
}
