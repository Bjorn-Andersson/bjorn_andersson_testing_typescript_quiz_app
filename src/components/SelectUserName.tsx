import React, { useState } from "react";
import "../styling/selects.css";

interface buttonProps {
  usernameWasSet: (username: string) => void;
  userName: string;
}

const SelectUserName: React.FC<buttonProps> = (props) => {
  const [username, setUsername] = useState<string>(props.userName);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    props.usernameWasSet(username);
    setShowWelcome(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    if (event.target.value.trim() == "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  if (showWelcome == true) {
    return (
      <>
        <h1>
          <span className="username" data-testid="username">
            Welcome {username}!
          </span>
        </h1>
      </>
    );
  }

  return (
    <>
      <h2>Enter your username</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="textInput"
          type="text"
          placeholder="Enter your username"
          value={username}
        />
        <button
          data-testid="submitButton"
          className="userNameButton"
          disabled={isDisabled}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SelectUserName;
