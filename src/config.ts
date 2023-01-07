const amountOfQuestions = 9;
const timeLeftToAnswerQuestion = 30000;

function pointsSystem(
  correctGuesses: number,
  correctGuessesInARow: number,
  timeLeftToAnswerQuestion: number,
  difficultyPoints: number
) {
  return correctGuessesInARow < 3
    ? timeLeftToAnswerQuestion * difficultyPoints
    : timeLeftToAnswerQuestion * difficultyPoints +
        correctGuesses * correctGuessesInARow;
}

export { amountOfQuestions, timeLeftToAnswerQuestion, pointsSystem };
