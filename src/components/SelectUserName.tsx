import React, { useState } from "react";

const SelectUserName: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [tempUserName, setTempUserName] = useState<string>("");

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    setUserName(tempUserName);
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
      {userName !== "" && <h1>Welcome {userName}!</h1>}
    </>
  );
};
export default SelectUserName;
