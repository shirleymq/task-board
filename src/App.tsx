import "./App.css";
import { Panel } from "./components/panel";
import { Lane, LaneContent, LaneFooter, LaneHeader } from "./components/lane";
import { Item } from "./components/item";
import { useState } from "react";

function App() {
  const [lanes, setLanes] = useState<Lane[]>(DATA);
  const [draggedLaneId, setDraggedLaneId] = useState<number | null>(null);

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

  const handleDropItem = (itemId: number, targetLaneId: number) => {
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
      copyLanes[targetLaneIndex].items.push(itemToMove);
    }

    setLanes(copyLanes);
  };

  // Manejo de carriles OK
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

    setDraggedLaneId(null);
    setLanes(updatedLanes);
  };

  const handleDragOverLane = (hoveredLaneId: number) => {
    /**if (draggedLaneId !== null && draggedLaneId !== hoveredLaneId) {
      const updatedLanes = [...lanes];
      const draggedLaneIndex = updatedLanes.findIndex(
        (lane) => lane.id === draggedLaneId
      );
      const hoveredLaneIndex = updatedLanes.findIndex(
        (lane) => lane.id === hoveredLaneId
      );
      if (draggedLaneIndex !== -1 && hoveredLaneIndex !== -1) {
        const [draggedLane] = updatedLanes.splice(draggedLaneIndex, 1);
        updatedLanes.splice(hoveredLaneIndex, 0, draggedLane);
        setLanes(updatedLanes);
      }
    }*/
  };

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
              onDragStart={() => setDraggedLaneId(lane.id)}
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
                        console.log("item atrastado sobre este item ", index);
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
