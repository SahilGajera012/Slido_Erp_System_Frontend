import axios from "axios";
import React, { useEffect, useState } from "react";

function MaterialOption({ onPanelTextChange, onPatternChange, onDoorsChange }) {
  const patternPanels = {
    AJAX: 1,
    BECK: 2,
    COKO: 3,
    DUKE: 4,
    EROS: 5,
    FILO: 3,
    GINO: 3,
    HERO: 3,
    IBEX: 2,
    KENO: 5,
    JAZZ: 3,
    LULU: 7,
  };
  const [selectedPattern, setSelectedPattern] = useState("AJAX");

  const [subSelectedValues, setSubSelectedValues] = useState([]);

  //   let tempData = "";
  let updatedPanelText = [];

  const [tempData, setTempData] = useState("");

  const handlePatternChange = (event) => {
    const selectedPattern = event.target.value;
    setSelectedPattern(selectedPattern);
    onPatternChange(selectedPattern); // Pass selected pattern to the parent
  };
  // todo state management
  const [panelText, setPanelText] = useState([]);

  const handlePanelTextChange = (doorIndex, panelIndex, value) => {
    const updatedPanelText = [...panelText];
    if (!updatedPanelText[doorIndex]) {
      updatedPanelText[doorIndex] = [];
    }
    updatedPanelText[doorIndex][panelIndex] = value;
    setPanelText(updatedPanelText);
    onPanelTextChange(updatedPanelText);

    console.log("MY_DATA", updatedPanelText);
  };
  // todo api
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/design")
      .then((res) => {
        const wholeData = res.data.data;
        console.log(wholeData, "wholedata");
        setMaterial(wholeData.map((item) => item.design));
      })
      .catch((err) => {
        console.log("material err", err);
      });
  }, []);

  console.log(material, "designnnnnn");

  const [Number_of_Door, setSelectedDoors] = useState("");
  const handleDoorsChange = (e) => {
    const Number_of_Door = e.target.value;
    setSelectedDoors(Number_of_Door);
    onDoorsChange(Number_of_Door);
  };

  const materialSubOptions = {
    Punch: ["Glass"],
    Pearl: [
      "Clear glass",
      "Silver mirror",
      "Frosted Glass",
      "Mirror pl",
      "Fluted Glass",
    ],
    Peak: ["PLPB", "MDF", "Highlight", "Premium Highlighter"],
    Vibrant: [
      "Coloured glass classic",
      "Coloured glass premium",
      "Coloured glass",
    ],
    Crystal: ["Designer Glass", "Mirror cl"],
    Persona: ["V Groove glass", "Mirror pr"],
    YinYang: ["Gloss-mat-glass", "Gloss-mat-glass-mirror"],
  };
  // Add this at the top of your component

  // todo
  const [subOptionText, setSubOptionText] = useState([]);

  const handleSubOptionTextChange = (doorIndex, panelIndex, value) => {
    const updatedSubOptionText = [...subOptionText];
    if (!updatedSubOptionText[doorIndex]) {
      updatedSubOptionText[doorIndex] = [];
    }
    if (!updatedSubOptionText[doorIndex][panelIndex]) {
      updatedSubOptionText[doorIndex][panelIndex] = [];
    }
    updatedSubOptionText[doorIndex][panelIndex] = value;
    setSubOptionText(updatedSubOptionText);
    console.log("handleSubOptionTextChange", updatedSubOptionText);

    if (!subSubOptionText) {
      //   combinedArray = panelText.map((panel, index) => {
      //     const subOption = subOptionText[index];
      //     const subSubOption = subSubOptionText[index];
      //     return `${panel}-${subOption}-${subSubOption}`;
      //   });
      //   console.log("EVER COMPILED ARRAY", combinedArray);
    }
  };

  // sub-options
  const subSubOptions = {
    "Mirror pl": ["Grey", "Brown", "Gold"],
    PLPB: ["tesa"],
    MDF: ["Raminated Panel"],
    Highlight: ["Wallpaper", "Fabric"],
    "Premium Highlighter": ["Combinations"],
    "Coloured glass": ["Metallic"],
    Glass: ["Digital Print"],
    "Gloss-mat-glass-mirror": ["Brown", "Grey", "Gold"],
  };
  // Add this at the top of your component

  // Add this function to handle sub-sub-option changes
  const [subSubOptionText, setSubSubOptionText] = useState([]);

  let combinedArray = [];

  const handleSubSubOptionTextChange = (doorIndex, panelIndex, value) => {
    const updatedSubSubOptionText = [...subSubOptionText];
    if (!updatedSubSubOptionText[doorIndex]) {
      updatedSubSubOptionText[doorIndex] = [];
    }
    if (!updatedSubSubOptionText[doorIndex][panelIndex]) {
      updatedSubSubOptionText[doorIndex][panelIndex] = [];
    }
    updatedSubSubOptionText[doorIndex][panelIndex] = value;
    setSubSubOptionText(updatedSubSubOptionText);
    console.log("handleSubSubOptionTextChange", updatedSubSubOptionText);

    combinedArray = panelText.map((panel, index) => {
      const subOption = subOptionText[index];
      const subSubOption = subSubOptionText[index];
      //   return `${panel}-${subOption}-${subSubOption}`;

      const subSubOptionValue = subSubOption || "null";

      // Filter out undefined values
      return [panel, subOption, subSubOptionValue].filter(Boolean).join("-");
    });

    console.log("EVER COMPILED ARRAY", combinedArray);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start">
        <p>Number Of Door:</p>
        <select
          name=""
          id=""
          className="border p-1 rounded-md border-black"
          value={Number_of_Door}
          onChange={handleDoorsChange}
        >
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="mb-5">
        <div className="mb-5">
          <h2 className="font-bold border-b-2 mb-5">Select Pattern</h2>
        </div>
      </div>

      <div className="pb-5">
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p>Pattern</p>
            <select
              value={selectedPattern}
              onChange={handlePatternChange}
              className="border p-1 rounded-md border-black"
            >
              <option value=""></option>
              <option value="AJAX">AJAX</option>
              <option value="BECK">BECK</option>
              <option value="COKO">COKO</option>
              <option value="DUKE">DUKE</option>
              <option value="EROS">EROS</option>
              <option value="FILO">FILO</option>
              <option value="GINO">GINO</option>
              <option value="HERO">HERO</option>
              <option value="IBEX">IBEX</option>
              <option value="KENO">KENO</option>
              <option value="JAZZ">JAZZ</option>
              <option value="LULU">LULU</option>
            </select>
          </div>
          {/* Loop through doors */}

          {Array.from(
            { length: parseInt(Number_of_Door) || 0 },
            (_, doorIndex) => (
              <div key={doorIndex}>
                <p>Door {doorIndex + 1}</p>
                {Array.from(
                  { length: patternPanels[selectedPattern] || 0 },
                  (_, panelIndex) => (
                    <div key={panelIndex} className="grid gap-2">
                      <select
                        name=""
                        id=""
                        className="border border-black rounded-md p-1 mb-3"
                        value={
                          panelText[doorIndex]
                            ? panelText[doorIndex][panelIndex] || ""
                            : ""
                        }
                        onChange={(e) =>
                          handlePanelTextChange(
                            doorIndex,
                            panelIndex,
                            e.target.value
                          )
                        }
                      >
                        <option value=""></option>
                        {material.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                      </select>
                      {panelText[doorIndex] && (
                        <select
                          name=""
                          id=""
                          className="border bg-red-700 border-black rounded-md p-1 mb-3"
                          value={
                            // console.log("subOptionText[doorIndex]", subOptionText[doorIndex])
                            subOptionText[doorIndex]
                              ? subOptionText[doorIndex][panelIndex] || ""
                              : ""
                          }
                          onChange={(e) => {
                            // setSubSelectedValues([
                            //   ...subSelectedValues,
                            //   e.target.value,
                            // ]);

                            handleSubOptionTextChange(
                              doorIndex,
                              panelIndex,
                              e.target.value
                            );
                          }}
                        >
                          <option value=""></option>
                          {materialSubOptions[
                            panelText[doorIndex][panelIndex]
                          ] &&
                            materialSubOptions[
                              panelText[doorIndex][panelIndex]
                            ].map((subOption, index) => (
                              <option key={index}>{subOption}</option>
                            ))}
                        </select>
                      )}
                      {subOptionText[doorIndex] && (
                        <select
                          name=""
                          id=""
                          className="border border-black rounded-md p-1 mb-3"
                          value={
                            subSubOptionText[doorIndex]
                              ? subSubOptionText[doorIndex][panelIndex] || ""
                              : ""
                          }
                          onChange={(e) =>
                            handleSubSubOptionTextChange(
                              doorIndex,
                              panelIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value=""></option>
                          {subSubOptions[
                            subOptionText[doorIndex][panelIndex]
                          ] &&
                            subSubOptions[
                              subOptionText[doorIndex][panelIndex]
                            ].map((subSubOption, index) => (
                              <option key={index}>{subSubOption}</option>
                            ))}
                        </select>
                      )}
                    </div>
                  )
                )}

                {console.log("subOptionText[doorIndex]", subSelectedValues)}
              </div>
            )
          )}
        </div>

        <div className="w-30 bg-red-700 ">
          <button
            type="button"
            onClick={() => {
              combinedArray = panelText.map((panel, index) => {
                const subOption = subOptionText[index];
                const subSubOption = subSubOptionText[index];
                const subSubOptionValue = subSubOption || "null";

                // Filter out undefined values
                return [panel, subOption, subSubOptionValue]
                  .filter(Boolean)
                  .join("-");
              });

              console.log("EVER COMPILED ARRAY", combinedArray);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default MaterialOption;
