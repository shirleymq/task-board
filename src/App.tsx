import "./App.css";
import { Panel } from "./components/panel";
import { Lane, LaneContent, LaneHeader } from "./components/lane";
import { Item } from "./components/item";
import { useState } from "react";

function App() {

  const [lane, setLane] = useState(DATA)

  return (
    <>
      <div>
        <h3>Soy Un Panel</h3>
      </div>
      <Panel>
        {lane.map((lane, index) => {
          return (
            <Lane key={index} >
              <LaneHeader>
                {lane.title}
              </LaneHeader>
              <LaneContent>
                {
                  lane.items.map((item, index) => {
                    return (
                      <Item key={index}>
                        {item.details}
                      </Item>
                    )
                  })
                }
              </LaneContent>
            </Lane>
          )
        })}


      </Panel>
    </>
  );
}

export default App;


const DATA = [
  {
    id: 1,
    title: "Carril 1",
    items: [
      {
        id: 1,
        details: "Shirley"
      },
      {
        id: 2,
        details: "Edson"
      }
    ]
  },
  {
    id: 2,
    title: "Carril 2",
    items: [
      {
        id: 3,
        details: "Shirley"
      },
      {
        id: 4,
        details: "Edson"
      }
    ]
  },
  {
    id: 3,
    title: "Carril 3",
    items: [
      {
        id: 5,
        details: "Shirley"
      },
      {
        id: 6,
        details: "Edson"
      }
    ]
  },
]
