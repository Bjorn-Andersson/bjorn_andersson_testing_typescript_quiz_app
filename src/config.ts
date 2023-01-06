const amountOfQuestions = 9;
const timeLeftToAnswerQuestion = 30000;
const difficulty: string[] = ["Easy", "Medium", "Hard", "Random"];
const difficultyPoints = 1;
const correctQuestions = 0;
const correctQuestionsInARow = 0;
const pointsSystem =
  correctQuestionsInARow > 3
    ? timeLeftToAnswerQuestion * difficultyPoints
    : timeLeftToAnswerQuestion * difficultyPoints +
      correctQuestions * correctQuestionsInARow;

export {
  amountOfQuestions,
  timeLeftToAnswerQuestion,
  difficulty,
  difficultyPoints,
  correctQuestions,
  correctQuestionsInARow,
  pointsSystem,
};
