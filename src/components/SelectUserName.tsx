import React, { useState } from "react";

interface buttonProps {
  setUserName: (username: string) => void;
  userName: string;
}

const SelectUserName: React.FC<buttonProps> = (props) => {
  const [tempUserName, setTempUserName] = useState<string>("");

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    props.setUserName(tempUserName);
    setTempUserName("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTempUserName(event.target.value);
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
          value={tempUserName}
        />
        <input
          className="submitButton"
          onClick={handleClick}
          type="button"
          value="Submit"
        />
      </form>
      {props.userName !== "" && <h1>Welcome {props.userName}!</h1>}
    </>
  );
};
export default SelectUserName;
