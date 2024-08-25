import "./App.css";
import { Panel } from "./components/panel";
import {
  Lane,
  LaneBackground,
  LaneContent,
  LaneFooter,
  LaneHeader,
} from "./components/lane";
import { Item } from "./components/item";
import { useRef, useState } from "react";
import { BlankSpace } from "./components/blank-space";

function App() {
  const [lanes, setLanes] = useState<Lane[]>(DATA);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showPlaceholder, setShowPlaceholder] = useState<{
    laneId: number | null;
    itemIndex: number | null;
  }>({ laneId: null, itemIndex: null });
  const [height, setHeight] = useState<string>("0px");

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
      const insertIndex =
        showPlaceholder.laneId === targetLaneId &&
        showPlaceholder.itemIndex !== null
          ? showPlaceholder.itemIndex
          : copyLanes[targetLaneIndex].items.length;
      copyLanes[targetLaneIndex].items.splice(insertIndex, 0, itemToMove);
    }

    setLanes(copyLanes);
    setShowPlaceholder({ laneId: null, itemIndex: null });
    setHeight("0px");
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
            <LaneBackground
              key={index}
              data={lane}
              laneRef={laneRefs.current[index]}
              onDropItem={handleDropItem}
              onDropLane={handleDropLane}
              updateTargetIndex={(index2) => {
                setShowPlaceholder({
                  laneId: lane.id,
                  itemIndex: index2,
                });
              }}
            >
              <Lane
                key={index}
                data={lane}
                ref={(el) => (laneRefs.current[index] = el)}
                onDragOver={handleDragOverLane}
              >
                <LaneHeader>{lane.title}</LaneHeader>
                <LaneContent>
                  {lane.items.map((item, index) => {
                    return (
                      <>
                        {showPlaceholder.laneId === lane.id &&
                          showPlaceholder.itemIndex === index && (
                            <BlankSpace height={height} />
                          )}
                        <Item
                          key={index}
                          data={item}
                          position={index}
                          updateTargetIndex={(index) => {
                            setShowPlaceholder({
                              laneId: lane.id,
                              itemIndex: index,
                            });
                          }}
                          updateHeight={setHeight}
                        >
                          {item.details}
                        </Item>
                      </>
                    );
                  })}
                  {showPlaceholder.laneId === lane.id &&
                    showPlaceholder.itemIndex === lane.items.length && (
                      <BlankSpace height={height} />
                    )}
                </LaneContent>
                <LaneFooter />
              </Lane>
            </LaneBackground>
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
        details: "Shirley 2 Shirley 2 Shirley 2 Shirley 2",
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
