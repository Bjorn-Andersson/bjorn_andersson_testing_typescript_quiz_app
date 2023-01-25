import triviaProps from "./triviaProps";

export default interface renderTriviaProps {
  trivias: triviaProps[];
  isDisabled: boolean;
  wrongAnswer: (message: string) => void;
  timerId: number;
  correctGuesses: number;
  correctGuessesInARow: number;
  pointsSystem: any;
  roundCountdown: any;
  correctAnswerWasPicked: (
    points: number,
    rightGuess: number,
    rightGuessesInARow: number
  ) => void;
}
