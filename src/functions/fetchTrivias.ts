import triviaProps from "../interfaces/triviaProps";

export default function fetchTrivias(
  difficulty: string,
  activeCategory: string,
  selectedRegion: string,
  setTrivias: any,
  setErrorMessage: any
): Promise<void> {
  return fetch(
    "https://the-trivia-api.com/api/questions?categories=" +
      activeCategory +
      "&limit=1" +
      "&region=" +
      selectedRegion +
      "&difficulty=" +
      difficulty
  )
    .then((response): Promise<Array<triviaProps>> => response.json())
    .then((data) => {
      setTrivias(data);
    })
    .catch((error): Promise<void> => {
      if (error.status === 503) {
        setErrorMessage("The service is currently unavailable");
      } else if (error.status === 204 || error.status === 404) {
        const tempDifficultyArray = ["easy", "medium", "hard"];
        const randNumber = Math.floor(Math.random() * 3);
        return fetchTrivias(
          tempDifficultyArray[randNumber],
          activeCategory,
          selectedRegion,
          setTrivias,
          setErrorMessage
        );
      }
      return Promise.reject();
    });
}
