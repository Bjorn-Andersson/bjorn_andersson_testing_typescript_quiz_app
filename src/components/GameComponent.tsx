import React, { useState } from "react";
import useCountDown from "../hooks/useCountDown";
import SelectCategory from "./SelectCategory";

interface gameProps {
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

interface triviaProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: string;
}

const GameComponent: React.FC<gameProps> = (props) => {
  const [trivias, setTrivias] = useState<Array<triviaProps>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const [amountQuestionsLeft, setAmountQuestionsLeft] = useState<number>(
    props.amountOfQuestions
  );
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [correctGuessesInARow, setCorrectGuessesInARow] = useState<number>(0);
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [roundCountdown, resetRoundCountdown] = useCountDown(
    props.timeLeftToAnswerQuestion
  );
  const [nextquestionCountdown, resetQuestionCountdown] = useCountDown(3000);
  const [timerId, setTimerId] = useState<number>(0);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [showCategoryButtons, setShowCategoryButtons] = useState<boolean>(true);
  const [showThreeSeconds, setShowThreeSeconds] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  function fetchTrivias(difficulty: string): Promise<void> {
    return fetch(
      "https://the-trivia-api.com/api/questions?categories=" +
        activeCategory +
        "&limit=1" +
        "&region=" +
        props.selectedRegion +
        "&difficulty=" +
        difficulty
    )
      .then((response): Promise<Array<triviaProps>> => response.json())
      .then((data) => {
        setTrivias(data);
      })
      .catch((error): Promise<void> => {
        if (error.status === 503) {
          setErrorMessage("The service is currently unavailable");
        } else if (error.status === 204 || error.status === 404) {
          const tempDifficultyArray = ["easy", "medium", "hard"];
          const randNumber = Math.floor(Math.random() * 3);
          return fetchTrivias(tempDifficultyArray[randNumber]);
        }
        return Promise.reject();
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
              disabled={isDisabled}
              onClick={correctAnswer}
            ></input>
            {trivia.incorrectAnswers.map((answers: string, index: number) => (
              <input
                key={index}
                value={answers}
                type="button"
                disabled={isDisabled}
                onClick={() => wrongAnswer("Wrong answer!")}
              ></input>
            ))}
          </div>
        ))}
      </>
    );
  }

  function correctAnswer() {
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
    points = props.pointsSystem(
      rightGuess,
      rightGuessesInRow,
      roundCountdown,
      difficultyPointsAwarded
    );

    setAmountQuestionsLeft(amountQuestionsLeft - 1);
    setCurrentPoints(currentPoints + points);
    setCorrectGuesses(rightGuess);
    setCorrectGuessesInARow(rightGuessesInRow);
    setShowCountdown(false);
    setIsDisabled(true);
    setResultText("Correct answer!");
  }

  function wrongAnswer(resultMessage: string) {
    clearTimeout(timerId);

    setAmountQuestionsLeft(amountQuestionsLeft - 1);
    setResultText(resultMessage);
    setShowCountdown(false);
    setIsDisabled(true);
    setCorrectGuessesInARow(0);
  }

  function categoryWasSelected(category: string) {
    createDeadline();

    setTimeout(setShowCategoryButtons, 3000, false);
    setTimeout(nextQuestion, 3000);
    setTimeout(resetQuestionCountdown, 10);

    setActiveCategory(category);
    setShowThreeSeconds(true);
    setIsDisabled(false);
  }

  function createDeadline() {
    const timerID = window.setTimeout(
      wrongAnswer,
      33000,
      "You ran out of time!"
    );
    setTimerId(timerID);
  }

  function nextQuestion() {
    if (amountQuestionsLeft !== 0) {
      if (props.selectedDifficulty.toLowerCase() === "random") {
        const tempDifficultyArray = ["easy", "medium", "hard"];
        const randNumber = Math.floor(Math.random() * 3);
        fetchTrivias(tempDifficultyArray[randNumber]).then(resetRoundCountdown);
      } else {
        fetchTrivias(props.selectedDifficulty.toLowerCase()).then(
          resetRoundCountdown
        );
      }
    }

    setTrivias([]);
    setResultText("");
    setShowCountdown(true);
    setShowThreeSeconds(false);
  }

  function goToNextQuestion() {
    setShowCategoryButtons(true);
  }

  function endResult() {
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
      {errorMessage !== "" ? (
        errorMessage
      ) : (
        <>
          {showCategoryButtons ? (
            <>
              <div id="categoryButtons">
                <SelectCategory categoryWasSelected={categoryWasSelected} />
              </div>
              {showThreeSeconds && (
                <div>
                  <p>Next question in: {nextquestionCountdown}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="activeCategory">
                <p>{activeCategory}</p>
              </div>
              {trivias.length == 0 ? (
                "loading..."
              ) : (
                <>
                  {amountQuestionsLeft == 0 ? (
                    endResult()
                  ) : (
                    <>
                      {renderTrivias()}
                      {showCountdown && (
                        <div>
                          <p>Time left: {roundCountdown} seconds</p>
                        </div>
                      )}
                      <div>
                        <p>Total Points: {currentPoints}</p>
                      </div>
                      <div id="resultText">
                        <p>{resultText}</p>
                      </div>
                      {isDisabled && (
                        <div id="nextButton">
                          <button onClick={goToNextQuestion}>
                            Next Question
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameComponent;
