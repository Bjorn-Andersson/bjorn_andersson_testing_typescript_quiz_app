import React, { useState, useEffect } from "react";

interface buttonProps {
  categoryWasSelected: (category: string) => void;
}

const SelectCategory: React.FC<buttonProps> = (props) => {
  const [threeCategoriesArray, setThreeCategoriesArray] = useState<string[]>(
    []
  );
  const URL = process.env.REACT_APP_URL as string;

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
      });
  }, []);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.categoryWasSelected(event.currentTarget.value);
  }

  function categoryButtons(category: string, index: number) {
    return (
      <div className="buttons" key={index}>
        <button onClick={handleClick} value={category}>
          {category}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <>
        <h2>Please select a category for next trivia question</h2>
        {threeCategoriesArray.length > 0
          ? threeCategoriesArray.map(categoryButtons)
          : "loading..."}
      </>
    </div>
  );
};

export default SelectCategory;
