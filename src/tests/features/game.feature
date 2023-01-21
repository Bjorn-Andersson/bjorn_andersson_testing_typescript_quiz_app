Feature: GameComponent

  Scenario
    Given category: History and difficulty: easy and region: GB
    When correct answer is chosen
    Then points should be awarded
