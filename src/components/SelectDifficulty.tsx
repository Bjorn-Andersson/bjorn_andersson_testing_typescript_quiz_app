import React, { useState } from "react";

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
      <div className="container" key={index}>
        <button
          data-testid={difficulty}
          className="difficultyButton"
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
      {difficulties.map(difficultyButtons)}
      {difficulty !== "" && (
        <p>
          Your selected difficulty is:{" "}
          <span data-testid="difficulty">{difficulty}</span>
        </p>
      )}
    </>
  );
};

export default SelectDifficulty;
