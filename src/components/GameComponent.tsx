import React, { useState, useEffect } from "react";

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
  difficultyPoints: number;
  correctQuestions: number;
  correctQuestionsInARow: number;
  pointsSystem: any;
}

interface triviaProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

const GameComponent: React.FC<gameProps> = (props) => {
  const [trivias, setTrivias] = useState<Array<triviaProps>>([]);
  const [increment, setIncrement] = useState<number>(0);

  useEffect(() => {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=" +
        props.activeCategory +
        "&limit=" +
        props.amountOfQuestions +
        "&region=" +
        props.selectedRegion +
        "&difficulty=" +
        props.selectedDifficulty.toLowerCase()
    )
      ////////////////////////////////////////////////////////////////TODO fix for "Random" difficulty

      .then((response) => response.json())
      .then((data) => {
        setTrivias(data);
      });
  }, []);

  function correctAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget.value);
  }

  function wrongAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget.value);
  }

  function nextQuestion() {
    setIncrement(increment + 1);
  }

  function result() {
    if (props.showNextButton) props.setShowNextButton(false);
    return (
      <div>
        <p>Your total score is:</p>
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
      {trivias.length !== 0 && (
        <>
          {increment >= trivias.length ? (
            result()
          ) : (
            <div>
              <div>{trivias[increment].question}</div>
              <input
                value={trivias[increment].correctAnswer}
                type="button"
                onClick={(e: any) => correctAnswer(e)}
              ></input>
              {trivias[increment].incorrectAnswers.map(
                (answers: string, index: number) => (
                  <input
                    key={index}
                    value={answers}
                    type="button"
                    onClick={(e: any) => wrongAnswer(e)}
                  ></input>
                )
              )}
            </div>
          )}
        </>
      )}
      {props.showNextButton === true && (
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
