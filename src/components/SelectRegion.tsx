import React from "react";

interface buttonProps {
  setSelectedRegion: (region: string) => void;
  selectedRegion: string;
}

const SelectRegion: React.FC<buttonProps> = (props) => {
  const regions: string[] = ["SWE", "GB"];

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.setSelectedRegion(event.currentTarget.value);
  }

  function regionButtons(region: string, index: number) {
    return (
      <div className="container" key={index}>
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
      {regions.map(regionButtons)}
      <p>Your selected region is: {props.selectedRegion}</p>
    </>
  );
};
export default SelectRegion;
