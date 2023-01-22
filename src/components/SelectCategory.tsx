import React, { useState, useEffect } from "react";

interface buttonProps {
  categoryWasSelected: (category: string) => void;
}

const SelectCategory: React.FC<buttonProps> = (props) => {
  const [category, setCategory] = useState<string>("");
  const [threeCategoriesArray, setThreeCategoriesArray] = useState<string[]>(
    []
  );
  const URL = process.env.REACT_APP_URL as string;

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    let tempArray: string[] = [];
    const result = await fetch(URL);
    const response = await result.json();
    const dataKeys: string[] = Object.keys(response);

    for (let i = 0; i < 3; i++) {
      const categoriesArrayLength: number = dataKeys.length;
      const randomIndex: number = Math.floor(
        Math.random() * categoriesArrayLength
      );
      tempArray = tempArray.concat(dataKeys.splice(randomIndex, 1));
    }

    setThreeCategoriesArray(tempArray);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.categoryWasSelected(event.currentTarget.value);
    setCategory(event.currentTarget.value);
  }

  return (
    <div className="container">
      <>
        <h2>Please select a category for next trivia question</h2>
        {threeCategoriesArray.length > 0 ? (
          threeCategoriesArray.map((category, index) => (
            <div className="buttons" key={index}>
              <button
                data-testid={index}
                onClick={handleClick}
                value={category}
              >
                {category}
              </button>
            </div>
          ))
        ) : (
          <span data-testid="loadingText">loading...</span>
        )}
      </>
      {category !== "" && (
        <p>
          Your chosen category is:{" "}
          <span data-testid="category">{category}</span>
        </p>
      )}
    </div>
  );
};

export default SelectCategory;
