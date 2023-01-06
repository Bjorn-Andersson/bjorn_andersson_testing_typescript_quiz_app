import React from "react";

interface buttonProps {
  setSelectedDifficulty: (difficulty: string) => void;
  selectedDifficulty: string;
  difficulty: string[];
}

const SelectDifficulty: React.FC<buttonProps> = (props) => {
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
      {props.difficulty.map(difficultyButtons)}
      <p>Your selected difficulty is: {props.selectedDifficulty}</p>
    </>
  );
};
export default SelectDifficulty;
//easy md hrd rand - slumpar efter varje runda
