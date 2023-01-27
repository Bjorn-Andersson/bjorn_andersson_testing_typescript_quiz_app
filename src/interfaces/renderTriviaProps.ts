import triviaProps from "./triviaProps";

export default interface renderTriviaProps {
  trivias: triviaProps[];
  isDisabled: boolean;
  wrongAnswer: (message: string) => void;
  timerId: number;
  correctGuesses: number;
  correctGuessesInARow: number;
  pointsSystem: (
    correctGuesses: number,
    correctGuessesInARow: number,
    timeLeftToAnswerQuestion: number,
    difficultyPoints: number
  ) => number;
  roundCountdown: number;
  correctAnswerWasPicked: (
    points: number,
    rightGuess: number,
    rightGuessesInARow: number
  ) => void;
}
