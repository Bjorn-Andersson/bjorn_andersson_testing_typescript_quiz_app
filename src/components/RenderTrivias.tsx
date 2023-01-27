import React, { useState, useEffect } from "react";
import correctAnswer from "../functions/correctAnswer";
import triviaProps from "../interfaces/triviaProps";
import renderTriviaProps from "../interfaces/renderTriviaProps";

const renderTrivias: React.FC<renderTriviaProps> = (props) => {
  const [array, setArray] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    randomizeInputs();
  }, []);

  function randomizeInputs() {
    const valueArray: string[] = [];

    props.trivias.map((trivia: triviaProps) => {
      trivia.incorrectAnswers.map((answer: string) => {
        valueArray.push(answer);
      });
      valueArray.push(trivia.correctAnswer);
      setQuestion(trivia.question);
      setAnswer(trivia.correctAnswer);
    });
    shuffle(valueArray);
    console.log(valueArray);
    setArray(valueArray);
  }

  function shuffle(array: any) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function checkAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.value === answer) {
      correctAnswer(
        props.timerId,
        props.correctGuesses,
        props.correctGuessesInARow,
        props.trivias,
        props.pointsSystem,
        props.roundCountdown,
        props.correctAnswerWasPicked
      );
    } else {
      props.wrongAnswer("Wrong answer! Correct answer was: " + answer);
    }
  }

  return (
    <>
      <div>{question}</div>
      {array.map((answer: string, index: number) => (
        <div key={index}>
          <button
            value={answer}
            disabled={props.isDisabled}
            onClick={checkAnswer}
          >
            {answer}
          </button>
        </div>
      ))}
    </>
  );
};

export default renderTrivias;
