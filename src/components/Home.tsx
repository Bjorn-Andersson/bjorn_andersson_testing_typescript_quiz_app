import React, { useState } from "react";
import SelectUserName from "./SelectUserName";
import SelectCategory from "./SelectCategory";
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
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [hideUI, setHideUI] = useState<boolean>(false);
  const [showStartButton, setshowStartButton] = useState<boolean>(true);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  function startGame() {
    setHideUI(true);
    setShowNextButton(true);
    setshowStartButton(false);
  }

  function resetGame() {
    setHideUI(false);
    setSelectedDifficulty("");
    setSelectedRegion("");
    setActiveCategory("");
    setshowStartButton(true);
  }

  if (!hideUI) {
    return (
      <>
        <SelectUserName setUserName={setUserName} userName={userName} />
        <SelectCategory
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <SelectDifficulty
          setSelectedDifficulty={setSelectedDifficulty}
          selectedDifficulty={selectedDifficulty}
        />
        <SelectRegion
          setSelectedRegion={setSelectedRegion}
          selectedRegion={selectedRegion}
        />
        {userName !== "" &&
          activeCategory !== "" &&
          selectedDifficulty !== "" &&
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
    <GameComponent
      userName={userName}
      activeCategory={activeCategory}
      selectedRegion={selectedRegion}
      selectedDifficulty={selectedDifficulty}
      showNextButton={showNextButton}
      setShowNextButton={setShowNextButton}
      resetGame={resetGame}
      amountOfQuestions={amountOfQuestions}
      timeLeftToAnswerQuestion={timeLeftToAnswerQuestion}
      pointsSystem={pointsSystem}
    />
  );
};

export default Home;

//TODO:
//EFTER VARJE FRÅGA FÅR MAN VÄLJA NY KATEGORI!!
//3 SEKUNDERS NEDRÄKNING FÖRE VARJE NY FRÅGA
//Hittar apiet ingen fråga så ska den försöka igen tills den hittat något
//RANDOM = slumpad svårighetsgrad för varje fråga

//Sekvensdiagram
//Klassdiagram

//BDD test finns som testar en spelomgång
//Enhetstester finns som täcker kraven och förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
