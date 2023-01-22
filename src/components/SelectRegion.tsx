import React, { useState } from "react";

interface buttonProps {
  regionWasSelected: (region: string) => void;
}

const SelectRegion: React.FC<buttonProps> = (props) => {
  const regions: string[] = ["SE", "GB"];
  const [region, setRegion] = useState<string>("");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.regionWasSelected(event.currentTarget.value);
    setRegion(event.currentTarget.value);
  }

  function regionButtons(region: string, index: number) {
    return (
      <div className="container" key={index}>
        <button
          data-testid={region}
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
      {regions.map(regionButtons)}
      {region !== "" && (
        <p>
          Your selected region is: <span data-testid="region">{region}</span>
        </p>
      )}
    </>
  );
};

export default SelectRegion;
