import React, { useState } from "react";
import "./App.css";

function App() {
  const [list] = useState({
    coinType: "DOGE",
    data: [10, 20, 30],
  });
  return (
    <div className="App">
      {list.data.map((item) => (
        <div>
          {item}
          {list.coinType}
        </div>
      ))}
    </div>
  );
}

export default App;
