import React, { useState } from "react";
import { BasicControl } from "./components/BasicControl";
import { ColorGrid } from "./components/Grid";

import "./App.css";

const App = (props) => {
  const [address, setAddress] = useState("http://localhost:32011");
  const [cellCount, setCellCount] = useState(6);

  return (
    <div className="wrapper">
      <div className="title">Color Grid for Demo</div>
      <div className="break"></div>
      <BasicControl
        address={address}
        updateAddress={setAddress}
        cellCount={cellCount}
        updateCellCount={setCellCount}
      />
      <div className="break"></div>
      <ColorGrid address={address} cellCount={cellCount} endpoint="armadillo" />
      <ColorGrid address={address} cellCount={cellCount} endpoint="bison" />
      <ColorGrid address={address} cellCount={cellCount} endpoint="cougar" />
    </div>
  );
};

export default App;
