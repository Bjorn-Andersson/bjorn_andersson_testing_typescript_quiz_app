import React, { useState } from "react";
import "../styling/selects.css";

interface buttonProps {
  difficultyWasSelected: (difficulty: string) => void;
}

const SelectDifficulty: React.FC<buttonProps> = (props) => {
  const difficulties: string[] = ["Easy", "Medium", "Hard", "Random"];
  const [difficulty, setDifficulty] = useState<string>("");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.difficultyWasSelected(event.currentTarget.value);
    setDifficulty(event.currentTarget.value);
  }

  function difficultyButtons(difficulty: string, index: number) {
    return (
      <div key={index}>
        <button
          data-testid={difficulty}
          className="button"
          value={difficulty}
          onClick={handleClick}
        >
          {difficulty}
        </button>
      </div>
    );
  }

  return (
    <>
      <h3>Please select difficulty</h3>
      <div className="difficultyContainer">
        {difficulties.map(difficultyButtons)}
      </div>
      {difficulty !== "" && (
        <p className="difficultyText">
          Your selected difficulty is:{" "}
          <span className="difficulty" data-testid="difficulty">
            <b>{difficulty}</b>
          </span>
        </p>
      )}
    </>
  );
};

export default SelectDifficulty;
