export default interface gameProps {
  userName: string;
  selectedDifficulty: string;
  selectedRegion: string;
  resetGame: () => void;
  amountOfQuestions: number;
  timeLeftToAnswerQuestion: number;
  pointsSystem: (
    correctGuesses: number,
    correctGuessesInARow: number,
    timeLeftToAnswerQuestion: number,
    difficultyPoints: number
  ) => number;
}
