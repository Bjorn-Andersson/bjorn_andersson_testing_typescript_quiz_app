import triviaProps from "../interfaces/triviaProps";

export default function correctAnswer(
  timerId: number,
  correctGuesses: number,
  correctGuessesInARow: number,
  trivias: triviaProps[],
  pointsSystem: (
    correctGuesses: number,
    correctGuessesInARow: number,
    timeLeftToAnswerQuestion: number,
    difficultyPoints: number
  ) => number,
  roundCountdown: number,
  correctAnswerWasPicked: (
    points: number,
    rightGuess: number,
    rightGuessesInRow: number
  ) => void
) {
  clearTimeout(timerId);

  let rightGuess = correctGuesses;
  let rightGuessesInRow = correctGuessesInARow;
  let difficultyPointsAwarded = 0;
  let points = 0;

  switch (trivias[0].difficulty) {
    case "easy":
      difficultyPointsAwarded = 1;
      break;
    case "medium":
      difficultyPointsAwarded = 3;
      break;
    case "hard":
      difficultyPointsAwarded = 5;
      break;
  }

  rightGuess++;
  rightGuessesInRow++;
  points = pointsSystem(
    rightGuess,
    rightGuessesInRow,
    roundCountdown,
    difficultyPointsAwarded
  );
  correctAnswerWasPicked(points, rightGuess, rightGuessesInRow);
}
