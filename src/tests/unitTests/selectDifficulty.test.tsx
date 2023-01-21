import { act, render, screen } from "@testing-library/react";
import React from "react";
import SelectDifficulty from "../../components/SelectDifficulty";

describe("testing selectDifficulty", () => {
  test("correctly selects difficulty", () => {
    //arrange
    const exampleDifficulty: string = "Easy";

    render(<SelectDifficulty difficultyWasSelected={() => {}} />);

    const button = screen.getByTestId(exampleDifficulty);
    const spyButton = jest.spyOn(button, "click");

    //act
    act(() => {
      button.click();
    });

    //assert
    expect(spyButton).toHaveBeenCalled();
    const difficulty = screen.getByTestId("difficulty");
    expect(difficulty.textContent).toBe(exampleDifficulty);
  });
});
