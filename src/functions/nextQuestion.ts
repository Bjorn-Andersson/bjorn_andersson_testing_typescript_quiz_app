import fetchTrivias from "./fetchTrivias";

export default function nextQuestion(
  amountQuestionsLeft: number,
  selectedDifficulty: string,
  activeCategory: string,
  selectedRegion: string,
  setTrivias: any,
  resetRoundCountdown: () => void,
  nextQuestionWasTriggered: () => void
) {
  if (amountQuestionsLeft !== 0) {
    let difficulty: string;
    if (selectedDifficulty.toLowerCase() === "random") {
      const tempDifficultyArray = ["easy", "medium", "hard"];
      const randNumber = Math.floor(Math.random() * 3);
      difficulty = tempDifficultyArray[randNumber];
    } else {
      difficulty = selectedDifficulty.toLowerCase();
    }
    fetchTrivias(difficulty, activeCategory, selectedRegion)
      .then(setTrivias)
      .then(resetRoundCountdown);
  }
  nextQuestionWasTriggered();
}
