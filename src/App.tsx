import "./App.css";
import { Panel } from "./components/panel";
import { Lane, LaneContent, LaneFooter, LaneHeader } from "./components/lane";
import { Item } from "./components/item";
import { useState } from "react";

function App() {
  const [lanes, setLanes] = useState<Lane[]>(DATA);

  /**const handleDropLane = (sourceId: number, targetId: number) => {
    const copyLanes: Lane[] = JSON.parse(JSON.stringify(lanes));
    let indexTarget = -1;
    let indexSource = -1;
    copyLanes.forEach((lane, index) => {
      if (lane.id === sourceId) {
        indexSource = index;
      }
      if (lane.id === targetId) {
        indexTarget = index;
      }
    });
    const sourceTemp = copyLanes[indexSource];
    copyLanes[indexSource] = copyLanes[indexTarget];
    copyLanes[indexTarget] = sourceTemp;
    setLanes(copyLanes);
  };*/

  const handleDropLane = (itemId: number, targetLaneId: number) => {
    const copyLanes: Lane[] = JSON.parse(JSON.stringify(lanes));
    let sourceLaneIndex = -1;
    let targetLaneIndex = -1;
    let itemToMove: Item | null = null;

    // Encontrar los carriles fuente y destino, y extraer el ítem que se va a mover
    copyLanes.forEach((lane, index) => {
      if (lane.items.some((item) => item.id === itemId)) {
        sourceLaneIndex = index;
        itemToMove = lane.items.find((item) => item.id === itemId) || null;
        lane.items = lane.items.filter((item) => item.id !== itemId);
      }
      if (lane.id === targetLaneId) {
        targetLaneIndex = index;
      }
    });

    if (itemToMove && targetLaneIndex !== -1) {
      // Insertar el ítem en la nueva posición en el carril de destino
      copyLanes[targetLaneIndex].items.push(itemToMove);
    }

    setLanes(copyLanes);
  };

  return (
    <>
      <div>
        <h3>Soy Un Panel</h3>
      </div>
      <Panel>
        {lanes.map((lane, index) => {
          return (
            <Lane key={index} data={lane} onDropHandle={handleDropLane}>
              <LaneHeader>{lane.title}</LaneHeader>
              <LaneContent>
                {lane.items.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("item/id", item.id.toString());
                      }}
                    >
                      {item.details}
                    </Item>
                  );
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
        details: "Shirley 1 ",
      },
      {
        id: 2,
        details: "Edson 1",
      },
    ],
  },
  {
    id: 2,
    title: "Carril 2",
    items: [
      {
        id: 3,
        details: "Shirley 2",
      },
      {
        id: 4,
        details: "Edson 2",
      },
    ],
  },
  {
    id: 3,
    title: "Carril 3",
    items: [
      {
        id: 5,
        details: "Shirley 3",
      },
      {
        id: 6,
        details: "Edson 3",
      },
    ],
  },
];
