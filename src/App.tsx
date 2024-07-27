import { useState } from "react";
import "./App.css";
import { Panel } from "./components/panel";
import { Lane } from "./components/lane";
import Item from "./components/item";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h3>Soy Un Panel</h3>
      </div>
      <Panel className="panel-container">
        <Lane className="lane" draggable>
          {/*  <p>Shirley</p> */}
          <Item />
        </Lane>
      </Panel>
    </>
  );
}

export default App;
