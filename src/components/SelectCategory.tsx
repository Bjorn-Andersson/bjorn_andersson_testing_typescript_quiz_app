import React, { useState, useEffect } from "react";

const SelectCategory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [threeCategoriesArray, setThreeCategoriesArray] = useState<string[]>(
    []
  );
  const URL: string = process.env.REACT_APP_URL as string;

  useEffect(() => {
    let tempArray: string[] = [];
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const dataKeys: string[] = Object.keys(data);
        for (let i = 0; i < 3; i++) {
          const categoriesArrayLength: number = dataKeys.length;
          const randomIndex: number = Math.floor(
            Math.random() * categoriesArrayLength
          );
          tempArray = tempArray.concat(dataKeys.splice(randomIndex, 1));
        }
        setThreeCategoriesArray(tempArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setActiveCategory(event.currentTarget.value);
  }

  function categoryButtons(category: string) {
    return (
      <div className="buttons">
        <button onClick={handleClick} value={category}>
          {category}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <>
        <h2>Select a category</h2>
        {threeCategoriesArray.length > 0
          ? threeCategoriesArray.map((category) => categoryButtons(category))
          : "loading..."}
        <div className="activeCategory">
          <p>Your selected category is: {activeCategory}</p>
        </div>
      </>
    </div>
  );
};
export default SelectCategory;
