import React from "react";
import SelectUserName from "./SelectUserName";
import SelectCategory from "./SelectCategory";
import SelectDifficulty from "./SelectDifficulty";
import SelectRegion from "./SelectRegion";

const Home: React.FC = () => {
  function handleClick() {
    //start game
  }
  return (
    <>
      <SelectUserName />
      <SelectCategory />
      <SelectDifficulty />
      <SelectRegion />
      <input type="button" value="start" onClick={() => handleClick()}></input>
    </>
    // knappen ska dyka upp då alla 4 saker är valda
  );
};
export default Home;

//TODO:

//Integration mot trivia
//Hittar apiet ingen fråga så ska den försöka igen tills den hittat något
//9 frågor per spelomgång
//30 sek på sig att svara
//poäng: Sekunder som är kvar * svårighetsgrad (1 = easy, 3 = medium 5 = hard) + antal gissade rätt * antal gissade I följd om man har minst 3 rätt I följd
//Välja ny kategori efter varje fråga (3 slumpade kategorier)
//Efter 9 frågor presenteras totalpoäng
//Sekvensdiagram
//Klassdiagram
//BDD test finns som testar en spelomgång
//Enhetstester finns som täcker kraven och förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
//Poängsystemet, antal frågor och tid per fråga vill man kunna modifiera med en config-fil
