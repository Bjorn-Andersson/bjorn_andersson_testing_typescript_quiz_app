import React, { useState } from "react";
import useCountDown from "../hooks/useCountDown";
import SelectCategory from "./SelectCategory";
import nextQuestion from "../functions/nextQuestion";
import RenderTrivias from "./RenderTrivias";
import triviaProps from "../interfaces/triviaProps";
import gameProps from "../interfaces/gameProps";
import "../styling/gameComponent.css";

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

  function wrongAnswer(resultMessage: string) {
    clearTimeout(timerId);

    setAmountQuestionsLeft(amountQuestionsLeft - 1);
    setResultText(resultMessage);
    setShowCountdown(false);
    setIsDisabled(true);
    setCorrectGuessesInARow(0);
  }

  function nextQuestionWasTriggered() {
    setTrivias([]);
    setResultText("");
    setShowCountdown(true);
    setShowThreeSeconds(false);
  }

  function categoryWasSelected(category: string) {
    createDeadline();

    setTimeout(setShowCategoryButtons, 3000, false);
    setTimeout(() => {
      try {
        nextQuestion(
          props.amountOfQuestions,
          props.selectedDifficulty,
          props.selectedRegion,
          activeCategory,
          setTrivias,
          resetRoundCountdown,
          nextQuestionWasTriggered
        );
      } catch (err: unknown) {
        if (typeof err === "string") setErrorMessage(err);
      }
    }, 3000);
    setTimeout(resetQuestionCountdown, 10);
    setActiveCategory(category);
    setShowThreeSeconds(true);
    setIsDisabled(false);
  }

  function correctAnswerWasPicked(
    points: number,
    rightGuess: number,
    rightGuessesInRow: number
  ) {
    setAmountQuestionsLeft(amountQuestionsLeft - 1);
    setCurrentPoints(currentPoints + points);
    setCorrectGuesses(rightGuess);
    setCorrectGuessesInARow(rightGuessesInRow);
    setShowCountdown(false);
    setIsDisabled(true);
    setResultText("Correct answer!");
  }

  function createDeadline() {
    const timerID = window.setTimeout(
      wrongAnswer,
      33000,
      "You ran out of time!"
    );
    setTimerId(timerID);
  }

  function goToNextQuestion() {
    setShowCategoryButtons(true);
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
                  <p className="countdown">
                    Next question in: {nextquestionCountdown}
                  </p>
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
                    <div className="container">
                      <p className="endResult">
                        Your total score is: {currentPoints}
                      </p>
                      <input
                        type="button"
                        className="nextButton"
                        value="Play Again"
                        onClick={props.resetGame}
                      ></input>
                    </div>
                  ) : (
                    <>
                      <RenderTrivias
                        trivias={trivias}
                        isDisabled={isDisabled}
                        wrongAnswer={wrongAnswer}
                        timerId={timerId}
                        correctGuesses={correctGuesses}
                        correctGuessesInARow={correctGuessesInARow}
                        pointsSystem={props.pointsSystem}
                        roundCountdown={roundCountdown}
                        correctAnswerWasPicked={correctAnswerWasPicked}
                      />
                      {showCountdown && (
                        <div>
                          <p className="timeLeft">
                            Time left: {roundCountdown} seconds
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="points">Total Points: {currentPoints}</p>
                      </div>
                      <div>
                        <p className="resultText">{resultText}</p>
                      </div>
                      {isDisabled && (
                        <div>
                          <button
                            className="nextButton"
                            onClick={goToNextQuestion}
                          >
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
