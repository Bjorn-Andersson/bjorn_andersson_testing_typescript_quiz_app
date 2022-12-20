import React, { useState } from "react";

const SelectRegion: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const regions: string[] = ["SWE", "EN"];

  function handleClick(event: any) {
    event.preventDefault();
    setSelectedRegion(event.target.value);
  }

  function regionButtons(region: string) {
    return (
      <div className="container">
        <button
          className="difficultyButton"
          value={region}
          onClick={(event) => handleClick(event)}
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
