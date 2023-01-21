import { act, render, screen } from "@testing-library/react";
import React from "react";
import SelectUserName from "../../components/SelectUserName";

describe("selectUserName", () => {
  ////////////////////////////////////////////////////förväntas även att det finns tester som kan hantera uppenbara fel som nollor och null-värden.
  test("submitButton button is clicked", () => {
    render(<SelectUserName usernameWasSet={() => {}} userName={""} />);

    const button = screen.getByTestId("submitButton");
    const spyButton = jest.spyOn(button, "click");

    act(() => {
      button.click();
    });

    expect(spyButton).toHaveBeenCalled();
  });
});
