import React from "react";
import correctAnswer from "../functions/correctAnswer";
import triviaProps from "../interfaces/triviaProps";
import renderTriviaProps from "../interfaces/renderTriviaProps";

const renderTrivias: React.FC<renderTriviaProps> = (props) => {
  function callCorrectAnswer() {
    correctAnswer(
      props.timerId,
      props.correctGuesses,
      props.correctGuessesInARow,
      props.trivias,
      props.pointsSystem,
      props.roundCountdown,
      props.correctAnswerWasPicked
    );
  }

  return (
    <>
      {props.trivias.map((trivia: triviaProps, index: number) => (
        <div key={index}>
          <div>{trivia.question}</div>
          <input
            value={trivia.correctAnswer}
            type="button"
            disabled={props.isDisabled}
            onClick={callCorrectAnswer}
          ></input>
          {trivia.incorrectAnswers.map((answers: string, index: number) => (
            <input
              key={index}
              value={answers}
              type="button"
              disabled={props.isDisabled}
              onClick={() => props.wrongAnswer("Wrong answer!")}
            ></input>
          ))}
        </div>
      ))}
    </>
  );
};

export default renderTrivias;
