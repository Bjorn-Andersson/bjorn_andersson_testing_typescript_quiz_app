import { loadFeature, defineFeature } from "jest-cucumber";
import { pointsSystem as calculatePoints } from "../../config";

const feature = loadFeature("./src/tests/features/game.feature");

defineFeature(feature, (test) => {
  let difficultyPoints: number;
  let correctAnswers: number;
  let correctAnswersInARow: number;
  let timeRemaining: number;
  let points: number;

  test("Playing through a game round with a correct answer", ({
    given,
    when,
    then,
  }) => {
    given(
      /^difficulty: medium and difficultyPoints: (\d+) and correctAnswers: (\d+) and correctAnswersInARow: (\d+) and timeRemaining: (\d+)$/,
      (arg0, arg1, arg2, arg3) => {
        difficultyPoints = parseInt(arg0);
        correctAnswers = parseInt(arg1);
        correctAnswersInARow = parseInt(arg2);
        timeRemaining = parseInt(arg3);
      }
    );
    when("player chooses correct answer", () => {
      points = calculatePoints(
        timeRemaining,
        difficultyPoints,
        correctAnswersInARow,
        correctAnswers
      );
    });
    then(
      /^(\d+) points should be awarded if the answer is correct$/,
      (expected) => {
        expect(points).toBe(parseInt(expected));
      }
    );
  });
});
