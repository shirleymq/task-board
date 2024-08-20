import { FC, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

type LaneProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  onDragOver?: (hoveredLaneId: number) => void;
};

export const Lane: FC<PropsWithChildren<LaneProps>> = forwardRef<
  HTMLDivElement,
  PropsWithChildren<LaneProps>
>(({ children, className, onDragOver, data, ...props }, ref) => {
  return (
    <div
      onDragStart={(e) => {
        console.log("arrastre LANE iniciado ", data.id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("lane/id", data.id.toString());
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver && onDragOver(data.id);
        //seria util para desplazar las tarjetas cuando sientan un elemento sobre ellas
      }}
      className={`lane ${className}`}
      ref={ref}
      {...props}
      draggable
    >
      {children}
    </div>
  );
});

interface LaneBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  onDropItem: (itemId: number, targetLaneId: number) => void;
  onDropLane: (sourceLaneId: number, targetLaneId: number) => void;
  data: any;
  laneRef: HTMLDivElement | null;
  updateTargetIndex: (index: number) => void;
}
export const LaneBackground: FC<LaneBackgroundProps> = ({
  children,
  className,
  onDropItem,
  onDropLane,
  data,
  laneRef,
  updateTargetIndex,
  ...props
}) => {
  return (
    <div
      className={`lane-background ${className}`}
      {...props}
      style={{ backgroundColor: "blue" }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const laneElement = laneRef;
        if (laneElement) {
          const laneRect = laneElement.getBoundingClientRect();
          const bottomLaneY = laneRect.bottom;
          if (e.clientY < bottomLaneY) {
            console.log("cursor sobre lane");
          } else {
            console.log("cursor debajo de lane");
            updateTargetIndex(data.items.length);
          }
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        const laneId = e.dataTransfer.getData("lane/id");
        const itemId = e.dataTransfer.getData("item/id");
        if (itemId) {
          onDropItem && onDropItem(parseInt(itemId, 10), data.id);
        } else if (laneId) {
          onDropLane && onDropLane(parseInt(laneId, 10), data.id);
        }
      }}
    >
      {children}
    </div>
  );
};

interface LaneHeaderProps extends HTMLAttributes<HTMLHeadElement> {}
export const LaneHeader: FC<LaneHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`lane-header ${className}`} {...props}>
      {children}
    </div>
  );
};

interface LaneContentProps extends HTMLAttributes<HTMLDivElement> {}
export const LaneContent: FC<LaneContentProps> = ({
  children,
  className,
  ...otrosProps
}) => {
  return (
    <div className={`lane-scrollbar ${className}`} {...otrosProps}>
      {children}
    </div>
  );
};

interface LaneFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const LaneFooter: FC<LaneFooterProps> = ({
  children,
  className,
  ...otrosProps
}) => {
  return (
    <div className={`lane-footer ${className}`} {...otrosProps}>
      {children}
      <button className="lane-button"> + Añade una tarjeta</button>
    </div>
  );
};
