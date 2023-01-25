import fetchTrivias from "./fetchTrivias";

export default function nextQuestion(
  amountQuestionsLeft: number,
  selectedDifficulty: string,
  activeCategory: string,
  selectedRegion: string,
  setTrivias: any,
  setErrorMessage: any,
  resetRoundCountdown: any,
  nextQuestionWasTriggered: any
) {
  if (amountQuestionsLeft !== 0) {
    if (selectedDifficulty.toLowerCase() === "random") {
      const tempDifficultyArray = ["easy", "medium", "hard"];
      const randNumber = Math.floor(Math.random() * 3);
      fetchTrivias(
        tempDifficultyArray[randNumber],
        activeCategory,
        selectedRegion,
        setTrivias,
        setErrorMessage
      ).then(resetRoundCountdown);
    } else {
      fetchTrivias(
        selectedDifficulty.toLowerCase(),
        activeCategory,
        selectedRegion,
        setTrivias,
        setErrorMessage
      ).then(resetRoundCountdown);
    }
  }
  nextQuestionWasTriggered();
}
