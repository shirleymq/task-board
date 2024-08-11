import "./App.css";
import { Panel } from "./components/panel";
import { Lane, LaneContent, LaneFooter, LaneHeader } from "./components/lane";
import { Item } from "./components/item";
import { useState } from "react";

function App() {
  const [lanes, setLanes] = useState<Lane[]>(DATA);
  const [targetItemIndex, setTargetItemIndex] = useState<number | null>(null);

  const handleDropItem = (itemId: number, targetLaneId: number) => {
    console.log("targetItemIndex ", targetItemIndex, null);
    const copyLanes: Lane[] = JSON.parse(JSON.stringify(lanes));
    let sourceLaneIndex = -1;
    let targetLaneIndex = -1;
    let itemToMove: Item | null = null;

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
      if (
        targetItemIndex !== null &&
        copyLanes[targetLaneIndex].items.length > 0
      ) {
        copyLanes[targetLaneIndex].items.splice(targetItemIndex, 0, itemToMove);
      } else {
        copyLanes[targetLaneIndex].items.push(itemToMove);
      }
    }

    setLanes(copyLanes);
  };

  const handleDropLane = (sourceLaneId: number, targetLaneId: number) => {
    const updatedLanes = [...lanes];
    const sourceLaneIndex = updatedLanes.findIndex(
      (lane) => lane.id === sourceLaneId
    );
    const targetLaneIndex = updatedLanes.findIndex(
      (lane) => lane.id === targetLaneId
    );

    if (sourceLaneIndex !== -1 && targetLaneIndex !== -1) {
      const [removedLane] = updatedLanes.splice(sourceLaneIndex, 1);
      updatedLanes.splice(targetLaneIndex, 0, removedLane);
    }
    setLanes(updatedLanes);
  };

  const handleDragOverLane = (hoveredLaneId: number) => {};

  return (
    <>
      <div>
        <h3>Soy Un Panel</h3>
      </div>
      <Panel>
        {lanes.map((lane, index) => {
          return (
            <div
              //style={{ backgroundColor: "blue" }}
              onDragOver={(e) => {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if (e.clientY < midY) {
                  console.log("Cursor en la mitad superior del div");
                  //setTargetItemIndex(index);
                } else {
                  console.log("Cursor en la mitad inferior del div");
                  setTargetItemIndex(lane.items.length);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                const laneId = e.dataTransfer.getData("lane/id");
                const itemId = e.dataTransfer.getData("item/id");
                if (itemId) {
                  handleDropItem &&
                    handleDropItem(parseInt(itemId, 10), lane.id);
                } else if (laneId) {
                  handleDropLane &&
                    handleDropLane(parseInt(laneId, 10), lane.id);
                }
              }}
            >
              <Lane
                key={index}
                data={lane}
                onDragStart={() => console.log()}
                onDragOver={handleDragOverLane}
                onDropHandle={handleDropLane}
                onDropItem={handleDropItem}
              >
                <LaneHeader>{lane.title}</LaneHeader>
                <LaneContent>
                  {lane.items.map((item, index) => {
                    return (
                      <Item
                        key={index}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("item/id", item.id.toString());
                          e.stopPropagation();
                          console.log("arrastre ITEM iniciado", e);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          const rect = e.currentTarget.getBoundingClientRect();
                          const midY = rect.top + rect.height / 2; // Calcula la mitad vertical del item

                          if (e.clientY < midY) {
                            console.log("Cursor en la mitad superior del item");
                            setTargetItemIndex(index);
                          } else {
                            console.log("Cursor en la mitad inferior del item");
                            setTargetItemIndex(index + 1);
                          }
                        }}
                        onDragLeave={(e) => {
                          console.log("item leave", item.details);
                        }}
                        onDragEnter={(e) => {
                          console.log("item enter", item.details);
                        }}
                      >
                        {item.details}
                      </Item>
                    );
                  })}
                </LaneContent>
                <LaneFooter />
              </Lane>
            </div>
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
