import React, { useState } from "react";
import SelectUserName from "./SelectUserName";
import SelectCategory from "./SelectCategory";
import SelectDifficulty from "./SelectDifficulty";
import SelectRegion from "./SelectRegion";
import GameComponent from "./GameComponent";
import {
  amountOfQuestions,
  timeLeftToAnswerQuestion,
  difficulty,
  difficultyPoints,
  correctQuestions,
  correctQuestionsInARow,
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
          difficulty={difficulty}
        />
        <SelectRegion
          setSelectedRegion={setSelectedRegion}
          selectedRegion={selectedRegion}
        />
        {userName !== "" &&
          activeCategory !== "" &&
          selectedDifficulty !== "" &&
          selectedRegion !== "" &&
          showStartButton === true && (
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
      difficultyPoints={difficultyPoints}
      correctQuestions={correctQuestions}
      correctQuestionsInARow={correctQuestionsInARow}
      pointsSystem={pointsSystem}
    />
  );
};
export default Home;

//TODO:

//Hittar apiet ingen fråga så ska den försöka igen tills den hittat något
//poäng: Sekunder som är kvar * svårighetsgrad (1 = easy, 3 = medium 5 = hard) + antal gissade rätt * antal gissade I följd om man har minst 3 rätt I följd
//Poängsystemet, antal frågor och tid per fråga vill man kunna modifiera med en config-fil
//Välja ny kategori efter varje fråga (3 slumpade kategorier)
//Efter 9 frågor presenteras totalpoäng

//Sekvensdiagram
//Klassdiagram

//BDD test finns som testar en spelomgång
//Enhetstester finns som täcker kraven och förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
