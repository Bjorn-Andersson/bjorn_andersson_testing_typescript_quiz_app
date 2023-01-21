import React, { useState } from "react";

interface buttonProps {
  usernameWasSet: (username: string) => void;
  userName: string;
}

const SelectUserName: React.FC<buttonProps> = (props) => {
  const [username, setUsername] = useState<string>(props.userName);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    props.usernameWasSet(username);
    setShowWelcome(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    if (event.target.value.trim() == "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  if (showWelcome == true) {
    return (
      <>
        <h1>
          <span data-testid="username">Welcome {username}!</span>
        </h1>
      </>
    );
  }

  return (
    <>
      <h2>Enter your username</h2>
      <form className="form">
        <input
          onChange={handleChange}
          className="textInput"
          type="text"
          placeholder="Enter your username"
          value={username}
        />
        <button
          data-testid="submitButton"
          className="submitButton"
          disabled={isActive}
          onClick={handleClick}
          type="button"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SelectUserName;
