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
      <>
        <SelectUserName setUserName={setUserName} userName={userName} />
        {userName !== "" && (
          <>
            <SelectDifficulty
              setSelectedDifficulty={setSelectedDifficulty}
              selectedDifficulty={selectedDifficulty}
            />
            <SelectRegion
              setSelectedRegion={setSelectedRegion}
              selectedRegion={selectedRegion}
            />
          </>
        )}
        {selectedDifficulty !== "" &&
          selectedRegion !== "" &&
          showStartButton && (
            <input
              type="button"
              value="start"
              onClick={() => startGame()}
            ></input>
          )}
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Home;

//TODO:
//EFTER VARJE FRÅGA FÅR MAN VÄLJA NY KATEGORI!!
//3 SEKUNDERS NEDRÄKNING FÖRE VARJE NY FRÅGA
//Hittar apiet ingen fråga så ska den försöka igen tills den hittat något

//Sekvensdiagram
//Klassdiagram

//BDD test finns som testar en spelomgång
//Enhetstester finns som täcker kraven och förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
