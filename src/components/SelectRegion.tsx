import React, { useState } from "react";
import "../styling/selects.css";

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
      <div key={index}>
        <button
          data-testid={region}
          className="button"
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
      <div className="regionContainer">{regions.map(regionButtons)}</div>
      {region !== "" && (
        <p className="regionText">
          Your selected region is:{" "}
          <span className="region" data-testid="region">
            <b>{region}</b>
          </span>
        </p>
      )}
    </>
  );
};

export default SelectRegion;
