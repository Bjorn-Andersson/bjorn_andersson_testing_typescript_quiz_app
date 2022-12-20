import React, { useState } from "react";

const SelectRegion: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const regions: string[] = ["SWE", "EN"];

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setSelectedRegion(event.currentTarget.value);
  }

  function regionButtons(region: string) {
    return (
      <div className="container">
        <button
          className="difficultyButton"
          value={region}
          onClick={handleClick}
        >
          {region}
        </button>
      </div>
    );
  }
  return (
    <>
      <h3>Please select region</h3>
      {regions.map((region) => regionButtons(region))}
      <p>Your selected difficulty is: {selectedRegion}</p>
    </>
  );
};
export default SelectRegion;
