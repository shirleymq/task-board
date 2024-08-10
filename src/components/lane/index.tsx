import { FC, HTMLAttributes, PropsWithChildren } from "react";

type LaneProps = HTMLAttributes<HTMLDivElement> & {
  data: any; // Representa la información del carril
  onDragStart?: (index: number) => void; // Manejador de evento para cuando un carril comienza a arrastrarse
  onDropHandle: (sourceId: number, targetId: number) => void; // Manejador de evento para cuando un carril se suelta en otro carril
  onDropItem?: (itemId: number, targetLaneId: number) => void; // Manejador de evento para cuando un ítem se suelta en un carril
  onDragOver?: (hoveredLaneId: number) => void; // Manejador de evento para cuando un carril es arrastrado sobre otro
};

export const Lane: FC<PropsWithChildren<LaneProps>> = ({
  children,
  className,
  onDragStart,
  onDropHandle,
  onDragOver,
  onDropItem,
  data,
  ...props
}) => {
  return (
    <div
      onDragStart={(e) => {
        console.log("Empezo", data.title);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("lane/id", data.id.toString());
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver && onDragOver(data.id);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const laneId = e.dataTransfer.getData("lane/id");
        const itemId = e.dataTransfer.getData("item/id");
        if (itemId) {
          onDropItem && onDropItem(parseInt(itemId, 10), data.id);
        } else if (laneId) {
          onDropHandle && onDropHandle(parseInt(laneId, 10), data.id);
        }
      }}
      className={`lane ${className}`}
      {...props}
      draggable
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

interface LaneContentProps extends HTMLAttributes<HTMLHeadElement> {}
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

interface LaneFooterProps extends HTMLAttributes<HTMLHeadElement> {}
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
