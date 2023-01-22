import { act, render, screen } from "@testing-library/react";
import React from "react";
import SelectUserName from "../../components/SelectUserName";

describe("testing selectUserName", () => {
  test("submitButton button is clicked with input field empty", () => {
    render(<SelectUserName usernameWasSet={() => {}} userName={""} />);

    const button = screen.getByTestId("submitButton");

    expect(button).toBeDisabled();
  });
});

describe("selectUserName", () => {
  test("testing submitButton button is clicked with with input field entry", () => {
    render(
      <SelectUserName usernameWasSet={() => {}} userName={"Tisha Wendely"} />
    );

    const button = screen.getByTestId("submitButton");
    const spyButton = jest.spyOn(button, "click");

    act(() => {
      button.click();
    });

    expect(spyButton).toHaveBeenCalled();
  });
});
