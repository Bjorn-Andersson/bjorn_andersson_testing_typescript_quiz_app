import { act, render, screen } from "@testing-library/react";
import React from "react";
import SelectDifficulty from "../../components/SelectDifficulty";

describe("selectDifficulty", () => {
  ////////////////////////////////////////////////////förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
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
