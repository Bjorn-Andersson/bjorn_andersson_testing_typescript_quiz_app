import React, { useState, useEffect } from "react";
import useCountDown from "../hooks/useCountDown";

interface gameProps {
  userName: string;
  selectedDifficulty: string;
  selectedRegion: string;
  showNextButton: boolean;
  setShowNextButton: (state: boolean) => void;
  activeCategory: string;
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
  const [increment, setIncrement] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [correctGuessesInARow, setCorrectGuessesInARow] = useState<number>(0);
  const [resultText, setResultText] = useState<string>("");
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [showTimeLeft, setShowTimeLeft] = useState<number>(0);
  const [countdown, resetCountdown] = useCountDown(
    props.timeLeftToAnswerQuestion
  );

  useEffect(() => {
    let difficulty = props.selectedDifficulty.toLowerCase();
    const tempArrayOfPromises: Array<Promise<triviaProps>> = [];

    if (difficulty === "random") {
      for (let n = 0; n < 9; n++) {
        const randNumber = Math.floor(Math.random() * 3);
        const tempDifficultyArray = ["easy", "medium", "hard"];
        difficulty = tempDifficultyArray[randNumber];

        const addJsonToArrayPromise = fetch(
          /////////////////////////////////////////////////////////////////////////////////////////////////fix 3 new random categories after each guess
          "https://the-trivia-api.com/api/questions?categories=" +
            props.activeCategory +
            "&limit=1" +
            "&region=" +
            props.selectedRegion +
            "&difficulty=" +
            difficulty
        )
          .then((response): Promise<Array<triviaProps>> => response.json())
          .then((data) => data[0]);

        tempArrayOfPromises.push(addJsonToArrayPromise);
      }

      Promise.all(tempArrayOfPromises).then((data) => {
        setTrivias(data);
      });
    } else {
      fetch(
        ////////////////////////////////////////////////////////////////////////////////////////////////Hittar apiet ingen fråga så ska den försöka igen tills den hittat något
        "https://the-trivia-api.com/api/questions?categories=" +
          props.activeCategory +
          "&limit=" +
          props.amountOfQuestions +
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
  }, []);

  function correctAnswer() {
    let timeRemaining = 0;
    let rightGuess = correctGuesses;
    let rightGuessesInRow = correctGuessesInARow;
    let difficultyPointsAwarded = 0;
    let points = 0;
    switch (trivias[increment].difficulty) {
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
  }

  function wrongAnswer() {
    setResultText("Wrong answer!");
    setShowTimeLeft(countdown);
    setCorrectGuessesInARow(0);
  }

  function nextQuestion() {
    /////////////////////////////////////////////////////needs to start automatically 3 seconds after player chooses new category (after each question)
    resetCountdown();
    setIncrement(increment + 1);
    setResultText("");
    setShowTimeLeft(0);
  }

  function endResult() {
    if (props.showNextButton) props.setShowNextButton(false);

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
          {increment >= trivias.length ? (
            endResult()
          ) : (
            <>
              <div>
                <p>Points: {currentPoints}</p>
              </div>
              <div>
                <p>
                  Time remaining to answer:
                  {/* Freezes the time visually when an option is selected */}
                  {showTimeLeft === 0 ? countdown : showTimeLeft}
                </p>
              </div>
              <div>
                <div>{trivias[increment].question}</div>
                <input
                  value={trivias[increment].correctAnswer}
                  type="button"
                  onClick={correctAnswer}
                ></input>
                {trivias[increment].incorrectAnswers.map(
                  (answers: string, index: number) => (
                    <input
                      key={index}
                      value={answers}
                      type="button"
                      onClick={wrongAnswer}
                    ></input>
                  )
                )}
              </div>
              <div id="resultText">
                <p>{resultText}</p>
              </div>
            </>
          )}
        </>
      )}
      {props.showNextButton && (
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
