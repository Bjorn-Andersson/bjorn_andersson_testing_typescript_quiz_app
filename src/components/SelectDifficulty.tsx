import React from "react";

interface buttonProps {
  setSelectedDifficulty: (difficulty: string) => void;
  selectedDifficulty: string;
}

const SelectDifficulty: React.FC<buttonProps> = (props) => {
  const difficulties: string[] = ["Easy", "Medium", "Hard", "Random"];

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.setSelectedDifficulty(event.currentTarget.value);
  }

  function difficultyButtons(difficulty: string, index: number) {
    return (
      <div className="container" key={index}>
        <button
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
      <p>Your selected difficulty is: {props.selectedDifficulty}</p>
    </>
  );
};

export default SelectDifficulty;
