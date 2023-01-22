Feature: GameComponent

  Scenario: Playing through a game round with a correct answer
    Given difficulty: medium and difficultyPoints: 3 and correctAnswers: 4 and correctAnswersInARow: 4 and timeRemaining: 20
    When player chooses correct answer
    Then 76 points should be awarded if the answer is correct
