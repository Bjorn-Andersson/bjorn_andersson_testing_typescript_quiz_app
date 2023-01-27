import React, { useState } from "react";
import SelectUserName from "./SelectUserName";
import SelectDifficulty from "./SelectDifficulty";
import SelectRegion from "./SelectRegion";
import GameComponent from "./GameComponent";
import {
  amountOfQuestions,
  timeLeftToAnswerQuestion,
  pointsSystem,
} from "../config";

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [hideUI, setHideUI] = useState<boolean>(false);
  const [showStartButton, setshowStartButton] = useState<boolean>(true);

  function usernameWasSet(username: string) {
    setUserName(username);
  }

  function difficultyWasSelected(difficulty: string) {
    setSelectedDifficulty(difficulty);
  }

  function regionWasSelected(region: string) {
    setSelectedRegion(region);
  }

  function startGame() {
    setHideUI(true);
    setshowStartButton(false);
  }

  function resetGame() {
    setHideUI(false);
    setSelectedDifficulty("");
    setSelectedRegion("");
    setshowStartButton(true);
  }

  if (!hideUI) {
    return (
      <div className="container">
        <SelectUserName usernameWasSet={usernameWasSet} userName={userName} />
        {userName !== "" && (
          <>
            <SelectDifficulty difficultyWasSelected={difficultyWasSelected} />
            <SelectRegion regionWasSelected={regionWasSelected} />
          </>
        )}
        {selectedDifficulty !== "" &&
          selectedRegion !== "" &&
          showStartButton && (
            <input
              type="button"
              value="start"
              className="startButton"
              onClick={() => startGame()}
            ></input>
          )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="username">{userName}</h1>
      <GameComponent
        userName={userName}
        selectedRegion={selectedRegion}
        selectedDifficulty={selectedDifficulty}
        resetGame={resetGame}
        amountOfQuestions={amountOfQuestions}
        timeLeftToAnswerQuestion={timeLeftToAnswerQuestion}
        pointsSystem={pointsSystem}
      />
    </div>
  );
};

export default Home;

//TODO:

//Lägg till readme fil som berättar om appen och vad man behöver göra för att starta den OCH PRESENTATIONEN(se powerpoint filen)
