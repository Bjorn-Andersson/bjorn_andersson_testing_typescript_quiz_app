import { act, render, screen } from "@testing-library/react";
import React from "react";
import SelectRegion from "../../components/SelectRegion";

describe("testing selectRegion", () => {
  test("correctly selects region", () => {
    //arrange
    const exampleRegion: string = "GB";

    render(<SelectRegion regionWasSelected={() => {}} />);

    const button = screen.getByTestId(exampleRegion);
    const spyButton = jest.spyOn(button, "click");

    //act
    act(() => {
      button.click();
    });

    //assert
    expect(spyButton).toHaveBeenCalled();
    const region = screen.getByTestId("region");
    expect(region.textContent).toBe(exampleRegion);
  });
});
