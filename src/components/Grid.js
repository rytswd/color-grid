import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// import "./form.css";
import "./Grid.scss";
import "./ToggleButton.scss";
import "./TextInput.scss";

export const ColorGrid = (props) => {
  const [endpoint, setEndpoint] = useState("/" + props.endpoint + "?fmt=json");
  const [runInterval, setRunInterval] = useState(false);

  const cellCount = props.cellCount;
  const cells = [...Array(cellCount)].map((e, i) => (
    <div key={i} className="grid-cell">
      <GridCell
        key={i}
        baseAddress={props.address}
        endpoint={endpoint}
        runInterval={runInterval}
      />
    </div>
  ));

  // WARNING: This is used for GridControl, but gets regenerated at each render.
  //          It serves the purpose for now, but should be fixed.
  const id = uuidv4();

  return (
    <div className="grid-component">
      <GridControl
        id={id}
        runInterval={runInterval}
        updateRunInterval={setRunInterval}
        endpoint={endpoint}
        updateEndpoint={setEndpoint}
      />
      <div className="grid-box">{cells}</div>
    </div>
  );
};

const GridCell = (props) => {
  const [colorName, setColorName] = useState("Unset");
  const [colorCode, setColorCode] = useState("#ccc");

  const callColorSvc = (endpoint, setColorName, setColorCode) => {
    console.log(props.runInterval);
    fetch(props.baseAddress + endpoint)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => res.json())
      .then((x) => {
        setColorName(x.name);
        setColorCode(x.hexCode);
      })
      .catch((_) => {
        setColorName("ERROR!");
        setColorCode("#aaa");
      });
  };

  useEffect(() => {
    if (!props.runInterval) return;
    const intv = setInterval(() => {
      callColorSvc(props.endpoint, setColorName, setColorCode);
    }, 5000 + 2000 * Math.random());
    // Specify how to clean up after this effect:
    return function cleanup() {
      clearInterval(intv);
    };
  });

  return (
    <div
      className="grid-item"
      style={{
        backgroundColor: colorCode,
      }}
    >
      {colorName}
    </div>
  );
};

const GridControl = (props) => {
  const { register, handleSubmit } = useForm();

  const endpoint = props.endpoint;
  const runInterval = props.runInterval;

  const id = props.id;
  const buttonId = "runInterval_" + id;

  const run = (data) => {
    props.updateEndpoint(data.endpoint);
  };

  return (
    <div>
      <form className="text-input" onSubmit={handleSubmit(run)}>
        <label htmlFor="endpoint">Endpoint</label>
        <input
          name="endpoint"
          type="text"
          ref={register}
          defaultValue={endpoint}
        />
        <input type="submit" />
      </form>

      <div className="toggle-button">
        <input
          name="runInterval"
          id={buttonId}
          type="checkbox"
          onChange={(e) => props.updateRunInterval(e.target.checked)}
          checked={runInterval}
        />
        <label htmlFor={buttonId}>
          <span className="toggle-label">Periodic Query</span>
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};
