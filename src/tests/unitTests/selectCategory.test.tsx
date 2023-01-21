import { act, screen, render, waitFor } from "@testing-library/react";
import SelectCategory from "../../components/SelectCategory";
import React from "react";

describe("testing fetchCategories", () => {
  test("correctly selects category", async () => {
    //arrange
    let button: HTMLButtonElement;
    let spyButton;
    let exampleCategory: string = "";

    render(
      <SelectCategory
        categoryWasSelected={(history) => {
          exampleCategory = history;
        }}
      />
    );
    const loadingText = screen.getByTestId("loadingText");

    await waitFor(() => {
      expect(loadingText).not.toBeInTheDocument();
    }).then(() => {
      button = screen.getByTestId("0");
      expect(button).toBeInTheDocument();
      spyButton = jest.spyOn(button, "click");
    });

    //act
    act(() => {
      button.click();
    });

    //assert

    expect(spyButton).toHaveBeenCalled();
    const category = screen.getByTestId("category");
    expect(category.textContent).toBe(exampleCategory);
  });
});
