import React, { useState, useEffect } from "react";
import useCountDown from "../hooks/useCountDown";
import SelectCategory from "./SelectCategory";

interface gameProps {
  userName: string;
  selectedDifficulty: string;
  selectedRegion: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
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

interface triviaProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: string;
}

const GameComponent: React.FC<gameProps> = (props) => {
  const [trivias, setTrivias] = useState<Array<triviaProps>>([]);
  const [amountQuestionsLeft, setAmountQuestionsLeft] = useState<number>(
    props.amountOfQuestions
  );
  const [resultText, setResultText] = useState<string>("");
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [correctGuessesInARow, setCorrectGuessesInARow] = useState<number>(0);
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [countdown, resetCountdown] = useCountDown(
    props.timeLeftToAnswerQuestion
  );
  const [showTimeLeft, setShowTimeLeft] = useState<number>(0);
  const [showCategoryButtons, setShowCategoryButtons] =
    useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    if (props.selectedDifficulty.toLowerCase() === "random") {
      const tempDifficultyArray = ["easy", "medium", "hard"];
      const randNumber = Math.floor(Math.random() * 3);
      fetchTrivias(tempDifficultyArray[randNumber]);
    } else {
      fetchTrivias(props.selectedDifficulty.toLowerCase());
    }
    setAmountQuestionsLeft(amountQuestionsLeft - 1);
  }, []);

  function fetchTrivias(difficulty: string) {
    fetch(
      ////////////////////////////////////////////////////////////////////////////////////////////////Hittar apiet ingen fråga så ska den försöka igen tills den hittat något
      /////////////////////////////////////////////////////////////////////////////////////////////Är trivia nere så ska användaren bli notifierad att tjänsten är nere.
      "https://the-trivia-api.com/api/questions?categories=" +
        props.activeCategory +
        "&limit=1" +
        "&region=" +
        props.selectedRegion +
        "&difficulty=" +
        difficulty
    )
      .then((response): Promise<Array<triviaProps>> => response.json())
      .then((data) => {
        setTrivias(data);
      });
  }

  function renderTrivias() {
    return (
      <>
        {trivias.map((trivia: triviaProps, index) => (
          <div key={index}>
            <div>{trivia.question}</div>
            <input
              value={trivia.correctAnswer}
              type="button"
              onClick={correctAnswer}
            ></input>
            {trivia.incorrectAnswers.map((answers: string, index: number) => (
              <input
                key={index}
                value={answers}
                type="button"
                onClick={wrongAnswer}
              ></input>
            ))}
          </div>
        ))}
      </>
    );
  }

  function correctAnswer() {
    let timeRemaining = 0;
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

    timeRemaining = countdown;
    rightGuess++;
    rightGuessesInRow++;
    points = props.pointsSystem(
      rightGuess,
      rightGuessesInRow,
      timeRemaining,
      difficultyPointsAwarded
    );

    setCurrentPoints(currentPoints + points);
    setShowTimeLeft(countdown);
    setResultText("Correct answer!");
    setCorrectGuesses(rightGuess);
    setCorrectGuessesInARow(rightGuessesInRow);
    setShowCategoryButtons(true);
    setShowNextButton(true);
    props.setActiveCategory("");
  }

  function wrongAnswer() {
    setResultText("Wrong answer!");
    setShowTimeLeft(countdown);
    /////////////////////////////////////////////////////om tiden tar slut ska inga poang delas ut
    setCorrectGuessesInARow(0);
    setShowCategoryButtons(true);
    setShowNextButton(true);
    props.setActiveCategory("");
  }

  function nextQuestion() {
    /////////////////////////////////////////////////////needs to start automatically 3 seconds after player chooses new category (after each question)
    setAmountQuestionsLeft(amountQuestionsLeft - 1);

    if (amountQuestionsLeft !== 0) {
      fetchTrivias(props.selectedDifficulty.toLowerCase());
    }

    resetCountdown();
    setResultText("");
    setShowTimeLeft(0);
    setShowCategoryButtons(false);
    setShowNextButton(false);
  }

  function endResult() {
    if (showNextButton) setShowNextButton(false);

    return (
      <div>
        <p>Your total score is: {currentPoints}</p>
        <input
          type="button"
          value="Play Again"
          onClick={props.resetGame}
        ></input>
      </div>
    );
  }

  return (
    <>
      {trivias.length == 0 ? (
        "loading..."
      ) : (
        <>
          {amountQuestionsLeft == 0 ? (
            endResult()
          ) : (
            <>
              <div>
                <p>Points: {currentPoints}</p>
              </div>
              <div>
                <p>
                  Time remaining to answer:{" "}
                  {/* Freezes the time visually when an option is selected */}
                  {showTimeLeft === 0 ? countdown : showTimeLeft}
                </p>
              </div>
              {renderTrivias()}
              <div id="resultText">
                <p>{resultText}</p>
              </div>
              {showCategoryButtons && (
                <>
                  <div id="categoryButtons">
                    <SelectCategory
                      setActiveCategory={props.setActiveCategory}
                      activeCategory={props.activeCategory}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      {showNextButton && (
        <div>
          <input
            type="button"
            value="next question"
            onClick={nextQuestion}
          ></input>
        </div>
      )}
    </>
  );
};

export default GameComponent;
