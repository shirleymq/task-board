import "./App.css";
import { Panel } from "./components/panel";
import { Lane, LaneContent, LaneFooter, LaneHeader } from "./components/lane";
import { Item } from "./components/item";
import { useState } from "react";

function App() {

  const [lanes, setLanes] = useState<Lane[]>(DATA)

  const handleDropLane = (sourceId: number, targetId: number) => {
    let copyLanes: Lane[] = JSON.parse(JSON.stringify(lanes));
    let indexTarget=-1;
    let indexSource=-1;
    copyLanes.forEach((lane, index) => {
      if(lane.id === sourceId){
        indexSource = index;
      }
      if(lane.id === targetId){
        indexTarget = index;
      }
    })
    let sourceTemp = copyLanes[indexSource];
    copyLanes[indexSource] = copyLanes[indexTarget];
    copyLanes[indexTarget] = sourceTemp;
    setLanes(copyLanes);
  }

  return (
    <>
      <div>
        <h3>Soy Un Panel</h3>
      </div>
      <Panel>
        {lanes.map((lane, index) => {
          return (
            <Lane
              key={index}
              data={lane}
              onDropHandle={handleDropLane}
            >
              <LaneHeader>
                {lane.title}
              </LaneHeader>
              <LaneContent>
                {lane.items.map((item, index) => {
                  return <Item key={index}>{item.details}</Item>;
                })}
              </LaneContent>
              <LaneFooter />
            </Lane>
          );
        })}
      </Panel>
    </>
  );
}

export default App;

export interface Lane {
  id: number;
  title: string;
  items: Item[];
}

export interface Item {
  id: number;
  details: string;
}

const DATA: Lane[] = [
  {
    id: 1,
    title: "Carril 1",
    items: [
      {
        id: 1,
        details: "Shirley",
      },
      {
        id: 2,
        details: "Edson",
      },
    ],
  },
  {
    id: 2,
    title: "Carril 2",
    items: [
      {
        id: 3,
        details: "Shirley",
      },
      {
        id: 4,
        details: "Edson",
      },
    ],
  },
  {
    id: 3,
    title: "Carril 3",
    items: [
      {
        id: 5,
        details: "Shirley",
      },
      {
        id: 6,
        details: "Edson",
      },
    ],
  },
];
