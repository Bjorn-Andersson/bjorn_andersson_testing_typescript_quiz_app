import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("../features/game.feature");

defineFeature(feature, (test) => {
  test("playing through a game round", ({ given, when, then }) => {
    given("category: History and difficulty: easy and region: GB", () => {});
    when("correct answer is chosen", () => {});
    then("Then points should be awarded", () => {});
  });
});
