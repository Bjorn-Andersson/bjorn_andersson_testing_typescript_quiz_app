import React, { useState } from "react";

const SelectDifficulty: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const difficulties: string[] = ["Easy", "Medium", "Hard", "Random"];

  function handleClick(event: any) {
    event.preventDefault();
    setSelectedDifficulty(event.target.value);
  }

  function difficultyButtons(difficulty: string) {
    return (
      <div className="container">
        <button
          className="difficultyButton"
          value={difficulty}
          onClick={(event) => handleClick(event)}
        >
          {difficulty}
        </button>
      </div>
    );
  }

  return (
    <>
      <h3>Please select difficulty</h3>
      {difficulties.map((difficulty) => difficultyButtons(difficulty))}
      <p>Your selected difficulty is: {selectedDifficulty}</p>
    </>
  );
};
export default SelectDifficulty;
//easy md hrd rand - slumpar efter varje runda