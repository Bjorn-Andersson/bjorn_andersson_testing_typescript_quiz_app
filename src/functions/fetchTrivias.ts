import triviaProps from "../interfaces/triviaProps";

export default function fetchTrivias(
  difficulty: string,
  activeCategory: string,
  selectedRegion: string
): Promise<triviaProps[]> {
  return fetch(
    "https://the-trivia-api.com/api/questions?categories=" +
      activeCategory +
      "&limit=1" +
      "&region=" +
      selectedRegion +
      "&difficulty=" +
      difficulty
  )
    .then((response): Promise<triviaProps[]> => response.json())
    .catch((error): Promise<triviaProps[]> => {
      if (error.status === 503) {
        throw new Error("The service is currently unavailable");
      } else if (error.status === 204 || error.status === 404) {
        const tempDifficultyArray = ["easy", "medium", "hard"];
        const randNumber = Math.floor(Math.random() * 3);
        return fetchTrivias(
          tempDifficultyArray[randNumber],
          activeCategory,
          selectedRegion
        );
      }
      throw new Error("An unknown error has occured");
    });
}
